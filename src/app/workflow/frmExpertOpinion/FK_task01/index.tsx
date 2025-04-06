import { FC, memo, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { DropDownItem, FrmExpertOpinionActionPointResponse, FrmExpertOpinionDataEntryResponse, FrmExpertOpinionExternalVerificationResponse, FrmExpertOpinionInvestigationProcessResponse, FrmExpertOpinionQuestionnaireResponse, FrmExpertOpinionResponse, FrmExpertOpinionVerificationResponse } from "../@types/frmExpertOpinionRequest";
import FrmActionPointsForm from "../components/frmEOActionPointsForm";
import FrmExpertOpinionCompletedForm from "../components/frmEOCompletedForm";
import FrmExpertOpinionForm from "../components/frmExpertOpinionForm";
import FrmVerificationForm from "../components/frmEOVerificationForm";
import FrmEOExternalVerificationForm from "../components/frmEOExternalVerificationForm";
import FrmEOQuestionnaireForm from "../components/frmEOQuestionnaire";
import FrmEODataEntryForm from "../components/frmEODataEntryForm";
import FrmEOVerificationForm from "../components/frmEOVerificationForm";

type FormType = {
  value_1: String;
  value_2: String;
}

const defaultValues: FormType = {
  value_1: "",
  value_2: "",
}

type FK_Task01Props = {
  task: TaskDetailInfo;
};

const FK_Task01: FC<FK_Task01Props> = (props) => {
  const { task } = props;

  const [frmExpertOpinion, expertOpinionData] = useState<FrmExpertOpinionResponse | null>(null);
  const [frmInvestigation, frmInvestigationData] = useState<FrmExpertOpinionInvestigationProcessResponse | null>(null);
  const [frmActionPoint, frmActionPointData] = useState<FrmExpertOpinionActionPointResponse[] | null>(null);
  const [frmVerification, frmVerificationData] = useState<FrmExpertOpinionVerificationResponse[] | null>(null);
  const [frmQuestionnaire, frmQuestionnaireData] = useState<FrmExpertOpinionQuestionnaireResponse[] | null>(null);
  const [frmDataEntry, frmDataEntryData] = useState<FrmExpertOpinionDataEntryResponse | null>(null);
  const [frmExternalVerification, frmExternalVerificationData] = useState<FrmExpertOpinionExternalVerificationResponse[] | null>(null);
  const [frmCompletedExpertOpinion, frmCompletedExpertOpinionData] = useState<FrmExpertOpinionResponse[] | null>(null);
  const [frmexpertUsers, frmCExpertUserData] = useState<DropDownItem[] | null>(null);
  const [monthList, setMonthList] = useState([{ id: 0, name: "" }]);

  const handleFetchFrmExpertOpinionInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getExpertOpinionData(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      expertOpinionData(data);
    }
  };

  const handleFetchFrmEOInvestigationInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmEOInvestigationData(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      frmInvestigationData(data);
    }
  };

  const handleFetchFrmEOActionPointInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getfrmEOActionPointData(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      frmActionPointData(data);
    }
  };

  const handleFetchFrmEOVerificationInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmEOFrmVerification(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      frmVerificationData(data);
    }
  };

  const handleFetchFrmEOQuestionnaireInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getfrmEOFrmQuestionnaireData(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      frmQuestionnaireData(data);
    }
  };

  const handleFetchFrmEODataEntryInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmEOFrmDataEntry(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      frmDataEntryData(data);
    }
  };

  const handleFetchFrmEOExternalVerificationInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getfrmEOFrmExternalVerification(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      frmExternalVerificationData(data);
    }
  };


  const handleFetchFrmEOCompletedExpertOpinionInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmEOfrmCompletedExpertOpinion(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      frmCompletedExpertOpinionData(data);
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
      frmCExpertUserData(data);
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
    }
  };

  useEffect(() => {
    const initializeProcess = async () => {

      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.saveFrmEOCreateInstance(task.processInstanceId)
      );

      if (err === null) {

        await Promise.all([
          handleFetchFrmExpertOpinionInfo(),
          handleFetchFrmEOInvestigationInfo(),
          handleFetchFrmEOActionPointInfo(),
          handleFetchFrmEOVerificationInfo(),
          handleFetchFrmEOQuestionnaireInfo(),
          handleFetchFrmEODataEntryInfo(),
          handleFetchFrmEOExternalVerificationInfo(),
          handleFetchFrmEOCompletedExpertOpinionInfo(),
          handleFetchFrmExpertOpinionUserInfo(),
          getMonths()
        ]);
      }
    };

    initializeProcess();
  }, [task]);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,

  });

  const steps = [{
    label: "FRM Investigation",
    content: <FrmExpertOpinionForm task={task} frmExpertOpinion={frmExpertOpinion} frmInvestigation={frmInvestigation} expertOpinionStatus={false} frmexpertUsers={frmexpertUsers} monthList={monthList} />
  },
  {
    label: "Action Points",
    content: <FrmActionPointsForm frmActionPoint={frmActionPoint} />
  },];

  if (frmCompletedExpertOpinion != null && frmCompletedExpertOpinion.length > 0) {
    steps.push({
      label: "Expert Opinion",
      content: <FrmExpertOpinionCompletedForm frmCompletedExpertOpinion={frmCompletedExpertOpinion} frmexpertUsers={frmexpertUsers} />
    })
  }

  if (frmVerification != null && frmVerification.length > 0) {
    steps.push({
      label: "Verification",
      content: <FrmEOVerificationForm frmVerification={frmVerification} />
    })
  }

  if (frmExternalVerification != null && frmExternalVerification.length > 0) {
    steps.push({
      label: "External Verification",
      content: <FrmEOExternalVerificationForm frmExternalVerification={frmExternalVerification} />
    })
  }

  if (frmQuestionnaire != null && frmQuestionnaire.length > 0) {
    steps.push({
      label: "Questionnaire",
      content: <FrmEOQuestionnaireForm frmQuestionnaire={frmQuestionnaire} />
    })
  }

  if (frmDataEntry != null && frmDataEntry) {
    steps.push({
      label: "Data Entry",
      content: <FrmEODataEntryForm dataEntry={frmDataEntry} monthList={monthList} />
    })
  }


  const [filteredSteps, setFilteredSteps] = useState<
    {
      label: string;
      content: React.ReactNode | null;
    }[]
  >(steps);

  useEffect(() => {
    setFilteredSteps(steps)
  },
    [frmExpertOpinion, frmInvestigation, frmActionPoint, frmCompletedExpertOpinion, frmVerification, frmexpertUsers, monthList, frmexpertUsers])

  return (
    <FormProvider {...methods}>
      <div
        // onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-12"
      >
        <Ve3StepWizard
          selectStep={0}
          currentSteps={[0, 1, 2, 3, 4, 5, 6]}
          steps={filteredSteps}
        />
      </div>
    </FormProvider>
  );
};

export default memo(FK_Task01);