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
import { ProfileCard } from "../../components/pages/profile/Profile.tsx";
import { useTranslation } from "react-i18next";
import { PageMeta } from "../../components/mini/util/PageMeta.tsx";
import { formatTime } from "../../util/time.ts";
import useSWR from 'swr';
import { fetcher } from "../../util/fetcher.ts";


export const Profile = () =>
{
    const { id } = useParams();
    const { data, error, isLoading } = useSWR(`/profiles/${ id }`, fetcher, { refreshInterval: 10_000, errorRetryCount: 5 });

    const { t } = useTranslation();

    return (
            <>
                {/* LOADING */ }
                { isLoading && <ContentLoader/> }
                {/* ERROR */}
                { error && <LoadError /> }
                {/* NOT FOUND */ }
                { data && data.code === 404 && <PageMeta title="simrail.pro | Profile not found"
                                           description="Player's profile could not be found or the player has a private Steam profile."/> }
                { data && data.code === 404 && <WarningAlert title={ t("profile.errors.notfound.title") }
                                               description={ t("profile.errors.notfound.description") }/> }

                {/* SUCCESS */ }
                { data && data.code === 200 && <PageMeta image={ data.data.player.username }
                                           title={ `simrail.pro | ${ data.data.player.username }'s profile` }
                                           description={ `${ data.data.player.trainDistance ? 0 : ((data.data.player.trainDistance / 1000).toFixed(2)) } driving experience |
${ data.data.player.dispatcherTime ? 0 : formatTime(data.data.player.dispatcherTime) } dispatcher experience` }/> }
                { data && data.code === 200 && <ProfileCard data={ data.data }/> }
            </>
    );
};

