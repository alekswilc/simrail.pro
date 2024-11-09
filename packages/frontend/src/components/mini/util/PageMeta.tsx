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

import { Helmet } from "react-helmet-async";

// https://dev.to/facubotta/meta-data-in-react-1p93
export const PageMeta = ({ title = "", description = "", image = "", name = "" }) =>
{
    return (
            <Helmet>
                { /* Standard metadata tags */ }
                <title>{ title }</title>
                <link rel="canonical" href={ window.location.href }/>
                <meta name="description" content={ description }/>
                { /* Open Graph tags (OG) */ }
                <meta property="og:url" content={ window.location.href }/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content={ title }/>
                <meta property="og:description" content={ description }/>
                {/* OG image tags */ }
                <meta property="og:image" content={ image }/>
                <meta property="og:image:secure_url" content={ image }/>
                <meta property="og:image:type" content="image/jpeg"/>
                <meta property="og:image:width" content="200"/>
                <meta property="og:image:alt" content={ `Image of ${ title } site` }/>
                { /* Twitter tags */ }
                { name && <meta name="twitter:creator" content={ name }/> }
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:title" content={ title }/>
                <meta name="twitter:description" content={ description }/>
            </Helmet>
    );
};