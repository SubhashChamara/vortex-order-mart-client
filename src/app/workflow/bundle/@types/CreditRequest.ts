export interface CreditRequest {
    processInstance: string;
    taskInstance: string;
    isCard?: boolean;
    cardTypeId?: number | null;
    cardReconciled?: boolean;
    isLoan?: boolean;
    alplReconciled?: boolean;
    isCasa?: boolean;
    casaReconciled?: boolean;
    requestAmount?: number | null;
    loanRequestType?: string | null;
    casaDefined?: boolean | null;
    casaBBAccount?: boolean | null;
    relationShipType: string;
    relationShipId: string;
}
