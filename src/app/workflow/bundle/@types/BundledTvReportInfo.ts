export interface BundledTvReportInfo {
    // Total
    cardSalesCount: number;
    loanSalesCount: number;

    // Doc Check-Card
    cardDocCheckDay1: number;
    cardDocCheckDay2: number;
    cardDocCheckDay3: number;
    cardDocCheckDay4: number;

    // Doc Check-Loan
    loanDocCheckDay1: number;
    loanDocCheckDay2: number;
    loanDocCheckDay3: number;
    loanDocCheckDay4: number;

    // EB Data Entry-Card
    cardEBMakerDay1: number;
    cardEBMakerDay2: number;
    cardEBMakerDay3: number;
    cardEBMakerDay4: number;

    // EB Data Entry-Loan
    loanEBMakerDay1: number;
    loanEBMakerDay2: number;
    loanEBMakerDay3: number;
    loanEBMakerDay4: number;

    // EB Data Entry-Card
    cardEyeBallingDay1: number;
    cardEyeBallingDay2: number;
    cardEyeBallingDay3: number;
    cardEyeBallingDay4: number;

    // EB Data Entry-Loan
    loanEyeBallingDay1: number;
    loanEyeBallingDay2: number;
    loanEyeBallingDay3: number;
    loanEyeBallingDay4: number;

    // Relationship Maker-Card
    cardRelationMakerDay1: number;
    cardRelationMakerDay2: number;
    cardRelationMakerDay3: number;
    cardRelationMakerDay4: number;

    // Relationship Maker-Loan
    loanRelationMakerDay1: number;
    loanRelationMakerDay2: number;
    loanRelationMakerDay3: number;
    loanRelationMakerDay4: number;

    // Relationship Checker-Card
    cardRelationCheckerDay1: number;
    cardRelationCheckerDay2: number;
    cardRelationCheckerDay3: number;
    cardRelationCheckerDay4: number;

    // Relationship Checker-Loan
    loanRelationCheckerDay1: number;
    loanRelationCheckerDay2: number;
    loanRelationCheckerDay3: number;
    loanRelationCheckerDay4: number;

    // Data Entry Maker-Card
    cardDataEntryMakerDay1: number;
    cardDataEntryMakerDay2: number;
    cardDataEntryMakerDay3: number;
    cardDataEntryMakerDay4: number;

    // Data Entry Maker-Loan
    loanDataEntryMakerDay1: number;
    loanDataEntryMakerDay2: number;
    loanDataEntryMakerDay3: number;
    loanDataEntryMakerDay4: number;

    // Data Entry Checker-Card
    cardDataEntryCheckerDay1: number;
    cardDataEntryCheckerDay2: number;
    cardDataEntryCheckerDay3: number;
    cardDataEntryCheckerDay4: number;

    // Data Entry Checker-Loan
    loanDataEntryCheckerDay1: number;
    loanDataEntryCheckerDay2: number;
    loanDataEntryCheckerDay3: number;
    loanDataEntryCheckerDay4: number;

    // Underwriter-Card
    cardUnderWriterDay1: number;
    cardUnderWriterDay2: number;
    cardUnderWriterDay3: number;
    cardUnderWriterDay4: number;

    // Underwriter-Loan
    loanUnderWriterDay1: number;
    loanUnderWriterDay2: number;
    loanUnderWriterDay3: number;
    loanUnderWriterDay4: number;

    // Total-Card
    cardTotalDay1: number;
    cardTotalDay2: number;
    cardTotalDay3: number;
    cardTotalDay4: number;

    // Total-Loan
    loanTotalDay1: number;
    loanTotalDay2: number;
    loanTotalDay3: number;
    loanTotalDay4: number;

    // News Line
    news: string[];
}
