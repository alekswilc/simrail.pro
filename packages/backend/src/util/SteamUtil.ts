import { MSteam } from "../mongo/steam.js";
import { PlayerUtil } from "./PlayerUtil.js";

export class SteamUtil
{
    public static async updatePlayerDataInDatabase(steam: string)
    {
        const data = await PlayerUtil.getPlayer(steam);
        const stats = await PlayerUtil.getPlayerStats(steam);
        const steamApi = await MSteam.findOne({ steam });

        if (steamApi)
        {
            await MSteam.findOneAndUpdate({ steam }, { stats, personaname: data?.personaname, avatarfull: data?.avatarfull });
            return;
        }

        await MSteam.create({ steam, stats, personaname: data?.personaname, avatarfull: data?.avatarfull });
    }


    public static async getPlayer(steam: string)
    {
        const steamApi = await MSteam.findOne({ steam });
        void this.updatePlayerDataInDatabase(steam);

        if (steamApi)
        {
            return { personname: steamApi.personaname, avatarfull: steamApi.avatarfull };
        }

        return await PlayerUtil.getPlayer(steam);
    }

    public static async getPlayerStats(steam: string)
    {
        const steamApi = await MSteam.findOne({ steam });
        void this.updatePlayerDataInDatabase(steam);

        if (steamApi)
        {
            return steamApi.stats;
        }

        return await PlayerUtil.getPlayerStats(steam);
    }
}