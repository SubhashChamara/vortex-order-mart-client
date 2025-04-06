export interface FrmInvestReportIf {
    businessKey: string;
    source: string;
    oldNic: string;
    newNic: string;
    expertOpinion: string;
    frmVerification: string;
    externalVerification: string;
    questionnaire: string;
    dataEntry: string;
    fraudFInalising: string;
    view: string;
    eventSummaryReport: string;
    fraudApproved: string;
    actionPoint: string;
    processInstanceId: String ;
    frmExpertOpinionData:FrmInvokeData;
    frmVerificationData:FrmInvokeData;
    frmExternalVerificationData:FrmInvokeData;
    frmQuestionnaireData:FrmInvokeData;
    dataEntryInvokedRef: string;
    fraudFinalisingInvokedRef:string;
    dataEntryCompleted: boolean;
    dataEntryInvoked:boolean;
    fraudFinalisingInvoked:boolean;
    fraudFinalisingCompleted:boolean;
    fraudStatus:string;
}

export interface FrmInvokeData {
    totalCount: number;
    completedCount: number;
    completedList: string;
    pendingList: string;
    
}