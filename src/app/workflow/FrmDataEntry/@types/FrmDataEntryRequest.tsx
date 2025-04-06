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
    grossFraudLoss: string | null;
    potentialSavings: string | null;
    potentialSavingsUsd: string | null;
    recoveredAmount: string | null;
    netFraudLoss: string | null;
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
    grossExposureUSD: string | null;
    expectedRecovery_USD: string | null;
    expectedNetLoss_USD: string | null;
    actualRecovery_USD: string | null;
    finalLossTaken_USD: string | null;
    status_Open_Closed: string;
    lossRecognition: string;
    dataEntryMonth: number | null;
    frmInvestigationProcessId: string;
    processInstanceId: string;
    executiveSummary: string;
    findings: string;
};
