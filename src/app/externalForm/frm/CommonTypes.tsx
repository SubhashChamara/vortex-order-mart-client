export interface ActionPointInfoList {
    email: string;
    actionPoint: string;
  }

  export interface ActionPoint {
    email: string;
    actionPoint: string;
  }
  
  export interface ActionPointRequest {
    actionPoints: ActionPoint[];
  }

  export interface ExpertOpinion {
    id: number;
    opinionRequest: string;
    opinionRequestDate: string;
    opinionProvide: string;
    opinionProvideBy: string;
    expertOpinionUser: string;
    opinionProvideDate: string;
    businessKey: string;
    
    }
  
  
    export interface DropDownItem {
      id: string; 
      name: string;
    }

    export interface FemInvsProcessInfi {
      workFlowLabel: string;
      source: string;
      bundledRef: string;
      nicOld: string;
      nicNew: string;
      monthVal: number;
      accOpenYearVal: number;
      groupAccountNo: string;
      ecapsRef: string;
      bucket: number;
      delinquency: number;
      comment: string;
      commentMaker: string;
      processInstanceId: string;
    }

    export interface FemVerificForm {

      rsdVerification: boolean;
        empVerification: boolean;
      reason:string;
      checkerComment: string;
    }

    export interface FemVerificFormList {

      businessKey: string;
      rsdVerification: boolean;
        empVerification: boolean;
      reason:string;
      checkerComment: string;
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