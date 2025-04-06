export interface UserRoleAllocationRequest {
    idUser: string;
    roleIds: string[];
    processInstance: string;
}