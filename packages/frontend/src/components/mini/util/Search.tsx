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

import { ChangeEventHandler, Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

export const SearchWithServerSelector = ({ searchItem, handleInputChange, children, servers, server, setServer }: {
    searchItem: string;
    handleInputChange: ChangeEventHandler,
    children?: ReactNode
    servers: string[];
    server: string;
    setServer: Dispatch<SetStateAction<string>>
}) =>
{

    const { t } = useTranslation();


    return <>
        <div
                className="col-span-12 rounded-sm border border-stroke bg-white px-5 p-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div className="flex flex-col gap-6 xl:flex-row items-center justify-center">
                <div className="w-full xl:w-1/2 grow">
                    <input onChange={ handleInputChange }
                           value={ searchItem }
                           type="text" placeholder={ t("search.placeholder_with_station") }
                           className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"/>
                </div>
                { servers?.length &&
                        <div className="items-center justify-center flex gap-2 flex-wrap">
                            {
                                servers.map(x =>
                                {
                                    return <a
                                            onClick={ () =>
                                            {
                                                setServer(x);
                                            } }
                                            className={ `cursor-pointer inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 ${ server === x ? "bg-opacity-50" : "" }` }>{ x.toUpperCase() }</a>;
                                })
                            }

                            <a
                                    onClick={ () =>
                                    {
                                        setServer(undefined!);
                                    } }
                                    className={ `cursor-pointer inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 ${ !server ? "bg-opacity-50" : "" }` }>{ t("search.none") }</a>
                        </div> }
            </div>


            { children }
        </div>
    </>;
};

export const Search = ({ searchItem, handleInputChange }: {
    searchItem: string;
    handleInputChange: ChangeEventHandler,
}) =>
{
    const { t } = useTranslation();

    return <>
        <div
                className="col-span-12 rounded-sm border border-stroke bg-white px-5 p-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div className="flex flex-col gap-6 xl:flex-row items-center justify-center">
                <div className="w-full xl:w-1/2 grow">
                    <input onChange={ handleInputChange }
                           value={ searchItem }
                           type="text" placeholder={ t("search.placeholder") }
                           className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"/>
                </div>
            </div>

        </div>
    </>;
};

export const SearchWithChild = ({ searchItem, handleInputChange, children }: {
    searchItem: string;
    handleInputChange: ChangeEventHandler,
    children: ReactNode
}) =>
{

    const { t } = useTranslation();


    return <>
        <div
                className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            { children }

            <div className="mt-5 flex flex-col gap-6 xl:flex-row items-center justify-center">
                <div className="w-full xl:w-1/2 grow">
                    <input onChange={ handleInputChange }
                           value={ searchItem }
                           type="text" placeholder={ t("search.placeholder") }
                           className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"/>
                </div>
            </div>


        </div>
    </>;
};