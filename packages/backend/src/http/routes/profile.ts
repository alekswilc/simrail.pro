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
import { escapeRegexString, removeProperties } from "../../util/functions.js";

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

            const records = await MProfile.aggregate(filter)
                .limit(50);

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