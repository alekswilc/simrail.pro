import { EventEmitter } from 'node:events';

import { IPlayer } from '../types/player.js';
import { PlayerUtil } from './PlayerUtil.js';
import { Station, ApiResponse, Server } from '@simrail/types';

export enum SimrailClientEvents {
    StationJoined = 'stationJoined',
    StationLeft = 'stationLeft',
}

export declare interface SimrailClient {
    on(event: SimrailClientEvents.StationJoined, listener: (server: Server, station: Station, player: IPlayer) => void): this;
    on(event: SimrailClientEvents.StationLeft, listener: (server: Server, station: Station, player: IPlayer, joinedAt: number) => void): this;

    //on(event: string, listener: Function): this;
}

export type OccupiedStation = {
    SteamId: string;
    JoinedAt: number;
}

export class SimrailClient extends EventEmitter {
    public stations: Record<Server['ServerCode'], Station[]> = {};
    public stationsOccupied: Record<Server['ServerCode'], Record<string, OccupiedStation | null>> = {};

    public constructor() {
        super();
        this.setup();
        setTimeout(() => setInterval(() => this.update(), 500), 1000)
    }

    public getStation(server: Server['ServerCode'], name: string) {
        if (!this.stationsOccupied[server] || !this.stationsOccupied[server][name]) return null;
        const player = PlayerUtil.getPlayer(this.stationsOccupied[server][name].SteamId);
        return { player, joinedAt: this.stationsOccupied[name].joinedAt };
    }


    private async setup() {
        if (!await redis.json.get('stations'))
            redis.json.set('stations', '$', []);

        if (!await redis.json.get('stations_occupied'))
            redis.json.set('stations_occupied', '$', {});

        this.stations = (await redis.json.get('stations') as unknown as SimrailClient['stations']);
        this.stationsOccupied = (await redis.json.get('stations_occupied') as unknown as SimrailClient['stationsOccupied']);
    }


    private async update() {
        const servers = (await fetch('https://panel.simrail.eu:8084/servers-open').then(x => x.json()) as ApiResponse<Server>)
            .data?.filter(x => x.ServerName.includes('Polski')) ?? []; // no plans to support other servers

            
        // TODO: maybe node:worker_threads?
        // TODO: check performance
        servers.forEach(async (server) => {
                const stations = (await fetch('https://panel.simrail.eu:8084/stations-open?serverCode=' + server.ServerCode).then(x => x.json())) as ApiResponse<Station>;
                if (!stations.result) return;

                if (!this.stations[server.ServerCode]) this.stations[server.ServerCode] = [];
                if (!this.stationsOccupied[server.ServerCode]) this.stationsOccupied[server.ServerCode] = {};

                if (!this.stations[server.ServerCode].length) {
                    this.stations[server.ServerCode] = stations.data;
                    redis.json.set('stations', '$', this.stations);
                    return;
                }

                stations.data.forEach(async (x) => {
                    const data = this.stations[server.ServerCode].find(y => y.Name === x.Name);
                    if (!data) return;

                    if (data.DispatchedBy[0]?.SteamId !== x.DispatchedBy[0]?.SteamId) {
                        if (!data.DispatchedBy[0]?.SteamId) {
                            // join
                            const date = new Date();
                            const player = await PlayerUtil.getPlayer(x.DispatchedBy[0]?.SteamId);

                            this.emit(SimrailClientEvents.StationJoined, server, x, player);
                            this.stationsOccupied[server.ServerCode][data.Prefix] = {
                                SteamId: x.DispatchedBy[0]?.SteamId,
                                JoinedAt: date.getTime()
                            };
                            redis.json.set('stations_occupied', '$', this.stationsOccupied);

                            return;
                        }
                        // leave
                        const player = await PlayerUtil.getPlayer(data.DispatchedBy[0]?.SteamId)

                        this.emit(SimrailClientEvents.StationLeft, server, x, player, this.stationsOccupied[server.ServerCode][data.Prefix]?.JoinedAt);
                        delete this.stationsOccupied[server.ServerCode][data.Prefix];
                        redis.json.set('stations_occupied', '$', this.stationsOccupied);
                    }
                })


                this.stations[server.ServerCode] = stations.data;
                redis.json.set('stations', '$', this.stations);
        });
    }
} 