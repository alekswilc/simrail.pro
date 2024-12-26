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

import { execSync } from "child_process";

export class GitUtil
{
    private static cache: { lastUpdated: number, version?: string, commit?: string } = undefined!;

    public static getLatestVersion()
    {
        try
        {
            const data = execSync("git describe --tags --exact-match").toString();
            return data.replace("\n", "");
        } catch
        {
            return undefined;
        }
    }

    public static getLatestCommit()
    {
        try
        {
            const data = execSync("git rev-parse --short HEAD").toString();
            return data.replace("\n", "");
        } catch
        {
            return undefined;
        }
    }


    public static getData()
    {
        if (this.cache)
        {
            return this.cache;
        }

        const data = {
            version: this.getLatestVersion(),
            commit: this.getLatestCommit(),
            lastUpdated: Date.now(),
        };

        this.cache = data;
        return data;
    }
}