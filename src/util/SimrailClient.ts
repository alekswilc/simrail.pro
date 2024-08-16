import { EventEmitter } from 'node:events';

import { IPlayer } from '../types/player.js';
import { PlayerUtil } from './PlayerUtil.js';
import { Station, ApiResponse, Server, Train } from '@simrail/types';

export enum SimrailClientEvents {
    StationJoined = 'stationJoined',
    StationLeft = 'stationLeft',
    TrainJoined = 'trainJoined',
    TrainLeft = 'trainLeft',

}

export declare interface SimrailClient {
    on(event: SimrailClientEvents.StationJoined, listener: (server: Server, station: Station, player: IPlayer) => void): this;
    on(event: SimrailClientEvents.StationLeft, listener: (server: Server, station: Station, player: IPlayer, joinedAt: number) => void): this;


    on(event: SimrailClientEvents.TrainJoined, listener: (server: Server, train: Train, player: IPlayer, startDistance: number) => void): this;
    on(event: SimrailClientEvents.TrainLeft, listener: (server: Server, train: Train, player: IPlayer, joinedAt: number, leftAt: number, points: number, distance: number, vehicle: string) => void): this;

    //on(event: string, listener: Function): this;
}

export type OccupiedStation = {
    SteamId: string;
    JoinedAt: number;
}

export type OccupiedTrain = {
    SteamId: string;
    JoinedAt: number;
    StartPlayerDistance: number;
    StartPlayerPoints: number;
}

export class SimrailClient extends EventEmitter {
    public stations: Record<Server['ServerCode'], Station[]> = {};
    public stationsOccupied: Record<Server['ServerCode'], Record<string, OccupiedStation | null>> = {};

    public trains: Record<Server['ServerCode'], Train[]> = {};
    public trainsOccupied: Record<Server['ServerCode'], Record<string, OccupiedTrain | null>> = {};

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

    public getTrain(server: Server['ServerCode'], name: string) {
        if (!this.trainsOccupied[server] || !this.trainsOccupied[server][name]) return null;
        const player = PlayerUtil.getPlayer(this.trainsOccupied[server][name].SteamId);
        return { player, joinedAt: this.trainsOccupied[server][name].JoinedAt, startPlayerDistance: this.trainsOccupied[server][name].StartPlayerDistance };
    }


    private async setup() {
        if (!await redis.json.get('stations'))
            redis.json.set('stations', '$', []);
        if (!await redis.json.get('trains'))
            redis.json.set('trains', '$', []);
        if (!await redis.json.get('trains_occupied'))
            redis.json.set('trains_occupied', '$', {});

        if (!await redis.json.get('stations_occupied'))
            redis.json.set('stations_occupied', '$', {});

        this.stations = (await redis.json.get('stations') as unknown as SimrailClient['stations']);
        this.stationsOccupied = (await redis.json.get('stations_occupied') as unknown as SimrailClient['stationsOccupied']);
        this.trains = (await redis.json.get('trains') as unknown as SimrailClient['trains']);
        this.trainsOccupied = (await redis.json.get('trains_occupied') as unknown as SimrailClient['trainsOccupied']);
    }


    private async update() {
        const servers = (await fetch('https://panel.simrail.eu:8084/servers-open').then(x => x.json()) as ApiResponse<Server>)
            .data?.filter(x => x.ServerName.includes('Polski')) ?? []; // no plans to support other servers

            
        // TODO: maybe node:worker_threads?
        // TODO: check performance
        servers.forEach(async (server) => {
                const stations = (await fetch('https://panel.simrail.eu:8084/stations-open?serverCode=' + server.ServerCode).then(x => x.json())) as ApiResponse<Station>;
                const trains = (await fetch('https://panel.simrail.eu:8084/trains-open?serverCode=' + server.ServerCode).then(x => x.json())) as ApiResponse<Train>;
                if (stations.result) {
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
    
                                return;
                            }
                            // leave
                            const player = await PlayerUtil.getPlayer(data.DispatchedBy[0]?.SteamId)
    
                            this.emit(SimrailClientEvents.StationLeft, server, x, player, this.stationsOccupied[server.ServerCode][data.Prefix]?.JoinedAt);
                            delete this.stationsOccupied[server.ServerCode][data.Prefix];
                            
                        }
                    })
                    redis.json.set('stations_occupied', '$', this.stationsOccupied);
    
                    this.stations[server.ServerCode] = stations.data;
                    redis.json.set('stations', '$', this.stations);
                }

                if (trains.result) {
                    if (!this.trains[server.ServerCode]) this.trains[server.ServerCode] = [];
                    if (!this.trainsOccupied[server.ServerCode]) this.trainsOccupied[server.ServerCode] = {};
    
                    if (!this.trains[server.ServerCode].length) {
                        this.trains[server.ServerCode] = trains.data;
                        redis.json.set('trains', '$', this.trains);
                        return;
                    }

                    trains.data.forEach(async (x) => {
                        const data = this.trains[server.ServerCode].find(y => y.id === x.id);
                        if (!data) return;
    
                        if (data.TrainData.ControlledBySteamID !== x.TrainData.ControlledBySteamID) {
                            if (!data.TrainData.ControlledBySteamID) {
                                if (!x.TrainData.ControlledBySteamID) return;
                                // join
                                const date = new Date();
                                const player = await PlayerUtil.getPlayer(x.TrainData.ControlledBySteamID!);
                                const playerStats = await PlayerUtil.getPlayerStats(x.TrainData.ControlledBySteamID!);
    
                                this.emit(SimrailClientEvents.TrainJoined, server, x, player, playerStats?.stats.find(x => x.name === 'DISTANCE_M')?.value);
                               
                                this.trainsOccupied[server.ServerCode][x.TrainNoLocal] = {
                                    SteamId: x.TrainData.ControlledBySteamID!,
                                    JoinedAt: date.getTime(),
                                    StartPlayerDistance: playerStats?.stats.find(x => x.name === 'DISTANCE_M')?.value!,
                                    StartPlayerPoints: playerStats?.stats.find(x => x.name === "SCORE")?.value!,
                                };
                                return;
                            }
 
                            if (!data.TrainData.ControlledBySteamID) return;
                            const date = new Date();

                            const player = await PlayerUtil.getPlayer(data.TrainData.ControlledBySteamID!);
                            const playerId = data.TrainData.ControlledBySteamID!;
                            const trainOccupied = this.trainsOccupied[server.ServerCode][data.TrainNoLocal];

                            setTimeout(async () => {
                                const playerStats = await PlayerUtil.getPlayerStats(playerId);
                                const oldKm = trainOccupied?.StartPlayerDistance ?? 0;

                                const distance = oldKm ? (playerStats?.stats.find(x => x.name === 'DISTANCE_M')?.value ?? 0) - oldKm : 0;
    
                                const oldPoints = trainOccupied?.StartPlayerPoints ?? 0;
                                const points = oldPoints ? (playerStats?.stats.find(x => x.name === 'SCORE')?.value ?? 0) - oldPoints : 0;


                                this.emit(SimrailClientEvents.TrainLeft, server, data, player, trainOccupied?.JoinedAt, date.getTime(), points, distance, x.Vehicles[0]);
                            }, 60000)
                            delete this.trainsOccupied[server.ServerCode][data.TrainNoLocal];
                            
                        }
                    })
    
    
                    this.trains[server.ServerCode] = trains.data;
                    redis.json.set('trains', '$', this.trains);
                    redis.json.set('trains_occupied', '$', this.trainsOccupied);
                }


        });
    }
} 