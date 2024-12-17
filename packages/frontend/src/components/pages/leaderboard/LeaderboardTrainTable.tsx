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
import { TLeaderboardRecord } from "../../../types/leaderboard.ts";
import { formatTime } from "../../../util/time.ts";
import { Dispatch, SetStateAction } from "react";
import { FlexArrowIcon } from "../../mini/icons/ArrowIcon.tsx";
import { UserIcons } from "../../mini/icons/UserIcons.tsx";

export const LeaderboardTrainTable = ({ trains, setSortBy, sortBy }: {
    trains: TLeaderboardRecord[],
    setSortBy: Dispatch<SetStateAction<string>>
    sortBy: string
}) =>
{
    const { t } = useTranslation();

    return (
            <div
                    className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("leaderboard.user") }
                            </h5>
                        </div>
                        <div className="flex flex-row align-center justify-center gap-2 p-2.5 text-center xl:p-5">
                            <h5 className="cursor-pointer  text-sm font-medium uppercase xsm:text-base"
                                onClick={ () => setSortBy("distance") }>
                                { t("leaderboard.distance") }
                            </h5>
                            <FlexArrowIcon rotated={ sortBy === "distance" || !sortBy }/>
                        </div>
                        <div className="flex flex-row align-center justify-center gap-2 p-2.5 text-center xl:p-5">
                            <h5 className="cursor-pointer text-sm font-medium uppercase xsm:text-base"
                                onClick={ () => setSortBy("points") }>
                                { t("leaderboard.points") }
                            </h5>
                            <FlexArrowIcon rotated={ sortBy === "points" }/>
                        </div>
                        <div className="hidden sm:flex flex-row align-center justify-center gap-2 p-2.5 text-center xl:p-5">
                            <h5 className="cursor-pointer  text-sm font-medium uppercase xsm:text-base"
                                onClick={ () => setSortBy("time") }>
                                { t("leaderboard.time") }
                            </h5>
                            <FlexArrowIcon rotated={ sortBy === "time" }/>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t("leaderboard.actions") }
                            </h5>
                        </div>
                    </div>

                    { trains.map((train, key) => (
                            <div
                                    className={ `grid grid-cols-3 sm:grid-cols-5 ${ trains.length === (key + 1)
                                            ? ""
                                            : "border-b border-stroke dark:border-strokedark"
                                    }` }
                                    key={ train.id }
                            >
                                <div className="flex items-center justify-center gap-3 p-5 lg:p-5">
                                    <p className="text-black dark:text-white sm:block break-all">
                                        <Link to={ "/profile/" + train.id }
                                              className="color-orchid">{ train.username }</Link> <UserIcons
                                            flags={ train.flags }/>
                                    </p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-6">{ (train.trainDistance / 1000).toFixed(2) }km</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-5">{ train.trainPoints }</p>
                                </div>

                                <div className="hidden sm:flex items-center justify-center p-2.5 lg:p-5">
                                    <p className="text-meta-3">{ formatTime(train.trainTime) }</p>
                                </div>

                                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                    <Link
                                            to={ "/profile/" + train.id }
                                            className={ `inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 ${ train.flags.includes("private") ? "bg-opacity-50" : "" }` }
                                            style={ train.flags.includes("private") ? { pointerEvents: "none" } : undefined }
                                    >
                                        { t("leaderboard.profile") }
                                    </Link>
                                </div>
                            </div>
                    )) }
                </div>
            </div>
    )
            ;
};