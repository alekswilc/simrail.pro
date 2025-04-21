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

export class ApiModule
{
    public static load()
    {
        const app = express();
        app.use(cors());

        const router = Router();
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