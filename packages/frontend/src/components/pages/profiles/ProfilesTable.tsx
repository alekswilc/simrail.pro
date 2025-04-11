/*
 * Copyright (C) 2025 Aleksander <alekswilc> Wilczyński (aleks@alekswilc.dev)
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

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserIcons } from "../../mini/icons/UserIcons.tsx";
import { TProfilePlayer } from "../../../types/profile.ts";
// import { formatTime } from "../../../util/time.ts";

export const ProfilesTable = ({ profiles }: { profiles: TProfilePlayer[] }) =>
{
    const { t } = useTranslation();

    return (
            <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-3 xl:grid-cols-4">
                { profiles.map((player) =>
                {
                    return <div
                            className="flex flex-col align-center items-center rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark bg-stroke ">
                        <div className="p-4">
                            <img className="rounded-full" src={ player.avatar } alt="Player"/>
                        </div>
                        <div className="flex flex-col p-2 align-center items-center">
                            <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                { player.username }
                                <UserIcons flags={ player.flags }/>
                            </h4>
                        </div>

                        <div className="items-center justify-center p-2.5 flex xl:p-5 gap-2 flex-wrap sm:flex-nowrap mt-auto mb-2">
                            <Link to={ "/profile/" + player.id }
                                  className={ `inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-50 lg:px-4 xl:px-5 ${ player.flags.includes("private") ? "bg-opacity-50" : "" }` }
                                  style={ player.flags.includes("private") ? { pointerEvents: "none" } : undefined }>{ t("log.buttons.profile") }</Link>

                        </div>
                    </div>;
                }) }
            </div>
    );
};
