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

import { TLeaderboardRecord } from "../../types/leaderboard.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { StationTable } from "../../components/pages/leaderboard/StationTable.tsx";
import { useDebounce } from "use-debounce";
import { Search } from "../../components/mini/util/Search.tsx";
import { useSearchParams } from "react-router-dom";

export const StationLeaderboard = () =>
{
    const [ data, setData ] = useState<TLeaderboardRecord[]>([]);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ searchItem, setSearchItem ] = useState(searchParams.get("q") ?? "");
    useEffect(() =>
    {
        fetch(`${ import.meta.env.VITE_API_URL }leaderboard/station/`).then(x => x.json()).then(x =>
        {

            setData(x.data.records);
        });
    }, []);

    const [ searchValue ] = useDebounce(searchItem, 500);
    const [ error, setError ] = useState<0 | 1 | 2>(0);

    useEffect(() =>
    {
        searchValue === "" ? searchParams.delete("q") : searchParams.set("q", searchValue);
        setSearchParams(searchParams);

        setData([]);
        setError(0);
        fetch(`${ import.meta.env.VITE_API_URL }/leaderboard/station/?q=${ searchValue }`).then(x => x.json()).then(x =>
        {
            setData(x.data.records);
            setError(x.data.records.length > 0 ? 1 : 2);
        });
    }, [ searchValue ]);

    useEffect(() =>
    {
        setSearchItem(searchParams.get("q") ?? "");
    }, [ searchParams ]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        setSearchItem(e.target.value);
    };

    return (
            <>
                <div className="flex flex-col gap-10">
                    <Search handleInputChange={ handleInputChange } searchItem={ searchItem }/>
                    <StationTable stations={ data } error={ error }/>
                </div>
            </>
    );
};
