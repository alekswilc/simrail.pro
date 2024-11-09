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

export type TProfileResponse = TProfileErrorResponse | TProfileSuccessResponse;

export interface TProfileErrorResponse
{
    success: false;
    data: string;
    code: 404 | 403;
}

export interface TProfileSuccessResponse
{
    success: true;
    data: TProfileData;
    code: 200;
}

export interface TProfileData
{
    player: TProfilePlayer;
    steam: TProfileSteam;
    steamStats: TProfileSteamStats;
}

export interface TProfilePlayer
{
    id: string;
    steam: string;
    steamName: string;
    trainTime: number;
    dispatcherTime: number;
    dispatcherStats: Record<string, TProfileDispatcherStatsRecord>;
    trainStats: Record<string, TProfileTrainStatsRecord>;
    trainDistance: number;
    trainPoints: number;
    verified: boolean;
}

export interface TProfileDispatcherStatsRecord
{
    time: number;
}

export interface TProfileTrainStatsRecord
{
    distance: number;
    score: number;
    time: number;
}

export interface TProfileSteam
{
    personname: string;
    avatarfull: string;
}

export interface TProfileSteamStats
{
    steamID: string;
    gameName: string;
    stats: TProfileSteamStatsAchievementStat[];
    achievements: TProfileSteamStatsAchievement[];
}

export interface TProfileSteamStatsAchievement
{
    name: string;
    achieved: number;
}

export interface TProfileSteamStatsAchievementStat
{
    name: string;
    value: number;
}
