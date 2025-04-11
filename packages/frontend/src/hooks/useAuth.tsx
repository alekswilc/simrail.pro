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


import { useContext, createContext, ReactNode } from "react";
import useSWR from "swr";
import { get } from "../util/fetcher.ts";
import useLocalStorage from "./useLocalStorage.tsx";

export type AdminContext = { isAdmin: boolean; username: string; token: string; };

const defaultValue: AdminContext = { isAdmin: false, username: "", token: "" };

const AuthContext = createContext<AdminContext>(defaultValue);


// {"code":200,"status":true,"data":{"isAdmin":true,"username":"alekswilc","token":"test"}}
const getUserAuthData = () =>
{
    const [ value, _setValue ] = useLocalStorage<string | undefined>("auth_token", undefined);

    if (!value || value === "undefined")
    {
        return { isAdmin: false, username: "", token: "" };
    }

    const { data } = useSWR(`/admin/auth/?token=${ value }`, get);

    return data ? { isAdmin: data.data.isAdmin, username: data.data.username, token: value } : { isAdmin: false, username: "", token: "" };
};

export const AuthProvider = ({ children }: { children: ReactNode }) =>
{
    return <AuthContext.Provider value={ getUserAuthData() }>{ children }</AuthContext.Provider>;
};

export const useAuth = () =>
{
    return useContext(AuthContext);
};
