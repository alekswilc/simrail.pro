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

export type IPlayerPayload = {
    response: {
        players: IPlayer[]
    }
}