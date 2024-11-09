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