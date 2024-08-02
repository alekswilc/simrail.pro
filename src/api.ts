import express from 'express';
import { MLog } from '../mongo/logs.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dayjs from 'dayjs';
import { PlayerUtil } from '../util/PlayerUtil.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class ApiModule {
    public static load() {
        const app = express();

        app.set('view engine', 'ejs');
        app.set('views', __dirname + '/views')

        app.get('/', async (req, res) => {
            const records = await MLog.find()
                .sort({ leftDate: -1 })
                .limit(30)
            res.render('index.ejs', {
                records,
                dayjs
            });
        })

        app.get('/search', async (req, res) => {
            if (!req.query.q) return res.send('invalid');
            const records = await MLog.find({ $text: { $search: req.query.q as string } })
                .sort({ leftDate: -1 })
                .limit(30)
            res.render('search.ejs', {
                records,
                dayjs,
                q: req.query.q
            });
        })

        app.get('/details/:id', async (req, res) => {
            if (!req.params.id) return res.send('invalid');
            const record = await MLog.findOne({ id: req.params.id });
            const player = await PlayerUtil.getPlayer(record?.userSteamId!);

            res.render('details.ejs', {
                record,
                dayjs,
                player
            });
        })

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
        })

        app.listen(2005);
    }
}