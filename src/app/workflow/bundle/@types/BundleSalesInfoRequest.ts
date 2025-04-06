export interface BundleSalesInfoRequest {
    processInstance: string;
    taskInstance: string;
    groupSale?: boolean | null;
    groupReference?: string | null;
    nameOfSalesAgent?: string | null;
    dsrUserId: string | null;
    teamLeaderId: string | null;
    branchId: number | null;
    salesComments?: string | null;
    armNumber: string;
}