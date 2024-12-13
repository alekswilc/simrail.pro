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

import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () =>
{
    const [ colorMode, setColorMode ] = useLocalStorage<"light" | "dark">("color-theme", "dark");

    useEffect(() =>
    {
        const className = "dark";
        const bodyClass = window.document.body.classList;

        colorMode === "dark"
                ? bodyClass.add(className)
                : bodyClass.remove(className);
    }, [ colorMode ]);

    return [ colorMode, setColorMode ];
};

export default useColorMode;
