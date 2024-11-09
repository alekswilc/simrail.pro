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

export interface TLogResponse
{
    success: boolean;
    data: TLogTrainData | TLogStationData;
    code: number;
}

export interface TLogTrainData
{
    id: string;
    trainNumber: string;
    userSteamId: string;
    userUsername: string;
    userAvatar: string;
    leftDate: number;
    distance?: number;
    points?: number;
    server: string;
    trainName: string;
    joinedDate?: number;
    verified: boolean;
}

export interface TLogStationData
{
    id: string;
    userSteamId: string;
    userUsername: string;
    userAvatar: string;
    leftDate: number;
    stationName: string;
    stationShort: string;
    server: string;
    joinedDate?: number;
    verified: boolean;

}
