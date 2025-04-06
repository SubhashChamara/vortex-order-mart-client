export interface CribPullFileInfo {
    id: string;
    name: string;
    path: string;
}

export interface CribPullSummaryCountInfo {
    noOfRequests: number;
    noOfCribAttached: number;
    noOfCribPaneAttached: number;
    noOfNoMatchCrib: number;
}