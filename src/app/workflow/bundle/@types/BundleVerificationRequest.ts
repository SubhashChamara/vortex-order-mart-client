export interface BundleVerificationRequest {
    processInstance: string;
    taskInstance: string;
    refereeName?: string | null;
    refereeTeleRes?: string | null;
    refereeTeleMobile?: string | null;
    customerDueDiligence?: string | null;
    addressConfirmation?: boolean;
    scbAC?: string | null;
    existingCard?: string | null;
    clearCopyOfID?: boolean;
    mothersMaidenName?: boolean;
    customerAttestation?: boolean;
    age?: number | null;
    signatureOnFivePanels?: boolean;
    amendmentsSigned?: boolean;
    annualFee?: boolean;
    joiningFee?: boolean;
    nonNational?: boolean;
    minimumPerMonthSal?: boolean;
    departureLetter?: boolean;
    emailConfirmation?: boolean;
}