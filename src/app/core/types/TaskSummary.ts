import { TaskSummaryDetail } from "./TaskSummaryDetail";

export interface TaskSummary {
  inflow: TaskSummaryDetail;
  outflow: TaskSummaryDetail;
  pending: TaskSummaryDetail;
}
