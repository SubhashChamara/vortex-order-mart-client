export interface BundleUWLevelInfo {
    loanRejected?: boolean;
    cardRejected?: boolean;
    approverLevelCard?: string;
    approverLevelLoan?: string;
    underwriterCapCard?: number;
    underwriterCapLoan?: number;
    requestAmount?: number | null;
    approvedAmount?: number | null;
    netAmountALPL?: number | null;
    approvalAttached?: boolean | null;
    underWriterLimit?: number;
    underWriterDBR?: number;
    underWriterOnUsExposure?: number;
    underWriterTotalMUE?: number;
    underWriterGrossIncome?: number;
    mueMultiplier?: number;
}
