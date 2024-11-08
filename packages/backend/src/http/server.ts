import express, { Router } from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { StationsRoute } from "./routes/stations.js";
import { TrainsRoute } from "./routes/trains.js";
import { ProfilesRoute } from "./routes/profile.js";
import { LeaderboardRoute } from "./routes/leaderboard.js";
import cors from "cors";
import { StatsRoute } from "./routes/stats.js";
import { LogRoute } from "./routes/log.js";

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
        router.use("/stats/", StatsRoute.load());
        router.use("/log/", LogRoute.load());

        app.use("/api/v1", router);

        app.listen(2005);
    }
}