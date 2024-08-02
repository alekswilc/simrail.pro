import { createClient, RedisClientType } from 'redis';
import './util/dayjs.js';
import { SimrailClient, SimrailClientEvents } from './util/SimrailClient.js';
import dayjs from 'dayjs';
import { StationsModule } from './modules/stations.js';
import { ApiModule } from './http/api.js';
import mongoose from 'mongoose';
import { IStation } from './types/station.js';
import { IPlayer } from './types/player.js';


; (async () => {
    global.redis = await createClient({
        url: process.env.REDIS_URI!
    })
        .on('error', err => console.log('Redis Client Error', err))
        .connect() as RedisClientType;
    console.log('Redis connected');

    await mongoose.connect(process.env.MONGO_URI!);

    console.log('MongoDB connected');
    global.client = new SimrailClient();

    client.on(SimrailClientEvents.StationJoined, (station: IStation, player: IPlayer) => {
        console.log(`${station.Name} | ${player.personaname} joined`);
    });

    client.on(SimrailClientEvents.StationLeft, (station: IStation, player: IPlayer, joinedAt: number) => {
        console.log(`${station.Name} | ${player.personaname} left. | ${joinedAt ? dayjs(joinedAt).fromNow() : 'no time data.'}`);
    });

    StationsModule.load();
    ApiModule.load();
})();



