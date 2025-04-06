export type FrmDataEntryRequest = {
    caseRefNo: string;
    caseReceived: string; // ISO format date string
    channel: string;
    dataEntryDate: string; // ISO format date string
    appRef_CardNo: string;
    accNo_WfNo: string;
    applicantsName: string;
    dateOfBirth: string; // ISO format date string
    nicPPNo: string;
    product: string;
    customerCategoryDE: string;
    companyName: string;
    suspisiousDocument: string;
    bdmLm: string;
    staffID: string;
    staffName: string;
    dsrStaffInvolved: string;
    applicantInvolved: string;
    escalationType: string;
    grossFraudLoss: number;
    potentialSavings: number;
    potentialSavingsUsd: number;
    recoveredAmount: number;
    netFraudLoss: number;
    reasonToSubmitBg: string;
    observeModulusOpr: string;
    recomendInBrief: string;
    conclusionStatus: string;
    scopeOfWork: string;
    fraudIdentifyDate: string; // ISO format date string
    investigationConcludeDate: string; // ISO format date string
    writeOffDate: string; // ISO format date string
    timePeriod: string;
    caseHandledBy: string;
    nextActions: string;
    accountability: string;
    responsiblePerson: string;
    problemStatement: string;
    grossExposureUSD: number;
    expectedRecovery_USD: number;
    expectedNetLoss_USD: number;
    actualRecovery_USD: number;
    finalLossTaken_USD: number;
    status_Open_Closed: string;
    lossRecognition: string;
    dataEntryMonth: number;
    frmInvestigationProcessId: string;
    processInstanceId: string;
    executiveSummary: string;
    findings: string;
};
