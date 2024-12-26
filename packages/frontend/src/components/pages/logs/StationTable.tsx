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

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { TStationRecord } from "../../../types/station.ts";
import { UserIcons } from "../../mini/icons/UserIcons.tsx";
import { toast } from "react-toastify";


// setSearchItem: Dispatch<SetStateAction<string>>
export const StationTable = ({ stations }: {
    stations: TStationRecord[]
}) =>
{
    const { t } = useTranslation();

    const report = (data: TStationRecord) =>
    {
        toast.info(t("log.toasts.report"), {
            autoClose: 5000,
        });
        void navigator.clipboard.writeText(`;user: \`${ data.player.username }\`\n;steam: \`https://steamcommunity.com/profiles/${ data.player.id }\`\n;server: \`${ data.server.toUpperCase() }\`\n;left: <t:${ Math.floor(data.leftDate / 1000) }>${ data.joinedDate ? `\n;joined: <t:${ Math.floor(data.joinedDate / 1000) }>` : "" }\n;station: \`${ data.stationName }\`\n;link: https://${ location.hostname }/log/${ data.id }\n\n`);
    };

    return (

            <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-3 xl:grid-cols-4">
                { stations.map((station) =>
                {
                    return <div
                            key={ station.id }
                            className="flex flex-col align-center items-center rounded-sm border border-stroke bg-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="p-4">
                            <img className="rounded-full"
                                 src={ station.player.avatar }
                                 alt="Player"/>
                        </div>
                        <div className="flex flex-col p-2 align-center items-center">
                            <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                { station.player.username }
                                <UserIcons flags={ station.player.flags }/>
                            </h4>
                            <p className={'break-words'}>{ t("log.station.station", { name: station.stationName, short: station.stationShort }) }</p>
                            <p>{ t("log.station.server", { server: station.server.toUpperCase() }) }</p>
                            { station.joinedDate &&
                                    <p>{ t("log.station.joined", { date: dayjs(station.joinedDate).format("HH:mm DD/MM/YYYY") }) }</p> }
                            <p>{ t("log.station.left", { date: dayjs(station.leftDate).format("HH:mm DD/MM/YYYY") }) }</p>
                            { station.joinedDate &&
                                    <p>{ t("log.station.spent", { date: dayjs.duration(station.leftDate - station.joinedDate).format("H[h] m[m]") }) }</p> }


                        </div>

                        <div className="items-center justify-center p-2.5 flex xl:p-5 gap-2 flex-wrap mt-auto mb-2">
                            <Link to={ "/profile/" + (station.steam ?? station.player.id) }
                                  className={ `inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 ${ station.player.flags.includes("private") ? "bg-opacity-50" : "" }` }
                                  style={ station.player.flags.includes("private") ? { pointerEvents: "none" } : undefined }>{ t("log.buttons.profile") }</Link>
                            <Link to={ "/log/" + station.id }
                                  className={ `inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5` }>{ t("log.buttons.record") }</Link>

                            <a
                                    onClick={ () => report(station) }
                                    className="cursor-pointer inline-flex items-center justify-center rounded-md bg-danger py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5"
                            >
                                { t("log.buttons.report") }
                            </a>
                        </div>
                    </div>;
                }) }
            </div>
    );
};