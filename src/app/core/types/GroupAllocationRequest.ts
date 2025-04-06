export interface GroupAllocationRequest {
    idUserRole: string;
    groupIds: string[];
    processInstance: string | undefined;
    workflowProcess: string | undefined;
}