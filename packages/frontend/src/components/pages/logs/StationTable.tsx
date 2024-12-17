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

// setSearchItem: Dispatch<SetStateAction<string>>
export const StationTable = ({ stations }: {
    stations: TStationRecord[]
}) =>
{
    const { t } = useTranslation();

    return (
            <div
                    className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("logs.user") }
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("logs.station") }
                            </h5>
                        </div>
                        <div className="hidden sm:block p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("logs.time") }
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("logs.actions") }
                            </h5>
                        </div>
                    </div>

                    { stations.map((station, key) => (
                            <div
                                    className={ `grid grid-cols-3 sm:grid-cols-4 ${ stations.length === (key + 1)
                                            ? ""
                                            : "border-b border-stroke dark:border-strokedark"
                                    }` }
                                    key={ station.id }
                            >
                                <div className="flex items-center justify-center gap-3 p-2.5 lg:p-5">
                                    <p className="text-black dark:text-white sm:block break-all">
                                        <Link to={ "/profile/" + (station.steam ?? station.player.id) }
                                              className="color-orchid">{ station.username ?? station.player.username }</Link>
                                        <UserIcons flags={ station.player.flags }/>
                                    </p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-6 sm:block break-all">{ station.server.toUpperCase() } - { station.stationName ?? "--" }</p>
                                </div>

                                <div className="hidden sm:flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-3">{ dayjs(station.leftDate).format("HH:mm DD/MM/YYYY") }</p>
                                </div>

                                <div
                                        className="items-center justify-center p-2.5 flex xl:p-5 gap-2 flex-wrap sm:flex-nowrap	">
                                    <Link
                                            to={ "/profile/" + (station.steam ?? station.player.id) }
                                            className={ `inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 ${ station.player.flags.includes("private") ? "bg-opacity-50" : "" }` }
                                            style={ station.player.flags.includes("private") ? { pointerEvents: "none" } : undefined }
                                    >
                                        { t("logs.profile") }
                                    </Link>
                                    <Link
                                            to={ "/log/" + station.id }
                                            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5"
                                    >
                                        { t("logs.record") }
                                    </Link>
                                </div>
                            </div>
                    )) }
                </div>
            </div>
    );
};