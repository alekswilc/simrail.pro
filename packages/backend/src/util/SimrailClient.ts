/*
 * Copyright (C) 2024 Aleksander <alekswilc> Wilczyński (aleks@alekswilc.dev)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * See LICENSE for more.
 */

import { EventEmitter } from "node:events";
import { PlayerUtil } from "./PlayerUtil.js";
import { Station, ApiResponse, Server, Train } from "@simrail/types";
import { TMProfile } from "../mongo/profile.js";

export enum SimrailClientEvents
{
    StationJoined = "stationJoined",
    StationLeft = "stationLeft",
    TrainJoined = "trainJoined",
    TrainLeft = "trainLeft",

}

export declare interface SimrailClient
{
    on(event: SimrailClientEvents.StationJoined, listener: (server: Server, station: Station, player: TMProfile) => void): this;

    on(event: SimrailClientEvents.StationLeft, listener: (server: Server, station: Station, player: TMProfile, joinedAt: number) => void): this;


    on(event: SimrailClientEvents.TrainJoined, listener: (server: Server, train: Train, player: TMProfile, startDistance: number) => void): this;

    on(event: SimrailClientEvents.TrainLeft, listener: (server: Server, train: Train, player: TMProfile, joinedAt: number, leftAt: number, points: number, distance: number, vehicle: string) => void): this;

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

export class SimrailClient extends EventEmitter
{
    public stations: Record<Server["ServerCode"], Station[]> = {};
    public stationsOccupied: Record<Server["ServerCode"], Record<string, OccupiedStation | null>> = {};

    public trains: Record<Server["ServerCode"], Train[]> = {};
    public trainsOccupied: Record<Server["ServerCode"], Record<string, OccupiedTrain | null>> = {};

    public constructor()
    {
        super();
        this.setup().then(() => {
            void this.update(false);
        });

    }

    // todo: full rewrite, rewrite db structure with option to join log to user profile, check for negative values in user profile
    // todo: wipe database 13.12.2024

    private async setup()
    {
        if (!await redis.get('last_updated')) {
            await redis.json.set('trains_occupied', '$', {});
            await redis.json.set('trains', '$', []);
            await redis.json.set('stations', '$', []);
            await redis.json.set('stations_occupied', '$', {});
        }

        const lastUpdated = Date.now() - (Number(await redis.get('last_updated')) ?? 0);

        if (lastUpdated > 300_000) {
            console.log('REDIS: last updated more than > 5 mins');
            await redis.json.set('trains_occupied', '$', {});
            await redis.json.set('trains', '$', []);
            await redis.json.set('stations', '$', []);
            await redis.json.set('stations_occupied', '$', {});
        }

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

        redis.set('last_updated', Date.now().toString());
    }

    private async processStation(server: Server, stations: ApiResponse<Station>)
    {
        if (stations.result)
        {
            if (!this.stations[ server.ServerCode ])
            {
                this.stations[ server.ServerCode ] = [];
            }
            if (!this.stationsOccupied[ server.ServerCode ])
            {
                this.stationsOccupied[ server.ServerCode ] = {};
            }

            if (!this.stations[ server.ServerCode ].length)
            {
                this.stations[ server.ServerCode ] = stations.data;
                redis.json.set("stations", "$", this.stations);
                redis.set('last_updated', Date.now().toString());
            }

            for (const x of stations.data)
            {
                const data = this.stations[ server.ServerCode ].find(y => y.Name === x.Name);
                if (!data)
                {
                    continue;
                }

                if (data.DispatchedBy[ 0 ]?.SteamId !== x.DispatchedBy[ 0 ]?.SteamId)
                {
                    if (!data.DispatchedBy[ 0 ]?.SteamId)
                    {
                        // join
                        const date = new Date();

                        const player = await PlayerUtil.ensurePlayer(x.DispatchedBy[ 0 ]?.SteamId);

                        this.emit(SimrailClientEvents.StationJoined, server, x, player);
                        this.stationsOccupied[ server.ServerCode ][ data.Prefix ] = {
                            SteamId: x.DispatchedBy[ 0 ]?.SteamId,
                            JoinedAt: date.getTime(),
                        };

                        continue;
                    }
                    // leave
                    const player = await PlayerUtil.ensurePlayer(data.DispatchedBy[ 0 ]?.SteamId);

                    this.emit(SimrailClientEvents.StationLeft, server, x, player, this.stationsOccupied[ server.ServerCode ][ data.Prefix ]?.JoinedAt);
                    delete this.stationsOccupied[ server.ServerCode ][ data.Prefix ];

                }
            }
            redis.json.set("stations_occupied", "$", this.stationsOccupied);

            this.stations[ server.ServerCode ] = stations.data;
            redis.json.set("stations", "$", this.stations);
            redis.set('last_updated', Date.now().toString());
        }
    }

