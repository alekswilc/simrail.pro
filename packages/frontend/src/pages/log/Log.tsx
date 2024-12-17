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

import { useParams } from "react-router-dom";
import { ContentLoader, LoadError } from "../../components/mini/loaders/ContentLoader.tsx";
import { WarningAlert } from "../../components/mini/alerts/Warning.tsx";
import { useTranslation } from "react-i18next";
import { StationLog } from "../../components/pages/log/StationLog.tsx";
import { TrainLog } from "../../components/pages/log/TrainLog.tsx";
import { PageMeta } from "../../components/mini/util/PageMeta.tsx";
import { get } from "../../util/fetcher.ts";
import useSWR from "swr";

export const Log = () =>
{
    const { id } = useParams();
    const { data, error, isLoading } = useSWR(`/log/${ id }`, get, { refreshInterval: 30_000, errorRetryCount: 5 });

    const { t } = useTranslation();

    return (
            <>
                {/* ERROR */ }
                { error && <LoadError/> }
                {/* LOADING */ }
                { isLoading && <ContentLoader/> }
                {/* NOT FOUND */ }
                { data && data.code === 404 && <PageMeta title="simrail.pro | Record not found"
                                                         description="This record could not be found."/> }
                { data && data.code === 404 && <WarningAlert title={ t("log.errors.notfound.title") }
                                                             description={ t("log.errors.notfound.description") }/> }
                {/* BLACKLISTED LOG */ }
                { data && data.code === 403 && <PageMeta title="simrail.pro | Blacklisted record"
                                                         description="The record has been blocked."/> }
                { data && data.code === 403 && <WarningAlert title={ t("log.errors.blacklist.title") }
                                                             description={ t("log.errors.blacklist.description") }/> }
                {/* SUCCESS */ }
                { data && data.code === 200 && !("trainNumber" in data.data) && <PageMeta
                        title={ `simrail.pro | ${ data.data.player.username }` }
                        image={ data.data.player.avatar }
                        description={ `${ data.data.stationName } - ${ data.data.stationShort }` }/> }
                { data && data.code === 200 && !("trainNumber" in data.data) && data.data &&
                        < StationLog data={ data.data }/> }

                { data && data.code === 200 && ("trainNumber" in data.data) && <PageMeta
                        title={ `simrail.pro | ${ data.data.player.username }` }
                        image={ data.data.player.avatar }
                        description={ `${ data.data.trainName } - ${ data.data.trainNumber }` }/> }
                { data && data.code === 200 && ("trainNumber" in data.data) && < TrainLog data={ data.data }/> }
            </>
    );
};

