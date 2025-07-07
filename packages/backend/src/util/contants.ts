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


import wcmatch from "wildcard-match";

/* 
E186_134 = "Traxx/E186-134", 
	E186_929 = "Traxx/E186-929", 
	E6ACTa_014 = "Dragon2/E6ACTa-014", 
	E6ACTa_016 = "Dragon2/E6ACTa-016", 
	E6ACTadb_027 = "Dragon2/E6ACTadb-027", 
	ED250_018 = "Pendolino/ED250-018 Variant", 
	EN57_009 = "EN57/EN57-009", 
	EN57_047 = "EN57/EN57-047", 
	EN57_1000 = "EN57/EN57-1000", 
	EN57_1003 = "EN57/EN57-1003", 
	EN57_1051 = "EN57/EN57-1051", 
	EN57_1219 = "EN57/EN57-1219", 
	EN57_1316 = "EN57/EN57-1316", 
	EN57_1458 = "EN57/EN57-1458", 
	EN57_1567 = "EN57/EN57-1567", 
	EN57_1571 = "EN57/EN57-1571", 
	EN57_1752 = "EN57/EN57-1752", 
	EN57_1755 = "EN57/EN57-1755", 
	EN57_1796 = "EN57/EN57-1796", 
	EN57_1821 = "EN57/EN57-1821", 
	EN57_614 = "EN57/EN57-614", 
	EN71_005 = "EN57/EN71-005", 
	EN71_011 = "EN57/EN71-011", 
	EN76_006 = "Elf/EN76-006", 
	EN76_022 = "Elf/EN76-022", 
	EN96_001 = "Elf/EN96-001", 
	EP07_135 = "4E/EP07-135", 
	EP07_174 = "4E/EP07-174", 
	EP08_001 = "4E/EP08-001", 
	EP08_013 = "4E/EP08-013", 
	ET22_1163 = "201E/ET22-1163", -- DLC required: 2868050
	ET22_243 = "201E/ET22-243", -- DLC required: 2868050
	ET22_256 = "201E/ET22-256", -- DLC required: 2868050
	ET22_644 = "201E/ET22-644", -- DLC required: 2868050
	ET22_836 = "201E/ET22-836", -- DLC required: 2868050
	ET22_911 = "201E/ET22-911", -- DLC required: 2868050
	ET25_002 = "Dragon2/ET25-002", 
	EU07_005 = "4E/EU07-005", 
	EU07_068 = "4E/EU07-068", 
	EU07_085 = "4E/EU07-085", 
	EU07_092 = "4E/EU07-092", 
	EU07_096 = "4E/EU07-096", 
	EU07_241 = "4E/EU07-241", 
*/

export const trainsList = [
    {
        train: "Traxx (E186)",
        pattern: [
            "Traxx/E186-*",
        ],
    },
    {
        train: "Dragon2 (E6ACTa, E6ACTadb)",
        pattern: [
            "Dragon2/E6ACTa-*",
            "Dragon2/E6ACTadb-*",
        ],
    },
    {
        train: "Dragon2 (ET25)",
        pattern: [
            "Dragon2/ET25-*",
        ],
    },
    {
        train: "Pendolino (ED250)",
        pattern: [
            "Pendolino/ED250-*",
        ],
    },
    {
        train: "EN57",
        pattern: [
            "EN57/EN57-*",
        ],
    },
    {
        train: "EN71",
        pattern: [
            "EN57/EN71-*",
        ],
    },
    {
        train: "EN76",
        pattern: [
            "Elf/EN76-*",
        ],
    },
    {
        train: "EN96",
        pattern: [
            "Elf/EN96-*",
        ],
    },
    {
        train: "EP07",
        pattern: [
            "4E/EP07-*",
        ],
    },
    {
        train: "EP08",
        pattern: [
            "4E/EP08-*",
        ],
    },
    {
        train: "ET22",
        pattern: [
            "201E/ET22-*",
        ],
    },
    {
        train: "EU07",
        pattern: [
            "4E/EU07-*",
        ],
    },
    {
        train: 'Ty2',
        pattern: [
            'Ty2/*'
        ]
    }
];

