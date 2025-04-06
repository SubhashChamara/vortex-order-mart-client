import { TaskInfo } from "./TaskInfo";

export interface ProcessInstanceInfo {
  processInstance: string;
  processName: string;
  tasks: TaskInfo[];
}
