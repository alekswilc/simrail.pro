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

export interface TLeaderboardResponse
{
    success: boolean;
    data: TLeaderboardData;
    code: number;
}

export interface TLeaderboardData
{
    records: TLeaderboardRecord[];
}

export interface TLeaderboardRecord
{
    id: string;
    steam: string;
    steamName: string;
    trainTime: number;
    trainPoints: number;
    trainDistance: number;
    dispatcherTime: number;
    dispatcherStats?: { [ key: string ]: TLeaderboardDispatcherStat };
    trainStats?: { [ key: string ]: TLeaderboardTrainStat };
    verified: boolean;
}

export interface TLeaderboardDispatcherStat
{
    time: number;
}

export interface TLeaderboardTrainStat
{
    distance: number;
    score: number;
    time: number;
}
