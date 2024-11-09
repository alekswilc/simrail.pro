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
import { MLog } from "../mongo/logs.js";
import { IPlayer } from "../types/player.js";
import { SimrailClientEvents } from "../util/SimrailClient.js";
import { v4 } from "uuid";
import { MProfile } from "../mongo/profile.js";
import { SteamUtil } from "../util/SteamUtil.js";

export class StationsModule
{
    public static load()
    {

        client.on(SimrailClientEvents.StationLeft, async (server: Server, station: Station, player: IPlayer, joinedAt: number) =>
        {
            const stats = await SteamUtil.getPlayerStats(player.steamid);
            const date = new Date();
            if (stats)
            {
                const time = (date.getTime() - joinedAt) || 0;

                const userProfile = await MProfile.findOne({ steam: player.steamid }) ?? await MProfile.create({ steam: player.steamid, id: v4(), steamName: player.personaname });
                if (!userProfile.dispatcherStats)
                {
                    userProfile.dispatcherStats = {};
                }

                if (userProfile.dispatcherStats[ station.Name ])
                {
                    userProfile.dispatcherStats[ station.Name ].time = userProfile.dispatcherStats[ station.Name ].time + time;
                }
                else
                {
                    userProfile.dispatcherStats[ station.Name ] = {
                        time,
                    };
                }

                if (Number.isNaN(userProfile.dispatcherStats[ station.Name ].time))
                {
                    userProfile.dispatcherStats[ station.Name ].time = 0;
                }

                if (!userProfile.dispatcherTime)
                {
                    userProfile.dispatcherTime = 0;
                }

                userProfile.dispatcherTime = userProfile.dispatcherTime + time;

                await MProfile.findOneAndUpdate({ id: userProfile.id }, { dispatcherStats: userProfile.dispatcherStats, dispatcherTime: userProfile.dispatcherTime });
            }

            await MLog.create({
                id: v4(),
                userSteamId: player.steamid,
                userAvatar: player.avatarfull,
                userUsername: player.personaname,
                joinedDate: joinedAt,
                leftDate: date.getTime(),
                stationName: station.Name,
                stationShort: station.Prefix,
                server: server.ServerCode,
            });
        });
    }
}