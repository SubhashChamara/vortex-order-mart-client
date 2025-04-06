export interface CreditInformation {
    processInstance: string;
    isCard: boolean;
    cardTypeId?: number;
    cardReconciled: boolean;
    isLoan: boolean;
    alplReconciled: boolean;
    isCasa: boolean;
    casaReconciled: boolean;
    requestAmount?: number;
    loanRequestType?: string;
    casaDefined: boolean;
    casaBBAccount: boolean;
    relationShipType: string;
    relationShipId: string;
}