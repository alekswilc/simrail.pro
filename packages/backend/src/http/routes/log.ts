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
import { MTrainLog } from "../../mongo/trainLog.js";
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../responseBuilder.js";
import { MStationLog } from "../../mongo/stationLog.js";
import { IProfile } from "../../mongo/profile.js";
import { generateUrl } from "../../util/imgproxy.js";


export class LogRoute
{
    static load()
    {
        const app = Router();

        app.get("/:id", async (req, res) =>
        {
            const { id } = req.params;
            if (!id)
            {
                res.status(400).json(new ErrorResponseBuilder()
                    .setCode(400)
                    .setData("Missing Id parameter").toJSON());
                return;
            }

            const log = await MStationLog.findOne({ id }).populate<{
                player: IProfile
            }>("player").orFail().catch(() => null) || await MTrainLog.findOne({
                id,
            }).populate<{ player: IProfile }>("player").orFail().catch(() => null);

            if (!log)
            {
                res.status(404).json(new ErrorResponseBuilder()
                    .setCode(404)
                    .setData("Invalid Id parameter").toJSON());
                return;
            }

            if (log.player.flags.includes("hidden"))
            {
                res.status(403).json(new ErrorResponseBuilder()
                    .setCode(403)
                    .setData("Log blocked!").toJSON());
                return;
            }


            if (process.env.IMGPROXY_KEY)
            {
                log.player.avatar = generateUrl(log.player.avatar);
            }

            res.status(200).json(new SuccessResponseBuilder().setCode(200).setData(log.toJSON()));
        });

        return app;
    }
}