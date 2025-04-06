import { FC, memo, useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { FormProvider, useForm } from "react-hook-form";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { FemInvsProcessInfi } from "../@types/FemInvsProcessInfi";
import { FrmActionPointRequest } from "../@types/FrmActionPointResponse";
import { FrmExpertOpinionResponse } from "../@types/FrmExpertOpinionResponse";
import { FrmVerificationResponse } from "../@types/FrmVerificationResponse";
import { FrmDataEntryRequest } from "../@types/FrmDataEntryRequest";
import { FrmExternVerifResponse } from "../@types/FrmExternVerifResponse";
import { FrmQuestionnaire } from "../@types/FrmQuestionnaire";
import FrmInvestigationForm from "../components/FrmInvestigationForm";
import FrmDataEntryForm from "../components/FrmDataEntryForm";
import FrmActionPointsForm from "../components/FrmActionPointsForm";
import FrmExpertOpinionForm from "../components/FrmExpertOpinionForm";
import FrmVerificationFlow from "../components/FrmVerificationsForm";
import FrmExternalVerificationForm from "../components/FrmExternalVerificationForm";
import FrmQuestionnaireForm from "../components/FrmQuestionnaireForm";
import FraudFinalizingForm from "./components/FrmFraudInvestigationForm";
import MemoGeneration from "./components/FrmMemoGeneration";
import { FemFraudInvestForm } from "../@types/FemFraudInvestForm";
import { DropDownItem } from "../../frmExpertOpinion/@types/frmExpertOpinionRequest";


type FormType = {
  value_1: string;
  value_2: string;
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

  const [form, setForm] = useState<FemInvsProcessInfi | null>(null);
  const [actionPoints, setActionPoints] = useState<FrmActionPointRequest[] | null>(null);
  const [expertOpinions, setExpertOpinions] = useState<FrmExpertOpinionResponse[] | null>(null);
  const [verifications, setVerifications] = useState<FrmVerificationResponse[] | null>(null);
  const [dataentry, setDataEntry] = useState<FrmDataEntryRequest | null>(null);
  const [questionnaire, setQuestionnaire] = useState<FrmQuestionnaire[] | null>(null);
  const [externalVeri, setExternalVeri] = useState<FrmExternVerifResponse[] | null>(null);
  const [getData, setData] = useState<FemFraudInvestForm | null>(null);
  const [frmexpertUsers, frmCExpertUserData] = useState<DropDownItem[] | null>(null);


  const handleFetchFraudInvestInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudInvmData(task.processInstanceId)
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

  const handleFetchFrmProcessInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudInvestDetails(task.processInstanceId)
    );

    console.log(data)

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    setForm(data);
  };

  const handleFetchFrmQuestionnaire = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudQuestionnaire(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    setQuestionnaire(data);
  };


  const handleFetchActionPoints = async (processInstance: string) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudActionPoints(processInstance)
    );

    Logger.debug(
      "(Action Points) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    setActionPoints(data);
  };

  const handleFetchExpertOpinions = async (processInstance: string) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudExpertOpinions(processInstance)
    );

    Logger.debug("(Expert Opinions) => { DATA: " + JSON.stringify(data) + " , ERROR: " + JSON.stringify(err) + " }");

    setExpertOpinions(data);
  };

  const handleFetchDataEntry = async (processInstance: string) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getDataEntry(processInstance)
    );

    Logger.debug("(Expert Opinions) => { DATA: " + JSON.stringify(data) + " , ERROR: " + JSON.stringify(err) + " }");

    setDataEntry(data);
  };

  const handleVerifications = async (processInstance: string) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudVerification(processInstance)
    );

    Logger.debug(
      "(Action Points) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    setVerifications(data);
  };

  const handleExternalVerifications = async (processInstance: string) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudFrmExtVeri(processInstance)
    );

    Logger.debug(
      "(Action Points) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    setExternalVeri(data);
  };

  useEffect(() => {
    const initializeProcess = async () => {

      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.saveFraudFrmDataEntryAPI(task.processInstanceId)
      );

      if (err === null) {

        await Promise.all([
          handleFetchFrmProcessInfo(),
          handleFetchFrmQuestionnaire(),
          handleFetchActionPoints(task.processInstanceId),
          handleFetchExpertOpinions(task.processInstanceId),
          handleVerifications(task.processInstanceId),
          handleFetchDataEntry(task.processInstanceId),
          handleExternalVerifications(task.processInstanceId),
          handleFetchFraudInvestInfo(),
          handleFetchFrmExpertOpinionUserInfo(),
        ]);
      }
    };

    initializeProcess();
  }, [task]);


  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    // resolver: zodResolver(schema),
  });


  const newStepts = [{
    label: "FRM Investigation Details",
    content: <FrmInvestigationForm form={form} />
  },
  {
    label: "Fraud Finalising Details",
    content: <FraudFinalizingForm form={getData} procId={task.processInstanceId} task={task}/>
  },
  {
    label: "Memo Generation",
    content: <MemoGeneration memoData={getData} procId={task.processInstanceId} />
  },
  {
    label: "FRM Action Point",
    content: <FrmActionPointsForm actionPoints={actionPoints} />
  },];

  if (externalVeri != null && externalVeri.length > 0) {
    newStepts.push(
      {
        label: "FRM External Verification Details",
        content: <FrmExternalVerificationForm externalVerifications={externalVeri || []} />,
      })
  }

  if (verifications != null && verifications.length > 0) {
    newStepts.push(
      {
        label: "Verification Instruction Details",
        content: <FrmVerificationFlow verificationData={verifications || []} />,
      })
  }

  if (expertOpinions != null && expertOpinions.length > 0) {
    newStepts.push(
      {
        label: "Expert Opinion",
        content: <FrmExpertOpinionForm expertOpinions={expertOpinions} frmexpertUsers={frmexpertUsers} />, // Render expert opinions
      })
  }

  if (questionnaire != null && questionnaire.length > 0) {
    newStepts.push(
      {
        label: "FRM Question Details",
        content: <FrmQuestionnaireForm questionnaire={questionnaire || []} />,
      })
  }

  if (dataentry != null) {
    newStepts.push(
      {
        label: "FRM Data Entry",
        content: <FrmDataEntryForm procId={task.processInstanceId} dataEntry={dataentry} />
      },)
  }

  const [filteredSteps, setFilteredSteps] = useState<
    {
      label: string;
      content: React.ReactNode | null;
    }[]
  >(newStepts);

  useEffect(() => {
    setFilteredSteps(newStepts)
  },
    [form, actionPoints, expertOpinions, verifications, dataentry, externalVeri, frmexpertUsers,getData])

  return (
    <FormProvider {...methods}>
      <div
        className="flex flex-col gap-12"
      >
        <Ve3StepWizard
          selectStep={0}
          currentSteps={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          steps={filteredSteps}
        />
      </div>
    </FormProvider>
  );
};

export default memo(FK_Task01);