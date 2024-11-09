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
    steam: {
        type: String,
        required: true,
    },
    stats: {
        type: Object,
        required: false,
    },
    personaname: {
        type: String,
        required: true,
    },
    avatarfull: {
        type: String,
        required: true,
    },
};

const schema = new Schema<ISteam>(raw_schema);


export type TMSteam = Model<ISteam>

export const MSteam = model<ISteam>("steam", schema);

export interface ISteam
{
    steam: string;
    stats: object;
    personaname: string;
    avatarfull: string;
    lastUpdated: number;
}