import { WorkflowFormConfigType } from "../../core/types/WorkflowFormConfigType";

import FK_Task01Config from "./FK_task01/FK_Task01Config";
import FK_Task02Config from "./FK_task02/FK_Task02Config";

const CreateNewUserConfig: WorkflowFormConfigType[] = [
  FK_Task01Config,
  FK_Task02Config,
];

export default CreateNewUserConfig;
