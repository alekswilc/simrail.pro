import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContentLoader } from "../../components/mini/loaders/ContentLoader.tsx";
import { WarningAlert } from "../../components/mini/alerts/Warning.tsx";
import { useTranslation } from "react-i18next";
import { PageTitle } from "../../components/mini/util/PageTitle.tsx";
import { TLogResponse, TLogStationData, TLogTrainData } from "../../types/log.ts";
import { StationLog } from "../../components/pages/log/StationLog.tsx";

export const Log = () =>
{
    const { id } = useParams();

    const [ error, setError ] = useState<0 | 1 | 2 | 3>(0);
    const [ trainData, setTrainData ] = useState<TLogTrainData>(undefined!);
    const [ stationData, setStationData ] = useState<TLogStationData>(undefined!);

    trainData; // suppress error

    useEffect(() =>
    {
        fetch(`${ import.meta.env.VITE_API_URL }/log/${ id }`).then(x => x.json()).then((data: TLogResponse) =>
        {
            switch (data.code)
            {
                case 404:
                    setError(2);
                    break;
                case 403:
                    // NOT_IMPLEMENTED
                    setError(3);
                    break;
                case 200:
                    setError(1);

                    "trainNumber" in data.data ? setTrainData(data.data) : setStationData(data.data);
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
            { error === 2 && <PageTitle title={ `simrail.alekswilc.dev | Profile not found` }/> }
            { error === 2 && <WarningAlert title={ t("log.errors.notfound.title") }
                                           description={ t("log.errors.notfound.description") }/> }
            {/* BLACKLISTED PROFILE */ }
            { error === 3 && <PageTitle title={ `simrail.alekswilc.dev | Blacklisted profile` }/> }
            { error === 3 && <WarningAlert title={ t("log.errors.blacklist.title") }
                                           description={ t("log.errors.blacklist.description") }/> }
            {/* SUCCESS */ }
            { error === 1 && stationData && <PageTitle
                title={ `simrail.alekswilc.dev | ${ stationData.userUsername } | ${ stationData.stationName }` }/> }
            { error === 1 && stationData && < StationLog data={ stationData }/> }
        </>
    );
};

