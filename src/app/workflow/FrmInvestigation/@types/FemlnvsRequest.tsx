export interface FemlnvsRequest {
    workFlowLabel: string;
    source: string;
    bundledRef: string;
    oldNic: string;
    newNic: string;
    month: number;
    year: number|null;
    groupAccNo: string;
    ecapsRef: string;
    bucket: number|null;
    delinquency: number|null;
    invokerComment: string;
    makerComment: string;
    processInstanceId: string;
    taskInstance: string;
    processInstance: string
    taskName : string
  }