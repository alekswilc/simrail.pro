import { Router } from 'express';
import dayjs from 'dayjs';
import { msToTime } from '../../util/time.js';
import { PipelineStage } from 'mongoose';
import { ITrainLog, MTrainLog, raw_schema } from '../../mongo/trainLogs.js';
import { MBlacklist } from '../../mongo/blacklist.js';
import { SteamUtil } from '../../util/SteamUtil.js';
import { GitUtil } from '../../util/git.js';
import { SuccessResponseBuilder } from '../responseBuilder.js';
import { removeProperties } from '../../util/functions.js';
import { MLog } from '../../mongo/logs.js';
import { MProfile } from '../../mongo/profile.js';

export class StatsRoute {
    static load() {
        const app = Router();

        app.get('/', async (req, res) => {
            const { commit, version } = GitUtil.getData();

            const trains = await MTrainLog.countDocuments();
            const dispatchers = await MLog.countDocuments();
            const profiles = await MProfile.countDocuments();

            res.json(
                new SuccessResponseBuilder<{ git: { commit?: string, version?: string }, stats: { trains: number, dispatchers: number, profiles: number } }>()
                    .setCode(200)
                    .setData({ git: { commit, version }, stats: { trains, dispatchers, profiles } })
                    .toJSON()
            );
        })


        return app;
    }
}