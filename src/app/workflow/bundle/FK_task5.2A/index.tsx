import React from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import Ve3TimeBoxScreen from "../../../../@core/ui/Ve3TimeBox/Ve3TimeBoxScreen";

interface EyeballingFormProps {
  task: TaskDetailInfo;
}


const EyeballingForm: React.FC<EyeballingFormProps> = () => {

  return (
    <Ve3TimeBoxScreen message="Please wait until Time Box expires. Also, you can proceed to next task manually." />
  );
};

export default EyeballingForm;
