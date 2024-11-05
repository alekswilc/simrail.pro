import { Router } from "express";
import { msToTime } from "../../util/time.js";
import { MProfile } from "../../mongo/profile.js";
import { MBlacklist } from "../../mongo/blacklist.js";
import { SteamUtil } from "../../util/SteamUtil.js";
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../responseBuilder.js";

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
            const player = await MProfile.findOne({ steam: req.params.id });
            if (!player)
            {
                res.status(404).json(new ErrorResponseBuilder()
                    .setCode(404).setData("Profile not found! (propably private)"));
                return;
            }
            const blacklist = await MBlacklist.findOne({ steam: req.params.id! });
            if (blacklist && blacklist.status)
            {
                res.status(403).json(new ErrorResponseBuilder()
                    .setCode(403).setData("Profile blacklisted!"));
                return;
            }
            const steam = await SteamUtil.getPlayer(player?.steam!);
            const steamStats = await SteamUtil.getPlayerStats(player?.steam!);


            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({
                        player, steam, steamStats,
                    })
                    .toJSON(),
            );

            res.render("profiles/index.ejs", {
                player, steam, steamStats: steamStats,
                msToTime,
            });
        });

        return app;
    }
}