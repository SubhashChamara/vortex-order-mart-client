export interface BundleUWLevelRequest {
    loanRejected?: boolean | null;
    cardRejected?: boolean | null;
    approverLevelCard?: string | null;
    approverLevelLoan?: string | null;
    underwriterCapCard?: number | null;
    underwriterCapLoan?: number | null;
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
