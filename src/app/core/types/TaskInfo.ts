export interface TaskInfo {
  taskInstance: string;
  taskName: string;
  assignedGroup: string;
  assignee: string;
  owner: string;
  ownerProfile: string;
  processName: string;
  processInstanceId: string;
  invokedTime: Date;
  claimedTime: Date;
  logo: string;
  businessKey: string;
  returned: boolean;
  status: string;
  priorityProcess: boolean;
  priorityTask:boolean;
}
