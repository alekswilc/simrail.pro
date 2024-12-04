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
import { PipelineStage } from "mongoose";
import { IProfile, MProfile } from "../../mongo/profile.js";
import { SuccessResponseBuilder } from "../responseBuilder.js";
import { escapeRegexString, removeProperties } from "../../util/functions.js";

const generateSearch = (regex: RegExp) => [
    {
        id: { $regex: regex },
    },
    {
        username: { $regex: regex },
    },
];

const sortyByMap: Record<string, any> = {
    time: { trainTime: -1 },
    points: { trainPoints: -1 },
    distance: { trainDistance: -1 },
}

export class LeaderboardRoute
{
    static load()
    {
        const app = Router();

        app.get("/train", async (req, res) =>
        {
            const s = req.query.q?.toString().split(",").map(x => new RegExp(escapeRegexString(x), "i"));

            const filter: PipelineStage[] = [
                {
                    $match: {
                        flags: { $nin: ["hidden"] }
                    }
                }
            ];

            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) })),
                    ],
                },
            });

            const sortBy = sortyByMap[req.query.s?.toString() ?? 'distance'] ?? sortyByMap.distance;

            const records = await MProfile.aggregate(filter)
                .sort(sortBy)
                .limit(10);

            res.json(
                new SuccessResponseBuilder<{ records: Omit<IProfile, "_id" | "__v">[] }>()
                    .setCode(200)
                    .setData({ records: records.map(x => removeProperties<Omit<IProfile, "_id" | "__v">>(x, [ "_id", "__v" ])) })
                    .toJSON(),
            );
        });


        app.get("/station", async (req, res) =>
        {
            const s = req.query.q?.toString().split(",").map(x => new RegExp(escapeRegexString(x), "i"));

            const filter: PipelineStage[] = [
                {
                    $match: {
                        flags: { $nin: ["hidden"] }
                    }
                }
            ];
            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) })),
                    ],
                },
            });

            const records = await MProfile.aggregate(filter)
                .sort({ dispatcherTime: -1 })
                .limit(10);

            res.json(
                new SuccessResponseBuilder<{ records: Omit<IProfile, "_id" | "__v">[] }>()
                    .setCode(200)
                    .setData({ records: records.map(x => removeProperties<Omit<IProfile, "_id" | "__v">>(x, [ "_id", "__v" ])) })
                    .toJSON(),
            );
        });

        return app;
    }
}