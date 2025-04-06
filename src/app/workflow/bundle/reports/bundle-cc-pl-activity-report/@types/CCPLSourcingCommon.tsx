export interface BranchDataSummaryDTO {
    branchName: string;
    loanCount: number;
    cardCount: number;
}

export interface SourceGenerateDTO {
    approvedData: BranchDataSummaryDTO[];
    initiatedData: BranchDataSummaryDTO[];
}

export interface BranchAgentWiseReport {
    dsrCode: string;
    dsrName: string;
    count: number;
    branchName: string;
    totalNetAmountALPL: number;
    totalApprovedAmount: number;
    totalUnderwriterLimit: number;
  }

  export interface LoanApplicationModel {
    dsrId: string;
    dsrName: string;
    branchName: string;
    businessKey: string;
    applicantName: string;
    applicantNIC: string;
    netAmountALPL: number;
    approvedAmount: number;
    underwriterLimit: number;
    date: string;
}