    private async processTrain(server: Server, trains: ApiResponse<Train>)
    {
        if (trains.result)
        {
            if (!this.trains[ server.ServerCode ])
            {
                this.trains[ server.ServerCode ] = [];
            }
            if (!this.trainsOccupied[ server.ServerCode ])
            {
                this.trainsOccupied[ server.ServerCode ] = {};
            }

            if (!this.trains[ server.ServerCode ].length)
            {
                this.trains[ server.ServerCode ] = trains.data;
                redis.json.set("trains", "$", this.trains);
                redis.set('last_updated', Date.now().toString());
                return;
            }

            for (const x of trains.data)
            {
                const data = this.trains[ server.ServerCode ].find(y => y.id === x.id);
                if (!data)
                {
                    continue;
                }

                if (data.TrainData.ControlledBySteamID !== x.TrainData.ControlledBySteamID)
                {

                    if (!data.TrainData.ControlledBySteamID)
                    {
                        if (!x.TrainData.ControlledBySteamID)
                        {
                            continue;
                        }
                        // join
                        const date = new Date();

                        const player = await PlayerUtil.ensurePlayer(x.TrainData.ControlledBySteamID!);

                        const playerStats = await PlayerUtil.getPlayerStats(x.TrainData.ControlledBySteamID!);


                        this.emit(SimrailClientEvents.TrainJoined, server, x, player, playerStats?.stats.find(x => x.name === "DISTANCE_M")?.value);

                        this.trainsOccupied[ server.ServerCode ][ x.TrainNoLocal ] = {
                            SteamId: x.TrainData.ControlledBySteamID!,
                            JoinedAt: date.getTime(),
                            StartPlayerDistance: playerStats?.stats.find(x => x.name === "DISTANCE_M")?.value!,
                            StartPlayerPoints: playerStats?.stats.find(x => x.name === "SCORE")?.value!,
                        };
                        continue;
                    }

                    if (!data.TrainData.ControlledBySteamID)
                    {
                        continue;
                    }
                    const date = new Date();

                    const player = await PlayerUtil.ensurePlayer(data.TrainData.ControlledBySteamID!);

                    const playerId = data.TrainData.ControlledBySteamID!;
                    const trainOccupied = this.trainsOccupied[ server.ServerCode ][ data.TrainNoLocal ] && JSON.parse(JSON.stringify(this.trainsOccupied[ server.ServerCode ][ data.TrainNoLocal ])) || null;

                    setTimeout(() =>
                    {
                        PlayerUtil.getPlayerStats(playerId).then(playerStats =>
                        {
                            const oldKm = trainOccupied?.StartPlayerDistance ?? 0;

                            let distance = oldKm ? (playerStats?.stats.find(x => x.name === "DISTANCE_M")?.value ?? 0) - oldKm : 0;

                            const oldPoints = trainOccupied?.StartPlayerPoints ?? 0;

                            let points = oldPoints ? (playerStats?.stats.find(x => x.name === "SCORE")?.value ?? 0) - oldPoints : 0;


                            if (distance < 0) {
                                console.warn(`Player ${playerId}, Train ${data.TrainNoLocal} - distance < 0`);
                                distance = 0;
                            }

                            if (points < 0) {
                                console.warn(`Player ${playerId}, Train ${data.TrainNoLocal} - distance < 0`);
                                points = 0;
                            }

                            this.emit(SimrailClientEvents.TrainLeft, server, data, player, trainOccupied?.JoinedAt, date.getTime(), points, distance, x.Vehicles[ 0 ]);
                        });
                    }, 30_000);
                    delete this.trainsOccupied[ server.ServerCode ][ data.TrainNoLocal ];

                }
            }

            this.trains[ server.ServerCode ] = trains.data;
            redis.json.set("trains", "$", this.trains);
            redis.json.set("trains_occupied", "$", this.trainsOccupied);
            redis.set('last_updated', Date.now().toString());
        }
    }

    private async update(needSetup: boolean = false)
    {
        const servers = (await fetch("https://panel.simrail.eu:8084/servers-open").then(x => x.json()).catch(() => ({ data: [], result: false })) as ApiResponse<Server>)
            .data ?? [] //?.filter(x => x.ServerName.includes("Polski")) ?? []; // TODO: remove this in v3

        if (!servers.length)
        {
            console.log("SimrailAPI is down");
            await new Promise(res => setTimeout(res, 5000));
            await this.update(true);
            return;
        }

        if (needSetup) 
        {
            await this.setup();
        }

        // TODO: maybe node:worker_threads?
        // TODO: check performance
        for (const server of servers)
        {
            const stations = (await fetch('https://panel.simrail.eu:8084/stations-open?serverCode=' + server.ServerCode).then(x => x.json()).catch(() => ({ result: false }))) as ApiResponse<Station>;
            const trains = (await fetch('https://panel.simrail.eu:8084/trains-open?serverCode=' + server.ServerCode).then(x => x.json()).catch(() => ({ result: false }))) as ApiResponse<Train>;

            await this.processStation(server, stations);
            await this.processTrain(server, trains);
        }
        await new Promise(res => setTimeout(res, 1000));
        await this.update();
    }
} 