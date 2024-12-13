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
}

export interface TProfilePlayer
{
    "id": string,
    "username": string,
    "avatar": string,
    "trainTime": number,
    "trainPoints": number,
    "trainDistance": number,
    "dispatcherTime": number,
    "steamDispatcherTime": number,
    "steamTrainDistance": number,
    "steamTrainScore": number,
    "flags": string[]
    createdAt: number;

    trainStats: Record<string, {
        time: number;
        score: number;
        distance: number;
    }>

    dispatcherStats: Record<string, {
        time: number;
    }>
}