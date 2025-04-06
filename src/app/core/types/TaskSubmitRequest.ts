export interface TaskSubmitRequest {
  processInstance: string;
  taskInstance: string;
  decision: string;
  decisionName: string;
}
