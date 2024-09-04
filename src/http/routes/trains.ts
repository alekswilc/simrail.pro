import { Router } from 'express';
import dayjs from 'dayjs';
import { msToTime } from '../../util/time.js';
import { PipelineStage } from 'mongoose';
import { MTrainLog, raw_schema } from '../../mongo/trainLogs.js';
import { MBlacklist } from '../../mongo/blacklist.js';
import { SteamUtil } from '../../util/SteamUtil.js';
import { GitUtil } from '../../util/git.js';

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
]

export class TrainsRoute {
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

            const records = await MTrainLog.aggregate(filter)
                .sort({ leftDate: -1 })
                .limit(30)
            res.render('trains/index.ejs', {
                records,
                dayjs,
                q: req.query.q,
                msToTime,
                ...GitUtil.getData()
            });
        })

        app.get('/details/:id', async (req, res) => {
            if (!req.params.id) return res.redirect('/trains/');
            const record = await MTrainLog.findOne({ id: req.params.id });
            const player = await SteamUtil.getPlayer(record?.userSteamId!);
            const blacklist = await MBlacklist.findOne({ steam: record?.userSteamId! });
            if (blacklist && blacklist.status) return res.redirect('/trains/');

            res.render('trains/details.ejs', {
                record,
                dayjs,
                player,
                msToTime,
                ...GitUtil.getData()
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


            const records = await MTrainLog.aggregate(filter)
                .sort({ result: -1 })
                .limit(30)
            res.render('trains/leaderboard.ejs', {
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