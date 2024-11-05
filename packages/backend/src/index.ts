import { createClient, RedisClientType } from "redis";
import "./util/time.js";
import { SimrailClient, SimrailClientEvents } from "./util/SimrailClient.js";
import dayjs from "dayjs";
import { StationsModule } from "./modules/stations.js";
import { ApiModule } from "./http/server.js";
import mongoose from "mongoose";
import { IPlayer } from "./types/player.js";
import { Station, Server, Train } from "@simrail/types";
import { TrainsModule } from "./modules/trains.js";


;(async () =>
{
    global.redis = await createClient({
        url: process.env.REDIS_URI!,
    })
        .on("error", err => console.log("Redis Client Error", err))
        .connect() as RedisClientType;
    console.log("Redis connected");

    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB connected");
    global.client = new SimrailClient();


    /*
    client.on(SimrailClientEvents.StationJoined, (server: Server, station: Station, player: IPlayer) => {
        console.log(`${server.ServerCode} | ${station.Name} | ${player.personaname} joined`);
    });

    client.on(SimrailClientEvents.StationLeft, (server: Server, station: Station, player: IPlayer, joinedAt: number) => {
        console.log(`${server.ServerCode} | ${station.Name} | ${player.personaname} left. | ${joinedAt ? dayjs(joinedAt).fromNow() : 'no time data.'}`);
    });

    client.on(SimrailClientEvents.TrainLeft, (server: Server, train: Train, player: IPlayer, joinedAt: number, leftAt: number, points: number, distance: number, vehicle: string) => {
        console.log(`${server.ServerCode} | ${train.TrainName} | ${player.personaname} left. | ${joinedAt ? dayjs(joinedAt).fromNow() : 'no time data.'} | 
        ${vehicle} | ${distance / 1000} | ${points}`);
    });

    client.on(SimrailClientEvents.TrainJoined, (server: Server, train: Train, player: IPlayer, start: number) => {
        console.log(`${server.ServerCode} | ${train.TrainName} | ${player.personaname} joined | ${start}`);
    });
    */

    StationsModule.load();
    TrainsModule.load();
    ApiModule.load();
})();



