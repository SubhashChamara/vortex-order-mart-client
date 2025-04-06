import { WorkflowFormConfigType } from "../app/core/types/WorkflowFormConfigType";
import WorkflowConfig from "../app/workflow/WorkflowConfig";

const filterComponent = (
  idProcess: string,
  keyForm: string
): WorkflowFormConfigType | null => {
  console.log(idProcess);
  console.log(keyForm);
  const conf = WorkflowConfig.find(
    (config) => config.idProcess === idProcess && config.keyForm === keyForm
  );

  if (conf) return conf;
  return null;
};

export default filterComponent;
