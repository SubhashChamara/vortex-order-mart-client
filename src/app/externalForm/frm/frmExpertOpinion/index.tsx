import React, { useEffect, useState } from "react";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";
import { ScoreBoardProcess } from "../../../core/types/ScoreBoardProcess";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import { ScoreBoardTask } from "../../../core/types/ScoreBoardTask";
import Ve3LoadingScreen from "../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Ve3NoDataScreen from "../../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";
import { DropDownItem, ExpertOpinion } from "../CommonTypes";
import FrmExpertOpinionExternalDetails from "./components/FrmExpertOpinion"

type ExternalFrmExpertOpinionProps = {
  process: ScoreBoardProcess | null;
};

const FrmExpertOpinionExternalForm: React.FC<ExternalFrmExpertOpinionProps> = ({
  process,
}) => {
  const [taskList, setTaskList] = useState<ScoreBoardTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [frmExpertOpinion, setFrmExpertOpinion] = useState<ExpertOpinion | null>(
    null
  );
  const [frmexpertUsers, setFrmExpertUsers] = useState<DropDownItem[] | null>(
    null
  );

  const handleFetchTaskList = async () => {
    if (!process) {
      return;
    }
    setLoading(true);
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.workflow.taskListHistory(process.processInstance)
      );
      Logger.debug(
        "(History Task List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );
      if (data !== null) {
        setTaskList(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchFrmExpertOpinionInfo = async () => {
    if (!process) {
      return;
    }
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getExpertOpinionData(process.processInstance)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );
    if (data !== null) {
      setFrmExpertOpinion(data);
    }
  };

  const handleFetchFrmExpertOpinionUserInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmEOfrmCompletedExpertOpinionUser()
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setFrmExpertUsers(data);
    }
  };

  useEffect(() => {
    handleFetchTaskList();
    handleFetchFrmExpertOpinionInfo();
    handleFetchFrmExpertOpinionUserInfo();
  }, [process]);

  const findCurrentStep = (taskList: ScoreBoardTask[]) => {
    if (
      taskList.some(
        (task) =>
          task.taskName === "Please provide Expert Opinion" &&
          task.status === "Completed"
      )
    )
      return 2;

    if (
      taskList.some(
        (task) =>
          task.taskName === "Please Request Expert Opinion" &&
          task.status === "Completed"
      )
    )
      return 1;

    return 0;
  };


  let currentStep = findCurrentStep(taskList);

  const steps = [
    currentStep === 1 && {
      label: "FRM Expert Opinion Details",
      content: (
        <FrmExpertOpinionExternalDetails
          frmExpertOpinion={frmExpertOpinion}
          frmexpertUsers={frmexpertUsers}
          expertOpinionStatus={false}
        />
      ),
    },
    currentStep === 2 && {
      label: "FRM Expert Opinion Details",
      content: (
        <FrmExpertOpinionExternalDetails
          frmExpertOpinion={frmExpertOpinion}
          frmexpertUsers={frmexpertUsers}
          expertOpinionStatus={true}
        />
      ),
    },
  ].filter(Boolean);
  currentStep = steps.length - 1;

  const [filteredSteps, setFilteredSteps] = useState(steps);

  useEffect(() => {
    setFilteredSteps(steps);
  }, [frmExpertOpinion, frmexpertUsers, taskList]);

  return (
    <div>
      {loading ? (
        <Ve3LoadingScreen />
      ) : frmExpertOpinion ? (
        <Ve3StepWizard
          selectStep={currentStep}
          currentSteps={[currentStep]}
          completedSteps={Array.from({ length: currentStep }, (_, i) => i)}
          steps={filteredSteps}
        />
      ) : (
        // <div className="flex items-center justify-center h-xs">
        <Ve3NoDataScreen />
        // </div>
      )}
    </div>
  );
};


export default FrmExpertOpinionExternalForm;
