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
];


export const getVehicle = (name: string) =>
{
    return trainsList.find(x => wcmatch(x.pattern)(name))?.train;
};