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
import { useParams } from "react-router-dom";
import { TProfileData, TProfileResponse } from "../../types/profile.ts";
import { ContentLoader } from "../../components/mini/loaders/ContentLoader.tsx";
import { WarningAlert } from "../../components/mini/alerts/Warning.tsx";
import { ProfileCard } from "../../components/pages/profile/Profile.tsx";
import { useTranslation } from "react-i18next";
import { PageMeta } from "../../components/mini/util/PageMeta.tsx";
import { formatTime } from "../../util/time.ts";

export const Profile = () =>
{
    const { id } = useParams();
    const [ error, setError ] = useState<0 | 1 | 2 | 3>(0);
    const [ data, setData ] = useState<TProfileData>(undefined!);

    useEffect(() =>
    {
        fetch(`${ import.meta.env.VITE_API_URL }/profiles/${ id }`).then(x => x.json()).then((data: TProfileResponse) =>
        {
            switch (data.code)
            {
                case 404:
                    setError(2);
                    break;
                case 403:
                    setError(3);
                    break;
                case 200:
                    setError(1);
                    setData(data.data);
                    break;
            }
        });
    }, []);

    const { t } = useTranslation();

    return (
            <>
                {/* LOADING */ }
                { error === 0 && <ContentLoader/> }
                {/* NOT FOUND */ }
                { error === 2 && <PageMeta title="simrail.alekswilc.dev | Profile not found"
                                           description="Player's profile could not be found or the player has a private Steam profile."/> }
                { error === 2 && <WarningAlert title={ t("profile.errors.notfound.title") }
                                               description={ t("profile.errors.notfound.description") }/> }
                {/* BLACKLISTED PROFILE */ }
                { error === 3 && <PageMeta title="simrail.alekswilc.dev | Blacklisted profile"
                                           description="This player's profile has been blocked."/> }
                { error === 3 && <WarningAlert title={ t("profile.errors.blacklist.title") }
                                               description={ t("profile.errors.blacklist.description") }/> }
                {/* SUCCESS */ }
                { error === 1 && <PageMeta image={ data.steam.avatarfull }
                                           title={ `simrail.alekswilc.dev | ${ data.steam.personname }'s profile` }
                                           description={ `${ data.player.trainDistance ? 0 : ((data.player.trainDistance / 1000).toFixed(2)) } driving experience |
${ data.player.dispatcherTime ? 0 : formatTime(data.player.dispatcherTime) } dispatcher experience` }/> }
                { error === 1 && <ProfileCard data={ data }/> }
            </>
    );
};

