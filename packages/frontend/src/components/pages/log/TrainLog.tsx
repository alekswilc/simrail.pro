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
import { TLogTrainData } from "../../../types/log.ts";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";


export const TrainLog = ({ data }: { data: TLogTrainData }) =>
{
    const { t } = useTranslation();

    const copyLink = () =>
    {
        void navigator.clipboard.writeText(location.href);
        toast.success(t("log.toasts.copied"));
    };

    const report = () =>
    {
        toast.info(t("log.toasts.report"), {
            autoClose: 5000,
        });
        void navigator.clipboard.writeText(`;user: \`${ data.player.username }\`\n;steam: \`${ data.player.id }\`\n;left: <t:${ Math.floor(data.leftDate / 1000) }>${ data.joinedDate ? `\n;joined: <t:${ Math.floor(data.joinedDate / 1000) }>` : "" }\n;train: \`${ data.trainNumber }\`\n;link: ${ location.href }\n\n`);
    };

    return <div
            className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 pt-6 text-center lg:pb-8 xl:pb-11.5">
            <div
                    className="mx-auto w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative drop-shadow-2">
                    <img className="rounded-full" src={ data.player.avatar } alt="profile"/>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                    { data.player.username } { data.player.flags.includes("verified") &&
                        <FaCheck className={ "inline text-meta-3 ml-1" }/> }
                </h3>
            </div>
        </div>

        <div className="bg-white px-5 pt-6 pb-5 shadow-default dark:bg-boxdark sm:px-7.5">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-end">
                <div className="flex flex-col">
                    <h1 className="text-xl text-black dark:text-white pb-5">{ t("log.train.header") }</h1>
                    <p>{ t("log.train.server", { server: data.server.toUpperCase() }) }</p>
                    <p>{ t("log.train.train", { name: data.trainName, number: data.trainNumber }) }</p>

                    {
                            !data.player.flags.includes("private") &&
                            <>
                                { (data.distance || data.distance === 0) &&
                                        <p>{ t("log.train.distance", { distance: (data.distance / 1000).toFixed(2) }) }</p> }

                                { (data.points || data.points === 0) &&
                                        <p>{ t("log.train.points", { points: data.points }) }</p> }
                            </>
                    }

                    { data.joinedDate &&
                            <p>{ t("log.train.joined", { date: dayjs(data.joinedDate).format("DD/MM/YYYY HH:mm") }) }</p> }
                    <p>{ t("log.train.left", { date: dayjs(data.leftDate).format("DD/MM/YYYY HH:mm") }) }</p>
                    { data.joinedDate &&
                            <p>{ t("log.train.spent", { date: dayjs.duration(data.leftDate - data.joinedDate).format("H[h] m[m]") }) }</p> }
                </div>
                <div className="flex flex-col gap-5 mt-5 sm:mt-0 sm:ml-auto">
                    <a
                            onClick={ report }
                            className="cursor-pointer inline-flex items-center justify-center rounded-md bg-meta-7 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        { t("log.buttons.report") }
                    </a>

                    <a
                            onClick={ copyLink }
                            className="cursor-pointer inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >

                        { t("log.buttons.copy") }
                    </a>
                    <Link
                            to={ "/profile/" + data.player.id }
                            className={ `inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10  ${ data.player.flags.includes("private") ? "bg-opacity-50" : "" }` }
                            style={ data.player.flags.includes("private") ? { pointerEvents: "none" } : undefined }
                    >

                        { t("log.buttons.profile") }
                    </Link>
                </div>
            </div>
        </div>
    </div>;
};