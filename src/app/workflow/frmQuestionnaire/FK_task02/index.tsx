import { FC, memo, useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { useForm, FormProvider } from "react-hook-form";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import Logger from "../../../../@helpers/Logger";
import FrmQActionPointForm from "../components/frmQActionPointForm";
import FrmQExpertOpinionCompletedForm from "../components/frmQExpertOpinionForm";
import FrmQInvestigationForm from "../components/frmQInvestigationForm";
import FrmQVerificationForm from "../components/frmQVerificationForm";
import { Api } from "../../../../api/Api";
import FrmQuestionnaireForm from "../components/frmQuestionnaireForm";
import { FrmQExpertOpinionResponse, FrmQInvestigationResponse, FrmQActionPointResponse, FrmQVerificationResponse, FrmQuestionnaireResponse, FrmQDataEntryResponse } from "../@types/FrmQuestionnaireResponse";
import FrmQExpertOpinionForm from "../components/frmQExpertOpinionForm";
import FrmEQExternalVerificationForm from "../components/frmQExternalVerification";
import FrmQDataEntryForm from "../components/frmQDataEntryForm";
import { DropDownItem } from "../../frmExpertOpinion/@types/frmExpertOpinionRequest";

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
  const [frmExpertOpinion, expertOpinionData] = useState<FrmQExpertOpinionResponse[] | null>(null);
  const [frmInvestigation, frmInvestigationData] = useState<FrmQInvestigationResponse | null>(null);
  const [frmActionPoint, frmActionPointData] = useState<FrmQActionPointResponse[] | null>(null);
  const [frmVerification, frmVerificationData] = useState<FrmQVerificationResponse[] | null>(null);
  const [frmQuestionnaire, frmQuestionnaireData] = useState<FrmQuestionnaireResponse | null>(null);
  const [frmDataEntry, frmDataEntryData] = useState<FrmQDataEntryResponse | null>(null);
  const [frmExternalVerification, frmExternalVerificationData] = useState<FrmQExpertOpinionResponse[] | null>(null);
  const [frmCompletedQuestionnaire, frmCompletedQuestionnaireData] = useState<FrmQuestionnaireResponse[] | null>(null);
  const [frmexpertUsers, frmCExpertUserData] = useState<DropDownItem[] | null>(null);
  const [monthList, setMonthList] = useState([{ id: 0, name: "" }]);


  const handleFetchFrmQuestionnaireExpertOpinionInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmQuestionnaireExpertOpinionData(task.processInstanceId)
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

  const handleFetchFrmQuestionnaireInvestigationInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmQuestionnaireInvestigationData(task.processInstanceId)
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

  const handleFetchFrmQuestionnaireActionPointInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getfrmQuestionnaireActionPointData(task.processInstanceId)
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

  const handleFetchFrmQuestionnaireVerificationInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmQuestionnaireFrmVerification(task.processInstanceId)
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

  const handleFetchFrmQuestionnaireInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getfrmFrmQuestionnaireData(task.processInstanceId)
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

  const handleFetchFrmQuestionnaireDataEntryInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmQuestionnaireFrmDataEntry(task.processInstanceId)
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

  const handleFetchFrmQuestionnaireExternalVerificationInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getfrmQuestionnaireFrmExternalVerification(task.processInstanceId)
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


  const handleFetchFrmCompletedQuestionnaireInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmEOfrmCompletedQuestionnaire(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      frmCompletedQuestionnaireData(data);
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
    handleFetchFrmQuestionnaireExpertOpinionInfo();
    handleFetchFrmQuestionnaireInvestigationInfo();
    handleFetchFrmQuestionnaireActionPointInfo();
    handleFetchFrmQuestionnaireVerificationInfo();
    handleFetchFrmQuestionnaireInfo();
    handleFetchFrmQuestionnaireDataEntryInfo();
    handleFetchFrmQuestionnaireExternalVerificationInfo();
    handleFetchFrmCompletedQuestionnaireInfo();
    handleFetchFrmExpertOpinionUserInfo(),
      getMonths()
  }, [task]);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
  });

  const steps = [{
    label: "FRM Investigation Details",
    content: <FrmQInvestigationForm frmInvestigation={frmInvestigation} monthList={monthList}/>
  },
  {
    label: "Action Points",
    content: <FrmQActionPointForm frmActionPoint={frmActionPoint} />
  },
  {
    label: "Questionnaire",
    content: <FrmQuestionnaireForm task={task} frmCompletedQuestionnaire={frmCompletedQuestionnaire} questionnaire={true} frmQuestionnaire={frmQuestionnaire} />
  },];


  if (frmExpertOpinion != null && frmExpertOpinion.length > 0) {
    steps.push({
      label: "Expert Opinion",
      content: <FrmQExpertOpinionForm frmExpertOpinion={frmExpertOpinion} frmexpertUsers={frmexpertUsers} />
    })
  }

  if (frmVerification != null && frmVerification.length > 0) {
    steps.push({
      label: "Verification Details",
      content: <FrmQVerificationForm frmVerification={frmVerification} />
    })
  }

  if (frmExternalVerification != null && frmExternalVerification.length > 0) {
    steps.push({
      label: "External Verification Details",
      content: <FrmEQExternalVerificationForm frmExternalVerification={frmExternalVerification} />
    })
  }

  if (frmDataEntry != null && frmDataEntry) {
    steps.push({
      label: "Data Entry Details",
      content: <FrmQDataEntryForm dataEntry={frmDataEntry} monthList={monthList} />
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
    [frmExpertOpinion, frmInvestigation, frmActionPoint, frmVerification, frmCompletedQuestionnaire, monthList, frmexpertUsers])


  return (
    <FormProvider {...methods}>
      <div
        className="flex flex-col gap-12"
      >
        <Ve3StepWizard
          selectStep={2}
          currentSteps={[0, 1, 2, 3, 4, 5, 6]}
          steps={filteredSteps}
        />
      </div>
    </FormProvider>
  );
};

export default memo(FK_Task01);
