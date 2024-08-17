import { Router } from 'express';
import dayjs from 'dayjs';
import { PlayerUtil } from '../../util/PlayerUtil.js';
import { msToTime } from '../../util/time.js';
import { MProfile } from '../../mongo/profile.js';
import { MBlacklist } from '../../mongo/blacklist.js';



export class ProfilesRoute {
    static load() {
        const app = Router();


        app.get('/:id', async (req, res) => {
            if (!req.params.id) return res.redirect('/');
            const player = await MProfile.findOne({ steam: req.params.id });
            if (!player) return res.render('profiles/private.ejs');
            const blacklist = await MBlacklist.findOne({ steam: req.params.id! });
            if (blacklist && blacklist.status) return res.render('profiles/private.ejs');
            const steam = await PlayerUtil.getPlayer(player?.steam!);
            const steamStats = await PlayerUtil.getPlayerStats(player?.steam!);

            res.render('profiles/index.ejs', {
                player, steam, steamStats: steamStats,
                msToTime
            });
        })

        return app;
    }
}