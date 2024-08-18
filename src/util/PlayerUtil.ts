import { IPlayerPayload, IPlayerStatsPayload } from '../types/player.js';

const STEAM_API_KEY = process.env.STEAM_APIKEY;

const fetchFuckingSteamApi = (url: string) => {
    let retries = 0;

    return new Promise((res, rej) => {
        const req = () => {
            if (retries > 5) throw new Error('request failed to api steam');
            fetch(url, { signal: AbortSignal.timeout(10000) }).then(x => x.json())
                .then(x => res(x))
                .catch(() => {
                    console.log('STEAM request failed! ', url.replace(STEAM_API_KEY!, '[XXX]'), retries)

                    retries++;
                    setTimeout(() => req(), 500);
                })
        }
        req();
    })
}


export class PlayerUtil {
    public static async getPlayer(steamId: number | string) {
        const data = await fetchFuckingSteamApi(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&format=json&steamids=${steamId}`) as IPlayerPayload;

        if (!data.response.players) return;
        return data.response.players[0];
    }

    public static async getPlayerStats(steamId: string) {
        const data = await fetchFuckingSteamApi(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=1422130&key=${STEAM_API_KEY}&steamid=${steamId}`) as IPlayerStatsPayload;


        if (!data.playerstats?.stats) return;
        return data.playerstats;
    }
}