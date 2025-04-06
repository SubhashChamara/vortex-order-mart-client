export interface CHAccEodReportIf {
    refId: string;
    category: string;
    branch: number;
    customerName: string;
    oldNIC: string;
    newNIC: string;
    armCode: number;
    initiateDate: string;
    initiaterFullName: string;
    docChecker: string;
    status: string;
}