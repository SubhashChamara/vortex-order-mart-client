import { Dayjs } from "dayjs";

export interface CribPullRequest {
    id?: number | null;
    clientName: string;
    citizenship: string | null;
    nic: string | null;
    eic: string | null;
    passportNo: string | null;
    gender: string | null;
    dateOfBirth: Dayjs | null;
    reason: string;
    creditFacilityType: string | null;
    amount: number;
    clientEmail: string;
    employerName: string;
    purpose: string | null;
}

export interface CribFileUploadRequest {
    processInstance: string;
    cribPullMethod: string;
    leadType?: string | null;
    unitInitiating: string;
    fileId: string;
}

export interface XMLFileUploadRequest {
    processInstance: string;
    taskInstance: string;
    fileId: string;
}

export interface CribPullExcelFileGenerateRequest {
    processInstance: string;
    taskInstance: string;
}

export interface CribPaneRequest {
    processInstance: string;
    taskInstance: string;
    fileId: string;
    cribPullProcessId: number;
    idType: string;
}

export interface SaveCribPullHeaderRequest {
    processInstance: string;
    cribPullMethod: string;
    unitInitiating: string;
    noCribHistory?: boolean;
}

export enum CribPaneIdTypes {
    PASSPORT,
    NIC,
    EIC
}