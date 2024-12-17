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
