export interface CliRejectedReportIf {
    refNum: String;
    cardNumber: string;
    invokerBranch: string;
    rejectedDate: String;
    rejectedUser: String;
    rejectionReason: string;
    rejectedReasons: string[];
}