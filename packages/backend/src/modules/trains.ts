import { Server, Train } from "@simrail/types";
import { IPlayer } from "../types/player.js";
import { SimrailClientEvents } from "../util/SimrailClient.js";
import { v4 } from "uuid";
import { getVehicle } from "../util/contants.js";
import { MProfile } from "../mongo/profile.js";
import { MTrainLog } from "../mongo/trainLogs.js";

export class TrainsModule
{
    public static load()
    {

        client.on(SimrailClientEvents.TrainLeft, async (server: Server, train: Train, player: IPlayer, joinedAt: number, leftAt: number, points: number, distance: number, vehicle: string) =>
        {
            if (distance)
            {
                const time = (leftAt - joinedAt) || 0;
                const userProfile = await MProfile.findOne({ steam: player.steamid }) ?? await MProfile.create({ steam: player.steamid, id: v4(), steamName: player.personaname });

                const vehicleName = getVehicle(vehicle) ?? vehicle;

                if (!userProfile.trainStats)
                {
                    userProfile.trainStats = {};
                }

                if (userProfile.trainStats[ vehicleName ])
                {
                    userProfile.trainStats[ vehicleName ].distance = userProfile.trainStats[ vehicleName ].distance + distance;
                    userProfile.trainStats[ vehicleName ].score = userProfile.trainStats[ vehicleName ].score + points;
                    userProfile.trainStats[ vehicleName ].time = userProfile.trainStats[ vehicleName ].time + time;
                }
                else
                {
                    userProfile.trainStats[ vehicleName ] = {
                        distance, score: points, time,
                    };
                }

                if (!userProfile.trainTime)
                {
                    userProfile.trainTime = 0;
                }

                userProfile.trainTime = userProfile.trainTime + time;

                if (!userProfile.trainPoints)
                {
                    userProfile.trainPoints = 0;
                }

                userProfile.trainPoints = userProfile.trainPoints + points;

                if (!userProfile.trainDistance)
                {
                    userProfile.trainDistance = 0;
                }

                userProfile.trainDistance = userProfile.trainDistance + distance;

                await MProfile.findOneAndUpdate({ id: userProfile.id }, { trainStats: userProfile.trainStats, trainTime: userProfile.trainTime, trainPoints: userProfile.trainPoints, trainDistance: userProfile.trainDistance });
            }

            await MTrainLog.create({
                id: v4(),
                userSteamId: player.steamid,
                userAvatar: player.avatarfull,
                userUsername: player.personaname,
                joinedDate: joinedAt,
                leftDate: leftAt,
                trainNumber: train.TrainNoLocal,
                server: server.ServerCode,
                distance, points,
                trainName: train.TrainName,
            });
        });
    }
}