export const stationsMap: Record<string, string> = {
    "Grodzisk Mazowiecki": "https://api.simrail.eu:8083/Thumbnails/Stations/gr1m.jpg",
    "Korytów": "https://api.simrail.eu:8083/Thumbnails/Stations/kr1m.jpg",
    "Szeligi": "https://api.simrail.eu:8083/Thumbnails/Stations/sz1m.jpg",
    "Włoszczowa Północ": "https://api.simrail.eu:8083/Thumbnails/Stations/wp1m.jpg",
    "Knapówka": "https://api.simrail.eu:8083/Thumbnails/Stations/kn1m.jpg",
    "Psary": "https://api.simrail.eu:8083/Thumbnails/Stations/ps1m.jpg",
    "Góra Włodowska": "https://api.simrail.eu:8083/Thumbnails/Stations/gw1m.jpg",
    "Idzikowice": "https://api.simrail.eu:8083/Thumbnails/Stations/id1m.jpg",
    "Katowice Zawodzie": "https://api.simrail.eu:8083/Thumbnails/Stations/kz1m.jpg",
    "Sosnowiec Główny": "https://api.simrail.eu:8083/Thumbnails/Stations/sg1m.jpg",
    "Dąbrowa Górnicza": "https://api.simrail.eu:8083/Thumbnails/Stations/dg1m.jpg",
    "Zawiercie": "https://api.simrail.eu:8083/Thumbnails/Stations/zw1m.jpg",
    "Będzin": "https://api.simrail.eu:8083/Thumbnails/Stations/b1m.jpg",
    "Sosnowiec Południowy": "https://api.simrail.eu:8083/Thumbnails/Stations/spl1m.jpg",
    "Opoczno Południe": "https://api.simrail.eu:8083/Thumbnails/Stations/op1m.jpg",
    "Dąbrowa Górnicza Wschodnia": "https://api.simrail.eu:8083/Thumbnails/Stations/dws1m.jpg",
    "Dorota": "https://api.simrail.eu:8083/Thumbnails/Stations/dra1m.jpg",
    "Łazy Ła": "https://api.simrail.eu:8083/Thumbnails/Stations/la1m.jpg",
    "Łazy": "https://api.simrail.eu:8083/Thumbnails/Stations/lb1m.jpg",
    "Juliusz": "https://api.simrail.eu:8083/Thumbnails/Stations/ju1m.jpg",
    "Łazy Łc": "https://api.simrail.eu:8083/Thumbnails/Stations/lc1m.jpg",
    "Katowice": "https://api.simrail.eu:8083/Thumbnails/Stations/ko1m.jpg",
    "Dąbrowa Górnicza Ząbkowice": "https://api.simrail.eu:8083/Thumbnails/Stations/dz1m.jpg",
    "Sławków": "https://api.simrail.eu:8083/Thumbnails/Stations/sl1m.jpg",
    "Starzyny": "https://api.simrail.eu:8083/Thumbnails/Stations/str1m.jpg",
    "Bukowno": "https://api.simrail.eu:8083/Thumbnails/Stations/bo1m.jpg",
    "Tunel": "https://api.simrail.eu:8083/Thumbnails/Stations/tl1m.jpg",
    "Dąbrowa Górnicza Huta Katowice": "https://api.simrail.eu:8083/Thumbnails/Stations/dghk1m.jpg",
    "Sosnowiec Kazimierz": "https://api.simrail.eu:8083/Thumbnails/Stations/skz1m.jpg",
    "Pruszków": "https://api.simrail.eu:8083/Thumbnails/Stations/pr1m.jpg",
    "Strzałki": "https://api.simrail.eu:8083/Thumbnails/Stations/st1m.jpg",
    "Olszamowice": "https://api.simrail.eu:8083/Thumbnails/Stations/ol1m.jpg",
    "Miechów": "https://api.simrail.eu:8083/Thumbnails/Stations/mi1m.jpg",
    "Kraków Przedmieście": "https://api.simrail.eu:8083/Thumbnails/Stations/kpm1m.jpg",
    "Kraków Batowice": "https://api.simrail.eu:8083/Thumbnails/Stations/kb1m.jpg",
    "Raciborowice": "https://api.simrail.eu:8083/Thumbnails/Stations/ra1m.jpg",
    "Zastów": "https://api.simrail.eu:8083/Thumbnails/Stations/zs1m.jpg",
    "Niedźwiedź": "https://api.simrail.eu:8083/Thumbnails/Stations/nd1m.jpg",
    "Słomniki": "https://api.simrail.eu:8083/Thumbnails/Stations/sm1m.jpg",
    "Kozłów": "https://api.simrail.eu:8083/Thumbnails/Stations/koz1m.jpg",
    "Warszawa Włochy": "https://api.simrail.eu:8083/Thumbnails/Stations/wl1m.jpg",
    "Żyrardów": "https://api.simrail.eu:8083/Thumbnails/Stations/zy1m.jpg",
    "Skierniewice": "https://api.simrail.eu:8083/Thumbnails/Stations/sk1m.jpg",
    "Płyćwia": "https://api.simrail.eu:8083/Thumbnails/Stations/pl1m.jpg",
    "Koluszki": "https://api.simrail.eu:8083/Thumbnails/Stations/kol1m.jpg",
    "Żakowice Południowe": "https://api.simrail.eu:8083/Thumbnails/Stations/zp1m.jpg",
    "Gałkówek": "https://api.simrail.eu:8083/Thumbnails/Stations/ga1m.jpg",
    "Łódź Widzew": "https://api.simrail.eu:8083/Thumbnails/Stations/lw1m.jpg",
    "N/A": 'https://shared.steamstatic.com/store_item_assets/steam/apps/1422130/header.jpg'
};

export const trainsMap: Record<string, string> = {
    "Traxx (E186)": "https://wiki.simrail.eu/vehicle/poland/trains/elec-loco/traxx/20241029163359_1.jpg",
    "Dragon2 (E6ACTa, E6ACTadb)": "https://wiki.simrail.eu/vehicle/e6acta-016.jpg",
    "Dragon2 (ET25)": "https://wiki.simrail.eu/vehicle/et25-002.jpg",
    "Pendolino (ED250)": "https://wiki.simrail.eu/vehicle/ed250-001.png",
    "EN57": "https://wiki.simrail.eu/vehicle/en57-009.png",
    "EN71": "https://wiki.simrail.eu/vehicle/en71-002.png",
    "EN76": "https://wiki.simrail.eu/vehicle/en76-006.jpg",
    "EN96": "https://wiki.simrail.eu/vehicle/en96-001.jpg",
    "EP07": "https://wiki.simrail.eu/vehicle/ep07-174.jpg",
    "EP08": "https://wiki.simrail.eu/vehicle/poland/trains/elec-loco/ep08/20241106002003_1.jpg",
    "ET22": "https://wiki.simrail.eu/vehicle/et22-243.png",
    "EU07": "https://wiki.simrail.eu/vehicle/eu07-005.jpg",
    "Ty2": "https://wiki.simrail.eu/vehicle/ty2-70.png",
    "N/A": 'https://shared.steamstatic.com/store_item_assets/steam/apps/1422130/header.jpg'
};


export const getVehicle = (name: string) =>
{
    return trainsList.find(x => wcmatch(x.pattern)(name))?.train;
};

