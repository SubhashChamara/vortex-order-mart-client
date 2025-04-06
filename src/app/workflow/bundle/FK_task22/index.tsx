import React, { useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { ChecklistInfo } from "../../../core/types/ChecklistInfo";
import { Api } from "../../../../api/Api";
import UnderwriterPendReasonsAllCols from "../components/UnderwriterPendReasonsAllCols/UnderwriterPendReasonsAllCols";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";

interface BundledFlowProps {
  task: TaskDetailInfo;
}

const BundleForm: React.FC<BundledFlowProps> = ({ task }) => {
  const [pendReasonsChecklist, setPendReasonsChecklist] = useState<
    ChecklistInfo[]
  >([]);

  // get pend reasons checklist
  const getPendReasonsChecklist = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundledChecklistItems(
        task.processInstanceId,
        task.processDefinitionKey,
        "PEND_REASON"
      )
    );

    if (data !== null) {
      setPendReasonsChecklist(data);
    } else {
      console.log(err);
    }
  };

  // handle method --> pend reasons checklist submission
  const handlePendReasonsSubmission = async () => {
    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveBundleChecklist(
        pendReasonsChecklist,
        task.processInstanceId,
        task.taskInstance
      )
    );
    if (!err) {
      toast.success("Pending reasons checklist saved");
    } else {
      toast.error(err.msg);
    }
  };

  useEffect(() => {
    getPendReasonsChecklist();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <UnderwriterPendReasonsAllCols
        editable={true}
        pendReasonsChecklist={pendReasonsChecklist}
        setPendReasonsChecklist={setPendReasonsChecklist}
      />

      <div className="flex justify-end">
        <Button onClick={handlePendReasonsSubmission}>
          <EdgeSvgIcon className="mr-3">feather:save</EdgeSvgIcon>Save
        </Button>
      </div>
    </div>
  );
};

export default BundleForm;
