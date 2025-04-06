export interface BundleEODIf {

    businessKey: string;
    category: string;
    branch: string;
    cardType: string;
    ecapsRef: string;
    customerName: string;
    oldNIC: string;
    newNic: string;
    armCode: string;
    casa: boolean;
    card: boolean;
    alpl: boolean;
    initiatedDate: Date | string;
    initiatorFullName: string;
    docCheckerCommon: string;
    docCheckerCasa: string;
    docCheckerCard: string;
    docCheckerALPL: string;
    status: string;
    personalLoanType: string;
    processStatus: string;
    processStatusDesc: string;
    processStatusColor: string;

}