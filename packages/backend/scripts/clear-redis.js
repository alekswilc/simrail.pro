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

import { createClient } from 'redis';

createClient({url: process.env.REDIS_URI}).connect().then(async (x) => {
    await x.json.del('stations_occupied');
    await x.json.del('stations');
    await x.json.del('trains');
    await x.json.del('trains_occupied');
    console.log('done')
    process.exit(1);
})