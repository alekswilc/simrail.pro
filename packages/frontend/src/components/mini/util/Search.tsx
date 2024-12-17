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

import { ChangeEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { FcInfo } from "react-icons/fc";

export const Search = ({ searchItem, handleInputChange }: {
    searchItem: string;
    handleInputChange: ChangeEventHandler,
}) =>
{
    const { t } = useTranslation();
    return <>
        <div
                className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div className="flex justify-center items-center">
                <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        onChange={ handleInputChange }
                        value={ searchItem }
                        placeholder={ t("search.placeholder") }
                />
            </div>
            <div className="flex pt-2 gap-1 align-center">
                <FcInfo/>
                <p className="text-sm text-black dark:text-white">
                    { t("search.tip") }
                </p>
            </div>

        </div>
    </>;
};