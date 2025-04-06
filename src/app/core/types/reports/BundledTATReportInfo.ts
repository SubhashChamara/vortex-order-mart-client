export interface BundledTATReportInfo {
    cardDetails: TATCardDTO[];
    casaDetails: TATCASADTO[];
    loanDetails: TATLoanDTO[];

    cardAverageDetails: TATCardAverageDTO;
    casaAverageDetails: TATCASAAverageDTO;
    loanAverageDetails: TATLoanAverageDTO;

    type: string;
}

interface TATCardDTO {
    branchName: string;
    records: TATCARDRecordDTO[];
}

interface TATCASADTO {
    branchName: string;
    records: TATCASARecordDTO[];
}

interface TATLoanDTO {
    branchName: string;
    records: TATLOANRecordDTO[];
}


interface TATCARDRecordDTO {
    businessKey: string;
    branchSSU: string;
    CDDOps: string;
    creditReturns: string;
    otherReturns: string;
    cribUser: string;
    docCheck: string;
    dataEntryMaker: string;
    dataEntryChecker: string;
    cell: string;
    eyeballing: string;
    veriAndUnder: string;
    fraud: string;
    exVeri: string;
    L2L3: string;
    hours: string;
    days: string;
    total: number;
    segment: string;
    dsrName: string;
    StartDate: string;
    EndDate: string;
}

interface TATCARDRecordDTO {
    businessKey: string;
    branchSSU: string;
    CDDOps: string;
    creditReturns: string;
    otherReturns: string;
    cribUser: string;
    docCheck: string;
    dataEntryMaker: string;
    dataEntryChecker: string;
    cell: string;
    eyeballing: string;
    veriAndUnder: string;
    fraud: string;
    exVeri: string;
    L2L3: string;
    hours: string;
    days: string;
    total: number;
    segment: string;
    dsrName: string;
    StartDate: string;
    EndDate: string;
}

interface TATCASARecordDTO {
    businessKey: string;
    branchSSU: string;
    CDDOps: string;
    branchRework: string;
    docCheck: string;
    dataEntryMaker: string;
    dataEntryChecker: string;
    debitCard: string;
    cell: string;
    status: string;
    hours: string;
    days: string;
    total: number;
    segment: string;
    dsrName: string;
    StartDate: string;
    EndDate: string;
}

interface TATLOANRecordDTO {
    businessKey: string;
    branchSSU: string;
    CDDOps: string;
    creditReturns: string;
    otherReturns: string;
    cribUser: string;
    docCheck: string;
    dataEntryMaker: string;
    dataEntryChecker: string;
    PLProcessing: string;
    cell: string;
    eyeballing: string;
    veriAndUnder: string;
    fraud: string;
    exVeri: string;
    L2L3: string;
    hours: string;
    days: string;
    total: number;
    segment: string;
    dsrName: string;
    StartDate: string;
    EndDate: string;
}

interface TATCardAverageDTO {
    avgBranchSSU: string;
    avgCCDOps: string;
    avgCreditReturns: string;
    avgOtherReturns: string;
    avgCribUser: string;
    avgDocCheck: string;
    avgDataEntryMaker: string;
    avgDataEntryChecker: string;
    avgCell: string;
    avgEyeBalling: string;
    avgUnderwriting: string;
    avgFraud: string;
    avgExVeri: string;
    avgL2L3: string;
    hours: string;
    days: string;
    total: string;
}

interface TATCASAAverageDTO {
    avgBranchSSU: string;
    avgCCDOps: string;
    avgBranchRework: string;
    avgDocCheck: string;
    avgDataEntryMaker: string;
    avgDataEntryChecker: string;
    avgDebitCard: string;
    avgCell: string;
    hours: string;
    days: string;
    total: string;
}

interface TATLoanAverageDTO {
    avgBranchSSU: string;
    avgCCDOps: string;
    avgCreditReturns: string;
    avgOtherReturns: string;
    avgCribUser: string;
    avgDocCheck: string;
    avgDataEntryMaker: string;
    avgDataEntryChecker: string;
    avgPLProcessing: string;
    avgCell: string;
    avgEyeBalling: string;
    avgUnderwriting: string;
    avgFraud: string;
    avgExVeri: string;
    avgL2L3: string;
    hours: string;
    days: string;
    total: string;
}
