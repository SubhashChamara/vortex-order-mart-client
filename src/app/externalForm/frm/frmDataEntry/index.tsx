import React, { useEffect, useState } from "react";

import { ActionPoint, FemInvsProcessInfi, FrmExpertOpinionDataEntryResponse } from "../CommonTypes";
import FrmInvestigationDetails from "./components/FrmInvestigationDetails";
import FrmActioPointDetials from "./components/FrmActioPointDetials";
import { ScoreBoardProcess } from "../../../core/types/ScoreBoardProcess";
import { ScoreBoardTask } from "../../../core/types/ScoreBoardTask";
import { Api } from "../../../../api/Api";
import Ve3LoadingScreen from "../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Ve3NoDataScreen from "../../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import Logger from "../../../../@helpers/Logger";
import FrmEODataEntryForm from "./components/FrmEODataEntryForm";
import DataEntryForm from "../../../workflow/overDraft/components/DataEntryForm/DataEntryForm";

type ExternalCreditLimitIncreaseProps = {
  process: ScoreBoardProcess | null;
};

const ExternalForm: React.FC<ExternalCreditLimitIncreaseProps> = ({
  process,
}) => {
  const [taskList, setTaskList] = useState<ScoreBoardTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [getDataEntry, setDatEnry] =
  useState<FrmExpertOpinionDataEntryResponse | null>(null);
  const [monthList, setMonthList] = useState([{ id: 0, name: "" }]);


  const handleFetchDataEnty = async () => {
    if (!process) {
        return;
      }
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getDataEntry(process.processInstance)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
        setDatEnry(data);
    }
  };

  const getMonths = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getMonthList("MONTH")
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setMonthList(data);
      console.log('monthList=', monthList)
    }
  };

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

  useEffect(() => {
    handleFetchTaskList();
    handleFetchDataEnty();
    getMonths();
  }, []);

  console.log("data:",getDataEntry)

  const findCurrentStep = (taskList: ScoreBoardTask[]) => {
    if (
      taskList.some(
        (task) => task.taskName === "Please Carry Out Data Entry"
      )
    )
      return 1;

    return 0;
  };

  let currentStep = findCurrentStep(taskList);
  const steps = [
    getDataEntry && {
      label: "FRM Data Entry",
      content: <FrmEODataEntryForm dataEntry={getDataEntry} monthList={monthList} />,
    },
  ].filter(Boolean)

   currentStep = steps.length - 1; 

  return (
    <div>
      {loading ? (
        <Ve3LoadingScreen />
      ) : getDataEntry ? (
        <Ve3StepWizard
          selectStep={currentStep}
          currentSteps={[currentStep]}
          completedSteps={Array.from({ length: currentStep }, (_, i) => i)}
          steps={steps}
        />
      ) : (
        // <div className="flex items-center justify-center h-xs">
        <Ve3NoDataScreen />
        // </div>
      )}
    </div>
  );
};

export default ExternalForm;
