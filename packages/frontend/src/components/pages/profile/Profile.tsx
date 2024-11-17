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

import { useState } from "react";
import { TProfileData } from "../../../types/profile.ts";
import { useTranslation } from "react-i18next";
import { ArrowIcon } from "../../mini/icons/ArrowIcon.tsx";
import { formatTime } from "../../../util/time.ts";
import { FaCheck } from "react-icons/fa6";

export const ProfileCard = ({ data }: { data: TProfileData }) =>
{

    const [ showTrains, setShowTrains ] = useState(false);
    const [ showStations, setShowStations ] = useState(false);
    const [ sortTrainsBy, setSortTrainsBy ] = useState<"time" | "score" | "distance">("score");

    const { t } = useTranslation();
    return <div
            className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 pt-6 text-center lg:pb-8 xl:pb-11.5">
            <div
                    className="mx-auto w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative drop-shadow-2">
                    <img className="rounded-full" src={ data.steam.avatarfull } alt="profile"/>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                    { data.steam.personname } { data.player.verified &&
                        <FaCheck className={ "inline text-meta-3 ml-1" }/> }
                </h3>

                <div
                        className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-2 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                    <div
                            className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                        <span className="font-semibold text-black dark:text-white">
                            { Math.floor(data.player.trainDistance / 1000) }km
                        </span>
                        <span className="text-sm text-wrap">{ t("profile.stats.distance") }</span>
                    </div>
                    <div
                            className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                        <span className="font-semibold text-black dark:text-white">
                            { formatTime(data.player.dispatcherTime) }
                        </span>
                        <span className="text-sm text-wrap">{ t("profile.stats.time") }</span>
                    </div>
                </div>
            </div>
        </div>
        { Object.keys(data.player.trainStats || {}).length > 0 &&
                <div className="bg-white px-5 pt-6 pb-5 shadow-default dark:bg-boxdark sm:px-7.5">
                    <div className="group relative cursor-pointer" onClick={ () => setShowTrains(val => !val) }>
                        <h1 className="text-xl text-black dark:text-white pb-5">{ t("profile.trains.header") }</h1>
                        <ArrowIcon rotated={ showTrains }/>
                    </div>

                    { showTrains &&
                            <div className="flex flex-col rounded-sm border border-stroke dark:border-strokedark">
                                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
                                    <div className="p-2.5 text-center xl:p-5">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                            { t("profile.trains.train") }
                                        </h5>
                                    </div>
                                    <div className="p-2.5 text-center xl:p-5 cursor-pointer"
                                         onClick={ () => setSortTrainsBy("distance") }>
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                            { t("profile.trains.distance") }
                                        </h5>
                                    </div>
                                    <div className="hidden sm:block p-2.5 text-center xl:p-5 cursor-pointer"
                                         onClick={ () => setSortTrainsBy("score") }>
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                            { t("profile.trains.points") }
                                        </h5>
                                    </div>
                                    <div className="p-2.5 text-center xl:p-5 cursor-pointer"
                                         onClick={ () => setSortTrainsBy("time") }>
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                            { t("profile.trains.time") }
                                        </h5>
                                    </div>
                                </div>

                                { Object.keys(data.player.trainStats).sort((a, b) => data.player.trainStats[ b ][ sortTrainsBy ] - data.player.trainStats[ a ][ sortTrainsBy ]).map(trainName =>
                                {
                                    const train = data.player.trainStats[ trainName ];

                                    return <div
                                            className={ `grid grid-cols-3 sm:grid-cols-4 border-t border-t-stroke dark:border-t-strokedark` }
                                            key={ 1 }
                                    >
                                        <div className="flex items-center justify-center gap-3 p-2.5 lg:p-5">
                                            <p className="text-black dark:text-white sm:block break-all">
                                                { trainName }
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-center p-2.5 lg:p-5">
                                            <p className="text-meta-6 sm:block break-all">{ Math.floor(train.distance / 1000) }km</p>
                                        </div>

                                        <div className="hidden sm:flex items-center justify-center p-2.5 lg:p-5">
                                            <p className="text-meta-3">{ train.score }</p>
                                        </div>

                                        <div className="flex items-center justify-center p-2.5 lg:p-5">
                                            <p className="text-meta-3">{ formatTime(train.time) }</p>
                                        </div>
                                    </div>;
                                }) }


                            </div> }

                </div> }
        { Object.keys(data.player.dispatcherStats || {}).length > 0 &&
                <div className="bg-white px-5 pt-6 pb-5 shadow-default dark:bg-boxdark sm:px-7.5">
                    <div className="group relative cursor-pointer" onClick={ () => setShowStations(val => !val) }>
                        <h1 className="text-xl text-black dark:text-white pb-5">{ t("profile.stations.header") }</h1>
                        <ArrowIcon rotated={ showTrains }/>
                    </div>
                    { showStations &&
                            <div className="flex flex-col rounded-sm border border-stroke dark:border-strokedark">
                                <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4">
                                    <div className="p-2.5 text-center xl:p-5">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                            { t("profile.stations.station") }
                                        </h5>
                                    </div>

                                    <div className="p-2.5 text-center xl:p-5">
                                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                                            { t("profile.stations.time") }
                                        </h5>
                                    </div>
                                </div>
                                { Object.keys(data.player.dispatcherStats).sort((a, b) => data.player.dispatcherStats[ b ].time - data.player.dispatcherStats[ a ].time).map(stationName =>
                                {
                                    const station = data.player.dispatcherStats[ stationName ];
                                    return <div
                                            className={ `grid grid-cols-2 border-t border-t-stroke dark:border-t-strokedark` }
                                            key={ 1 }
                                    >
                                        <div className="flex items-center justify-center gap-3 p-2.5 lg:p-5">
                                            <p className="text-black dark:text-white sm:block break-all">
                                                { stationName }
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-center p-2.5 lg:p-5">
                                            <p className="text-meta-3">{ formatTime(station.time) }</p>
                                        </div>
                                    </div>;
                                }) }

                            </div> }

                </div> }
    </div>;
};