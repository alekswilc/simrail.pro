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
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../responseBuilder.js";
import { PlayerUtil } from "../../util/PlayerUtil.js";
import { IProfile, MProfile } from "../../mongo/profile.js";
import { escapeRegexString } from "../../util/functions.js";
import { generateUrl } from "../../util/imgproxy.js";

const generateSearch = (regex: RegExp) => [
    {
        id: { $regex: regex },
    },
    {
        username: { $regex: regex },
    },
];

type ActiveTrain = {
    type: "train"
    trainNumber: string
    trainName: string
    server: string
}

type ActiveStation = {
    type: "station",
    stationName: string
    stationShort: string
    server: string
}

export class ProfilesRoute
{
    static load()
    {
        const app = Router();

        app.get("/:id", async (req, res) =>
        {
            if (!req.params.id)
            {
                res.redirect("/");
                return;
            }

            const player = await PlayerUtil.getPlayer(req.params.id);
            if (!player)
            {
                res.status(404).json(new ErrorResponseBuilder()
                    .setCode(404).setData("Profile not found!"));
                return;
            }

            if (player.flags.includes("hidden"))
            {
                res.status(403).json(new ErrorResponseBuilder()
                    .setCode(403).setData("Profile blocked!"));
                return;
            }

            if (player.flags.includes("private"))
            {
                res.status(404).json(new ErrorResponseBuilder()
                    .setCode(404).setData("Profile is private!"));
                return;
            }

            let active: ActiveStation | ActiveTrain = undefined!;

            for (const x of Object.keys(client.trains))
            {
                const data = client.trains[ x ].find(x => x.TrainData.ControlledBySteamID === player.id);
                if (data)
                {
                    active = {
                        type: "train",
                        trainNumber: data.TrainNoLocal,
                        trainName: data.TrainName,
                        server: x,
                    };
                }
            }

            for (const x of Object.keys(client.stations))
            {
                const data = client.stations[ x ].find(x => x.DispatchedBy[ 0 ]?.SteamId === player.id);
                if (data)
                {
                    active = {
                        type: "station",
                        stationName: data.Name,
                        stationShort: data.Prefix,
                        server: x,
                    };
                }
            }


            if (process.env.IMGPROXY_KEY)
            {
                player.avatar = generateUrl(player.avatar);
            }

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({
                        player,
                        active,

                    })
                    .toJSON(),
            );
        });

        app.get("/", async (req, res) =>
        {
            const s = req.query.q?.toString().split(",").map(x => new RegExp(escapeRegexString(x), "i"));

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
                        flags: { $nin: [ "hidden" ] },
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
                        records: records[ 0 ].data,
                        pages: Math.floor((records[ 0 ]?.count?.[ 0 ]?.count ?? 0) / limit),
                    })
                    .toJSON(),
            );
        });

        return app;
    }
}