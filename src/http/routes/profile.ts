import { Router } from 'express';
import { msToTime } from '../../util/time.js';
import { MProfile } from '../../mongo/profile.js';
import { MBlacklist } from '../../mongo/blacklist.js';
import { SteamUtil } from '../../util/SteamUtil.js';
import { GitUtil } from '../../util/git.js';



export class ProfilesRoute {
    static load() {
        const app = Router();


        app.get('/:id', async (req, res) => {
            if (!req.params.id) return res.redirect('/');
            const player = await MProfile.findOne({ steam: req.params.id });
            if (!player) return res.render('profiles/private.ejs', GitUtil.getData());
            const blacklist = await MBlacklist.findOne({ steam: req.params.id! });
            if (blacklist && blacklist.status) return res.render('profiles/private.ejs', GitUtil.getData());
            const steam = await SteamUtil.getPlayer(player?.steam!);
            const steamStats = await SteamUtil.getPlayerStats(player?.steam!);

            res.render('profiles/index.ejs', {
                player, steam, steamStats: steamStats,
                msToTime,
                ...GitUtil.getData(),
            });
        })

        return app;
    }
}