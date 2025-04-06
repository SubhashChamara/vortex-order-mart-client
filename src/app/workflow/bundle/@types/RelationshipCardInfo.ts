export interface RelationshipCardInfo {
    matchedList: string[];
    matchedProcessList: {
        nicNumber: string;
        cardNumber: string;
        limit: string;
        category: string;
        overrideCode: string;
        status: string;
        address: string;
        recordedAddress: string;
    }[]
}
