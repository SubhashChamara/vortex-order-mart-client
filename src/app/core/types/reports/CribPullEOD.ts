export interface CribPullEODIf {
    businessKey: string;
    createdDateTime: string; // ISO 8601 string to represent LocalDateTime
    endedDateTime: string; // ISO 8601 string to represent LocalDateTime, or null if not endedcreatedTime: string; // ISO 8601 string or specific time format
    unitInitializing: string;
    branchName: string;
    consumerName: string;
    citizenship: string;
    oldNIC: string;
    newNIC: string;
    cribStatusOld: string;
    cribStatusNew: string;
    passport: string;
    dob: string; // JavaScript Date object for date of birth
    gender: string;
    reason: string;
    creditFacilityType: string;
    creditApplicationNumber: string;
    applicationDate: string; // JavaScript Date object for application date
    currency: string;
    amount: number;
    invokerName: string;
    status: string;


} 