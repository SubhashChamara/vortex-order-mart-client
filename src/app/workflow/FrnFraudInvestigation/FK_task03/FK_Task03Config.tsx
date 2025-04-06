import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task03Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "frmFraudFinalising", // xml file>process>id
  keyForm: "FK_task03", // tsk>user task>formkey
};

export default FK_Task03Config;