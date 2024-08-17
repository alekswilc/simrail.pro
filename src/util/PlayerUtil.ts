import { IPlayerPayload, IPlayerStatsPayload } from '../types/player.js';

const STEAM_API_KEY = process.env.STEAM_APIKEY;

export class PlayerUtil {
    public static async getPlayer(steamId: number | string) {
        const data = (await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&format=json&steamids=${steamId}`).then(x => x.json())) as IPlayerPayload;
        if (!data.response.players) return;
        return data.response.players[0];
    }

    public static async getPlayerStats(steamId: string) {
        const data = (await fetch(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=1422130&key=${STEAM_API_KEY}&steamid=${steamId}`).then(x => x.json())) as IPlayerStatsPayload;
        if (!data.playerstats?.stats) return;
        return data.playerstats;
    }
}