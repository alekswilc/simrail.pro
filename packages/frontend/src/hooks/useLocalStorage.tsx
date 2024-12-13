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

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(
        key: string,
        initialValue: T,
): [ T, (value: SetValue<T>) => void ]
{
    const [ storedValue, setStoredValue ] = useState(() =>
    {
        try
        {
            const item = window.localStorage.getItem(key);
            if (item) {
                try {
                    return item ? JSON.parse(item) : initialValue;
                }
                catch {
                    return item ? item : initialValue;
                }
            }
        } catch (error)
        {
            return initialValue;
        }
    });

    useEffect(() =>
    {
        try
        {
            const valueToStore =
                    typeof storedValue === "function"
                            ? storedValue(storedValue)
                            : storedValue;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error)
        {
            console.log(error);
        }
    }, [ key, storedValue ]);

    return [ storedValue, setStoredValue ];
}

export default useLocalStorage;
