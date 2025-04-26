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

import { useState } from "react";
import { TProfileData, TProfilePlayer } from "../../../types/profile.ts";
import { useTranslation } from "react-i18next";
import { formatTime } from "../../../util/time.ts";
import { useAuth } from "../../../hooks/useAuth.tsx";
import { ConfirmModal } from "../../mini/modal/ConfirmModal.tsx";
import { post } from "../../../util/fetcher.ts";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { UserIcons } from "../../mini/icons/UserIcons.tsx";
import { StationStat } from '../../mini/profile/StationStat.tsx';
import { chunk } from '../../../util/chunk.ts';
import { Paginator } from '../../mini/util/Paginator.tsx';
import { TrainStat } from '../../mini/profile/TrainStat.tsx';
import { TImagesData } from '../../../types/images.ts';

const sortTrainsByList: Record<number, string> = {
    [0]: 'time',
    [1]: 'score',
    [2]: 'distance',
}

export const ProfileCard = ({ data, images }: { data: TProfileData, images: TImagesData }) => {
    const [sortTrainsBy, setSortTrainsBy] = useState(2);
    const [sortTrainsBy2, setSortTrainsBy2] = useState(0);
    const [sortStationsBy, setSortStationsBy] = useState(0);
    const [hideLeaderboardStatsModal, setHideLeaderboardStatsModal] = useState(false);
    const [hideProfileModal, setHideProfileModal] = useState(false);

    const { isAdmin, token } = useAuth();

    // #region ADMIN
    const adminToggleHideLeaderboardPlayerProfile = () => {
        post(`/admin/profile/${data.player.id}/${data.player.flags.includes("leaderboard_hidden") ? "showLeaderboard" : "hideLeaderboard"}`, {}, { "X-Auth-Token": token })
            .then((response) => {
                if (response.code === 200) {
                    toast.success(t("admin.hideLeaderboard.alert"));
                }
            });
    };

    const adminHidePlayerProfile = () => {
        post(`/admin/profile/${data.player.id}/hide`, {}, { "X-Auth-Token": token })
            .then((response) => {
                if (response.code === 200) {
                    toast.success(t("admin.hide.alert"));
                }
            });
    };

    const adminForceUpdate = () => {
        post(`/admin/profile/${data.player.id}/forceUpdate`, {}, { "X-Auth-Token": token })
            .then((response) => {
                if (response.code === 200) {
                    toast.success(t("admin.update.alert"));
                }
            });
    };
    // #endregion


    const sortStations = (a: keyof TProfilePlayer['dispatcherStats'], b: keyof TProfilePlayer['dispatcherStats']) => {
        if (sortStationsBy) {
            const _a = a;
            a = b;
            b = _a;
        }

        return data.player.dispatcherStats[b].time - data.player.dispatcherStats[a].time
    }

    const sortTrains = (a: keyof TProfilePlayer['trainStats'], b: keyof TProfilePlayer['trainStats']) => {
        if (sortTrainsBy2) {
            const _a = a;
            a = b;
            b = _a;
        }

        return data.player.trainStats[b][(sortTrainsByList[sortTrainsBy] ?? 'distance') as 'distance'] - data.player.trainStats[a][(sortTrainsByList[sortTrainsBy] ?? 'distance') as 'distance'];
    }

    const dispatcherStats = [...chunk(Object.keys(data.player.dispatcherStats).sort(sortStations), 8)];
    const [dispatcherPage, setDispatcherPage] = useState(1);

    const trainStats = [...chunk(Object.keys(data.player.trainStats).sort(sortTrains), 8)];
    const [trainPage, setTrainPage] = useState(1);

    const { t } = useTranslation();


    return <>
        <ConfirmModal showModal={hideLeaderboardStatsModal} setShowModal={setHideLeaderboardStatsModal}
            onConfirm={adminToggleHideLeaderboardPlayerProfile}
            title={t("admin.hideLeaderboard.modal.title")}
            description={t("admin.hideLeaderboard.modal.description")} />
        <ConfirmModal showModal={hideProfileModal} setShowModal={setHideProfileModal}
            onConfirm={adminHidePlayerProfile} title={t("admin.hide.modal.title")}
            description={t("admin.hide.modal.description")} />
        <div
            className="overflow-hidden ">
            <div className="px-4 pt-6 text-center lg:pb-8 xl:pb-11.5">
                <div
                    className="mx-auto max-w-44 rounded-full">
                    <div className="relative rounded-full">
                        <img className="rounded-full" src={data.player.avatar} alt="profile" />
                        {data.active &&
                            <span className="absolute w-full rounded-full border-white bg-[#219653] dark:border-black max-w-5.5 right-0 top-0 h-5.5 border-[3px]"></span>}
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-2xl font-semibold text-black dark:text-white">
                        {data.player.username} <UserIcons flags={data.player.flags} />
                    </h3>

                    <div
                        className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-2 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                        <div
                            className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                            <span className="font-semibold text-black dark:text-white">
                                {Math.floor(data.player.trainDistance / 1000)}km
                            </span>
                            <span className="text-sm text-wrap">{t("profile.stats.distance")}</span>
                        </div>
                        <div
                            className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                            <span className="font-semibold text-black dark:text-white">
                                {formatTime(data.player.dispatcherTime)}
                            </span>
                            <span className="text-sm text-wrap">{t("profile.stats.time")}</span>
                        </div>
                    </div>
                </div>

                {data.active && data.active.type === "train" &&
                    <div className="mx-auto text-center">
                        <h4 className="font-semibold text-black dark:text-white">{t("profile.active.train", { train: `${data.active.trainName} - ${data.active.trainNumber}`, server: data.active.server.toUpperCase() })}</h4>
                    </div>}

                {data.active && data.active.type === "station" &&
                    <div className="mx-auto text-center">
                        <h4 className="font-semibold text-black dark:text-white">{t("profile.active.station", { station: `${data.active.stationName} - ${data.active.stationShort}`, server: data.active.server.toUpperCase() })}</h4>
                    </div>}
            </div>

            <div className="px-5 pt-6 pb-5 sm:px-7.5 rounded-md">
                <h1 className="text-xl text-black dark:text-white pb-5">{t("profile.stations.header")}</h1>
                <div className="flex flex-row gap-4">
                    <a className='cursor-pointer' onClick={() => setSortStationsBy((prev) => prev === 0 ? 1 : 0)}><p className='text-base'>
                        <strong>{t('profile.stations.sortby.title')}</strong> {sortStationsBy === 0 ? t('profile.stations.sortby.max') : t('profile.stations.sortby.min')}
                    </p></a>
                </div>
                <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-3 xl:grid-cols-4 pt-4">
                    {dispatcherStats[dispatcherPage - 1].map(stationName => {
                        const station = data.player.dispatcherStats[stationName];

                        return <StationStat stationName={stationName} time={station.time} image={images.stations[stationName]} />
                    })}
                </div>
                <div className="flex flex-col pt-4">
                    <Paginator setPage={setDispatcherPage} page={dispatcherPage} pages={dispatcherStats.length} />
                </div>
            </div>

            <div className="px-5 pt-6 pb-5 sm:px-7.5 rounded-md">
                <h1 className="text-xl text-black dark:text-white pb-5">{t("profile.trains.header")}</h1>
                <div className="flex flex-col">
                    <a className='cursor-pointer' onClick={() => setSortTrainsBy2((prev) => prev === 0 ? 1 : 0)}><p className='text-base'>
                        <strong>{t('profile.trains.sortby.title')}</strong> {sortTrainsBy2 === 0 ? t('profile.trains.sortby.max') : t('profile.trains.sortby.min')}
                    </p></a>
                    <a className='cursor-pointer' onClick={() => setSortTrainsBy((prev) => {
                        prev++;
                        if (prev > 2) prev = 0;
                        return prev;
                    })}><p className='text-base'>
                            <strong>{t('profile.trains.sortby.title')}</strong> {t('profile.trains.sortby.' + sortTrainsByList[sortTrainsBy])}
                        </p></a>
                </div>
                <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-3 xl:grid-cols-4 pt-4">
                    {trainStats[trainPage - 1].map(trainName => {
                        const train = data.player.trainStats[trainName];
                        return <TrainStat trainName={trainName} time={train.time} distance={train.distance} score={train.score} image={images.trains[trainName]} />
                    })}
                </div>
                <div className="flex flex-col pt-4">
                    <Paginator setPage={setTrainPage} page={trainPage} pages={trainStats.length} />
                </div>
            </div>

            {/* <div className="bg-white px-5 pt-6 pb-5 shadow-default dark:bg-boxdark sm:px-7.5">

                <div className="flex flex-col rounded-sm border border-stroke dark:border-strokedark">
                    <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4">
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                {t("profile.stations.station")}
                            </h5>
                        </div>

                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                {t("profile.stations.time")}
                            </h5>
                        </div>
                    </div>
                    {Object.keys(data.player.dispatcherStats).sort((a, b) => data.player.dispatcherStats[b].time - data.player.dispatcherStats[a].time).map(stationName => {
                        const station = data.player.dispatcherStats[stationName];
                        return <div
                            className={`grid grid-cols-2 border-t border-t-stroke dark:border-t-strokedark`}
                            key={stationName}
                        >
                            <div className="flex items-center justify-center gap-3 p-2.5 lg:p-5">
                                <p className="text-black dark:text-white sm:block break-all">
                                    {stationName}
                                </p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 lg:p-5">
                                <p className="text-meta-3">{formatTime(station.time)}</p>
                            </div>
                        </div>;
                    })}

                </div>

            </div> */}
            {isAdmin && <>
                <div className="shadow-default items-center justify-center p-2.5 flex flex-col xl:p-5 gap-2">
                    <h1 className="text-xl text-black dark:text-white">{t("admin.header")}</h1>

                    <div className="items-center justify-center p-2.5 flex xl:p-5 gap-2 flex-wrap sm:flex-nowrap">

                        {data.player.flags.includes("leaderboard_hidden") ?
                            <button className={"inline-flex items-center justify-center rounded-md py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 bg-success"}
                                onClick={() => adminToggleHideLeaderboardPlayerProfile()}>
                                {t("admin.hideLeaderboard.button2")}
                            </button> :
                            <button className={"inline-flex items-center justify-center rounded-md py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 bg-danger"}
                                onClick={() => setHideLeaderboardStatsModal(true)}>
                                {t("admin.hideLeaderboard.button")}
                            </button>}

                        <button className="inline-flex items-center justify-center rounded-md bg-danger py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5"
                            onClick={() => setHideProfileModal(true)}>
                            {t("admin.hide.button")}
                        </button>

                        <button className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5"
                            onClick={() => adminForceUpdate()}>
                            {t("admin.update.button")}
                        </button>
                    </div>
                </div>
            </>}

            <div className="items-center justify-center p-2.5 flex flex-col xl:p-5 gap-2">
                <h1 className="text-sm text-black dark:text-white">
                    {t("profile.info", { date: dayjs(data.player.createdAt).format("DD/MM/YYYY") })}
                </h1>
            </div>

        </div>
    </>;
};