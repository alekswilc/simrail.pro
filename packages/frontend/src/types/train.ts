export interface TTrainResponse {
    success: boolean;
    data:    TTrainData;
    code:    number;
}

export interface TTrainData {
    records: TTrainRecord[];
}

export interface TTrainRecord {
    id:               string;
    steam:            string;
    steamName:        string;
    trainTime:        number;
    trainPoints:      number;
    trainDistance:    number;
    dispatcherTime:   number;
    trainStats:       { [key: string]: TTrainStat };
    dispatcherStats?: { [key: string]: TDispatcherStat };
}

export interface TDispatcherStat {
    time: number;
}

export interface TTrainStat {
    distance: number;
    score:    number;
    time:     number;
}
