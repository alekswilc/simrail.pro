export interface TLeaderboardResponse {
    success: boolean;
    data:    TLeaderboardData;
    code:    number;
}

export interface TLeaderboardData {
    records: TLeaderboardRecord[];
}

export interface TLeaderboardRecord {
    id:              string;
    steam:           string;
    steamName:       string;
    trainTime:       number;
    trainPoints:     number;
    trainDistance:   number;
    dispatcherTime:  number;
    dispatcherStats?: { [key: string]: TLeaderboardDispatcherStat };
    trainStats?:     { [key: string]: TLeaderboardTrainStat };
}

export interface TLeaderboardDispatcherStat {
    time: number;
}

export interface TLeaderboardTrainStat {
    distance: number;
    score:    number;
    time:     number;
}
