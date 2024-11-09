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

import { Model, model, Schema } from "mongoose";


export const raw_schema = {
    id: {
        type: String,
        required: true,
    },
    steam: {
        type: String,
        required: true,
    },
    steamName: {
        type: String,
        required: true,
    },

    trainStats: {
        type: Object,
        required: false,
        default: {},
    },
    dispatcherStats: {
        type: Object,
        required: false,
        default: {},
    },
    trainTime: {
        type: Number,
        required: false,
        default: 0,
    },
    trainPoints: {
        type: Number,
        required: false,
        default: 0,
    },
    trainDistance: {
        type: Number,
        required: false,
        default: 0,
    },
    dispatcherTime: {
        type: Number,
        required: false,
        default: 0,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
};

const schema = new Schema<IProfile>(raw_schema);


export type TMProfile = Model<IProfile>

export const MProfile = model<IProfile>("profile", schema);

export interface IProfile
{
    id: string;
    steam: string;
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

    dispatcherTime: number;
    trainTime: number;
    trainPoints: number;
    steamName: string;
    trainDistance: number;
    verified: boolean;
}