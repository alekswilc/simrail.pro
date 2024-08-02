import { MLog } from '../mongo/logs.js';
import { IPlayer } from '../types/player.js';
import { IStation } from '../types/station.js';
import { SimrailClientEvents } from '../util/SimrailClient.js';
import { v4 } from 'uuid';

export class StationsModule {
    public static load() {

        client.on(SimrailClientEvents.StationLeft, (station: IStation, player: IPlayer, joinedAt: number) => {
            const date = new Date();

            MLog.create({
                id: v4(),
                userSteamId: player.steamid,
                userAvatar: player.avatarfull,
                userUsername: player.personaname,
                joinedDate: joinedAt,
                leftDate: date.getTime(),
                stationName: station.Name,
                stationShort: station.Prefix,
                server: 'pl2'
            });
        })
    }
}