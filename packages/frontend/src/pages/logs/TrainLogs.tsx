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

import { ChangeEvent, useEffect, useState } from "react";
import { TrainTable } from "../../components/pages/logs/TrainTable.tsx";
import { useDebounce } from "use-debounce";
import { Search } from "../../components/mini/util/Search.tsx";
import { useSearchParams } from "react-router-dom";
import { WarningAlert } from "../../components/mini/alerts/Warning.tsx";
import { ContentLoader, LoadError } from "../../components/mini/loaders/ContentLoader.tsx";
import { useTranslation } from "react-i18next";
import { get } from "../../util/fetcher.ts";
import useSWR from "swr";

export const TrainLogs = () =>
{
    const [ params, setParams ] = useState(new URLSearchParams());
    const { data, error, isLoading } = useSWR(`/trains/?${ params.toString() }`, get, { refreshInterval: 10_000, errorRetryCount: 5 });

    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ searchItem, setSearchItem ] = useState(searchParams.get("q") ?? "");

    const [ searchValue ] = useDebounce(searchItem, 500);

    useEffect(() =>
    {
        searchValue === "" ? searchParams.delete("q") : searchParams.set("q", searchValue);

        const params = new URLSearchParams();
        searchValue && params.set("q", searchValue);

        setSearchParams(params.toString());
        setParams(params);
    }, [ searchValue ]);

    useEffect(() =>
    {
        setSearchItem(searchParams.get("q") ?? "");
    }, [ searchParams ]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        setSearchItem(e.target.value);
    };

    const { t } = useTranslation();

    return (
            <>
                <div className="flex flex-col gap-10">
                    <Search handleInputChange={ handleInputChange } searchItem={ searchItem }/>
                    <>
                        { error && <LoadError/> }

                        { isLoading && <ContentLoader/> }

                        { (data && data.code === 404) || (data && data.code === 200 && !data?.data?.records?.length) &&
                                <WarningAlert title={ t("content_loader.notfound.header") }
                                              description={ t("content_loader.notfound.description") }/> }

                        { data && data.code === 200 && !!data?.data?.records?.length &&
                                <TrainTable trains={ data.data.records }/> }
                    </>
                </div>
            </>
    );
};
