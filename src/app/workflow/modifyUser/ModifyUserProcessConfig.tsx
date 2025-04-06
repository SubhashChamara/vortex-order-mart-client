import { WorkflowFormConfigType } from "../../core/types/WorkflowFormConfigType";

import FK_task01Config from "./FK_task01/FK_task01Config";
import FK_task02Config from "./FK_task02/FK_task02Config";

const ModifyUserProcessConfig: WorkflowFormConfigType[] = [
  FK_task01Config,
  FK_task02Config,
];

export default ModifyUserProcessConfig;
