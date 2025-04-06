export interface odRequest {
    id?: number | null;
    title: string;
    name: string;
    email: string;
    occupation: string | null;
    mobileNo: string;
    resTel: string | null;
    nic: string;
    dob: string;
    resAdd1: string | null;
    resAdd2?: string | null;
    resAdd3?: string | null;
    income: number | null;
    resStatus: string | null;
    masterNo: string | null;
    nationality: string | null;
    overDraftProcess?: { id?: number | null, facilityType: string, overDraftFacilityType?: string | null, termLoanFacilityType?: string | null };
    relPrimaryApplicant?: string | null;
}