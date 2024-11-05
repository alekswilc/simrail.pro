import { useTranslation } from "react-i18next";
import { TLogStationData } from "../../../types/log.ts";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const StationLog = ({ data }: { data: TLogStationData }) =>
{
    const copyLink = () =>
    {
        void navigator.clipboard.writeText(location.href);
        toast.success("Skopiowano link do schowka!");
    };

    const report = () =>
    {
        toast.info("Do schowka skopiowano dane wyjścia z posterunku, możesz ich użyć do wysłania na kanale #multiplayer-help-requests na oficjalnym serwerze Discord gry simrail.", {
            autoClose: 5000,
        });
        void navigator.clipboard.writeText(`;user: \`${ data.userUsername }\`\n;steam: \`${ data.userSteamId }\`\n;left: <t:${ data.leftDate }>${ data.joinedDate ? `\n;joined: <t:${ data.joinedDate }>` : "" }\n;station: \`${ data.stationName }\`\n;link: ${ location.href }\n\n`);
    };

    const { t } = useTranslation();
    return <div
        className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 pt-6 text-center lg:pb-8 xl:pb-11.5">
            <div
                className="mx-auto w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative drop-shadow-2">
                    <img className="rounded-full" src={ data.userAvatar } alt="profile"/>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                    { data.userUsername }
                </h3>

                {/*<div*/ }
                {/*    className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-2 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">*/ }
                {/*    <div*/ }
                {/*        className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">*/ }
                {/*        <span className="font-semibold text-black dark:text-white">*/ }
                {/*            { Math.floor(data.player.trainDistance / 1000) }km*/ }
                {/*        </span>*/ }
                {/*        <span className="text-sm text-wrap">{ t("profile.stats.distance") }</span>*/ }
                {/*    </div>*/ }
                {/*    <div*/ }
                {/*        className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">*/ }
                {/*        <span className="font-semibold text-black dark:text-white">*/ }
                {/*            { Math.floor(data.player.dispatcherTime / 3600000) }h*/ }
                {/*        </span>*/ }
                {/*        <span className="text-sm text-wrap">{ t("profile.stats.time") }</span>*/ }
                {/*    </div>*/ }
                {/*</div>*/ }
            </div>
        </div>

        <div className="bg-white px-5 pt-6 pb-5 shadow-default dark:bg-boxdark sm:px-7.5">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-end">
                <div className="flex flex-col">
                    <h1 className="text-xl text-black dark:text-white pb-5">{ t("log.station.header") }</h1>
                    <p>{ t("log.station.server", { server: data.server.toUpperCase() }) }</p>
                    <p>{ t("log.station.station", { name: data.stationName, short: data.stationShort }) }</p>

                    { data.joinedDate &&
                        <p>{ t("log.station.joined", { date: dayjs(data.joinedDate).format("DD/MM/YYYY HH:mm") }) }</p> }
                    <p>{ t("log.station.left", { date: dayjs(data.leftDate).format("DD/MM/YYYY HH:mm") }) }</p>
                    { data.joinedDate &&
                        <p>{ t("log.station.spent", { date: dayjs.duration(data.leftDate - data.joinedDate).format("H[h] m[m]") }) }</p> }
                </div>
                <div className="flex flex-col gap-5 mt-5 sm:mt-0 sm:ml-auto">
                    <a
                        onClick={ report }
                        className="cursor-pointer inline-flex items-center justify-center rounded-md bg-meta-7 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Zgłoś
                    </a>

                    <a
                        onClick={ copyLink }
                        className="cursor-pointer inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >

                        Kopiuj link
                    </a>
                </div>
            </div>
        </div>
    </div>;
};