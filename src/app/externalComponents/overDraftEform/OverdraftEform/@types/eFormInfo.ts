export interface EFormInfo {
    id: number;
    facilityType: string;
    facilityDate: string;
    customerMaster?: string;
    branchId: number;
    armCode?: string;
    segmentCode?: string;

    // Term Loan specific properties
    termLoanFacilityType?: string;
    tlAccount?: string;
    tlCurrencyId?: number;
    tlRateInt?: number;
    repaymentPeriod?: string;
    repaymentPeriodOther?: string;
    repaymentAcc?: string;
    tlReqCurrencyId?: number;
    tlReqAmount?: number;
    tlReqAmountWords?: string;
    tlExDate?: string;
    tlCreditAcc?: string;
    tlCreditCurrency?: number;
    tlPurpose?: string;

    // Over Draft specific properties
    overDraftFacilityType?: string;
    odAnnuallyRenew?: boolean | null;
    odAccount?: string;
    currencyId?: number;
    odExDate?: string;
    odRateInt?: number | null;
    odStandardRateInt?: number;
    odReqAmount?: number;
    odReqAmountInWords?: string;
    odPurpose?: string;

    overdraftActionType?: string;
    docRetainStatus?: boolean;

    masterLoanTypeId?: number;
    approvedLevel: string;
    approvedAmount: number;
    l2L3Cap: string;
    approveLevel: string;
    approvalGroupUser: string;

    opsMakerReprocessDate?: string;

    fraudDetected?: boolean

    eformDocumentId: string;
    noCribHistory: boolean;
    fcyBackedOd: boolean;
    tbillBackedOd: boolean;
    odAvgCus: boolean;
    cribDocumentId: string;
}
