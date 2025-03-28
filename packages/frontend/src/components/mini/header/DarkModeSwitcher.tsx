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

import useColorMode from "../../../hooks/useColorMode";
import { DarkIcon, LightIcon } from "../icons/DarkModeSwitchIcons.tsx";

const DarkModeSwitcher = () =>
{
    const [ colorMode, setColorMode ] = useColorMode();

    return (
            <li>
                <label
                        className={ `relative m-0 block h-7.5 w-14 rounded-full ${
                                colorMode === "dark" ? "bg-primary" : "bg-stroke"
                        }` }
                >
                    <input
                            type="checkbox"
                            onChange={ () =>
                            {
                                if (typeof setColorMode === "function")
                                {
                                    setColorMode(colorMode === "light" ? "dark" : "light");
                                }
                            } }
                            className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
                    />
                    <span
                            className={ `absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
                                    colorMode === "dark" && "!right-[3px] !translate-x-full"
                            }` }
                    >
                        <span className="dark:hidden">
                            <LightIcon />
                        </span>
                        <span className="hidden dark:inline-block">
                            <DarkIcon />
                        </span>
                    </span>
                </label>
            </li>
    );
};

export default DarkModeSwitcher;
