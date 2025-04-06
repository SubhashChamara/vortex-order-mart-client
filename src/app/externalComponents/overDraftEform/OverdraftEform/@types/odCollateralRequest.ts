export interface odCollateralRequest {
    id?: number | null;
    accountNo: string;
    currencyId: number | null;
    name: string | null;
    interest: number | null;
    maturityDate: string | null;
    currentBalance: number | null;
    lienAmount: number;
    applicableLTV: number;
}