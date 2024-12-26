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

import { createHmac, randomBytes } from "node:crypto";

export const imgProxySign = (target: string) =>
{
    const hmac = createHmac("sha256", Buffer.from(process.env.IMGPROXY_KEY!, 'hex'));
    hmac.update(Buffer.from(process.env.IMGPROXY_SALT!, 'hex'));
    hmac.update(target);

    return hmac.digest("base64url");
};

export const generateUrl = (url: string, options: string = "preset:simrailpro") =>
{
    if (url.includes('https://imgproxy.alekswilc.dev/')) return url;

    if (process.env.NODE_ENV === "development")
    {
        options += "/cb:" + randomBytes(4).toString('hex');
    }

    const signature = imgProxySign(`/${ options }/plain/${ url }`);
    return `https://imgproxy.alekswilc.dev/${ signature }/${ options }/plain/${ url }`;
}