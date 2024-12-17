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
import { ITrainLog, MTrainLog } from "../../mongo/trainLog.js";
import { SuccessResponseBuilder } from "../responseBuilder.js";
import { escapeRegexString } from "../../util/functions.js";
import { MProfile } from "../../mongo/profile.js";

const generateSearch = (regex: RegExp) => [
    {
        trainNumber: { $regex: regex },
    },
    {
        username: { $regex: regex },
    },
    {
        server: { $regex: regex },
    },
    {
        steam: { $regex: regex },
    },
];

export class TrainsRoute
{
    static load()
    {
        const app = Router();

        app.get("/", async (req, res) =>
        {
            const s = req.query.q?.toString().split(",").map(x => new RegExp(escapeRegexString(x), "i"));

            const filter: PipelineStage[] = [];


            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) })),
                    ],
                },
            });

            const records = await MTrainLog.aggregate(filter)
                .sort({ leftDate: -1 })
                .limit(30);

            await MProfile.populate(records, { path: "player" });

            res.json(
                new SuccessResponseBuilder<{ records: ITrainLog[] }>()
                    .setCode(200)
                    .setData({
                        records,
                    })
                    .toJSON(),
            );
        });

        return app;
    }
}