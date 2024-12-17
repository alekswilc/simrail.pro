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
import { ReactNode, useState } from "react";
import { FaUserShield, FaUserSlash, FaUserLock } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

export const UseHover = ({ children, hover }: { children: ReactNode, hover: ReactNode }) => {
    const [isHovered, setIsHovered] = useState(true);


    return <div className={"inline"} onMouseEnter={() => setIsHovered(false)} onMouseLeave={() => setIsHovered(true)}>
        {isHovered ? children : hover}
    </div>
}

export const UserIcons = ({ flags }: { flags: string[] }) =>
{
    const { t } = useTranslation();

    return <> { flags.includes('administrator') &&
            <UseHover hover={ <button
                    className="inline-flex rounded-full bg-[#DC3545] py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90">{t("icons.admin")}</button> }><FaUserShield
                    className={ "inline text-meta-1 ml-1" }/></UseHover> } { flags.includes("leaderboard_hidden") &&
            <UseHover hover={ <button
                    className="inline-flex rounded-full bg-[#F9C107] py-1 px-3 text-sm font-medium text-[#212B36] hover:bg-opacity-90">{t("icons.leaderboard_hidden")}</button> }><FaUserLock
                    className={ "inline text-meta-6 ml-1" }/></UseHover> } { flags.includes("hidden") &&
           <UseHover hover={ <button
                   className="inline-flex rounded-full bg-[#DC3545] py-1 px-3 text-sm font-medium text-white hover:bg-opacity-90">{ t("icons.hidden") }</button> }>
               <FaUserSlash className={ "inline text-meta-1 ml-1" }/></UseHover> }</>;
};