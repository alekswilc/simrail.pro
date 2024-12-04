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
    username: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
};

const schema = new Schema<IAdmin>(raw_schema);

export type TMAdmin = HydratedDocument<IAdmin>;

export const MAdmin = model<IAdmin>("admin", schema);

export interface IAdmin
{
    token: string
    username: string
}