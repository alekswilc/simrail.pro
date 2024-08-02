import { EventEmitter } from 'node:events';
import { IStation, IStationPayload } from '../types/station.js';
import { IPlayer } from '../types/player.js';
import { PlayerUtil } from './PlayerUtil.js';

export enum SimrailClientEvents {
    StationJoined = 'stationJoined',
    StationLeft = 'stationLeft',

}

export declare interface SimrailClient {
    on(event: SimrailClientEvents.StationJoined, listener: (station: IStation, player: IPlayer) => void): this;
    on(event: SimrailClientEvents.StationLeft, listener: (station: IStation, player: IPlayer, joinedAt: number) => void): this;

    on(event: string, listener: Function): this;
}


export class SimrailClient extends EventEmitter {
    public stations: IStation[] = [];
    public stationsOccupied: Record<string, { steamId: string; joinedAt: number } | null> = {};

    public constructor() {
        super();
        this.setup();
        setTimeout(() => setInterval(() => this.update(), 500), 1000)
    }

    public getStation(name: string) {
        if (!this.stationsOccupied[name]) return null;
        const player = PlayerUtil.getPlayer(this.stationsOccupied[name].steamId);
        return { player, joinedAt: this.stationsOccupied[name].joinedAt };
    }

    
    private async setup() {
        if (!await redis.json.get('stations'))
            redis.json.set('stations', '$', []);

        if (!await redis.json.get('stations_occupied'))
            redis.json.set('stations_occupied', '$', {});

        this.stations = (await redis.json.get('stations') as unknown as IStation[]);
        this.stationsOccupied = (await redis.json.get('stations_occupied') as unknown as Record<string, { steamId: string; joinedAt: number } | null>);
    }


    private async update() {
        const servers = (await fetch('https://panel.simrail.eu:8084/stations-open?serverCode=pl2').then(x => x.json())) as IStationPayload;
        if (!servers.result) return


        if (!this.stations.length) {
            this.stations = servers.data;
            redis.json.set('list', '$', this.stations);
            return
        }


        servers.data.forEach(async (x) => {
            const data = this.stations.find(y => y.Name === x.Name);
            if (!data) return;


            if (data.DispatchedBy[0]?.SteamId !== x.DispatchedBy[0]?.SteamId) {

                if (!data.DispatchedBy[0]?.SteamId) {
                    // join
                    const date = new Date();
                    const player = await PlayerUtil.getPlayer(x.DispatchedBy[0]?.SteamId.toString());

                    this.emit(SimrailClientEvents.StationJoined, x, player);
                    this.stationsOccupied[data.Prefix] = {
                        steamId: x.DispatchedBy[0]?.SteamId.toString(),
                        joinedAt: date.getTime()
                    }
                    redis.json.set('stations_occupied', '$', this.stationsOccupied);

                    return;
                }

                const player = await PlayerUtil.getPlayer(data.DispatchedBy[0]?.SteamId.toString())

                this.emit(SimrailClientEvents.StationLeft, x, player, this.stationsOccupied[data.Prefix]?.joinedAt);
                delete this.stationsOccupied[data.Prefix];
                redis.json.set('stations_occupied', '$', this.stationsOccupied);
            }
        })


        this.stations = servers.data;
        redis.json.set('stations', '$', this.stations);
    }
} 