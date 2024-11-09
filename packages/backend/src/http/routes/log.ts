import { Router } from "express";
import { ITrainLog, MTrainLog } from "../../mongo/trainLogs.js";
import { MBlacklist } from "../../mongo/blacklist.js";
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../responseBuilder.js";
import { removeProperties } from "../../util/functions.js";
import { ILog, MLog } from "../../mongo/logs.js";
import { MProfile } from "../../mongo/profile.js";


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

            const log = await MLog.findOne({ id }) || await MTrainLog.findOne({ id });

            if (!log)
            {
                res.status(404).json(new ErrorResponseBuilder()
                    .setCode(404)
                    .setData("Invalid Id parameter").toJSON());
                return;
            }
            const profile = await MProfile.findOne({ steam: log.userSteamId });


            res.status(200).json(new SuccessResponseBuilder().setCode(200).setData({
                verified: profile?.verified,
                ...removeProperties<Omit<(ILog | ITrainLog), "_id" | "__v">>(log.toJSON(), [ "_id", "__v" ])
            }));
        });

        return app;
    }
}