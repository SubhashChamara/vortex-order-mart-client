import { WorkflowFormConfigType } from "../../core/types/WorkflowFormConfigType";

import FK_Task01Config from "./FK_task01/FK_task01Config";
import FK_Task02Config from "./FK_task02/FK_task02Config";

const UserRoleGroupAllocationConfig: WorkflowFormConfigType[] = [
  FK_Task01Config,
  FK_Task02Config,
];

export default UserRoleGroupAllocationConfig;
