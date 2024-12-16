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

import { Server, Train } from "@simrail/types";
import { SimrailClientEvents } from "../util/SimrailClient.js";
import { v4 } from "uuid";
import { getVehicle } from "../util/contants.js";
import { MProfile, TMProfile } from "../mongo/profile.js";
import { MTrainLog } from "../mongo/trainLog.js";
import { PlayerUtil } from "../util/PlayerUtil.js";
import { isTruthyAndGreaterThanZero } from "../util/functions.js";

export class TrainsModule
{
    public static load()
    {

        client.on(SimrailClientEvents.TrainLeft, async (server: Server, train: Train, player: TMProfile, joinedAt: number, leftAt: number, points: number, distance: number, vehicle: string) =>
        {
            const stats = await PlayerUtil.getPlayerStats(player.id);

            if (stats && (leftAt - joinedAt) && (leftAt - joinedAt) > 0)
            {
                const time = (leftAt - joinedAt) || 0;

                if (player.flags.includes("private"))
                {
                    player.trainStats = {
                        [ "N/A" ]: {
                            score: stats?.stats?.find(x => x.name === "SCORE")?.value ?? 0,
                            distance: stats?.stats?.find(x => x.name === "DISTANCE_M")?.value ?? 0,
                            time: 0,
                        },
                    };

                    player.dispatcherStats = {
                        [ "N/A" ]: {
                            time: (stats?.stats?.find(x => x.name === "DISPATCHER_TIME")?.value ?? 0) * 1000 * 60,
                        },
                    };

                    player.trainPoints = stats?.stats?.find(x => x.name === "SCORE")?.value ?? 0;
                    player.trainDistance = stats?.stats?.find(x => x.name === "DISTANCE_M")?.value ?? 0;
                    player.dispatcherTime = (stats?.stats?.find(x => x.name === "DISPATCHER_TIME")?.value ?? 0) * 1000 * 60;
                    player.trainTime = 0;
                }

                const vehicleName = getVehicle(vehicle) ?? vehicle;

                if (!isTruthyAndGreaterThanZero(distance))
                    distance = 0;

                if (!isTruthyAndGreaterThanZero(points))
                    points = 0;


                if (!player.trainStats)
                {
                    player.trainStats = {};
                }

                if (player.trainStats[ vehicleName ])
                {
                    if (isTruthyAndGreaterThanZero(player.trainStats[ vehicleName ].distance + distance))
                    {
                        player.trainStats[ vehicleName ].distance = player.trainStats[ vehicleName ].distance + distance;
                    }
                    if (isTruthyAndGreaterThanZero(player.trainStats[ vehicleName ].score + points))
                    {
                        player.trainStats[ vehicleName ].score = player.trainStats[ vehicleName ].score + points;
                    }
                    if (isTruthyAndGreaterThanZero(player.trainStats[ vehicleName ].time + time))
                    {
                        player.trainStats[ vehicleName ].time = player.trainStats[ vehicleName ].time + time;
                    }
                }
                else
                {
                    player.trainStats[ vehicleName ] = {
                        distance, score: points, time,
                    };
                }


                if (isTruthyAndGreaterThanZero(player.trainTime + time))
                {
                    player.trainTime = player.trainTime + time;
                }

                if (isTruthyAndGreaterThanZero(player.trainPoints + points))
                {
                    player.trainPoints = player.trainPoints + points;
                }

                if (isTruthyAndGreaterThanZero(player.trainDistance + distance))
                {
                    player.trainDistance = player.trainDistance + distance;
                }

                player.steamTrainDistance = stats?.stats?.find(x => x.name === "DISTANCE_M")?.value ?? 0;
                player.steamDispatcherTime = stats?.stats?.find(x => x.name === "DISPATCHER_TIME")?.value ?? 0;
                player.steamTrainScore = stats?.stats?.find(x => x.name === "SCORE")?.value ?? 0;

                if ((player.steamTrainDistance > player.trainDistance) || (player.steamTrainScore > player.trainPoints))
                {
                    player.trainStats[ "N/A" ] = {
                        time: 0, distance: player.steamTrainDistance > player.trainDistance ? player.steamTrainDistance - player.trainDistance : player.trainDistance,
                        score: player.steamTrainScore > player.trainPoints ? player.steamTrainScore - player.trainPoints : player.trainPoints,
                    };

                    if (player.steamTrainDistance > player.trainDistance)
                    {
                        player.trainDistance = player.steamTrainDistance;
                    }
                    if (player.steamTrainScore > player.trainPoints)
                    {
                        player.trainPoints = player.steamTrainScore;
                    }
                }

                player.flags = player.flags.filter(x => x !== "private");

                if (!player.createdAt) player.createdAt = new Date(parseInt(player._id.toString().substring(0, 8), 16) * 1000).getTime();
            }

            const playerData = await PlayerUtil.getPlayerSteamData(player.id);

            !stats && !player.flags.includes('private') && player.flags.push("private");

            player.flags = [...new Set(player.flags)];

            player.username = playerData?.personaname ?? player.username;
            player.avatar = playerData?.avatarfull ?? player.avatar;

            await MProfile.updateOne({ id: player.id }, player);

            await MTrainLog.create({
                id: v4(),

                steam: player.id,
                username: player.username,

                joinedDate: joinedAt,
                leftDate: leftAt,
                trainNumber: train.TrainNoLocal,
                server: server.ServerCode,
                distance, points,
                trainName: train.TrainName,

                player: player._id,
            });
        });
    }
}