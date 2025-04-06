export interface FrmExpertOpinionActionPointResponse {
  id: number;
  actionPoint: string;
  email: string;
}

export interface FrmExpertOpinionInvestigationProcessResponse {
  id?: number;
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
  fraudStatus?: string;
  dataEntryInvoked?: boolean;
  dataEntryCompleted?: boolean;
  fraudFinalisingInvoked?: boolean;
  fraudFinalisingCompleted?: boolean;
  nicOld?: string;
  nicNew?: string;
  processInstance?: string;
}

export interface FrmExpertOpinionDataEntryResponse {
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
  executiveSummary: string;
  findings: string;
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

export interface FrmExpertOpinionExternalVerificationResponse {
  attempt1?: boolean;
  attempt2?: boolean;
  attempt3?: boolean;
  reason1?: string;
  reason2?: string;
  reason3?: string;
  checkerComment?: string;
  makerComment?: string;
  buisnessKey?: string;
}

export interface FrmExpertOpinionQuestionnaireResponse {
  questionnaireAttached?: boolean;
  businessKey?: string;
}

export interface FrmExpertOpinionResponse {
  opinionRequest?: string | null;
  opinionRequestBy?: string | null;
  opinionRequestDate?: string | null;
  opinionProvide?: string | null;
  opinionProvideBy?: string | null;
  expertOpinionUser?: string | null;
  opinionProvideDate?: string | null;
  processInstance?: string | null;
  businessKey?: string | null;
}


export interface FrmExpertOpinionVerificationResponse {
  id?: number;
  rsdVerification?: boolean;
  empVerification?: boolean;
  refVerification?: boolean;
  reason?: string;
  checkerComment?: string;
  frmInvestigationProcessId?: number;
  businessKey?: string;
}

export interface DropDownItem {
  id: string; 
  name: string;
}






