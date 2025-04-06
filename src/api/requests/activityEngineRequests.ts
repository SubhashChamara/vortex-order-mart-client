import { Request } from "../api/Request";

import { ProcessInstanceInfo } from "../../app/core/types/ProcessInstanceInfo";
import { ProcessStartRequest } from "../../app/core/types/ProcessStartRequest";
import { TaskSubmitRequest } from "../../app/core/types/TaskSubmitRequest";

export const activityEngineRequests = () => {
  return {
    startProcess: (request: ProcessStartRequest, prefix: string) =>
      Request.POST<ProcessInstanceInfo>(`${prefix}/process/start`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    submitTask: (request: TaskSubmitRequest, prefix: string) =>
      Request.POST(`${prefix}/task/submit`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  };
};
