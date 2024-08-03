import { IPlayerPayload } from '../types/player.js';

const STEAM_API_KEY = process.env.STEAM_APIKEY;

export class PlayerUtil {
    public static async getPlayer(steamId: number | string) {
        const data = (await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&format=json&steamids=${steamId}`).then(x => x.json())) as IPlayerPayload;
        if (!data.response.players) return;
        return data.response.players[0];
    }
}