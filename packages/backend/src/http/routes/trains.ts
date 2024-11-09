import { Router } from "express";
import dayjs from "dayjs";
import { msToTime } from "../../util/time.js";
import { PipelineStage } from "mongoose";
import { ITrainLog, MTrainLog, raw_schema } from "../../mongo/trainLogs.js";
import { MBlacklist } from "../../mongo/blacklist.js";
import { SteamUtil } from "../../util/SteamUtil.js";
import { GitUtil } from "../../util/git.js";
import { SuccessResponseBuilder } from "../responseBuilder.js";
import { removeProperties } from "../../util/functions.js";
import { MProfile } from "../../mongo/profile.js";

const generateSearch = (regex: RegExp) => [
    {
        trainNumber: { $regex: regex },
    },
    {
        userSteamId: { $regex: regex },
    },
    {
        server: { $regex: regex },
    },
    {
        userUsername: { $regex: regex },
    },
];

export class TrainsRoute
{
    static load()
    {
        const app = Router();

        app.get("/", async (req, res) =>
        {
            const s = req.query.q?.toString().split(",").map(x => new RegExp(x, "i"));
            const profiles = await MProfile.find({ verified: true });

            const filter: PipelineStage[] = [];


            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) })),
                    ],
                },
            });

            const records = await MTrainLog.aggregate(filter)
                .sort({ leftDate: -1 })
                .limit(30);


            res.json(
                new SuccessResponseBuilder<{ records: Omit<ITrainLog, "_id" | "__v">[] }>()
                    .setCode(200)
                    .setData({
                        records: records.map(x =>
                        {
                            return {
                                ...removeProperties<Omit<ITrainLog, "_id" | "__v">>(x, [ "_id", "__v" ]),
                                verified: profiles.find(xx => xx.steam === x.userSteamId)
                            };
                        }),
                    })
                    .toJSON(),
            );
        });

        return app;
    }
}