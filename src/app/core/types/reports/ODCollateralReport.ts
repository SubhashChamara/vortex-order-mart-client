export interface ODCollateralReportIf {
    refNum: string;
    facilityAccountNum: string;
    lienAccountNum: string;
    currencyType: string;
    accountName: string;
    interestRate: number;
    maturityDate: string;
    currentBalance: number;
    lienAmount: number;
    applicableLTV: number;
    amountAfterLTV: number;
    customerDOB: string;
    loanStatus: string;
}