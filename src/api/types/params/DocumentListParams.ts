export interface DocumentListParams {
  processInstance: string | null;
  idProcess: string | null;
  processName: string | null;
  workflowLabel: string | null;
  startDate: string | null;
  endDate: string | null;
  size: number;
  page: number;
  sort: string;
}
