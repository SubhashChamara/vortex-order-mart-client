export interface LoanDataEntryInfo {
    id: number;
    createdDate: Date;
    plLoanType: string;
    requestedDateTime: Date;
    applicantNIC: string;
    applicantName: string;
    designation: string;
    requestAmount: number;
    interestRate: number;
    tenor: string;
    masterNo: string;
    loanRepaymentMode: string;
    grossIncome: number;
    netIncome: number;
    dbr: number;
    companyName: string;
    natureOfBusiness: string;
    salesChannel: string;
    resAddress1: string;
    resAddress2: string;
    resAddress3: string;
    teleResident: string;
    teleMobile: string;
    pwidSourceCode: string;
}