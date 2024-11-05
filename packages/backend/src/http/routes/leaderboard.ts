import { Router } from "express";
import { PipelineStage } from "mongoose";
import { IProfile, MProfile, raw_schema } from "../../mongo/profile.js";
import { SuccessResponseBuilder } from "../responseBuilder.js";
import { removeProperties } from "../../util/functions.js";

const generateSearch = (regex: RegExp) => [
    {
        steam: { $regex: regex },
    },
    {
        steamName: { $regex: regex },
    },
];

export class LeaderboardRoute
{
    static load()
    {
        const app = Router();

        app.get("/train", async (req, res) =>
        {
            const s = req.query.q?.toString().split(",").map(x => new RegExp(x, "i"));

            const filter: PipelineStage[] = [];

            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) })),
                    ],
                },
            });

            const records = await MProfile.aggregate(filter)
                .sort({ trainPoints: -1 })
                .limit(10);

            res.json(
                new SuccessResponseBuilder<{ records: Omit<IProfile, "_id" | "__v">[] }>()
                    .setCode(200)
                    .setData({ records: records.map(x => removeProperties<Omit<IProfile, "_id" | "__v">>(x, [ "_id", "__v" ])) })
                    .toJSON(),
            );
        });


        app.get("/station", async (req, res) =>
        {
            const s = req.query.q?.toString().split(",").map(x => new RegExp(x, "i"));

            const filter: PipelineStage[] = [];
            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) })),
                    ],
                },
            });

            const records = await MProfile.aggregate(filter)
                .sort({ dispatcherTime: -1 })
                .limit(10);

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