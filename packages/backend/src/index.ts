/*
 * Copyright (C) 2025 Aleksander <alekswilc> Wilczyński (aleks@alekswilc.dev)
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

import { createClient, RedisClientType } from "redis";
import "./util/time.js";
import { SimrailClient, SimrailClientEvents } from "./util/SimrailClient.js";
import { StationsModule } from "./modules/stations.js";
import { ApiModule } from "./http/server.js";
import mongoose from "mongoose";
import { TrainsModule } from "./modules/trains.js";
import { Server, Station, Train } from "@simrail/types";
import dayjs from "dayjs";
import { TMProfile } from "./mongo/profile.js";
import { GitUtil } from "./util/git.js";

;(async () =>
{
    global.redis = await createClient({
        url: process.env.REDIS_URI!,
    })
        .on("error", err => console.log("Redis Client Error", err))
        .connect() as RedisClientType;
    console.log("Redis connected");

    await mongoose.connect(process.env.MONGO_URI!); // TODO: add typings

    console.log("MongoDB connected");

    if (process.env.NODE_ENV !== "preview") // disable writing data to db on preview.
    {
        global.client = new SimrailClient();

        StationsModule.load();
        TrainsModule.load();
    }

    ApiModule.load(); // TODO: use fastify
    GitUtil.getData();

    if (process.env.NODE_ENV === "development")
    {
        client.on(SimrailClientEvents.StationJoined, (server: Server, station: Station, player: TMProfile) =>
        {
            console.log(`${ server.ServerCode } | ${ station.Name } | ${ player.username } joined`);
        });

        client.on(SimrailClientEvents.StationLeft, (server: Server, station: Station, player: TMProfile, joinedAt: number) =>
        {
            console.log(`${ server.ServerCode } | ${ station.Name } | ${ player.username } left. | ${ joinedAt ? dayjs(joinedAt).fromNow() : "no time data." }`);
        });

        client.on(SimrailClientEvents.TrainLeft, (server: Server, train: Train, player: TMProfile, joinedAt: number, leftAt: number, points: number, distance: number, vehicle: string) =>
        {
            console.log(`${ server.ServerCode } | ${ train.TrainName } | ${ player.username } left. | ${ joinedAt ? dayjs(joinedAt).fromNow() : "no time data." } |
        ${ vehicle } | ${ distance / 1000 } | ${ points }`);
        });

        client.on(SimrailClientEvents.TrainJoined, (server: Server, train: Train, player: TMProfile, start: number) =>
        {
            console.log(`${ server.ServerCode } | ${ train.TrainName } | ${ player.username } joined | ${ start }`);
        });
    }


})();



