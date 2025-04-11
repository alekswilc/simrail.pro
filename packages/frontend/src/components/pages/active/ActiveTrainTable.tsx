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
import { TActiveTrainPlayersData } from "../../../types/active.ts";
import { UserIcons } from "../../mini/icons/UserIcons.tsx";
import { toast } from "react-toastify";

export const ActiveTrainTable = ({ trains }: {
    trains: TActiveTrainPlayersData[],
}) =>
{
    const { t } = useTranslation();

    const report = (data: TActiveTrainPlayersData) =>
    {
        toast.info(t("log.toasts.report"), {
            autoClose: 5000,
        });
        void navigator.clipboard.writeText(`;user: \`${ data.player.username }\`\n;steam: \`https://steamcommunity.com/profiles/${ data.player.id }\`\n;server: \`${ data.server.toUpperCase() }\`\n;train: \`${ data.trainNumber }\`\n;link: https://${ location.hostname }/profile/${ data.player.id }\n\n`);
    };

    return (
            <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-3 xl:grid-cols-4">
                { trains.map((train) =>
                {
                    return <div
                            key={ train.server + train.trainNumber }
                            className="flex flex-col align-center items-center rounded-sm border border-stroke bg-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="p-4">
                            <img className="rounded-full"
                                 src={ train.player.avatar }
                                 alt="Player"/>
                        </div>
                        <div className="flex flex-col p-2 align-center items-center">
                            <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                { train.player.username }
                                <UserIcons flags={ train.player.flags }/>
                            </h4>
                            <p>{ t("log.train.train", { name: train.trainName, number: train.trainNumber }) }</p>
                            <p>{ t("log.train.server", { server: train.server.toUpperCase() }) }</p>
                        </div>

                        <div className="items-center justify-center p-2.5 flex xl:p-5 gap-2 flex-wrap mt-auto mb-2">
                            <Link to={ "/profile/" + (train.steam ?? train.player.id) }
                                  className={ `inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 ${ train.player.flags.includes("private") ? "bg-opacity-50" : "" }` }
                                  style={ train.player.flags.includes("private") ? { pointerEvents: "none" } : undefined }>{ t("log.buttons.profile") }</Link>
                            <a
                                    onClick={ () => report(train) }
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