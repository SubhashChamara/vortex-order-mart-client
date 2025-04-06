import { UWUser } from "./UWUser";

export interface OdProcessRequest {
    id?: number;

    facilityType?: string;
    overDraftFacilityType?: string | null;
    termLoanFacilityType?: string | null;
    collateralTotalLimit?: number;

    overdraftActionType?: string;
    eformDocumentId?: string;
    docRetainStatus?: boolean;

    // Doc Check fields
    noCribHistory?: boolean;
    fcyBackedOd?: boolean;
    tbillBackedOd?: boolean;
    odAvgCus?: boolean;
    cribDocumentId?: string | null;
    // End of Doc Check fields

    // T09-Underwriter Fields
    masterLoanTypeId?: number;
    approvedAmount?: number;
    l2L3Cap?: string;
    uwApprover?: UWUser | null;

    // T13
    opsMakerReprocessDate?: string;
    fraudDetected?: boolean | null;
}
