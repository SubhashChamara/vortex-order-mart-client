import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { Request } from "./Request";
import Logger from "../../@helpers/Logger";

import { authServiceRequests } from "../requests/authServiceRequests";
import { workflowServiceRequests } from "../requests/workflowServiceRequests";
import { adminServiceRequests } from "../requests/adminServiceRequests";
import { activityEngineRequests } from "../requests/activityEngineRequests";
import { documentServiceRequests } from "../requests/documentServiceRequests";
import { creditCardServiceRequests } from "../requests/credit-card-requests/creditLimitIncreaseRequests";
import { reportRequests } from "../requests/credit-card-requests/reportRequests";
import { cribPullServiceRequests } from "../requests/credit-card-requests/cribPullRequests";

type RequestReturning<T> = Request<unknown, AxiosResponse<T, unknown>, unknown>;

type ErrorHandle<T> = (err: T) => void;
type AxiosErrorHandle = ErrorHandle<AxiosError>;

type CustomResponse = {
  data: any | null;
  err: CustomError | null;
};

type CustomError = {
  msg: string;
  status: number;
  statusText: string;
  detail: string;
};

export interface ErrorHandler {
  response?:
  | AxiosErrorHandle
  | {
    [status: number]: AxiosErrorHandle;
  };
  network?: ErrorHandle<void>;
}

export class Api {
  readonly requests = {
    auth: authServiceRequests(),
    workflow: workflowServiceRequests(),
    admin: adminServiceRequests(),
    activity: activityEngineRequests(),
    document: documentServiceRequests(),
    creditCard: creditCardServiceRequests(),
    reports: reportRequests(),
    cribPull: cribPullServiceRequests()
  };

  get base() {
    return import.meta.env.VITE_API_URL;
  }

  async performRequest<T>(
    selector: (requests: Api["requests"]) => RequestReturning<T>,
    configOverride: Partial<AxiosRequestConfig<unknown>> | undefined = undefined
  ): Promise<CustomResponse> {
    const req = selector(this.requests);
    try {
      const res = await req.invoke(this, configOverride);
      Logger.debug(`Success Response: ${JSON.stringify(res)}`);
      return { data: res.data, err: null };
    } catch (e) {
      Logger.debug(`Error Response: ${JSON.stringify(e)}`);
      const customeError: CustomError = {
        msg: e?.response?.data?.message,
        detail: e?.response?.data?.detail,
        status: e?.response?.status,
        statusText: e?.response?.statusText,
      };
      return { data: null, err: customeError };
    }
  }
}
