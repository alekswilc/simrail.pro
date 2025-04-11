/*
 * Copyright (C) 2025 Aleksander <alekswilc> Wilczyński (aleks@alekswilc.dev)
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
import { UserIcons } from "../../mini/icons/UserIcons.tsx";
import { FaCrown } from "react-icons/fa6";

export const LeaderboardTable = ({ list, queryType, isUnmodified }: {
    list: TLeaderboardRecord[];
    queryType: string;
    isUnmodified?: boolean
}) =>
{
    const { t } = useTranslation();

    return (
            <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-3 xl:grid-cols-4">
                { list.map((player, index) =>
                {
                    return <div
                            key={ player.id }
                            className="flex flex-col align-center items-center rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark bg-stroke">
                        <div className="p-4">
                            <img className="rounded-full"
                                 src={ player.avatar }
                                 alt="Player"/>
                        </div>
                        <div className="flex flex-col p-2 align-center items-center">
                            <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                { player.username }
                                <UserIcons flags={ player.flags }/>
                                { isUnmodified && index === 0 && <FaCrown className={ `inline text-gold ml-1` }/> }
                                { isUnmodified && index === 1 && <FaCrown className={ `inline text-silver ml-1` }/> }
                                { isUnmodified && index === 2 && <FaCrown className={ `inline text-bronze ml-1` }/> }
                            </h4>
                            {
                                queryType === "train" ?
                                        <>
                                            <p className="break-words">{ t("leaderboard.train.distance", { distance: (player.trainDistance / 1000).toFixed(2) }) }</p>
                                            <p className="break-words">{ t("leaderboard.train.points", { points: player.trainPoints }) }</p>
                                        </>
                                        :
                                        <>
                                            <p>{ t("leaderboard.station.time", { time: formatTime(player.dispatcherTime) }) }</p>
                                        </>
                            }
                        </div>

                        <div className="items-center justify-center p-2.5 flex xl:p-5 gap-2 flex-wrap sm:flex-nowrap mt-auto mb-2">
                            <Link to={ "/profile/" + player.id }
                                  className={ `inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 ${ player.flags.includes("private") ? "bg-opacity-50" : "" }` }
                                  style={ player.flags.includes("private") ? { pointerEvents: "none" } : undefined }>{ t("log.buttons.profile") }</Link>

                        </div>
                    </div>;
                }) }
            </div>
    );
};