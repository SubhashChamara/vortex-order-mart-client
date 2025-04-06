export type FemFraudInvestForm = {
    requiredApprovalType: string;
    emailBody: string;
    fraudStatus?: string;
    memoAttached?: boolean;
    decisionEmail:string ;
    emailApprovalAttached:boolean;
    background:string;
    scopeOfWork:string;
    investigation:string;
    modusOperandi:string;
    conclution:string;
    prepared_by:string;
    approved_by:string;
    memoGenDate:Date;
    responsible_person:string;
    investigationFlowProcInst:string;
    processInstance:string;
    taskInstance: string;
    taskType: string
  };