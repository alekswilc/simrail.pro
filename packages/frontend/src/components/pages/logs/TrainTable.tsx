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
import { TTrainRecord } from "../../../types/train.ts";
import dayjs from "dayjs";
import { FaCheck } from "react-icons/fa6";

// setSearchItem: Dispatch<SetStateAction<string>>
export const TrainTable = ({ trains }: {
    trains: TTrainRecord[]
}) =>
{
    const { t } = useTranslation();

    return (
            <div
                    className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("logs.user") }
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("logs.train") }
                            </h5>
                        </div>
                        <div className="hidden sm:block p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("logs.points") }
                            </h5>
                        </div>
                        <div className="hidden sm:block p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("logs.distance") }
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

                    { trains.map((train, key) => (
                            <div
                                    className={ `grid grid-cols-3 sm:grid-cols-6 ${ trains.length === (key + 1)
                                            ? ""
                                            : "border-b border-stroke dark:border-strokedark"
                                    }` }
                                    key={ train.id }
                            >
                                <div className="flex items-center justify-center gap-3 p-2.5 lg:p-5">
                                    <p className="text-black dark:text-white sm:block break-all">
                                        <Link to={ "/profile/" + (train.steam ?? train.player.id) }
                                              className="color-orchid">{ train.username ?? train.player.username }</Link> { train.player.flags.includes("verified") &&
                                            <FaCheck className={ "inline text-meta-3 ml-1" }/> }
                                    </p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-6 sm:block break-all">{ train.server.toUpperCase() } - { train.trainNumber ?? "--" }</p>
                                </div>

                                <div className="hidden sm:flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-6">{ train.distance ? train.points : "--" }</p>
                                </div>

                                <div className="hidden sm:flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-5">{ train.distance ? `${ (train.distance / 1000).toFixed(2) }km` : "--" }</p>
                                </div>

                                <div className="hidden sm:flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-3">{ dayjs(train.leftDate).format("HH:mm DD/MM/YYYY") }</p>
                                </div>

                                <div
                                        className="items-center justify-center p-2.5 flex xl:p-5 gap-2 flex-wrap sm:flex-nowrap	">
                                    <Link
                                            to={ "/profile/" + (train.steam ?? train.player.id) }
                                            className={ `inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 ${ train.player.flags.includes("private") ? "bg-opacity-50" : "" }` }
                                            style={ train.player.flags.includes("private") ? { pointerEvents: "none" } : undefined }
                                    >
                                        { t("logs.profile") }
                                    </Link>
                                    <Link
                                            to={ "/log/" + train.id }
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