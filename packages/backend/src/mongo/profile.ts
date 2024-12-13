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

import { HydratedDocument, model, Schema } from "mongoose";

export const raw_schema = {
    // STEAM HEX
    id: {
        type: String,
        required: true,
        unique: true
    },
    // USERNAME FROM STEAM
    username: {
        type: String,
        required: true,
    },

    // AVATAR FROM STEAM
    avatar: {
        type: String,
        required: true,
    },

    // OBJECT WITH TRAIN STATS
    trainStats: {
        type: Object,
        required: false,
        default: {},
    },
    // OBJECT WITH DISPATCHER STATS
    dispatcherStats: {
        type: Object,
        required: false,
        default: {},
    },
    // FULL TRAIN-TIME for easy access
    trainTime: {
        type: Number,
        required: false,
        default: 0,
    },
    // FULL TRAIN-SCORE for easy access
    trainPoints: {
        type: Number,
        required: false,
        default: 0,
    },
    // FULL TRAIN-DISTANCE for easy access
    trainDistance: {
        type: Number,
        required: false,
        default: 0,
    },
    // FULL DISPATCHER-TIME for easy access
    dispatcherTime: {
        type: Number,
        required: false,
        default: 0,
    },
    steamDispatcherTime: {
        type: Number,
        required: false,
        default: 0,
    },
    steamTrainDistance: {
        type: Number,
        required: false,
        default: 0,
    },
    steamTrainScore: {
        type: Number,
        required: false,
        default: 0,
    },

    flags: [
        {
            type: String,
            required: false,
            default: []
        }
    ]
};

const schema = new Schema<IProfile>(raw_schema);

export type TMProfile = HydratedDocument<IProfile>;

export const MProfile = model<IProfile>("profile", schema);

export interface IProfile
{
    id: string;
    username: string;
    avatar: string;

    trainStats: {
        [ trainName: string ]: {
            score: number,
            distance: number
            time: number,
        }
    };
    dispatcherStats: {
        [ name: string ]: {
            time: number
        }
    };

    trainTime: number;
    trainPoints: number;
    trainDistance: number;

    dispatcherTime: number;

    steamDispatcherTime: number;
    steamTrainDistance: number;
    steamTrainScore: number;

    createdAt: number
    flags: string[]
}