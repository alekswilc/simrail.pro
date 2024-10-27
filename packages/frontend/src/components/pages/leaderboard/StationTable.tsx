import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TLeaderboardRecord } from '../../../types/leaderboard.ts';
import { ContentLoader } from '../../mini/loaders/ContentLoader.tsx';

import { WarningAlert } from '../../mini/alerts/Warning.tsx';


export const StationTable = ({ stations,  error }: { stations: TLeaderboardRecord[], error: number }) => {
    const { t } = useTranslation();

    return (
        <>

            {error === 2 && <WarningAlert title={t("contentloader.notfound.header")} description={t("contentloader.notfound.description")} />}
            {error === 0 && <ContentLoader />}
            {error === 1 && <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                <div className="flex flex-col">
                    <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                {t("leaderboard.user")}
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                {t("leaderboard.time")}
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                {t("leaderboard.actions")}
                            </h5>
                        </div>
                    </div>

                    {stations.map((station, key) => (
                        <div
                            className={`grid grid-cols-2 sm:grid-cols-3 ${stations.length === (key + 1) // todo: ...
                                ? ''
                                : 'border-b border-stroke dark:border-strokedark'
                                }`}
                            key={station.id}
                        >
                            <div className="flex justify-center items-center gap-3 p-5 lg:p-5">
                                <p className="text-black dark:text-white sm:block break-all">
                                    <Link to={"/profile/" + station.steam}
                                        className='color-orchid'>{station.steamName}</Link>
                                </p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 lg:p-5">
                                <p className="text-meta-3">{Math.floor(station.dispatcherTime / 3600000)}h</p>
                            </div>

                            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                <Link
                                    to={"/profile/" + station.steam}
                                    className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5"
                                >
                                    {t("leaderboard.profile")}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </>

    );
}
