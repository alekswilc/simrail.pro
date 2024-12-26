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

import { Dispatch, SetStateAction } from "react";

export const Paginator = ({ page, setPage, pages }: {
    page: number,
    pages: number,
    setPage: Dispatch<SetStateAction<number>>
}) =>
{
    let numbers = [ 1, page - 2, page - 1, page, page + 1, page + 2 ];

    page === 1 && (numbers = [ page, page + 1, page + 2, page + 3, page + 4 ]);

    page === 2 && (numbers = [ page - 1, page, page + 1, page + 2, page + 3 ]);

    page === 3 && (numbers = [ page - 2, page - 1, page, page + 1, page + 2 ]);

    (page === pages) && (numbers = [ 1, page - 4, page - 3, page - 2, page - 1 ]);

    (page === (pages - 1)) && (numbers = [ 1, page - 3, page - 2, page - 1, page ]);

    (page === (pages - 2)) && (numbers = [ 1, page - 2, page - 1, page, page + 1 ]);

    numbers = numbers.filter(x => (pages + 1) >= x && x > 0);

    return <div
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-row align-center justify-center p-2">
        <ul className="flex flex-wrap items-center">
            <li>
                <a className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-l-md border border-stroke hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark"
                   onClick={ () => setPage(page => (page - 1) < 1 ? 1 : page - 1) }>
                    <svg className="fill-current" width="8" height="16" viewBox="0 0 8 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.17578 15.1156C7.00703 15.1156 6.83828 15.0593 6.72578 14.9187L0.369531 8.44995C0.116406 8.19683 0.116406 7.80308 0.369531 7.54995L6.72578 1.0812C6.97891 0.828076 7.37266 0.828076 7.62578 1.0812C7.87891 1.33433 7.87891 1.72808 7.62578 1.9812L1.71953 7.99995L7.65391 14.0187C7.90703 14.2718 7.90703 14.6656 7.65391 14.9187C7.48516 15.0312 7.34453 15.1156 7.17578 15.1156Z"
                              fill=""></path>
                    </svg>
                </a></li>

            { numbers.map(num =>
            {
                return <li>
                    <a onClick={ () => setPage(num) }
                       className={ `cursor-pointer flex items-center justify-center border border-stroke border-l-transparent py-[5px] px-4 font-medium hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark select-none ${ page === num && "text-primary border-primary dark:border-primary" }` }>{ num }</a>
                </li>;
            }) }

            { !!pages && <li>
                <a className={ `cursor-pointer flex items-center justify-center border border-stroke border-l-transparent py-[5px] px-4 font-medium hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark select-none ${ page === pages && "text-primary border-primary dark:border-primary" }` }
                   onClick={ () => setPage(pages) }>{ pages }</a></li> }
            <li>
                <a className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-r-md border border-stroke border-l-transparent hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark select-none"
                   onClick={ () => setPage(page => (page + 1) > pages ? pages : page + 1) }>
                    <svg className="fill-current" width="8" height="16" viewBox="0 0 8 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.819531 15.1156C0.650781 15.1156 0.510156 15.0593 0.369531 14.9468C0.116406 14.6937 0.116406 14.3 0.369531 14.0468L6.27578 7.99995L0.369531 1.9812C0.116406 1.72808 0.116406 1.33433 0.369531 1.0812C0.622656 0.828076 1.01641 0.828076 1.26953 1.0812L7.62578 7.54995C7.87891 7.80308 7.87891 8.19683 7.62578 8.44995L1.26953 14.9187C1.15703 15.0312 0.988281 15.1156 0.819531 15.1156Z"
                              fill="">
                        </path>
                    </svg>
                </a>
            </li>
        </ul>
    </div>;
};