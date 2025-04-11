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

import React from "react";

interface CardDataStatsProps
{
    title: string;
    total: string | number;
    rate?: string;
    levelUp?: boolean;
    levelDown?: boolean;
}

export const CardDataStats: React.FC<CardDataStatsProps> = ({
                                                                title,
                                                                total,
                                                                rate,
                                                                levelUp,
                                                                levelDown,
                                                            }) =>
{
    return (
            <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-md font-bold text-black dark:text-white">
                            { total }
                        </h4>
                        <span className="text-sm font-medium">{ title }</span>
                    </div>

                    { rate && <span
                            className={ `flex items-center gap-1 text-sm font-medium ${
                                    levelUp && "text-meta-3"
                            } ${ levelDown && "text-meta-5" } ` }
                    >
          { rate }

                        { levelUp && (
                                <svg
                                        className="fill-meta-3"
                                        width="10"
                                        height="11"
                                        viewBox="0 0 10 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                            d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                                            fill=""
                                    />
                                </svg>
                        ) }
                        { levelDown && (
                                <svg
                                        className="fill-meta-5"
                                        width="10"
                                        height="11"
                                        viewBox="0 0 10 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                            d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                                            fill=""
                                    />
                                </svg>
                        ) }
        </span> }
                </div>
            </div>
    );
};