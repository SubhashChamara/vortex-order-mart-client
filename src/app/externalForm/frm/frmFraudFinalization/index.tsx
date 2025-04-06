import React, { useEffect, useState } from "react";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";
import { ScoreBoardProcess } from "../../../core/types/ScoreBoardProcess";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import { ScoreBoardTask } from "../../../core/types/ScoreBoardTask";
import Ve3LoadingScreen from "../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Ve3NoDataScreen from "../../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";
import { FemFraudInvestForm } from "../../../workflow/FrnFraudInvestigation/@types/FemFraudInvestForm";
import FraudFinalizingForm from "./components/FrmFraudInvestigationForm";
import MemoGeneration from "./components/FrmMemoGeneration";

type ExternalFrmVerificationProps = {
    process: ScoreBoardProcess | null;
};

const FrmVerificationExternalForm: React.FC<ExternalFrmVerificationProps> = ({
    process,
}) => {
    const [taskList, setTaskList] = useState<ScoreBoardTask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [getData, setData] = useState<FemFraudInvestForm | null>(null);

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

    const handleFetchFraudInvestInfo = async () => {
        if (!process) {
            return;
        }
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getFraudInvmData(process.processInstance)
        );
    
        console.log(data)
    
        Logger.debug(
          "(User Process) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
        );
    
        setData(data);
      };

    useEffect(() => {
        handleFetchTaskList();
        handleFetchFraudInvestInfo();
    }, [process]);

    const findCurrentStep = (taskList: ScoreBoardTask[]) => {
        if (
            taskList.some(
                (task) =>
                    task.taskName === "Please attach email approval for FRM Investigation" &&
                    task.status === "Completed"
            )
        )

            return 3;

        if (
            taskList.some(
                (task) =>
                    task.taskName === "Please provide approval for FRM Investigation" &&
                    task.status === "Completed"
            )
        )

            return 2;

        if (
            taskList.some(
                (task) =>
                    task.taskName === "Please finalise the Fraud" &&
                    task.status === "Completed"
            )
        )
            return 1;

        return 0;
    };

    let currentStep = findCurrentStep(taskList);

    const steps = [
        currentStep === 1 && {
          label: "Fraud Finalising Details",
          content: (
            <FraudFinalizingForm form={getData} task={"task1"} />
          ),
        },
        currentStep === 2 && {
          label: "Fraud Finalising Details",
          content: (
            <FraudFinalizingForm form={getData} task={"task2"} />
          ),
        },
        currentStep === 3 && {
            label: "Fraud Finalising Details",
            content: (
              <FraudFinalizingForm form={getData} task={"task3"} />
            ),
          },
      ].filter(Boolean);
    currentStep = steps.length;

    steps.push(
        {
          label: "Memo Generation",
          content: <MemoGeneration memoData={getData} />,
        })

    const [filteredSteps, setFilteredSteps] = useState(steps);

    useEffect(() => {
        setFilteredSteps(steps);
    }, [getData, taskList]);

    return (
        <div>
            {loading ? (
                <Ve3LoadingScreen />
            ) : getData ? (
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


export default FrmVerificationExternalForm;
