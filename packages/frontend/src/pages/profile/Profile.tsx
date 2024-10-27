import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TProfileData, TProfileResponse } from '../../types/profile.ts';
import { ContentLoader } from '../../components/mini/loaders/ContentLoader.tsx';
import { WarningAlert } from '../../components/mini/alerts/Warning.tsx';
import { ProfileCard } from '../../components/pages/profile/Profile.tsx';
import { useTranslation } from 'react-i18next';

export const Profile = () => {
    const { id } = useParams();


    const [error, setError] = useState<0 | 1 | 2 | 3>(0);
    const [data, setData] = useState<TProfileData>(undefined!);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/profiles/${id}`).then(x => x.json()).then((data: TProfileResponse) => {
            switch (data.code) {
                case 404:
                    setError(2);
                    break;
                case 403:
                    setError(3);
                    break;
                case 200:
                    setError(1);
                    setData(data.data);
                    console.log(data.data.steam);
                    break;
            }
        })
    }, [])

    const { t } = useTranslation();

    return (
        <>
            {/* LOADING */}
            {error === 0 && <ContentLoader />}
            {/* NOT FOUND */}
            {error === 2 && <WarningAlert title={t("profile.errors.notfound.title")} description={t("profile.errors.notfound.description")} />}
            {/* BLACKLISTED PROFILE */}
            {error === 3 && <WarningAlert title={t("profile.errors.blacklist.title")} description={t("profile.errors.blacklist.description")} />}
            {/* SUCCESS */}
            {error === 1 && <ProfileCard data={data} />}
        </>
    );
};

