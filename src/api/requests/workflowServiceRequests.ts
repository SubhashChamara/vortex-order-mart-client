import { Request } from "../api/Request";

import { TaskSummary } from "../../app/core/types/TaskSummary";
import { WorkflowStatistics } from "../../app/core/types/WorkflowStatistics";
import { ProcessDefinitionInfo } from "../../app/core/types/ProcessDefinitionInfo";
import { TaskInfo } from "../../app/core/types/TaskInfo";
import { Pageable } from "../types/Pageable";
import { ProcessInfo } from "../../app/core/types/ProcessInfo";
import { TaskClaimRequest } from "../../app/core/types/TaskClaimRequest";
import { TaskDetailInfo } from "../../app/core/types/TaskDetailInfo";
import { CommentInfo } from "../../app/core/types/CommentInfo";
import { ScoreBoardProcess } from "../../app/core/types/ScoreBoardProcess";
import { ScoreBoardTask } from "../../app/core/types/ScoreBoardTask";
import { FemlnvsRequest } from "../../app/workflow/FrmInvestigation/@types/FemlnvsRequest";

export const workflowServiceRequests = () => {
  const prefix = "workflow";

  return {
    /**
     * Get workflow statistics by date period.
     * @param idProcess workflow process id
     * @returns workflow statistics
     */
    workflowStatistics: (idProcess: string) =>
      Request.GET<WorkflowStatistics>(
        `${prefix}/dashboard/statistics/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Get task summary.
     * @returns task summary
     */
    taskSummary: () =>
      Request.GET<TaskSummary>(`${prefix}/dashboard/task-summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get list of process definitions latest versions.
     * @returns process definitions details.
     */
    processList: () =>
      Request.GET<ProcessDefinitionInfo>(`${prefix}/process/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get Processes with basic info
     * @returns Process basic info
     */
    processListBasic: () =>
      Request.GET<ProcessInfo>(`${prefix}/process/list/basic`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
   * Get Processes status master list for scoreboard status filter
   * @returns Process stutus list
   */
    processStatusList: () =>
      Request.GET<ProcessInfo>(`${prefix}/process/master/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),


    /**
     * Get list of comments for process
     * @param processInstance process instance
     * @returns list of comment for process
     */
    getComments: (processInstance: string) =>
      Request.GET<CommentInfo[]>(
        `${prefix}/process/${processInstance}/comment`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Get a list of tasks.
     * @param startDate start date
     * @param endDate end date
     * @param page page number
     * @param size page size
     * @param processName process name
     * @returns Pageable task info list
     */
    taskList: (
      startDate: string|null,
      endDate: string|null,
      page: number,
      size: number,
      processName: string,
      workflowLabel: string | null,
      myTasks: boolean,
      priority?: number
    ) =>
      Request.GET<Pageable<TaskInfo>>(`${prefix}/task/list`, {
        params: {
          startDate,
          endDate,
          page,
          size,
          sort: "createTime,desc",
          processName,
          workflowLabel,
          myTasks,
          priority
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Assign or Lock a task to a user.
     * Use this api when clicking on a task in the task pad.
     * @param request the task claim request containing the task UUID that want to assign.
     * @returns TaskDetailInfo all task details to perform the task view
     */
    claim: (request: TaskClaimRequest) =>
      Request.POST<TaskDetailInfo>(`${prefix}/task/claim`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * create comment for task
     * @param taskInstance task instance
     * @param comment comment
     */
    addComment: (taskInstance: string, comment: string) =>
      Request.POST<void>(
        `${prefix}/task/${taskInstance}/comment`,
        { message: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      ),

    /**
     * process search from history tables
     * @param workflowLabel workflow label
     * @param startDate start date
     * @param endDate end date
     * @param processName process name
     * @param businessKey business key
     * @param size page size
     * @param page page no
     * @returns list of process information related to the given filters
     */
    processListHistory: (
      workflowLabel: string | null,
      startDate: string,
      endDate: string,
      processName: string | null,
      status: string | null,
      size: number,
      page: number
    ) =>
      Request.GET<Pageable<ScoreBoardProcess>>(`${prefix}/history/list`, {
        params: {
          startDate,
          endDate,
          page,
          size,
          sort: "startTime,desc",
          processName,
          workflowLabel,
          status
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * get task list for a purticular process instance
     * @param processInstance process instance
     * @returns task list for process instance
     */
    taskListHistory: (processInstance: string) =>
      Request.GET<ScoreBoardTask>(
        `${prefix}/history/task/list/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    processDetails: (processInstance: string) =>
      Request.GET<ScoreBoardProcess>(
        `${prefix}/history/process/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    unassignTask: (request: { taskInstance: string }) =>
      Request.POST<void>(`${prefix}/task/unassign`, request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
  };
};
