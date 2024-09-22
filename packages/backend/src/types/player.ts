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


