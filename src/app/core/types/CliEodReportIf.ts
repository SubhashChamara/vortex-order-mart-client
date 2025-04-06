export interface CliEodReportIf {
    refNum: String;
    cardNumber: string;
    createdDate: Date;
    createdBy: string;
    presentLimit: number;
    newLimit: number;
    enhancementType: string;
    modeType: string;
    verifiedBy: string;
    approvedBy: string;
    processStatus: string;
    status: String
}