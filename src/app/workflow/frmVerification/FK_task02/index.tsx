import { FC, useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { FormProvider, useForm } from "react-hook-form";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import FrmInvestigationDetails from "../components/FrmInvestigationDetails";
import FrmActioPointDetials from "../components/FrmActioPointDetials";
import { FemInvsProcessInfi } from "../components/FemInvsProcessInfi";
import { ActionPointRequest } from "../components/ActionPointRequest";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { FemVerificForm } from "../components/FemVerificForm";
import FrmVerificationForm from "./components/FrmVerificationForm";
import { FemVerificFormList } from "../components/FemVerificFormList";
import FrmVerificationList from "../components/FrmVerificationInstList";
import FrmExpertOpinionForm from "../components/FrmExpertOpinionDetail";
import { DropDownItem, ExpertOpinion } from "../components/ExpertOpinion";
import FrmEOExternalVerificationForm from "../components/FrmEOExternalVerificationForm";
import { FrmExpertOpinionExternalVerificationResponse } from "../components/FrmExpertOpinionExternalVerificationResponse";
import FrmEOQuestionnaireForm from "../components/FrmEOQuestionnaireForm";
import { FrmExpertOpinionQuestionnaireResponse } from "../components/FrmExpertOpinionQuestionnaireResponse";
import FrmEODataEntryForm from "../components/FrmEODataEntryForm";
import { FrmExpertOpinionDataEntryResponse } from "../components/FrmExpertOpinionDataEntryResponse";


type FK_Task02Props = {
    task: TaskDetailInfo;
  };

  type FormType = {
    valueOne: string;
    valueTwo: string;
  };

  const defaultValues: FormType = {
    valueOne:"",
    valueTwo:"",
  };

  const FrmVerificationComment: FC<FK_Task02Props> = (props) => {
    const { task } = props;

    const [getFrmInvestDetails, setFrmInvestDetails] = useState<FemInvsProcessInfi | null>(null);
    const [getActionPointDetails, setActionPointDetails] = useState<ActionPointRequest | null>(null);
    const [getVerificationProctDetails, setVerificationProctDetails] = useState<FemVerificForm | null>(null);
    const [getVerifListOld, setVerifListOld] = useState<FemVerificFormList[] | null>(null);
    const [getExpertOpini, setExpertOpini] = useState<ExpertOpinion[] | null>(null);
    const [frmexpertUsers, frmCExpertUserData] = useState<DropDownItem[] | null>(null);
    const [getExternalVerif, setExternalVerif] = useState<FrmExpertOpinionExternalVerificationResponse[] | null>(null);
    const [getQuestion, setQuestions] = useState<FrmExpertOpinionQuestionnaireResponse[] | null>(null);
    const [getDataEntry, setDatEnry] = useState<FrmExpertOpinionDataEntryResponse | null>(null);
    const [monthList,setMonthList] =useState([
      { id: 0, name: "" }
    ]);

    const methods = useForm<FormType>({
        mode: "onChange",
        defaultValues,
      });

      const handleFetchFrmProcessVerificInfo = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getFrmVerificationData(task.processInstanceId)
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
    
        if (data !== null) {
          setFrmInvestDetails(data);
        }
      };

      const handleFetchFrmProcessActionPointVerificInfo = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getFrmActionPtVerificationData(task.processInstanceId)
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
    
        if (data !== null) {
          setActionPointDetails(data);
        }
      };

      const handleFetchFrmProcessCommentInfo = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getCommentData(task.processInstanceId)
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
    
        if (data !== null) {
          setVerificationProctDetails(data);
        }
      };

      const handleFetchVerifiList = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getVerifiList(task.processInstanceId)
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
    
        if (data !== null) {
          setVerifListOld(data);
        }
      };


      const handleFetchExpertOphiList = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.setExpertOpini(task.processInstanceId)
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
    
        if (data !== null) {
          setExpertOpini(data);
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

      const handleFetchFrmExternalVerificationInfo = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getExternalVerif(task.processInstanceId)
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
        );
    
        if (data !== null) {
          setExternalVerif(data);
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
          console.log('monthList=',monthList)
        }
      };

      const handleFetchFrmQuestionInfo = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getQuestionList(task.processInstanceId)
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
    
        if (data !== null) {
          setQuestions(data);
          console.log('monthList=',monthList)
        }
      };

      const handleFetchFrmDatEntryInfo = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getDatEntryList(task.processInstanceId)
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
    
        if (data !== null) {
          setDatEnry(data);
          console.log('monthList=',monthList)
        }
      };

      useEffect(() => {
        handleFetchFrmProcessVerificInfo();
        handleFetchFrmProcessActionPointVerificInfo();
        handleFetchFrmProcessCommentInfo();
        handleFetchVerifiList();
        handleFetchExpertOphiList();
        handleFetchFrmExpertOpinionUserInfo();
        handleFetchFrmExternalVerificationInfo();
        handleFetchFrmQuestionInfo();
        handleFetchFrmDatEntryInfo();
        getMonths();
      }, [task]);

      const newStepts=[{
        label: "FRM Investigation Details",
        content: <FrmInvestigationDetails form={getFrmInvestDetails} editable={true} monthList={monthList}/>,
      },
      {
        label: "Verification Instruction",
        content: <FrmVerificationForm procId={task.processInstanceId} form={getVerificationProctDetails} editable={true} commentArea={true} task={task}/>,
      },
      {
        label: "FRM Actionpoint Details",
        content: <FrmActioPointDetials form={getActionPointDetails} editable={true} />,
      },];

      if(getVerifListOld!=null && getVerifListOld.length>0){
        newStepts.push({
          label: "Verification Instruction Details",
          content: <FrmVerificationList form={getVerifListOld} editable={true} />,
        })
      }
      if(getExpertOpini!=null && getExpertOpini.length>0){
        newStepts.push({
          label: "Expert Opinion Details",
          content: <FrmExpertOpinionForm form={getExpertOpini} frmexpertUsers={frmexpertUsers} editable={true} />,
        })
      }
      if(getExternalVerif!=null && getExternalVerif.length>0){
        newStepts.push({
          label: "FRM External Verification Details",
          content: <FrmEOExternalVerificationForm form={getExternalVerif} />,
        })
      }
      if(getQuestion!=null && getQuestion.length>0){
        newStepts.push({
          label: "FRM Question Details",
          content: <FrmEOQuestionnaireForm form={getQuestion} />,
        })
      }
      if(getDataEntry!=null && getDataEntry){
        newStepts.push({
          label: "FRM Dat Enrty Details",
          content: <FrmEODataEntryForm dataEntry={getDataEntry} monthList={monthList} />,
        })
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
     [getFrmInvestDetails,getVerificationProctDetails,getActionPointDetails,getVerifListOld,getExpertOpini,frmexpertUsers,monthList,])

    return (
        <FormProvider {...methods}>
      <div
        // onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-12"
      >
        <Ve3StepWizard
          selectStep={1}
          currentSteps={[0, 1, 2,3,4,5,6,7]}
          steps={filteredSteps}
        />
      </div>
    </FormProvider>
    );

  };

  export default FrmVerificationComment;