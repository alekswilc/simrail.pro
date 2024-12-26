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
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../responseBuilder.js";
import { escapeRegexString } from "../../util/functions.js";
import { IProfile, MProfile } from "../../mongo/profile.js";
import { generateUrl } from "../../util/imgproxy.js";

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
            const s = req.query.query?.toString().split(",").map(x => new RegExp(escapeRegexString(x), "i"));
            const server = req.query.server?.toString();

            const filter: PipelineStage[] = [];

            const limit = parseInt(req.query.limit as string) || 12;
            const page = parseInt(req.query.page as string) || 1;

            if (page < 0 || limit < 0)
            {
                res.status(400).json(new ErrorResponseBuilder()
                    .setCode(400).setData("Invalid page and/or limit"));
                return;
            }

            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) })),
                    ],
                },
            });

            server && filter.push({
                $match: {
                    server: {
                        $regex: new RegExp(escapeRegexString(server), "i"),
                    },
                },
            });

            filter.push({
                $sort: {
                    leftDate: -1,
                },
            });

            filter.push({
                $facet: {
                    data: [
                        { $match: {} },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                    count: [
                        { $count: "count" },
                    ],
                },
            });

            const records = await MTrainLog.aggregate(filter);

            await MProfile.populate(records, { path: "data.player" });

            process.env.IMGPROXY_KEY && records[ 0 ].data && records[ 0 ].data.forEach((p: ITrainLog & {
                player: IProfile
            }) =>
            {
                if (p.player.avatar.includes("imgproxy.alekswilc.dev"))
                {
                    return;
                }
                p.player.avatar = generateUrl(p.player.avatar);
            });

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({
                        records: records[ 0 ].data,
                        pages: Math.floor((records[ 0 ]?.count?.[ 0 ]?.count ?? 0) / limit),
                        servers: Object.keys(client.stations),
                    })
                    .toJSON(),
            );
        });

        return app;
    }
}