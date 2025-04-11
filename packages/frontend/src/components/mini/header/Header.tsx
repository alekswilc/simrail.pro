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

import DarkModeSwitcher from "./DarkModeSwitcher.tsx";
import ReactCountryFlag from "react-country-flag";
import i18n from "i18next";

export const Header = (props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
}) =>
{
    return (
            <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
                <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                        <button
                                aria-controls="sidebar"
                                onClick={ (e) =>
                                {
                                    e.stopPropagation();
                                    props.setSidebarOpen(!props.sidebarOpen);
                                } }
                                className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                        >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                        className={ `relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                                !props.sidebarOpen && "!w-full delay-300"
                        }` }
                ></span>
                <span
                        className={ `relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                                !props.sidebarOpen && "delay-400 !w-full"
                        }` }
                ></span>
                <span
                        className={ `relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                                !props.sidebarOpen && "!w-full delay-500"
                        }` }
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                        className={ `absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                                !props.sidebarOpen && "!h-0 !delay-[0]"
                        }` }
                ></span>
                <span
                        className={ `delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                                !props.sidebarOpen && "!h-0 !delay-200"
                        }` }
                ></span>
              </span>
            </span>
                        </button>

                    </div>

                    <div className="hidden sm:block"></div>

                    <div className="flex items-center gap-3 2xsm:gap-7">
                        <ul className="flex items-center gap-2 2xsm:gap-4">
                            <a className="cursor-pointer" onClick={ () => i18n.changeLanguage("pl") }>
                                <ReactCountryFlag countryCode={ "PL" } svg alt={ "PL" }/>
                            </a>
                            <a className="cursor-pointer" onClick={ () => i18n.changeLanguage("en") }>
                                <ReactCountryFlag countryCode={ "US" } svg alt={ "EN" }/>
                            </a>
                            <a className="cursor-pointer" onClick={ () => i18n.changeLanguage("cs") }>
                                <ReactCountryFlag countryCode={ "CZ" } svg alt={ "CZ" }/>
                            </a>
                        </ul>
                        <ul className="flex items-center gap-2 2xsm:gap-4">
                            <DarkModeSwitcher/>
                        </ul>
                    </div>
                </div>
            </header>
    );
};