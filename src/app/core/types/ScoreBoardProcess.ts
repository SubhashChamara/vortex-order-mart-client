export interface ScoreBoardProcess {
  processName: string;
  processLogo: string;
  processInstance: string;
  processDefinitionKey: string;
  workflowLabel: string;
  invokedDate: Date;
  invokedUser: string;
  invokedUserProfile: string;
  tat: string;
  invokedGroup: string;
  status: string;
  completedDate: Date
  businessKey: string
  priorityProcess:boolean
}
