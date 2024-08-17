import { Router } from 'express';
import dayjs from 'dayjs';
import { PlayerUtil } from '../../util/PlayerUtil.js';
import { msToTime } from '../../util/time.js';

import { PipelineStage } from 'mongoose';
import { MProfile, raw_schema } from '../../mongo/profile.js';

const generateSearch = (regex: RegExp) => [
    {
        steam: { $regex: regex },
    },
    {
        steamName: { $regex: regex },
    },
]

export class LeaderboardRoute {
    static load() {
        const app = Router();

        app.get('/train', async (req, res) => {
            const s = req.query.q?.toString().split(',').map(x => new RegExp(x, "i"));

            const filter: PipelineStage[] = [];


            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) }))
                    ]
                }
            })


            const records = await MProfile.aggregate(filter)
                .sort({ trainPoints: -1 })
                .limit(10)
            res.render('leaderboard/index.ejs', {
                records,
                dayjs,
                msToTime,
                type: 'train',
                q: req.query.q,

            });
        })


        app.get('/station', async (req, res) => {
            const s = req.query.q?.toString().split(',').map(x => new RegExp(x, "i"));

            const filter: PipelineStage[] = [];


            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) }))
                    ]
                }
            })


            const records = await MProfile.aggregate(filter)
                .sort({ dispatcherTime: -1 })
                .limit(10)
            res.render('leaderboard/index.ejs', {
                records,
                dayjs,
                msToTime,
                type: 'station',
                q: req.query.q,

            });
        })

        return app;
    }
}