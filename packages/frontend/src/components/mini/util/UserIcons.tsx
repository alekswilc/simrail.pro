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
import { FaUserShield, FaUserSlash, FaUserLock } from "react-icons/fa6";

export const UserIcons = ({ flags }: { flags: string[] }) =>
{
    return <> { flags.includes("administrator") &&
            <FaUserShield className={ "inline text-meta-1 ml-1" }/> } { flags.includes("leaderboard_hidden") &&
            <FaUserLock className={ "inline text-meta-6 ml-1" }/> } { flags.includes("hidden") &&
            <FaUserSlash className={ "inline text-meta-1 ml-1" }/> }</>;
};