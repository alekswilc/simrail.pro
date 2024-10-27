export interface TStatsResponse {
    success: boolean;
    data:    TStatsData;
    code:    number;
}

export interface TStatsData {
    git:   TStatsGit;
    stats: TStatsStats;
}

export interface TStatsGit {
    commit?: string;
    version?: string;
}

export interface TStatsStats {
    trains:      number;
    dispatchers: number;
    profiles:    number;
}
