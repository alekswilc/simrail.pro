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

import { WarningAlertIcon } from "../icons/AlertIcons.tsx";

export const WarningAlert = ({ title, description }: { title: string, description: string }) =>
        <div
                className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] dark:bg-[#1B1B24] px-7 py-8 shadow-md dark:bg-opacity-30 md:p-9">
            <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                <WarningAlertIcon/>
            </div>
            <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                    { title }
                </h5>
                <p className="leading-relaxed text-[#D0915C]">
                    { description }
                </p>
            </div>
        </div>;
