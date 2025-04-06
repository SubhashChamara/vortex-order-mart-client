import React, { useEffect, useState } from "react";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";
import { ScoreBoardProcess } from "../../../core/types/ScoreBoardProcess";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import { ScoreBoardTask } from "../../../core/types/ScoreBoardTask";
import Ve3LoadingScreen from "../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Ve3NoDataScreen from "../../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";
import { DropDownItem, ExpertOpinion, FemVerificForm } from "../CommonTypes";
import { FemExternVerifForm } from "../../../workflow/frmExternalVerification/components/FemExternVerifForm";
import FrmExternalVerificationForm from "./components/frmExternalVerificationForm";

type ExternalFrmVerificationProps = {
    process: ScoreBoardProcess | null;
};

const FrmVerificationExternalForm: React.FC<ExternalFrmVerificationProps> = ({
    process,
}) => {
    const [taskList, setTaskList] = useState<ScoreBoardTask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [getExternalVerif, setExternalVerif] = useState<FemExternVerifForm | null>(null);

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

    const handleFetchGetExternalVerificationDetails = async () => {
        if (!process) {
            return;
        }
        const { data, err } = await Api.performRequest((r) =>
            r.creditCard.getEcternalVEriDetails(process?.processInstance)
        );

        Logger.debug(
            "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (data !== null) {
            setExternalVerif(data);
            console.log(data)
        }
    };


    useEffect(() => {
        handleFetchTaskList();
        handleFetchGetExternalVerificationDetails();
    }, [process]);

    const findCurrentStep = (taskList: ScoreBoardTask[]) => {
        if (
            taskList.some(
                (task) =>
                    task.taskName === "Please carry out external verification" &&
                    task.status === "Completed"
            )
        )

            return 2;

        if (
            taskList.some(
                (task) =>
                    task.taskName === "Please Request External Verification" &&
                    task.status === "Completed"
            )
        )
            return 1;

        return 0;
    };

    let currentStep = findCurrentStep(taskList);

    const steps = [
        currentStep === 1 && {
          label: "FRM Verification Details",
          content: (
            <FrmExternalVerificationForm form={getExternalVerif} editable={false} commentArea={false} />
          ),
        },
        currentStep === 2 && {
          label: "FRM Verification Details",
          content: (
            <FrmExternalVerificationForm form={getExternalVerif} editable={true} commentArea={true} />
          ),
        },
      ].filter(Boolean);
    currentStep = steps.length - 1;

    const [filteredSteps, setFilteredSteps] = useState(steps);

    useEffect(() => {
        setFilteredSteps(steps);
    }, [getExternalVerif, taskList]);

    return (
        <div>
            {loading ? (
                <Ve3LoadingScreen />
            ) : getExternalVerif ? (
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
