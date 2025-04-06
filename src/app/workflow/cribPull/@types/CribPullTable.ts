import { Dayjs } from "dayjs";
export interface CribPullProcess {
    id: number;
    clientName: string;
    citizenship: string | null;
    nic: string | null;
    eic: string | null;
    passportNo: string | null;
    gender: string | null;
    dateOfBirth: Dayjs | null;
    leadType?: string;
    reason: string | null;
    creditFacilityType: string | null;
    amount: number;
    clientEmail: string | null;
    employerName: string;
    purpose: string | null;
    nicSelectedCribExtraction?: boolean;
    eicSelectedCribExtraction?: boolean;
    ppSelectedCribExtraction?: boolean;
    noCribHistory?: boolean;
    cribAvailSts30DaysNic?: string | null,
    cribAvailSts30DaysEic?: string | null,
    cribAvailSts30DaysPassport?: string | null
}

export interface CribPullTableRequest {
    id: number;
    processInstance: string;
    cribPullMethod: string;
    unitInitiating: string;
    cribPullProcessList: CribPullProcess[];
}

export interface CribPullDownloadFileTableRequest {
    processInstance: string;
    taskInstance: string;
}