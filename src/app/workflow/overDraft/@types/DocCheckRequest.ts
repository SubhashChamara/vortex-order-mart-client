export interface DocCheckRequest {
    noCribHistory: boolean;
    fcyBackedOd: boolean;
    tBillBackedOd: boolean;
    odAvgCus: boolean;
    cribDocumentId?: string | null;
    docRetainStatus: boolean;
}