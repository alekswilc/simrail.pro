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

import { Router } from "express";
import { SuccessResponseBuilder } from '../responseBuilder.js';
import { generateUrl } from '../../util/imgproxy.js';
import { trainsMap, stationsMap } from '../../util/contants.js';

export class ImagesRoute {
    static load() {
        const app = Router();

        app.get("/", async (req, res) => {

            const trains: Record<string, string> = {};

            Object.keys(trainsMap).forEach(x => {
                trains[x] = generateUrl(trainsMap[x], "f:png/q:50/rs:auto:512:1024:1");
            })

            const stations: Record<string, string> = {};

            Object.keys(stationsMap).forEach(x => {
                stations[x] = generateUrl(stationsMap[x], "f:png/q:50/rs:auto:512:1024:1");
            })

            res.json(
                new SuccessResponseBuilder()
                    .setCode(200)
                    .setData({
                       trains,
                       stations
                    })
                    .toJSON(),
            );
        });

        return app;
    }
}