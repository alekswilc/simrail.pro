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
import { PlayerUtil } from "../../util/PlayerUtil.js";

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

            if (player.flags.includes('hidden'))
            {
                res.status(403).json(new ErrorResponseBuilder()
                    .setCode(403).setData("Profile blocked!"));
                return;
            }

            if (player.flags.includes('private'))
            {
                res.status(404).json(new ErrorResponseBuilder()
                    .setCode(404).setData("Profile is private!"));
                return;
            }

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({
                        player
                    })
                    .toJSON(),
            );
        });

        return app;
    }
}