/*
 * Copyright (C) 2025 Aleksander <alekswilc> Wilczyński (aleks@alekswilc.dev)
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
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../responseBuilder.js";
import { escapeRegexString, removeProperties } from "../../util/functions.js";
import { generateUrl } from "../../util/imgproxy.js";

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
};

export class LeaderboardRoute
{
    static load()
    {
        const app = Router();

        app.get("/train", async (req, res) =>
        {
            const s = req.query.query?.toString().split(",").map(x => new RegExp(escapeRegexString(x), "i"));

            const limit = parseInt(req.query.limit as string) || 12;
            const page = parseInt(req.query.page as string) || 1;

            if (page < 0 || limit < 0)
            {
                res.status(400).json(new ErrorResponseBuilder()
                    .setCode(400).setData("Invalid page and/or limit"));
                return;
            }

            const filter: PipelineStage[] = [
                {
                    $match: {
                        flags: { $nin: [ "hidden", "leaderboard_hidden" ] },
                    },
                },
            ];

            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) })),
                    ],
                },
            });

            const sortBy = sortyByMap[ req.query.sort_by?.toString() ?? "distance" ] ?? sortyByMap.distance;

            filter.push({
                $sort: sortBy,
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

            const records = await MProfile.aggregate(filter);


            process.env.IMGPROXY_KEY && records[ 0 ].data && records[ 0 ].data.forEach((p: IProfile) =>
            {
                if (p.avatar.includes("imgproxy.alekswilc.dev"))
                {
                    return;
                }
                p.avatar = generateUrl(p.avatar);
            });

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({
                        records: records[ 0 ].data.map((x: IProfile) => removeProperties<Omit<IProfile, "_id" | "__v">>(x, [ "_id", "__v" ])),
                        pages: Math.floor((records[ 0 ]?.count?.[ 0 ]?.count ?? 0) / limit),
                    })
                    .toJSON(),
            );
        });

        app.get("/station", async (req, res) =>
        {
            const s = req.query.query?.toString().split(",").map(x => new RegExp(escapeRegexString(x), "i"));

            const limit = parseInt(req.query.limit as string) || 12;
            const page = parseInt(req.query.page as string) || 1;

            if (page < 0 || limit < 0)
            {
                res.status(400).json(new ErrorResponseBuilder()
                    .setCode(400).setData("Invalid page and/or limit"));
                return;
            }

            const filter: PipelineStage[] = [
                {
                    $match: {
                        flags: { $nin: [ "hidden", "leaderboard_hidden" ] },
                    },
                },
            ];
            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) })),
                    ],
                },
            });

            filter.push({
                $sort: {
                    dispatcherTime: -1,
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

            const records = await MProfile.aggregate(filter);

            process.env.IMGPROXY_KEY && records[ 0 ].data && records[ 0 ].data.forEach((p: IProfile) =>
            {
                if (p.avatar.includes("imgproxy.alekswilc.dev"))
                {
                    return;
                }
                p.avatar = generateUrl(p.avatar);
            });

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({
                        records: records[ 0 ].data.map((x: IProfile) => removeProperties<Omit<IProfile, "_id" | "__v">>(x, [ "_id", "__v" ])),
                        pages: Math.floor((records[ 0 ]?.count?.[ 0 ]?.count ?? 0) / limit),
                    })
                    .toJSON(),
            );
        });

        return app;
    }
}