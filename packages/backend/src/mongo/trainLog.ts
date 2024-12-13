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
    trainNumber: {
        type: String,
        required: true,
    },
    joinedDate: {
        type: Number,
        required: false,
        default: undefined,
    },
    leftDate: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        required: false,
        default: 0,
    },
    points: {
        type: Number,
        required: false,
        default: 0,
    },
    server: {
        type: String,
        required: true,
    },
    trainName: {
        type: String,
        default: null,
    },
    username: {
        type: String,
        required: true,
    },
    steam: {
        type: String,
        required: true,
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: "profile"
    }
};

const schema = new Schema<ITrainLog>(raw_schema);

export type TMTrainLog = Model<ITrainLog>

export const MTrainLog = model<ITrainLog>("trains", schema);

export interface ITrainLog
{
    id: string;
    joinedDate?: number;
    leftDate: number;
    trainNumber: string;
    trainName: string;
    distance: number;
    points: number;
    server: string;

    player: Schema.Types.ObjectId;

    username: string;
    steam: string;

}