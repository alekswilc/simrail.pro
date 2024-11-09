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
    userSteamId: {
        type: String,
        required: true,
    },
    userUsername: {
        type: String,
        required: true,
    },
    userAvatar: {
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
};

const schema = new Schema<ILog>(raw_schema);
schema.index({ stationName: "text", userUsername: "text", stationShort: "text", userSteamId: "text", server: "text" });

export type TMLog = Model<ILog>

export const MLog = model<ILog>("logs", schema);

export interface ILog
{
    id: string;
    userSteamId: string;
    userUsername: string;
    userAvatar: string;
    joinedDate?: number;
    leftDate: number;
    stationName: string;
    stationShort: string;
    server: string;
}