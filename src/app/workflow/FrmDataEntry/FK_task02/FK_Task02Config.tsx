import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task02Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "fRMDataEntry", // xml file>process>id
  keyForm: "FK_task02", // tsk>user task>formkey
};

export default FK_Task02Config;