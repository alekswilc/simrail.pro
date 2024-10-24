
import { Link } from 'react-router-dom';
import { TLeaderboardRecord } from '../../types/leaderboard.ts';
import { useTranslation } from 'react-i18next';

const trains: TLeaderboardRecord[] = { "success": true, "data": { "records": [{ "id": "cad73c6c-53e6-43f7-bcbf-82b7cbe0f50b", "steam": "76561198278896700", "steamName": "xxx", "trainTime": 1428812, "trainPoints": 1662, "trainDistance": 20723, "dispatcherTime": 4841181851, "dispatcherStats": { "Dąbrowa Górnicza Ząbkowice": { "time": 4841181851 } }, "trainStats": { "EN71": { "distance": 18416, "score": 0, "time": 1180127 }, "EN96": { "distance": 2307, "score": 1662, "time": 248685 } } }, { "id": "c2310930-7a24-4984-bcd8-bf8ceeb52e3a", "steam": "76561199012181691", "steamName": "KifoHa WIN.SKINS", "trainTime": 0, "trainPoints": 0, "trainDistance": 0, "dispatcherTime": 4838576868, "dispatcherStats": { "Katowice": { "time": 4838576868 } } }, { "id": "54d71c47-0bb5-4436-a6f5-af74b578c1c8", "steam": "76561197990737195", "steamName": "sebger", "trainTime": 0, "trainPoints": 0, "trainDistance": 0, "dispatcherTime": 4414893359, "dispatcherStats": { "Łazy Ła": { "time": 4414893359 } } }, { "id": "b8ecaf9f-7401-4089-915e-6ce297e51be3", "steam": "76561198799185367", "steamName": "Tutakus", "trainTime": 2376567, "dispatcherTime": 4413227316, "trainStats": { "Traxx (E186)": { "distance": 40000, "score": 0, "time": 2376567 } }, "trainDistance": 40000, "trainPoints": 0, "dispatcherStats": { "Włoszczowa Północ": { "time": 4413227316 } } }, { "id": "b443ba00-ece0-4255-8d27-a863b92e1812", "steam": "76561198264136517", "steamName": "DrWorter", "trainTime": 0, "trainPoints": 0, "trainDistance": 0, "dispatcherTime": 4078328473, "dispatcherStats": { "Strzałki": { "time": 4078328473 } } }, { "id": "add8b491-27c9-4e61-a246-d17896493dc8", "steam": "76561198362204493", "steamName": "Kamil6065", "trainTime": 0, "trainPoints": 0, "trainDistance": 0, "dispatcherTime": 2227701379, "dispatcherStats": { "Biała Rawska": { "time": 2227701379 } } }, { "id": "94bd56da-7ceb-4bf1-b1bc-0d3736c63d73", "steam": "76561197968142289", "steamName": "Hubson", "trainTime": 1524538, "trainPoints": 872, "trainDistance": 29370, "dispatcherTime": 1852886798, "dispatcherStats": { "Dąbrowa Górnicza Wschodnia": { "time": 241818 }, "Sosnowiec Główny": { "time": 1852644980 } }, "trainStats": { "Traxx (E186)": { "distance": 29370, "score": 872, "time": 1524538 } } }, { "id": "952ff355-239d-40a1-86b7-fcb09414b363", "steam": "76561198053222412", "steamName": "t_reks", "trainTime": 0, "trainPoints": 0, "trainDistance": 0, "dispatcherTime": 1851283324, "dispatcherStats": { "Idzikowice": { "time": 1851283324 } } }, { "id": "4d181e15-c06a-484d-b61b-11c21d080647", "steam": "76561199100147616", "steamName": "Pagor", "trainTime": 0, "trainPoints": 0, "trainDistance": 0, "dispatcherTime": 1849854575, "dispatcherStats": { "Szeligi": { "time": 1849854575 } } }, { "id": "97799495-ed7b-493d-aea0-51b8c61f1a31", "steam": "76561198405571901", "steamName": "volvo", "trainTime": 0, "trainPoints": 0, "trainDistance": 0, "dispatcherTime": 429421112, "dispatcherStats": { "Tunel": { "time": 429421112 } } }] }, "code": 200 }.data.records;

const StationTable = ({ stations }: { stations: TLeaderboardRecord[] }) => {
    const { t } = useTranslation();

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            {/* <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top
      </h4> */}

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
                        className={`grid grid-cols-2 sm:grid-cols-3 ${stations.length === (key+1) // todo: ...
                            ? ''
                            : 'border-b border-stroke dark:border-strokedark'
                            }`}
                        key={station.id}
                    >
                        <div className="flex items-center gap-3 p-5 lg:p-5">
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
        </div>
    );
}

export const StationLeaderboard = () => {
    return (
        <>
            <div className="flex flex-col gap-10">
                {/* TODO: get data from API */}
                <StationTable stations={trains} />
            </div>
        </>
    );
};
