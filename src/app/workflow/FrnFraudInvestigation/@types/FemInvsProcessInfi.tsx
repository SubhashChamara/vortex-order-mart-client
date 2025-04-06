export type FemInvsProcessInfi = {
    workFlowLabel: string;
    source: string;
    bundledRef: string;
    oldNic: string;
    newNic: string;
    monthVal: number;
    year: number;
    groupAccNo: string;
    ecapsRef: string;
    bucket: number;
    delinquency: number;
    comment: string;
    makerComment: string;
  };
  
  export type FemlnvsRequest = FemInvsProcessInfi & {
    processInstanceId: string;
  };
  