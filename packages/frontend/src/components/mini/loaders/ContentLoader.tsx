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

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ErrorAlertIcon } from "../icons/AlertIcons.tsx";


export const LoadError = () =>
{
    const { t } = useTranslation();

    return <div
            className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] dark:bg-[#1B1B24] px-7 py-8 shadow-md dark:bg-opacity-30 md:p-9">
        <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
            <ErrorAlertIcon/>
        </div>
        <div className="w-full">
            <h5 className="mb-3 font-semibold text-[#B45454]">
                { t("content_loader.error.header") }
            </h5>
            <ul>
                <li className="leading-relaxed text-[#CD5D5D]">
                    { t("content_loader.error.description") }
                </li>
                <li className="leading-relaxed text-[#CD5D5D]">
                    <div className="pt-4">
                        {/* TODO: add git issue params */ }
                        <div className="mb-7.5 flex flex-wrap gap-4">
                            <Link
                                    className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-70 lg:px-6 xl:px-8"
                                    to="https://git.alekswilc.dev/simrail/simrail.alekswilc.dev/issues/new">{ t("content_loader.error.report") }</Link>

                            <Link
                                    className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-70 lg:px-6 xl:px-8"
                                    to="#"
                                    onClick={ () => window.location.reload() }>{ t("content_loader.error.refresh") }</Link>
                        </div>

                    </div>

                </li>
            </ul>
        </div>
    </div>;
};

export const ContentLoader = () =>
{
    const [ error, setError ] = useState(false);
    useEffect(() =>
    {
        new Promise(res => setTimeout(res, 5000)).then(() =>
        {
            setError(true);
        });
    }, []);

    return (
            <>
                { error ? <LoadError/> : <div
                        className="flex h-screen items-center justify-center shadow-default bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"/>
                </div> }
            </>
    );
};
