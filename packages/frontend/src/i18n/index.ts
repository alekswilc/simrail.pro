import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationsInEng from "./languages/en.json";
import translationsInPl from "./languages/pl.json";

const resources = {
    en: {
        translation: translationsInEng,
    },
    pl: {
        translation: translationsInPl,
    },
};

void i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        debug: false,
        fallbackLng: {
            "pl-PL": [ "pl" ],

            default: [ "en" ],
        },
        interpolation: {
            escapeValue: false,
        },
        ns: "translation",
        defaultNS: "translation",
    });

export { i18n };