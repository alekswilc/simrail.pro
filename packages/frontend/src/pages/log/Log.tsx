import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContentLoader } from "../../components/mini/loaders/ContentLoader.tsx";
import { WarningAlert } from "../../components/mini/alerts/Warning.tsx";
import { useTranslation } from "react-i18next";
import { TLogResponse, TLogStationData, TLogTrainData } from "../../types/log.ts";
import { StationLog } from "../../components/pages/log/StationLog.tsx";
import { TrainLog } from "../../components/pages/log/TrainLog.tsx";
import { PageMeta } from "../../components/mini/util/PageMeta.tsx";

export const Log = () =>
{
    const { id } = useParams();

    const [ error, setError ] = useState<0 | 1 | 2 | 3>(0);
    const [ trainData, setTrainData ] = useState<TLogTrainData>(undefined!);
    const [ stationData, setStationData ] = useState<TLogStationData>(undefined!);

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
                { error === 2 && <PageMeta title="simrail.alekswilc.dev | Record not found"
                                           description="This record could not be found."/> }
                { error === 2 && <WarningAlert title={ t("log.errors.notfound.title") }
                                               description={ t("log.errors.notfound.description") }/> }
                {/* BLACKLISTED LOG */ }
                { error === 3 && <PageMeta title="simrail.alekswilc.dev | Blacklisted record"
                                           description="The record has been blocked."/> }
                { error === 3 && <WarningAlert title={ t("log.errors.blacklist.title") }
                                               description={ t("log.errors.blacklist.description") }/> }
                {/* SUCCESS */ }
                { error === 1 && stationData && <PageMeta
                        title={ `simrail.alekswilc.dev | ${ stationData.userUsername }` }
                        image={ stationData.userAvatar }
                        description={ `${ stationData.stationName } - ${ stationData.stationShort }` }/> }
                { error === 1 && stationData && < StationLog data={ stationData }/> }

                { error === 1 && trainData && <PageMeta
                        title={ `simrail.alekswilc.dev | ${ trainData.userUsername }` }
                        image={ trainData.userAvatar }
                        description={ `${ trainData.trainName } - ${ trainData.trainNumber }` }/> }
                { error === 1 && trainData && < TrainLog data={ trainData }/> }
            </>
    );
};

