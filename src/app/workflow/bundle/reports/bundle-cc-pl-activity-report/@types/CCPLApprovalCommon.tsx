
export interface CardSummaryDTO {
    branchName: string;
    count: number;
    underwriterLimit: number;
}

export interface LoanSummaryDTO {
    branchName: string;
    count: number;
    netAmount: number;
    approvedAmount: number;
}


export interface BranchSummaryDTO {
    loanSummaries: LoanSummaryDTO[];
    cardSummaries: CardSummaryDTO[];
}

export interface AgentLoanReportDTO {
    agentId : string
    dsrName: string;
    count: number;
    netAmount: number;
    grossAmount: number;
    branchName: string;
}

export interface AgentCardReportDTO {
    agentId : string
    dsrName: string;
    count: number;
    branchName: string;
    cardLimit: number;
}

export interface DrilldownReportDTO {
    id: number; 
    businessKey: string;
    applicantName: string;
    applicantNIC: string;
    branchName: string;
    dsrName: string;
    amount: number;
    approvedAmount: number;
    approveDate: string;
}


