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


import { ChangeEvent, useEffect, useState } from "react";
import { LeaderboardTable } from "../../components/pages/leaderboard/LeaderboardTable.tsx";
import { useDebounce } from "use-debounce";
import { SearchWithChild } from "../../components/mini/util/Search.tsx";
import { useSearchParams } from "react-router-dom";
import { get } from "../../util/fetcher.ts";
import useSWR from "swr";
import { WarningAlert } from "../../components/mini/alerts/Warning.tsx";
import { ContentLoader, LoadError } from "../../components/mini/loaders/ContentLoader.tsx";
import { useTranslation } from "react-i18next";
import { Paginator } from "../../components/mini/util/Paginator.tsx";

export const Leaderboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState(new URLSearchParams());
    const [queryType, setQueryType] = useState(searchParams.get("type") ?? "train");

    const { data, error, isLoading } = useSWR(`/leaderboard/${queryType}/?${params.toString()}`, get, { refreshInterval: 10_000, errorRetryCount: 5 });

    const [searchItem, setSearchItem] = useState(searchParams.get("query") ?? "");
    const [sortBy, setSortBy] = useState(searchParams.get("sort_by") ?? "distance");
    const [searchValue] = useDebounce(searchItem, 500);

    const [page, setPage] = useState(parseInt(searchParams.get("page") as string) || 1);

    useEffect(() => {
        setSearchItem(searchParams.get("query") ?? "");
        setSortBy(searchParams.get("sort_by") ?? "distance");
        setPage(parseInt(searchParams.get("page") as string) || 1);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        searchValue && params.set("query", searchValue);
        sortBy && params.set("sort_by", sortBy);
        queryType && params.set("type", queryType);
        page && params.set("page", page.toString());

        setSearchParams(params.toString());
        setParams(params);
    }, [searchValue, sortBy, page]);

    useEffect(() => {
        setPage(1);
    }, [searchValue, sortBy]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target.value);
    };

    const { t } = useTranslation();

    return (
        <>
            <div className="flex pb-5">
                <WarningAlert title={"We're changing our domain!"} description="Due to simrail.pro being end of life (EOL), we're changing domain to simrail.alekswilc.dev. We're looking for a new maintainer! Z powodu zakończenia wsparcia dla simrail.pro, zmieniamy domene na simrail.alekswilc.dev. Szukamy nowego maintainera!" />
            </div>
            <div className="flex flex-col gap-10">
                <SearchWithChild handleInputChange={handleInputChange} searchItem={searchItem}>
                    <div className="items-center justify-center flex gap-2 flex-wrap sm:flex-nowrap">
                        <a
                            onClick={() => {
                                setSortBy("distance");
                                setQueryType("train");
                            }}
                            className={`cursor-pointer inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 grow ${(queryType === "train" && sortBy === "distance") ? "bg-opacity-70" : ""}`}>{t("leaderboard.buttons.trainDistance")}</a>

                        <a
                            onClick={() => {
                                setSortBy("points");
                                setQueryType("train");
                            }}
                            className={`cursor-pointer inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 grow ${(queryType === "train" && sortBy === "points") ? "bg-opacity-70" : ""}`}>{t("leaderboard.buttons.trainPoints")}</a>

                        <a
                            onClick={() => {
                                setSortBy(undefined!);
                                setQueryType("station");
                            }}
                            className={`cursor-pointer inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-70 lg:px-4 xl:px-5 grow ${queryType === "station" ? "bg-opacity-50" : ""}`}>{t("leaderboard.buttons.dispatcherTime")}</a>

                    </div>
                </SearchWithChild>
                <>
                    {error && <LoadError />}

                    {isLoading && <ContentLoader />}

                    {data && (data && data.code === 404) || (data && !data?.data?.records?.length) &&
                        <WarningAlert title={t("content_loader.notfound.header")}
                            description={t("content_loader.notfound.description")} />}

                    {data && data.code === 200 && data.data && !!data?.data?.records?.length &&
                        <>
                            <LeaderboardTable list={data.data.records} queryType={queryType}
                                isUnmodified={page === 1 && !searchValue} />
                            <Paginator page={page} pages={data.data.pages} setPage={setPage} />
                        </>
                    }
                </>

            </div>
        </>
    );
};
