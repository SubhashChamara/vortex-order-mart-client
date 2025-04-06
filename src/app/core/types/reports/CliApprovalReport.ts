export interface CliApprovalReportIf {
    refNum: String;
    cardNumber: string;
    branch: string;
    presentLimit: number;
    newLimit: number;
    enhancementFee: number;
    newCardTypeUW: string;
    cardType: string;
    category: string;
    evaluatedOn: string;
    dbr: number;
    mueOnUs: number;
    mueOffUs: number;
    verificationCompletedUser: string;
    approvedUser: string;
    approvedLevel: string;
    processStatus: String;
    status: String;
}