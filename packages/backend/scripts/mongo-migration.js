/*
 * Copyright (C) 2024 Aleksander <alekswilc> Wilczyński (aleks@alekswilc.dev)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * See LICENSE for more.
 */

import { connect } from 'mongoose';
import { Model, model, Schema } from 'mongoose';




(async () => {
    await connect(process.env.MONGO_URI);
    // #region model
    const schema = new Schema({
        id: {
            type: String,
            required: true
        },
        steam: {
            type: String,
            required: true
        },
        steamName: {
            type: String,
            required: true
        },

        trainStats: {
            type: Object,
            required: false,
            default: {}
        },
        dispatcherStats: {
            type: Object,
            required: false,
            default: {}
        },
        trainTime: {
            type: Number,
            required: false,
            default: 0
        },
        trainPoints: {
            type: Number,
            required: false,
            default: 0
        },
        trainDistance: {
            type: Number,
            required: false,
            default: 0
        },
        dispatcherTime: {
            type: Number,
            required: false,
            default: 0
        },
    });

    const MProfile = model('profile', schema);
    // #endregion
    const _ = await MProfile.find({});

    for (const x of _) {
        /*
            dispatcherTime: number;
    trainTime: number
    trainPoints: number
    trainDistance: number*/
        x.trainPoints = Object.values(x.trainStats).length === 1 ?
            Object.values(x.trainStats)[0].score :
            Object.values(x.trainStats).reduce((acc, curr) => acc + curr.score, 0)

        x.trainDistance = Object.values(x.trainStats).length === 1 ?
            Object.values(x.trainStats)[0].distance :
            Object.values(x.trainStats).reduce((acc, curr) => acc + curr.distance, 0)

        x.trainTime = Object.values(x.trainStats).length === 1 ?
            Object.values(x.trainStats)[0].trainTime :
            Object.values(x.trainStats).reduce((acc, curr) => acc + curr.trainTime, 0)

        x.dispatcherTime = Object.values(x.dispatcherStats).length === 1 ?
            Object.values(x.dispatcherStats)[0].time :
            Object.values(x.dispatcherStats).reduce((acc, curr) => acc + curr.time, 0)

        console.log('updated ' + x.steamName)
        await MProfile.updateOne({ id: x.id }, { trainPoints: x.trainPoints, trainDistance: x.trainDistance, dispatcherTime: x.dispatcherTime, trainTime: x.trainTime })
    };


    console.log('done!')
})();