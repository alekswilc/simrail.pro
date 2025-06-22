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

import express, { Router } from "express";
import { StationsRoute } from "./routes/stations.js";
import { TrainsRoute } from "./routes/trains.js";
import { ProfilesRoute } from "./routes/profile.js";
import { LeaderboardRoute } from "./routes/leaderboard.js";
import cors from "cors";
import { StatsRoute } from "./routes/stats.js";
import { LogRoute } from "./routes/log.js";
import { ActivePlayersRoute } from "./routes/activePlayer.js";
import { AdminRoute } from "./routes/admin.js";
import { ImagesRoute } from './routes/images.js';
import { ErrorResponseBuilder } from "./responseBuilder.js";

export class ApiModule {
    public static load() {
        const app = express();
        app.use(cors());

        const router = Router();
        
        // fix some unwanted behavior
        // see https://nodejs.org/api/querystring.html#querystringparsestr-sep-eq-options
        router.use((req, res, next) => {
            const queryString = req.url.split('?')[1];
            if (!queryString) return next();
            const seen = new Set();

            for (const pair of queryString.split('&')) {
                const [key] = pair.split('=');
                const decodedKey = decodeURIComponent(key);
                if (seen.has(decodedKey)) {
                    res.status(400).json(
                        new ErrorResponseBuilder()
                            .setCode(400)
                            .setData("Duplicate query found.")
                            .toJSON()
                    );
                    return;
                }
                seen.add(decodedKey);
            }

            next();
        });

        router.use("/stations/", StationsRoute.load());
        router.use("/trains/", TrainsRoute.load());
        router.use("/profiles/", ProfilesRoute.load());
        router.use("/leaderboard/", LeaderboardRoute.load());
        router.use("/active/", ActivePlayersRoute.load());
        router.use("/admin/", AdminRoute.load());
        router.use("/images/", ImagesRoute.load());


        router.use("/stats/", StatsRoute.load());
        router.use("/log/", LogRoute.load());

        app.use("/api/v1", router);

        app.listen(process.env.PORT);
    }
}