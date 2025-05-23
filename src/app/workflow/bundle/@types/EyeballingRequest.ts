export interface EyeballingRequest {
    id?: number | null;
    reportOk?: boolean | null;
    company?: string | null;
    disbursalAccount?: string | null;
    nicNumber: string; // Required
    convertedNic?: string | null;
    dob?: string | null;
    customerCategory: string; // Required
    reportName: string; // Required
    resTp: string; // Required
    mobTp: string; // Required
    offTp: string; // Required
    employeeName: string; // Required
    masterIndustryId: number; // Required
    masterProfessionId?: number | null;
    masterCityRiskRatingId?: number | null;
    employerId?: number | null;
    age?: string | null;
    salaryScale: number; // Required
    resAddress1?: string | null;
    resAddress2?: string | null;
    resAddress3?: string | null;
    resAddress4?: string | null;
    empAddress1?: string | null;
    empAddress2?: string | null;
    empAddress3?: string | null;
    empAddress4?: string | null;
}
