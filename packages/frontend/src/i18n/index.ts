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

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationsInEng from "./languages/en.json";
import translationsInPl from "./languages/pl.json";
import translationsInCs from "./languages/cs.json";

const resources = {
    en: {
        translation: translationsInEng,
    },
    pl: {
        translation: translationsInPl,
    },
    cs: {
        translation: translationsInCs,
    }
};

void i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        debug: false,
        fallbackLng: (code: string) => {
            if (code.includes('pl')) return 'pl'; // Polish
            if (resources as any['cs'] && code.includes('cs')) return 'cs'; // Czech

            return 'en'; // English
        },
        interpolation: {
            escapeValue: false,
        },
        ns: "translation",
        defaultNS: "translation",
    });

export { i18n };