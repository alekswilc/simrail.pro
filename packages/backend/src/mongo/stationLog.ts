/*
 * Copyright (C) 2025 Aleksander <alekswilc> Wilczyński (aleks@alekswilc.dev)
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
    joinedDate: {
        type: Number,
        required: false,
        default: undefined,
    },
    leftDate: {
        type: Number,
        required: true,
    },
    stationName: {
        type: String,
        required: true,
    },
    stationShort: {
        type: String,
        required: true,
    },
    server: {
        type: String,
        required: true,
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
        ref: "profile",
    },
};

const schema = new Schema<IStationLog>(raw_schema);

export type TMStationLog = Model<IStationLog>

export const MStationLog = model<IStationLog>("stations", schema);

export interface IStationLog
{
    id: string;
    joinedDate?: number;
    leftDate: number;
    stationName: string;
    stationShort: string;
    server: string;

    player: Schema.Types.ObjectId;

    username: string;
    steam: string;

}