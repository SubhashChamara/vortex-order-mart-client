export interface odFacilityRequest {
    id: number;
    facilityDate: string;
    customerMaster: string | null;
    branchId: number | null;
    armCode: string | null;
    segmentCode: string | null;

    odAnnuallyRenew: boolean | null;
    odAccount: string;
    currencyId: number | null;
    odExDate: string | null;
    odRateInt: number | null;
    odStandardRateInt: number | null;
    odReqAmount: number | null;
    odReqAmountInWords: string | null;
    odPurpose: string | null;
}