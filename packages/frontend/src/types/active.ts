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


import { TProfilePlayer } from "./profile.ts";

export interface TActiveTrainPlayersResponse
{
    success: boolean;
    data: TActiveTrainPlayersData;
    code: number;
}

export interface TActiveTrainPlayersData {
    "server": string,
    "player": TProfilePlayer,
    "trainNumber": string,
    "trainName": string,
    "username": string,
    "steam": string
}

export interface TActiveStationPlayersResponse
{
    success: boolean;
    data: TActiveStationPlayersData;
    code: number;
}

export interface TActiveStationPlayersData {
    "server": string,
    "player": TProfilePlayer,
    "stationName": string,
    "stationShort": string,
    "username": string,
    "steam": string
}