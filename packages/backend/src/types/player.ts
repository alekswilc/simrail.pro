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

/* steam api */

export type IPlayer = {
    steamid: string,
    communityvisibilitystate: number,
    profilestate: number,
    personaname: string,
    commentpermission: number,
    profileurl: string,
    avatar: string,
    avatarmedium: string,
    avatarfull: string,
    avatarhash: string,
    personastate: number,
    primaryclanid: string,
    timecreated: number,
    personastateflags: number,
    gameextrainfo: string,
    gameid: string,
    loccountrycode: string,
    locstatecode: string
}

export type IPlayerStats = {
    "steamID": string,
    "gameName": string,
    "stats": [
        {
            "name": "SCORE",
            "value": number
        },
        {
            "name": "DISPATCHER_TIME",
            "value": number
        },
        {
            "name": "DISTANCE_M",
            "value": number
        }
    ],
    "achievements": [
        {
            "name": "FINISH_MISSION",
            "achieved": 0 | 1
        },
        {
            "name": "FINISH_ON_TIME",
            "achieved": 0 | 1
        },
        {
            "name": "FINISH_NIGHT",
            "achieved": 0 | 1
        }
    ]

}

export type IPlayerPayload = {
    response: {
        players: IPlayer[]
    }
}

export type IPlayerStatsPayload = {
    playerstats: IPlayerStats
}


