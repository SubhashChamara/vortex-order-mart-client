export type FemInvsProcessInfi = {
    workFlowLabel: string;
    source: string;
    bundledRef: string;
    oldNic: string;
    newNic: string;
    month: number;
    year: number;
    groupAccNo: string;
    ecapsRef: string;
    bucket: number;
    delinquency: number;
    invokerComment: string;
    makerComment: string;
  };
  
  export type FemlnvsRequest = FemInvsProcessInfi & {
    processInstanceId: string;
  };
  