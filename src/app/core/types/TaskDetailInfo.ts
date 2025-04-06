import { DecisionPathInfo } from "./DecisionPathInfo";

export interface TaskDetailInfo {
  processDefinitionKey: string;
  processName: string;
  processInstanceId: string;
  businessKey: string;
  taskId: string;
  taskName: string;
  taskInstance: string;
  formKey: string;
  assignedGroup: string;
  assignee: string;
  owner: string;
  invokedTime: string;
  claimedTime: string;
  decisionPaths: DecisionPathInfo[];
  serviceUrl: string;
  logo: string;
  unAssignOption: boolean;
}
