export interface tlFacilityRequest {
    id: number;
    facilityDate: string;
    customerMaster: string | null;
    branchId: number | null;
    armCode: string | null;
    segmentCode: string | null;

    tlAccount?: string;
    tlCurrency?: number | null;
    tlRateInt?: number | null;
    repaymentPeriod?: string | null;
    repaymentPeriodOther?: string | null;
    repaymentAcc?: string | null;
    tlReqCurrencyId?: number | null;
    tlReqAmount?: number | null;
    tlReqAmountWords?: string | null;
    tlExDate?: string | null;
    tlCreditAcc?: string | null;
    tlCreditCurrencyId?: number | null;
    tlPurpose?: string | null;
}