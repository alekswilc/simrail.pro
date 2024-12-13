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

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import duration from "dayjs/plugin/duration.js";
import pl from "dayjs/locale/pl.js";


dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale(pl);


export const msToTime = (duration: number, long = false) =>
{
    const time = dayjs.duration(duration, "milliseconds");

    if (long)
    {
        return `${ time.humanize() } (${ time.format("Y[y] M[mth] D[d] H[h] m[m] s[s]").split(" ").map(x => x.split("")[ 0 ] === "0" ? null : x).filter(x => x).join(" ") })`;
    }

    return time.humanize();
};