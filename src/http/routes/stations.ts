import { Router } from 'express';
import { MLog, raw_schema } from '../../mongo/logs.js';
import dayjs from 'dayjs';
import { PlayerUtil } from '../../util/PlayerUtil.js';
import { msToTime } from '../../util/time.js';
import { PipelineStage } from 'mongoose';

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
    }
]

export class StationsRoute {
    static load() {
        const app = Router();

        app.get('/', async (req, res) => {
            const s = req.query.q?.toString().split(',').map(x => new RegExp(x, "i"));

            const filter: PipelineStage[] = [];


            s && filter.push({
                $match: {
                    $and: [
                        ...s.map(x => ({ $or: generateSearch(x) }))
                    ]
                }
            })

            const records = await MLog.aggregate(filter)
                .sort({ leftDate: -1 })
                .limit(30)
            res.render('stations/index.ejs', {
                records,
                dayjs,
                q: req.query.q,
                msToTime
            });
        })

        app.get('/details/:id', async (req, res) => {
            if (!req.params.id) return res.redirect('/stations/');
            const record = await MLog.findOne({ id: req.params.id });
            const player = await PlayerUtil.getPlayer(record?.userSteamId!);

            res.render('stations/details.ejs', {
                record,
                dayjs,
                player,
                msToTime
            });
        })

        app.get('/leaderboard/', async (req, res) => {
            const s = req.query.q?.toString().split(',').map(x => new RegExp(x, "i"));

            const data = Object.keys(raw_schema)
                .reduce((o, key) => ({ ...o, [key]: `$${key}` }), {});

            const filter: PipelineStage[] = [
                {
                    $project: {
                        // record.leftDate - record.joinedDate
                        result: { $subtract: ['$leftDate', '$joinedDate'] },
                        ...data
                    }
                },
            ];

            s && filter.unshift(
                {
                    $match: {
                        $and: [
                            ...s.map(x => ({ $or: generateSearch(x) }))
                        ]
                    }
                }
            )


            const records = await MLog.aggregate(filter)
                .sort({ result: -1 })
                .limit(30)
            res.render('stations/leaderboard.ejs', {
                records,
                dayjs,
                q: req.query.q,
                msToTime
            });
        })


        // API ENDPOINTS
        // CREATE AN ISSUE IF YOU NEED API ACCESS: https://git.alekswilc.dev/alekswilc/simrail-logs/issues
        /*
        app.get('/api/last', async (req, res) => {
            const records = await MLog.find()
                .sort({ leftDate: -1 })
                .limit(30)
            res.json({ code: 200, records });
        })

        app.get('/api/search', async (req, res) => {
            if (!req.query.q) return res.send('invalid');
            const records = await MLog.find({ $text: { $search: req.query.q as string } })
                .sort({ leftDate: -1 })
                .limit(30)

            res.json({ code: 200, records });
        })*/


        return app;
    }
}