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

import React, { useState, ReactNode, useEffect } from "react";
import { Header } from "../components/mini/header/Header";
import { Sidebar } from "../components/mini/sidebar/Sidebar";
import { useCookies } from 'react-cookie';
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';


export const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) =>
{
    const [ sidebarOpen, setSidebarOpen ] = useState(false);

    const { t } = useTranslation();

    const [cookies, setCookie, _removeCookie] = useCookies(['info1'], { doNotParse: true, doNotUpdate: true });

    useEffect(() =>
    {
        if (!cookies['info1']) {
            setCookie('info1', true, {
                maxAge: 259_200
            });
            toast.info(t("_.popup.ranking"), {
                autoClose: 15_000,
            });
        }
    }, []);


    return (
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar sidebarOpen={ sidebarOpen } setSidebarOpen={ setSidebarOpen }/>
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        <Header sidebarOpen={ sidebarOpen } setSidebarOpen={ setSidebarOpen }/>
                        <main>
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                { children }
                            </div>
                        </main>
                    </div>
                </div>
            </div>
    );
};

export default DefaultLayout;
