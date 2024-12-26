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

import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup.tsx";
import { useTranslation } from "react-i18next";
import { HamburgerGoBackIcon } from "../icons/SidebarIcons.tsx";
import { ArrowIcon } from "../icons/ArrowIcon.tsx";
import { FaHome, FaClipboardList } from "react-icons/fa";
import { FaChartSimple, FaTrain, FaBuildingFlag, FaBolt, FaUsers } from "react-icons/fa6";
import { useAuth } from "../../../hooks/useAuth.tsx";

interface SidebarProps
{
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) =>
{
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [ sidebarExpanded, setSidebarExpanded ] = useState(
            storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
    );

    const { t } = useTranslation();

    // close on click outside
    useEffect(() =>
    {
        const clickHandler = ({ target }: MouseEvent) =>
        {
            if (!sidebar.current || !trigger.current)
            {
                return;
            }
            if (
                    !sidebarOpen ||
                    sidebar.current.contains(target) ||
                    trigger.current.contains(target)
            )
            {
                return;
            }
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() =>
    {
        const keyHandler = ({ keyCode }: KeyboardEvent) =>
        {
            if (!sidebarOpen || keyCode !== 27)
            {
                return;
            }
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() =>
    {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded)
        {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        }
        else
        {
            document.querySelector("body")?.classList.remove("sidebar-expanded");
        }
    }, [ sidebarExpanded ]);

    const { isAdmin, username } = useAuth();

    return (
            <aside
                    ref={ sidebar }
                    className={ `absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${ sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }` }
            >
                {/* <!-- SIDEBAR HEADER --> */ }
                <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                    <button
                            ref={ trigger }
                            onClick={ () => setSidebarOpen(!sidebarOpen) }
                            aria-controls="sidebar"
                            aria-expanded={ sidebarOpen }
                            className="block lg:hidden"
                    >
                        <HamburgerGoBackIcon/>
                    </button>
                </div>
                {/* <!-- SIDEBAR HEADER --> */ }

                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                        <div>
                            <ul className="mb-6 flex flex-col gap-1.5">
                                <li>
                                    <NavLink
                                            to="/"
                                            className={ `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${ pathname === "/" &&
                                            "bg-graydark dark:bg-meta-4"
                                            }` }
                                    >
                                        <FaHome/>
                                        { t("sidebar.home") }
                                    </NavLink>
                                </li>


                            </ul>
                            <ul className="mb-6 flex flex-col gap-1.5">
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                                    { t("sidebar.info") }
                                </h3>

                                <li>
                                    <NavLink
                                            to="/profiles"
                                            className={ `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${ pathname === "/profiles" &&
                                            "bg-graydark dark:bg-meta-4"
                                            }` }
                                    >
                                        <FaUsers/>
                                        { t("sidebar.profiles") }
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                            to="/leaderboard"
                                            className={ `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${ pathname.includes("/leaderboard") &&
                                            "bg-graydark dark:bg-meta-4"
                                            }` }
                                    >
                                        <FaChartSimple/>
                                        { t("sidebar.leaderboard") }
                                    </NavLink>
                                </li>

                                <SidebarLinkGroup
                                        isOpen={ true }
                                        activeCondition={
                                                pathname === "/logs" || pathname.includes("logs")
                                        }
                                >
                                    { (handleClick, open) =>
                                    {
                                        return (
                                                <React.Fragment>
                                                    <NavLink
                                                            to="#"
                                                            className={ `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${ (pathname === "/logs" ||
                                                                    pathname.includes("logs")) &&
                                                            "bg-graydark dark:bg-meta-4"
                                                            }` }
                                                            onClick={ (e) =>
                                                            {
                                                                e.preventDefault();
                                                                sidebarExpanded
                                                                        ? handleClick()
                                                                        : setSidebarExpanded(true);
                                                            } }
                                                    >
                                                        <FaClipboardList/>
                                                        { t("sidebar.logs") }
                                                        <ArrowIcon rotated={ open }/>
                                                    </NavLink>

                                                    <div
                                                            className={ `translate transform overflow-hidden ${ !open && "hidden"
                                                            }` }
                                                    >
                                                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                            <li>
                                                                <NavLink
                                                                        to="/logs/stations"
                                                                        className={ ({ isActive }) =>
                                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                                (isActive && "!text-white")
                                                                        }
                                                                >
                                                                    <FaBuildingFlag/>
                                                                    { t("sidebar.stations") }
                                                                </NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink
                                                                        to="/logs/trains"
                                                                        className={ ({ isActive }) =>
                                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                                (isActive && "!text-white")
                                                                        }
                                                                >
                                                                    <FaTrain/>
                                                                    { t("sidebar.trains") }
                                                                </NavLink>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </React.Fragment>
                                        );
                                    } }
                                </SidebarLinkGroup>

                                <SidebarLinkGroup
                                        isOpen={ true }

                                        activeCondition={
                                                pathname === "/active/trains" || pathname.includes("active/trains")
                                        }
                                >
                                    { (handleClick, open) =>
                                    {
                                        return (
                                                <React.Fragment>
                                                    <NavLink
                                                            to="#"
                                                            className={ `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${ (pathname === "/active" ||
                                                                    pathname.includes("/active/")) &&
                                                            "bg-graydark dark:bg-meta-4"
                                                            }` }
                                                            onClick={ (e) =>
                                                            {
                                                                e.preventDefault();
                                                                sidebarExpanded
                                                                        ? handleClick()
                                                                        : setSidebarExpanded(true);
                                                            } }
                                                    >
                                                        <FaBolt/>
                                                        { t("sidebar.active_players") }
                                                        <ArrowIcon rotated={ open }/>
                                                    </NavLink>
                                                    <div
                                                            className={ `translate transform overflow-hidden ${ !open && "hidden"
                                                            }` }
                                                    >
                                                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                            <li>
                                                                <NavLink
                                                                        to="/active/stations"
                                                                        className={ ({ isActive }) =>
                                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                                (isActive && "!text-white")
                                                                        }
                                                                >
                                                                    <FaBuildingFlag/>
                                                                    { t("sidebar.stations") }
                                                                </NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink
                                                                        to="/active/trains"
                                                                        className={ ({ isActive }) =>
                                                                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                                                                (isActive && "!text-white")
                                                                        }
                                                                >
                                                                    <FaTrain/>
                                                                    { t("sidebar.trains") }
                                                                </NavLink>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </React.Fragment>
                                        );
                                    } }
                                </SidebarLinkGroup>
                            </ul>

                            { isAdmin && <ul className="mb-6 flex flex-col gap-1.5">
                                <h3 className="ml-4 text-sm font-semibold text-bodydark2">
                                    { t("sidebar.admin") }
                                </h3>

                                <li>
                                    <p className="group relative flex items-center rounded-sm py-2 px-4 text-sm text-bodydark1 duration-300 ease-in-out ">{ t("sidebar.logged", { username }) }</p>
                                </li>
                                <button onClick={ () =>
                                {
                                    window.localStorage.setItem("auth_token", "undefined");
                                    window.location.reload();
                                } }
                                        className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-8 text-center text-sm text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                >{ t("sidebar.logout") }
                                </button>

                            </ul> }
                        </div>
                    </nav>
                    {/* <!-- Sidebar Menu --> */ }
                </div>
            </aside>
    );
};