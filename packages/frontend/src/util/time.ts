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

export const formatTime = (time: number) =>
{
    if (Math.floor(time / 3600000) > 0)
    {
        return `${ Math.floor(time / 3600000) }h`;
    }

    if (Math.floor(time / 60000) > 0)
    {
        return `${ Math.floor(time / 60000) }m`;
    }

    return "0h";
};