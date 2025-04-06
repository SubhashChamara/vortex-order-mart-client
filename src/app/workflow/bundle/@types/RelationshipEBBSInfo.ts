export interface RelationshipEBBSInfo {
    matchedList: string[];
    matchedProcessList: {
        nicNumber: string;
        accountNumber: string;
        openDate: string;
        address: string;
        status: string;
        tpResident: string;
        tpEmployment: string;
        accountName: string;
    }[]
}
