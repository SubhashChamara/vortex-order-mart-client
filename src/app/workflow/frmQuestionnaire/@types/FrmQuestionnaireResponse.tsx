export interface FrmQActionPointResponse {
    id?: number;
    actionPoint?: string; 
    email?: string;
    frmInvestigationProcessId?: number; 
    businessKey?: string;
  }
  
  export interface FrmQDataEntryResponse {
    caseRefNo: string;
    caseReceived: string;
    channel: string;
    dataEntryDate: string;
    appRef_CardNo: string;
    accNo_WfNo: string;
    applicantsName: string;
    dateOfBirth: string;
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
    fraudIdentifyDate: string;
    investigationConcludeDate: string;
    writeOffDate: string;
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
    businessKey: string;
    executiveSummary: string;
    findings: string;
  }

  export interface FrmQExpertOpinionResponse {
    opinionRequest?: string;
    opinionRequestBy?: string;
    opinionProvide?: string;
    opinionProvideBy?: string;
    expertOpinionUser?: string;
    businessKey?: string;
  }

  export interface FrmQExternalVerificationResponse {
    attempt1?: boolean;
    attempt2?: boolean;
    attempt3?: boolean;
    reason1?: string;
    reason2?: string;
    reason3?: string;
    checkerComment?: string;
    makerComment?: string;
    businessKey?: string;
  }
  
  export interface FrmQInvestigationResponse {
    source?: string;
    bundledRef?: string;
    monthVal?: number;
    groupAccountNo?: string;
    ecapsRef?: string;
    accOpenYearVal?: number;
    bucket?: number;
    delinquency?: number;
    comment?: string;
    commentMaker?: string;
    nicOld?: string;
    nicNew?: string;
    businessKey?: string;
  }

  export interface FrmQVerificationResponse {
    rsdVerification?: boolean;
    empVerification?: boolean;
    refVerification?: boolean;
    reason?: string;
    checkerComment?: string;
    businessKey?: string;
  }

  export interface FrmQuestionnaireResponse {
    id?: number;
    questionnaireAttached?: boolean;
    processInstance?: string;  
    businessKey?: string;
  }
  
  
  