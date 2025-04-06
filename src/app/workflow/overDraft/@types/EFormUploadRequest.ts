export interface EFormUploadRequest {
    eformDocumentId: string;
    facilityType: string;
    overdraftActionType: "OD_AMEND_OR_NEW" | "OD_CANCEL" | "RATE_CHANGE";
    overDraftFacilityType?: string | null;
    termLoanFacilityType?: string | null;
}