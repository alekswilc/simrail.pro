import { createClient, RedisClientType } from "redis";
import "./util/time.js";
import { SimrailClient, SimrailClientEvents } from "./util/SimrailClient.js";
import { StationsModule } from "./modules/stations.js";
import { ApiModule } from "./http/server.js";
import mongoose from "mongoose";
import { TrainsModule } from "./modules/trains.js";
import { Server, Station, Train } from "@simrail/types";
import { IPlayer } from "./types/player.js";
import dayjs from "dayjs";

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

    if (process.env.NODE_ENV === "development")
    {
        client.on(SimrailClientEvents.StationJoined, (server: Server, station: Station, player: IPlayer) =>
        {
            console.log(`${ server.ServerCode } | ${ station.Name } | ${ player.personaname } joined`);
        });

        client.on(SimrailClientEvents.StationLeft, (server: Server, station: Station, player: IPlayer, joinedAt: number) =>
        {
            console.log(`${ server.ServerCode } | ${ station.Name } | ${ player.personaname } left. | ${ joinedAt ? dayjs(joinedAt).fromNow() : "no time data." }`);
        });

        client.on(SimrailClientEvents.TrainLeft, (server: Server, train: Train, player: IPlayer, joinedAt: number, leftAt: number, points: number, distance: number, vehicle: string) =>
        {
            console.log(`${ server.ServerCode } | ${ train.TrainName } | ${ player.personaname } left. | ${ joinedAt ? dayjs(joinedAt).fromNow() : "no time data." } |
        ${ vehicle } | ${ distance / 1000 } | ${ points }`);
        });

        client.on(SimrailClientEvents.TrainJoined, (server: Server, train: Train, player: IPlayer, start: number) =>
        {
            console.log(`${ server.ServerCode } | ${ train.TrainName } | ${ player.personaname } joined | ${ start }`);
        });
    }


})();



