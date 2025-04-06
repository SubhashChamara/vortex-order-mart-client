import React, { useEffect, useState } from "react";
import { Api } from "../../../api/Api";
import Logger from "../../../@helpers/Logger";
import { CliInfo } from "../../workflow/creditLimitIncrease/types/CliInfo";
import UserForm from "./components/CreditLimitIncreaseForm/index";
import { ScoreBoardProcess } from "../../core/types/ScoreBoardProcess";
import CribCheckForm from "./components/CribCheckForm";
import { CLICheckListCategory } from "../../workflow/creditLimitIncrease/types/CLICheckListCategory";
import { CLICheckListHeading } from "../../workflow/creditLimitIncrease/types/CLICheckListHeading";
import { CLIProcessCheckListInfo } from "../../core/types/creditlimitIincreaseProcess/CLIProcessCheckListInfo";
import VerificationCheckListFormView from "./components/VerificationChecklistFormView/index";
import UnderWriterViewForm from "./components/UnderWriterCheckListView/UnderWriterViewForm";
import CBODockCheckFormView from "./components/CBODockCheckFormView";
import Ve3StepWizard from "../../../@core/ui/Ve3StepWizard";
import PendingReasonsForm from "./components/PendingReasonsView/PendingReasonsForm";
import RejectReasonsForm from "./components/RejectReasonsView/RejectReasonsForm";
import CBOOperationCheckList from "./components/CBOOperationCheckList";
import { ScoreBoardTask } from "../../core/types/ScoreBoardTask";
import Ve3LoadingScreen from "../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Ve3NoDataScreen from "../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";

type ExternalCreditLimitIncreaseProps = {
  process: ScoreBoardProcess | null;
};

const ExternalForm: React.FC<ExternalCreditLimitIncreaseProps> = ({
  process,
}) => {
  const [cliProcessData, setCliProcessData] = useState<CliInfo | null>(null);
  const [taskList, setTaskList] = useState<ScoreBoardTask[]>([]);
  const [selectionCriteriaList, setSelectionCriteriaList] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [verifyItems, setVerifyItems] = useState<CLIProcessCheckListInfo[]>([]);
  const [pendReasonList, setPendReasonList] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [rejectReasonList, setRejectReasonList] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [operationFirstCheckList, setOperationFirstCheckList] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [operationSecondCheckList, setOperationSecondCheckList] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFetchCliProcessInfo = async () => {
    if (!process) {
      return;
    }
    setLoading(true);
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCliByProcess(process.processInstance)
      );

      Logger.debug(
        "(CLI Process) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setCliProcessData(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemCheckListItems = async () => {
    if (!process) {
      return;
    }
    setLoading(true);
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCheckListItems(
          process.processInstance,
          CLICheckListCategory.VERIFICATOR,
          CLICheckListHeading.VERIFICATION
        )
      );

      Logger.debug(
        "(Check List Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setVerifyItems(data);
        console.log("verify items", verifyItems);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectionCheckListItems = async () => {
    if (!process) {
      return;
    }
    setLoading(true);
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCheckListItems(
          process.processInstance,
          CLICheckListCategory.VERIFICATOR,
          CLICheckListHeading.SELECTION_CRITERIA
        )
      );

      Logger.debug(
        "(Selection Criteria Check List Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setSelectionCriteriaList(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendReasonItems = async () => {
    if (!process) {
      return;
    }
    setLoading(true);
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCheckListItems(
          process?.processInstance,
          CLICheckListCategory.PEND_REASON,
          null
        )
      );

      Logger.debug(
        "(Pending Reason Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setPendReasonList(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRejectReasonItems = async () => {
    if (!process) {
      return;
    }
    setLoading(true);
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCheckListItems(
          process.processInstance,
          CLICheckListCategory.REJECT_REASON,
          null
        )
      );

      Logger.debug(
        "(Pending Reason Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setRejectReasonList(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOperationSecondCheckList = async () => {
    if (!process) {
      return;
    }
    setLoading(true);
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCheckListItems(
          process.processInstance,
          CLICheckListCategory.CBO_OPERATION,
          CLICheckListHeading.SECOND_LIST
        )
      );

      Logger.debug(
        "(Second Operation Check List Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setOperationSecondCheckList(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOperationFirstCheckList = async () => {
    if (!process) {
      return;
    }
    setLoading(true);
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCheckListItems(
          process.processInstance,
          CLICheckListCategory.CBO_OPERATION,
          CLICheckListHeading.FIRST_LIST
        )
      );

      Logger.debug(
        "(First Operation Check List Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setOperationFirstCheckList(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
    handleFetchCliProcessInfo();
    handleFetchTaskList();
    fetchSelectionCheckListItems();
    fetchSystemCheckListItems();
    fetchPendReasonItems();
    fetchRejectReasonItems();
    fetchOperationFirstCheckList();
    fetchOperationSecondCheckList();
  }, []);

  const findCurrentStep = (taskList: ScoreBoardTask[]) => {
    if (taskList.some((task) => task.taskName === "Please Process")) return 7;
    if (
      taskList.some(
        (task) => task.taskName === "Please Carry out CBO DOC CHECK"
      )
    )
      return 6;
    if (
      taskList.some((task) => task.taskName === "Please Underwrite CLI Request")
    )
      return 5;
    if (taskList.some((task) => task.taskName === "Please Review Request"))
      return 2;
    if (
      taskList.some((task) => task.taskName === "Please Carry out CRIB CHECK")
    )
      return 1;
    if (
      taskList.some(
        (task) => task.taskName === "Please Approve Request at Call Center"
      )
    )
      return 1;

    return 0;
  };

  const currentStep = findCurrentStep(taskList);
  const steps = [
    {
      label: "Request",
      content: <UserForm cliProcessData={cliProcessData} editable={false} />,
    },
    {
      label: "Crib Check",
      content: (
        <CribCheckForm cliProcessData={cliProcessData} editable={false} />
      ),
    },
    {
      label: "Verification",
      content: (
        <VerificationCheckListFormView
          cliProcessData={cliProcessData}
          verifyItems={verifyItems}
          selectionCriteriaList={selectionCriteriaList}
        />
      ),
    },
    {
      label: "Pending Reasons List",
      content: (
        <PendingReasonsForm
          cliProcessData={cliProcessData}
          pendReasonList={pendReasonList}
          setPendReasonList={setPendReasonList}
          editable={false}
        />
      ),
    },
    {
      label: "Under-Writer",
      content: (
        <UnderWriterViewForm cliProcessData={cliProcessData} editable={false} />
      ),
    },
    {
      label: "Rejection Reasons",
      content: (
        <RejectReasonsForm
          rejectReasonList={rejectReasonList}
          setRejectReasonList={setRejectReasonList}
          editable={false}
        />
      ),
    },
    {
      label: "CBO Doc",
      content: (
        <CBODockCheckFormView
          cliProcessData={cliProcessData}
          editable={false}
        />
      ),
    },
    {
      label: "CBO Operation",
      content: (
        <CBOOperationCheckList
          operationFirstCheckList={operationFirstCheckList}
          setOperationFirstCheckList={setOperationFirstCheckList}
          operationSecondCheckList={operationSecondCheckList}
          setOperationSecondCheckList={setOperationSecondCheckList}
          editable={false}
        />
      ),
    },
  ].slice(0, currentStep + 1);

  return (
    <div>
      {loading ? (
        <Ve3LoadingScreen />
      ) : cliProcessData ? (
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
