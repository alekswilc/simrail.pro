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

import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { TStatsResponse } from "../types/stats.ts";
import { WarningAlert } from "../components/mini/alerts/Warning.tsx";
import { CardDataStats } from "../components/mini/util/CardDataStats.tsx";

export const Home: React.FC = () =>
{
    const { t } = useTranslation();

    const [ commit, setCommit ] = useState("");
    const [ version, setVersion ] = useState("");
    const [ trains, setTrains ] = useState(0);
    const [ dispatchers, setDispatchers ] = useState(0);
    const [ profiles, setProfiles ] = useState(0);

    useEffect(() =>
    {
        fetch(`${ import.meta.env.VITE_API_URL }/stats/`).then(x => x.json()).then((data: TStatsResponse) =>
        {
            data.data.git.commit && setCommit(data.data.git.commit);
            data.data.git.version && setVersion(data.data.git.version);

            //  ADD ALERT IF API DOESN'T WORK! toast?
            setTrains(data.data.stats.trains);
            setDispatchers(data.data.stats.dispatchers);
            setProfiles(data.data.stats.profiles);
        });
    }, []);


    return (
            <>
                <div className="flex pb-5">
                    <WarningAlert description={ t("preview.description") } title={ t("preview.title") }/>
                </div>

                <div className="flex flex-col gap-10">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                        <CardDataStats title={ t("home.stats.trains") } total={ trains.toString() }/>
                        <CardDataStats title={ t("home.stats.dispatchers") } total={ dispatchers.toString() }/>
                        <CardDataStats title={ t("home.stats.profiles") } total={ profiles.toString() }/>
                    </div>


                    <div
                            className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="px-4 pb-6 text-center">
                            <div className="mt-4">
                                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                                    { t("home.title") }
                                </h3>
                                <p className="font-medium">{ t("home.description") }</p>

                                <div className="p-4 md:p-6 xl:p-9 flex gap-2 justify-center">
                                    <Link
                                            to="https://git.alekswilc.dev/simrail/simrail.alekswilc.dev"
                                            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                    >
                                        { t("home.buttons.project") }
                                    </Link>
                                    <Link
                                            to="https://forum.simrail.eu/topic/9142-logowanie-wyj%C5%9B%C4%87-z-posterunk%C3%B3w/"
                                            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                    >
                                        { t("home.buttons.forum") }
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                            className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="px-4 pb-6 text-center">

                            <div className="mt-6.5">
                                <p><Trans
                                        i18nKey={ t("home.footer.author") }
                                        values={ { author: "alekswilc" } }
                                        components={ {
                                            anchor: <Link className="color-orchid" to={ "https://www.alekswilc.dev" }/>,
                                        } }
                                /></p>
                                <p><Trans
                                        i18nKey={ t("home.footer.thanks") }
                                        components={ {
                                            bahu: <Link className="color-orchid" to={ "https://bahu.pro/" }/>,
                                            simrailelite: <Link className="color-orchid"
                                                                to={ "https://discord.gg/yDhy3pDrVr" }/>,
                                        } }
                                /></p>
                                <p>{ t("home.footer.license") } <a className="color-orchid"
                                                                      href={ "/LICENSE.txt" }>GNU
                                    AGPL V3</a></p>
                                <p>{ t("home.footer.powered") } <Link className="color-orchid"
                                                                      to={ "https://tailadmin.com/" }>TailAdmin</Link>
                                </p>

                                <p>{ version && <Link className="color-orchid"
                                                      to={ `https://git.alekswilc.dev/simrail/simrail.alekswilc.dev/releases/tag/${ version }` }>{ version }</Link> }{ version && commit && " | " }{ commit &&
                                        <Link className="color-orchid"
                                              to={ `https://git.alekswilc.dev/simrail/simrail.alekswilc.dev/commit/${ commit }` }>{ commit }</Link> }</p>

                            </div>

                        </div>
                    </div>
                </div>


            </>
    );
};