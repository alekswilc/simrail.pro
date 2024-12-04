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
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../responseBuilder.js";
import { MAdmin } from "../../mongo/admin.js";
import { MProfile } from "../../mongo/profile.js";

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

        app.post("/profile/:playerId/clear", async (req, res) =>
        {
            const token = req.headers["x-auth-token"];

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

            await MProfile.updateOne({id: player.id}, {
                dispatcherTime: 0,
                trainTime: 0,
                trainDistance: 0,

                trainStats: {},
                dispatcherStats: {},
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
            const token = req.headers["x-auth-token"];

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

            await MProfile.updateOne({id: player.id}, {
                flags: player.flags,
            });

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