import { Router } from "express";
import { ILog, MLog } from "../../mongo/logs.js";
import dayjs from "dayjs";
import { msToTime } from "../../util/time.js";
import { PipelineStage } from "mongoose";
import { MBlacklist } from "../../mongo/blacklist.js";
import { SteamUtil } from "../../util/SteamUtil.js";
import { GitUtil } from "../../util/git.js";
import { removeProperties } from "../../util/functions.js";
import { SuccessResponseBuilder } from "../responseBuilder.js";

const generateSearch = (regex: RegExp) => [
    {
        stationName: { $regex: regex },
    },
    {
        userUsername: { $regex: regex },
    },
    {
        stationShort: { $regex: regex },
    },
    {
        userSteamId: { $regex: regex },
    },
    {
        server: { $regex: regex },
    },
];

export class StationsRoute
{
    static load()
    {
        const app = Router();

        app.get("/", async (req, res) =>
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

            const records = await MLog.aggregate(filter)
                .sort({ leftDate: -1 })
                .limit(30);
            res.json(
                new SuccessResponseBuilder<{ records: Omit<ILog, "_id" | "__v">[] }>()
                    .setCode(200)
                    .setData({ records: records.map(x => removeProperties<Omit<ILog, "_id" | "__v">>(x, [ "_id", "__v" ])) })
                    .toJSON(),
            );
        });

        app.get("/details/:id", async (req, res) =>
        {
            if (!req.params.id)
            {
                return res.redirect("/stations/");
            }
            const record = await MLog.findOne({ id: req.params.id });
            const blacklist = await MBlacklist.findOne({ steam: record?.userSteamId! });
            if (blacklist && blacklist.status)
            {
                return res.redirect("/stations/");
            }
            const player = await SteamUtil.getPlayer(record?.userSteamId!);

            res.render("stations/details.ejs", {
                record,
                dayjs,
                player,
                msToTime,
                ...GitUtil.getData()
            });
        });

        return app;
    }
}