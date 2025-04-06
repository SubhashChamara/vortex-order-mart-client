export interface RelationshipCribInfo {
    matchedList: string[];
    matchedCribList: RelationshipConsumerProfileInfoDto[]
}

interface RelationshipConsumerProfileInfoDto {
    nicNumber: string;
    passportNumber: string;
    spouseName: string;
    dateOfBirth: string;
    customerCategory: string;
    CRIBReportNumber: string;
    mobileNumber: string;
}