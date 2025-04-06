import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task01Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "frmFraudFinalising", // xml file>process>id
  keyForm: "FK_task01", // tsk>user task>formkey
};

export default FK_Task01Config;