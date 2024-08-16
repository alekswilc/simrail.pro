import { Server, Station } from '@simrail/types';
import { MLog } from '../mongo/logs.js';
import { IPlayer } from '../types/player.js';
import { SimrailClientEvents } from '../util/SimrailClient.js';
import { v4 } from 'uuid';
import { MProfile } from '../mongo/profile.js';
import { PlayerUtil } from '../util/PlayerUtil.js';

export class StationsModule {
    public static load() {

        client.on(SimrailClientEvents.StationLeft, async (server: Server, station: Station, player: IPlayer, joinedAt: number) => {
            const stats = await PlayerUtil.getPlayerStats(player.steamid);
            const date = new Date();
            if (stats) {
                const time = date.getTime() - joinedAt;

                const userProfile = await MProfile.findOne({ steam: player.steamid }) ?? await MProfile.create({ steam: player.steamid, id: v4() });
                if (!userProfile.dispatcherStats) userProfile.dispatcherStats = {};

                if (userProfile.dispatcherStats[station.Name]) {
                    userProfile.dispatcherStats[station.Name].time = userProfile.dispatcherStats[station.Name].time + time;
                } else {
                    userProfile.dispatcherStats[station.Name] = {
                        time
                    }
                }

                console.log(userProfile.dispatcherStats);

                console.log(await MProfile.findOneAndUpdate({ id: userProfile.id }, { dispatcherStats: userProfile.dispatcherStats }))
            }

            MLog.create({
                id: v4(),
                userSteamId: player.steamid,
                userAvatar: player.avatarfull,
                userUsername: player.personaname,
                joinedDate: joinedAt,
                leftDate: date.getTime(),
                stationName: station.Name,
                stationShort: station.Prefix,
                server: server.ServerCode
            });
        })
    }
}