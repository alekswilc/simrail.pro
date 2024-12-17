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

import { IPlayerPayload, IPlayerStatsPayload } from "../types/player.js";
import { MProfile } from "../mongo/profile.js";
import { assert } from "node:console";

const STEAM_API_KEY = process.env.STEAM_APIKEY;

const steamFetch = (url: string) =>
{
    let retries = 0;

    return new Promise((res, _rej) =>
    {
        const req = () =>
        {

            fetch(url, { signal: AbortSignal.timeout(10000) }).then(x => x.json())
                .then(x => res(x))
                .catch(() =>
                {
                    console.log("STEAM request failed! ", url.replace(STEAM_API_KEY!, "[XXX]"), retries);

                    retries++;
                    setTimeout(() => req(), retries * 1000);
                });
        };
        req();
    });
};


export class PlayerUtil
{
    public static async ensurePlayer(steamId: number | string)
    {
        assert(steamId, "expected steamId to be a string or a number");
        steamId = steamId.toString();
        let player = await MProfile.findOne({ id: steamId });

        if (!player)
        {
            const data = await steamFetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${ STEAM_API_KEY }&format=json&steamids=${ steamId }`) as IPlayerPayload;

            assert(data.response.players, "Expected data.response.players to be truthy");

            const stats = await this.getPlayerStats(steamId);

            player = await MProfile.findOne({ id: steamId });
            if (player)
            {
                return player;
            }

            const trainStats: {
                [ trainName: string ]: {
                    score: number,
                    distance: number
                    time: number,
                }
            } = {};
            const dispatcherStats: {
                [ name: string ]: {
                    time: number
                }
            } = {};

            let trainPoints = 0;
            let trainDistance = 0;
            let dispatcherTime = 0;

            if (stats)
            {
                trainStats[ "N/A" ] = {
                    score: stats?.stats?.find(x => x.name === "SCORE")?.value ?? 0,
                    distance: stats?.stats?.find(x => x.name === "DISTANCE_M")?.value ?? 0,
                    time: 0,
                };

                dispatcherStats[ "N/A" ] = {
                    time: (stats?.stats?.find(x => x.name === "DISPATCHER_TIME")?.value ?? 0) * 1000 * 60,
                };

                trainPoints = stats?.stats?.find(x => x.name === "SCORE")?.value ?? 0;
                trainDistance = stats?.stats?.find(x => x.name === "DISTANCE_M")?.value ?? 0;
                dispatcherTime = (stats?.stats?.find(x => x.name === "DISPATCHER_TIME")?.value ?? 0) * 1000 * 60;
            }

            player = await MProfile.create({
                id: steamId,
                username: data.response.players[ 0 ].personaname,
                avatar: data.response.players[ 0 ].avatarfull,

                steamDispatcherTime: stats?.stats?.find(x => x.name === "DISPATCHER_TIME")?.value ?? 0,
                steamTrainScore: stats?.stats?.find(x => x.name === "SCORE")?.value ?? 0,
                steamTrainDistance: stats?.stats?.find(x => x.name === "DISTANCE_M")?.value ?? 0,

                trainStats,
                dispatcherStats,

                trainPoints,
                trainDistance,
                trainTime: 0,

                dispatcherTime,

                flags: !stats ? [ "private" ] : [],

                createdAt: Date.now(),
            }).catch(e => e);

            if (player instanceof Error)
            {
                player = await MProfile.findOne({ id: steamId });
            }

        }

        assert(player, "expected player to be truthy");

        return player;
    }

    public static async getPlayer(steamId: string)
    {
        const player = await MProfile.findOne({ id: steamId });

        if (!player)
        {
            return undefined;
        }

        return player;
    }

    public static async getPlayerSteamData(steamId: string)
    {
        const data = await steamFetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${ STEAM_API_KEY }&format=json&steamids=${ steamId }`) as IPlayerPayload;

        if (!data?.response?.players?.length)
        {
            return undefined;
        }

        return data.response.players[ 0 ];
    }

    public static async getPlayerStats(steamId: string)
    {
        const data = await steamFetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=1422130&key=${ STEAM_API_KEY }&steamid=${ steamId }`) as IPlayerStatsPayload;

        if (!data.playerstats?.stats)
        {
            return undefined;
        }
        return data.playerstats;
    }
}