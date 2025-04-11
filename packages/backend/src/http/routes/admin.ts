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
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../responseBuilder.js";
import { MAdmin } from "../../mongo/admin.js";
import { MProfile } from "../../mongo/profile.js";
import { PlayerUtil } from "../../util/PlayerUtil.js";
import { getVehicle } from "../../util/contants.js";
import { isTruthyAndGreaterThanZero } from "../../util/functions.js";

export class AdminRoute
{
    static load()
    {
        const app = Router();

        app.get("/auth", async (req, res) =>
        {
            const token = req.query.token;

            if (!token)
            {
                res.status(400).json(new ErrorResponseBuilder()
                    .setCode(400)
                    .setData("Missing token query").toJSON());
                return;
            }

            const data = await MAdmin.findOne({ token });

            if (!data)
            {
                res.status(401).json(new ErrorResponseBuilder()
                    .setCode(401)
                    .setData("Invalid token").toJSON());
                return;
            }


            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({
                        isAdmin: true,
                        username: data.username,
                    })
                    .toJSON(),
            );
        });

        app.post("/profile/:playerId/hideLeaderboard", async (req, res) =>
        {
            const token = req.headers[ "x-auth-token" ];

            if (!token)
            {
                res.status(400).json(new ErrorResponseBuilder()
                    .setCode(400)
                    .setData("Missing token query").toJSON());
                return;
            }

            const admin = await MAdmin.findOne({ token });

            if (!admin)
            {
                res.status(401).json(new ErrorResponseBuilder()
                    .setCode(401)
                    .setData("Invalid token").toJSON());
                return;
            }

            const player = await MProfile.findOne({
                id: req.params.playerId,
            });

            if (!player)
            {
                res.status(401).json(new ErrorResponseBuilder()
                    .setCode(401)
                    .setData("Invalid playerId").toJSON());
                return;
            }

            player.flags.push("leaderboard_hidden");

            await MProfile.updateOne({ id: player.id }, {
                flags: player.flags,
            });

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({})
                    .toJSON(),
            );
        });

        app.post("/profile/:playerId/showLeaderboard", async (req, res) =>
        {
            const token = req.headers[ "x-auth-token" ];

            if (!token)
            {
                res.status(400).json(new ErrorResponseBuilder()
                    .setCode(400)
                    .setData("Missing token query").toJSON());
                return;
            }

            const admin = await MAdmin.findOne({ token });

            if (!admin)
            {
                res.status(401).json(new ErrorResponseBuilder()
                    .setCode(401)
                    .setData("Invalid token").toJSON());
                return;
            }

            const player = await MProfile.findOne({
                id: req.params.playerId,
            });

            if (!player)
            {
                res.status(401).json(new ErrorResponseBuilder()
                    .setCode(401)
                    .setData("Invalid playerId").toJSON());
                return;
            }

            player.flags = player.flags.filter(x => x !== "leaderboard_hidden");

            await MProfile.updateOne({ id: player.id }, {
                flags: player.flags,
            });

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({})
                    .toJSON(),
            );
        });

        app.post("/profile/:playerId/hide", async (req, res) =>
        {
            const token = req.headers[ "x-auth-token" ];

            if (!token)
            {
                res.status(400).json(new ErrorResponseBuilder()
                    .setCode(400)
                    .setData("Missing token").toJSON());
                return;
            }

            const admin = await MAdmin.findOne({ token });

            if (!admin)
            {
                res.status(401).json(new ErrorResponseBuilder()
                    .setCode(401)
                    .setData("Invalid token").toJSON());
                return;
            }

            const player = await MProfile.findOne({
                id: req.params.playerId,
            });

            if (!player)
            {
                res.status(401).json(new ErrorResponseBuilder()
                    .setCode(401)
                    .setData("Invalid playerId").toJSON());
                return;
            }

            player.flags.push("hidden");

            await MProfile.updateOne({ id: player.id }, {
                flags: player.flags,
            });

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({})
                    .toJSON(),
            );
        });


        app.post("/profile/:playerId/forceUpdate", async (req, res) =>
        {
            const token = req.headers[ "x-auth-token" ];

            if (!token)
            {
                res.status(400).json(new ErrorResponseBuilder()
                    .setCode(400)
                    .setData("Missing token").toJSON());
                return;
            }

            const admin = await MAdmin.findOne({ token });

            if (!admin)
            {
                res.status(401).json(new ErrorResponseBuilder()
                    .setCode(401)
                    .setData("Invalid token").toJSON());
                return;
            }

            const player = await MProfile.findOne({
                id: req.params.playerId,
            });

            if (!player)
            {
                res.status(401).json(new ErrorResponseBuilder()
                    .setCode(401)
                    .setData("Invalid playerId").toJSON());
                return;
            }

            const stats = await PlayerUtil.getPlayerStats(player.id);

            if (!stats)
            {
                res.status(401).json(new ErrorResponseBuilder()
                    .setCode(401)
                    .setData("Invalid playerId (2)").toJSON());
                return;
            }

            player.steamTrainDistance = stats?.stats?.find(x => x.name === "DISTANCE_M")?.value ?? 0;
            player.steamDispatcherTime = stats?.stats?.find(x => x.name === "DISPATCHER_TIME")?.value ?? 0;
            player.steamTrainScore = stats?.stats?.find(x => x.name === "SCORE")?.value ?? 0;


            if (player.steamTrainDistance > player.trainDistance)
            {
                player.trainDistance = player.steamTrainDistance;
            }
            if (player.steamTrainScore > player.trainPoints)
            {
                player.trainPoints = player.steamTrainScore;
            }

            const sum = Object.keys(player.trainStats).filter(x => x !== "N/A").map(x => player.trainStats[ x ]).reduce((acc, obj) =>
            {
                acc.time += obj.time;
                acc.distance += obj.distance;
                acc.score += obj.score;
                return acc;
            }, { time: 0, distance: 0, score: 0 });


            player.trainStats[ "N/A" ] = {
                time: 0,
                distance: player.trainDistance - sum.distance,
                score: player.trainPoints - sum.score,
            };


            if (typeof player.createdAt !== "number")
            {
                player.createdAt = new Date(parseInt(player._id.toString().substring(0, 8), 16) * 1000).getTime();
            }

            const playerData = await PlayerUtil.getPlayerSteamData(player.id);

            player.username = playerData?.personaname ?? player.username;
            player.avatar = playerData?.avatarfull ?? player.avatar;

            await MProfile.updateOne({ id: player.id }, player);

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({})
                    .toJSON(),
            );
        });

        return app;
    }
}