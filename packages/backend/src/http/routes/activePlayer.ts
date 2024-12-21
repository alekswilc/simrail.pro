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

import { Router } from "express";
import { TMProfile } from "../../mongo/profile.js";
import { SuccessResponseBuilder } from "../responseBuilder.js";
import { escapeRegexString, arrayGroupBy } from "../../util/functions.js";
import { PlayerUtil } from "../../util/PlayerUtil.js";

interface ActiveTrain
{
    server: string;
    player: TMProfile;
    trainNumber: string;
    trainName: string;
    username: string;
    steam: string;
}

interface ActiveStation
{
    server: string;
    player: TMProfile;
    stationName: string;
    stationShort: string;
    username: string;
    steam: string;
}

export class ActivePlayersRoute
{
    static load()
    {
        const app = Router();

        app.get("/train", async (req, res) =>
        {
            const s = req.query.q?.toString().split(",").map(x => new RegExp(escapeRegexString(x), "i"));

            let a: ActiveTrain[] = [];

            for (const data of Object.values(client.trains))
            {
                for (const d of data.filter(d => d.TrainData.ControlledBySteamID))
                {
                    const p = await PlayerUtil.getPlayer(d.TrainData.ControlledBySteamID!);
                    p && a.push({
                        server: d.ServerCode,
                        player: p,
                        trainNumber: d.TrainNoLocal,
                        trainName: d.TrainName,

                        username: p?.username,
                        steam: p?.id,
                    });
                }
            }

            if (s)
            {
                a = a.filter(d => s.filter(c => c.test(d.server) || c.test(d.username) || c.test(d.steam) || c.test(d.steam) || c.test(d.trainName) || c.test(d.trainNumber)).length === s.length);
            }

            a = arrayGroupBy(a, d => d.server);

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({ records: a })
                    .toJSON(),
            );
        });


        app.get("/station", async (req, res) =>
        {
            const s = req.query.q?.toString().split(",").map(x => new RegExp(escapeRegexString(x), "i"));

            let a: ActiveStation[] = [];

            for (const server of Object.keys(client.stations))
            {
                for (const d of client.stations[ server ].filter(d => d.DispatchedBy.length && d.DispatchedBy[ 0 ]?.SteamId))
                {
                    // todo: optimize
                    const p = await PlayerUtil.getPlayer(d.DispatchedBy[ 0 ].SteamId!);
                    p && a.push({
                        server: server,
                        player: p,
                        stationName: d.Name,
                        stationShort: d.Prefix,

                        username: p?.username,
                        steam: p?.id,
                    });
                }
            }

            if (s)
            {
                a = a.filter(d => s.filter(c => c.test(d.server) || c.test(d.username) || c.test(d.steam) || c.test(d.steam) || c.test(d.stationName) || c.test(d.stationShort)).length === s.length);
            }


            a = arrayGroupBy(a, d => d.server);

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({ records: a })
                    .toJSON(),
            );
        });

        return app;
    }
}