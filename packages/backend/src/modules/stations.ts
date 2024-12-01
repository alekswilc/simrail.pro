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

import { Server, Station } from "@simrail/types";
import { MStationLog } from "../mongo/stationLog.js";
import { SimrailClientEvents } from "../util/SimrailClient.js";
import { v4 } from "uuid";
import { MProfile, TMProfile } from "../mongo/profile.js";
import { PlayerUtil } from "../util/PlayerUtil.js";
import { isTruthyAndGreaterThanZero } from "../util/functions.js";

export class StationsModule
{
    public static load()
    {

        client.on(SimrailClientEvents.StationLeft, async (server: Server, station: Station, player: TMProfile, joinedAt: number) =>
        {
            const stats = await PlayerUtil.getPlayerStats(player.id);
            const date = new Date();

            if (stats && (date.getTime() - joinedAt) && (date.getTime() - joinedAt) > 0)
            {
                const time = (date.getTime() - joinedAt) || 0;

                if (!player.dispatcherStats) player.dispatcherStats = {};

                if (player.dispatcherStats[ station.Name ] && isTruthyAndGreaterThanZero(player.dispatcherStats[ station.Name ].time + time))
                {
                    player.dispatcherStats[ station.Name ].time = player.dispatcherStats[ station.Name ].time + time;
                }
                else
                {
                    player.dispatcherStats[ station.Name ] = {
                        time,
                    };
                }

                if (isTruthyAndGreaterThanZero(player.dispatcherTime + time)) player.dispatcherTime = player.dispatcherTime + time;

                player.steamTrainDistance = stats?.stats?.find(x => x.name === "DISTANCE_M")?.value ?? 0;
                player.steamDispatcherTime = stats?.stats?.find(x => x.name === "DISPATCHER_TIME")?.value ?? 0;
                player.steamTrainScore = stats?.stats?.find(x => x.name === "SCORE")?.value ?? 0;

                player.flags = player.flags.filter(x => x !== "private");
            }

            const playerData = await PlayerUtil.getPlayerSteamData(player.id);

            !stats && !player.flags.includes('private') && player.flags.push("private");

            player.flags = [...new Set(player.flags)];

            player.username = playerData?.personaname ?? player.username;
            player.avatar = playerData?.avatarfull ?? player.avatar;

            await MProfile.updateOne({ id: player.id }, player);

            await MStationLog.create({
                id: v4(),

                steam: player.id,
                username: player.username,

                joinedDate: joinedAt,
                leftDate: date.getTime(),
                stationName: station.Name,
                stationShort: station.Prefix,
                server: server.ServerCode,

                player: player._id,

            });
        });
    }
}