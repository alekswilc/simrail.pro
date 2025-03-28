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

// TODO: typings
export const removeProperties = <T>(data: any, names: string[]) =>
{
    for (const name of names)
    {
        delete data[ name ];
    }
    return data as T;
};


// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
export const escapeRegexString = (str: string) =>
{
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const isTruthyAndGreaterThanZero = (data: number) =>
{
    if (!data)
    {
        return false;
    }
    return data > 0;
};

export const arrayGroupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
    Object.values((array.reduce((acc, value, index, array) =>
    {
        (acc[ predicate(value, index, array) ] ||= []).push(value);
        return acc;
    }, {} as { [ key: string ]: T[] }))).flat();