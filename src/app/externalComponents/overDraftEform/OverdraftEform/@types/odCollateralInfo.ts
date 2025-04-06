export interface odCollateralInfo {
    id: number;
    accountNo: string;
    currencyId: number | null;
    name: string | null;
    interest: number | null;
    maturityDate: string | null;
    currentBalance: number | null;
    lienAmount: number;
    applicableLTV: number;
    colApplicableAmount: number;
}