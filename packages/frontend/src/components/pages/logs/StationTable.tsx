import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { ContentLoader } from "../../mini/loaders/ContentLoader.tsx";
import { TStationRecord } from "../../../types/station.ts";
import { WarningAlert } from "../../mini/alerts/Warning.tsx";
import { FaCheck } from 'react-icons/fa6';


// setSearchItem: Dispatch<SetStateAction<string>>
export const StationTable = ({ stations, error }: {
    stations: TStationRecord[], error: number
}) =>
{
    const { t } = useTranslation();

    return (
            <>
                { error === 2 && <WarningAlert title={ t("content_loader.notfound.header") }
                                               description={ t("content_loader.notfound.description") }/> }
                { error === 0 && <ContentLoader/> }

                { error === 1 && <div
                        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="flex flex-col">
                        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    { t("logs.user") }
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    { t("logs.station") }
                                </h5>
                            </div>
                            <div className="hidden sm:block p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    { t("logs.time") }
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    { t("logs.actions") }
                                </h5>
                            </div>
                        </div>

                        { stations.map((station, key) => (
                                <div
                                        className={ `grid grid-cols-3 sm:grid-cols-4 ${ stations.length === (key + 1)
                                                ? ""
                                                : "border-b border-stroke dark:border-strokedark"
                                        }` }
                                        key={ station.id }
                                >
                                    <div className="flex items-center justify-center gap-3 p-2.5 lg:p-5">
                                        <p className="text-black dark:text-white sm:block break-all">
                                            <Link to={ "/profile/" + station.userSteamId }
                                                  className="color-orchid">{ station.userUsername }</Link> { station.verified && <FaCheck className={ "inline text-meta-3 ml-1" }/> }
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center p-2.5 lg:p-5">
                                        <p className="text-meta-6 sm:block break-all">{ station.server.toUpperCase() } - { station.stationName ?? "--" }</p>
                                    </div>

                                    <div className="hidden sm:flex items-center justify-center p-2.5 lg:p-5">
                                        <p className="text-meta-3">{ dayjs(station.leftDate).format("HH:mm DD/MM/YYYY") }</p>
                                    </div>

                                    <div
                                            className="items-center justify-center p-2.5 flex xl:p-5 gap-2 flex-wrap sm:flex-nowrap	">
                                        <Link
                                                to={ "/profile/" + station.userSteamId }
                                                className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5"
                                        >
                                            { t("logs.profile") }
                                        </Link>
                                        <Link
                                                to={ "/log/" + station.id }
                                                className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5"
                                        >
                                            { t("logs.record") }
                                        </Link>
                                    </div>
                                </div>
                        )) }
                    </div>
                </div> }
            </>
    );
};