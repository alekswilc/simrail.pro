export interface TImagesResponse {
    success: boolean;
    data: TImagesData;
    code: number;
}

export interface TImagesData {
    trains: Record<string, string>
    stations: Record<string, string>
}