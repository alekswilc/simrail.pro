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
import { ILog, MLog } from "../../mongo/logs.js";
import dayjs from "dayjs";
import { msToTime } from "../../util/time.js";
import { PipelineStage } from "mongoose";
import { MBlacklist } from "../../mongo/blacklist.js";
import { SteamUtil } from "../../util/SteamUtil.js";
import { GitUtil } from "../../util/git.js";
import { removeProperties } from "../../util/functions.js";
import { SuccessResponseBuilder } from "../responseBuilder.js";
import { MProfile } from "../../mongo/profile.js";

const generateSearch = (regex: RegExp) => [
    {
        stationName: { $regex: regex },
    },
    {
        userUsername: { $regex: regex },
    },
    {
        stationShort: { $regex: regex },
    },
    {
        userSteamId: { $regex: regex },
    },
    {
        server: { $regex: regex },
    },
];

export class StationsRoute
{
    static load()
    {
        const app = Router();

        app.get("/", async (req, res) =>
        {
            const s = req.query.q?.toString().split(",").map(x => new RegExp(x, "i"));
            const profiles = await MProfile.find({ verified: true });
            const filter: PipelineStage[] = [];


            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) })),
                    ],
                },
            });


            const records = await MLog.aggregate(filter)
                .sort({ leftDate: -1 })
                .limit(30);

            res.json(
                new SuccessResponseBuilder<{ records: Omit<ILog, "_id" | "__v">[] }>()
                    .setCode(200)
                    .setData({ records: records.map(x => {
                        return {
                            ...removeProperties<Omit<ILog, "_id" | "__v">>(x, [ "_id", "__v" ]),
                            verified: profiles.find(xx => xx.steam === x.userSteamId)
                        }
                    }) })
                    .toJSON(),
            );
        });

        return app;
    }
}