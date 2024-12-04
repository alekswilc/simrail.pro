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

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export const NotFoundError = () =>
{
    const { t } = useTranslation();

    return (
            <>

                <div className="flex flex-col gap-10">

                    <div
                            className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="px-4 pb-6 text-center">
                            <div className="mt-4">
                                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                                    { t("notfound.title") }
                                </h3>
                                <p className="font-medium">{ t("notfound.description") }</p>

                                <div className="p-4 md:p-6 xl:p-9 flex gap-2 justify-center">
                                    <Link
                                            to="/"
                                            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                    >
                                        { t("notfound.button") }
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </>
    );
};