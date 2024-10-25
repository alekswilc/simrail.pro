import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TLeaderboardRecord } from '../../types/leaderboard.ts';
import { ContentLoader } from '../loaders/ContentLoader.tsx';
import { ChangeEventHandler } from 'react';
import { NoRecordsFound } from '../common/NoRecordsFound.tsx';


export const StationTable = ({ stations, handleInputChange, searchItem, empty }: { stations: TLeaderboardRecord[], searchItem: string, handleInputChange: ChangeEventHandler, empty: boolean }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">

                <div className="flex justify-center items-center">

                    <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        onChange={handleInputChange}
                        value={searchItem}
                        placeholder='Type to search'
                    />
                </div>
            </div>

            {empty ? <NoRecordsFound /> : stations.length ? <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

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
                                    className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                >
                                    {t("leaderboard.profile")}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div> : <ContentLoader />}
        </>

    );
}
