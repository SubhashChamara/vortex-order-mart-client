import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const PleaseApproveUserModificationConfig: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "modifyUser",
  keyForm: "FK_task02",
};

export default PleaseApproveUserModificationConfig;
