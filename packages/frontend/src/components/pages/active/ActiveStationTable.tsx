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
import { TActiveStationPlayersData } from "../../../types/active.ts";
import { UserIcons } from "../../mini/util/UserIcons.tsx";

export const ActiveStationTable = ({ stations }: { stations: TActiveStationPlayersData[] }) =>
{
    const { t } = useTranslation();

    return (
            <div
                    className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("active.server") }
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("active.user") }
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("active.station") }
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("active.actions") }
                            </h5>
                        </div>
                    </div>

                    { stations.map((station, key) => (
                            <div
                                    className={ `grid grid-cols-3 sm:grid-cols-4 ${ stations.length === (key + 1) // todo: ...
                                            ? ""
                                            : "border-b border-stroke dark:border-strokedark"
                                    }` }
                                    key={ station.player.id }
                            >
                                <div className="flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-6">{ station.server.toUpperCase() }</p>
                                </div>

                                <div className="flex justify-center items-center gap-3 p-5 lg:p-5">
                                    <p className="text-black dark:text-white sm:block break-all">
                                        <Link to={ "/profile/" + station.steam }
                                              className="color-orchid">{ station.username }</Link> <UserIcons
                                            flags={ station.player.flags }/>
                                    </p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-5">{ station.stationName }</p>
                                </div>

                                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                    <Link
                                            to={ "/profile/" + station.steam }
                                            className={ `inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 ${ station.player.flags.includes("private") ? "bg-opacity-50" : "" }` }
                                            style={ station.player.flags.includes("private") ? { pointerEvents: "none" } : undefined }
                                    >
                                        { t("active.profile") }
                                    </Link>
                                </div>
                            </div>
                    )) }
                </div>
            </div>


    );
};
