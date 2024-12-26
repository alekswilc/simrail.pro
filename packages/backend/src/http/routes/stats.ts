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
import { GitUtil } from "../../util/git.js";
import { SuccessResponseBuilder } from "../responseBuilder.js";
import { MStationLog } from "../../mongo/stationLog.js";
import { MProfile } from "../../mongo/profile.js";

export class StatsRoute
{
    static load()
    {
        const app = Router();

        app.get("/", async (req, res) =>
        {
            const { commit, version } = GitUtil.getData();

            const trains = await MTrainLog.countDocuments();
            const dispatchers = await MStationLog.countDocuments();
            const profiles = await MProfile.countDocuments();

            res.json(
                new SuccessResponseBuilder<{
                    git: { commit?: string, version?: string },
                    stats: { trains: number, dispatchers: number, profiles: number }
                }>()
                    .setCode(200)
                    .setData({ git: { commit, version }, stats: { trains, dispatchers, profiles } })
                    .toJSON(),
            );
        });

        return app;
    }
}