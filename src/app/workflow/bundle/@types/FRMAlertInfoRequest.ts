export interface FRMAlertRequest {
    id: number | null;
    alert: string | null;
    checkerNote: string | null;
    authorizerNote: string | null;
    databases: string | null;
    alerted: boolean | null;
}