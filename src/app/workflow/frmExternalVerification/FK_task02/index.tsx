import { FC, useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { FormProvider, useForm } from "react-hook-form";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import FrmInvestigationDetails from "../components/FrmInvestigationDetails";
import FrmExternalVerificationForm from "./components/frmExternalVerificationForm";
import FrmVerificationForm from "../../frmVerification/FK_task02/components/FrmVerificationForm";
import FrmActioPointDetials from "../components/FrmActioPointDetials";
import FrmVerificationList from "../components/FrmVerificationInstList";
import FrmExpertOpinionForm from "../components/FrmExpertOpinionDetail";
import { FemInvsProcessInfi } from "../components/FemInvsProcessInfi";
import { ActionPointRequest } from "../components/ActionPointRequest";
import { FemVerificForm } from "../components/FemVerificForm";
import { FemVerificFormList } from "../components/FemVerificFormList";
import { ExpertOpinion } from "../components/ExpertOpinion";
import { FemExternVerifForm } from "../components/FemExternVerifForm";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { DropDownItem } from "../components/ExpertOpinion copy";
import FrmEOQuestionnaireForm from "../components/FrmEOQuestionnaireForm";
import { FrmExpertOpinionQuestionnaireResponse } from "../components/FrmExpertOpinionQuestionnaireResponse";
import FrmEODataEntryForm from "../components/FrmEODataEntryForm";
import { FrmExpertOpinionDataEntryResponse } from "../components/FrmExpertOpinionDataEntryResponse";
import FrmEOExternalVerificationForm from "../components/FrmEOExternalVerificationForm";
import { FrmExpertOpinionExternalVerificationResponse } from "../components/FrmExpertOpinionExternalVerificationResponse";


type FK_Task02Props = {
    task: TaskDetailInfo;
  };

  const NeedImpliment: FC<FK_Task02Props> = (props) => {

    const { task } = props;

    type FormType = {
        valueOne: string;
        valueTwo: string;
      };
    
      const defaultValues: FormType = {
        valueOne:"",
        valueTwo:"",
      };
    
    const [getFrmInvestDetails, setFrmInvestDetails] = useState<FemInvsProcessInfi | null>(null);
    const [getActionPointDetails, setActionPointDetails] = useState<ActionPointRequest | null>(null);
    const [getVerificationProctDetails, setVerificationProctDetails] = useState<FemVerificForm | null>(null);
    const [getVerifListOld, setVerifListOld] = useState<FemVerificFormList[] | null>(null);
    const [getExpertOpini, setExpertOpini] = useState<ExpertOpinion[] | null>(null);
    const [getExternalVerif, setExternalVerif] = useState<FemExternVerifForm | null>(null);
    const [frmexpertUsers, frmCExpertUserData] = useState<DropDownItem[] | null>(null);
    const [getQuestion, setQuestions] = useState<FrmExpertOpinionQuestionnaireResponse[] | null>(null);
    const [getDataEntry, setDatEnry] = useState<FrmExpertOpinionDataEntryResponse | null>(null);
    const [getExternalVerifList, setExternalVerifList] = useState<FrmExpertOpinionExternalVerificationResponse[] | null>(null);
    const [monthList,setMonthList] =useState([
      { id: 0, name: "" }
    ]);

    const handleFetchGetInvestigationDetails = async () => {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getInvestDetails(task.processInstanceId)
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

        const handleFetchGetExternalVerificationDetails = async () => {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getEcternalVEriDetails(task.processInstanceId)
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

    const handleFetchGetActionPointDetails = async () => {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getActionPointList(task.processInstanceId)
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

    const handleFetchGetVerificationInstructDetails = async () => {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getVerifInstruct(task.processInstanceId)
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

    const handleFetchGetExptOpinionDetails = async () => {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getExptOpinjion(task.processInstanceId)
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

    const methods = useForm<FormType>({
        mode: "onChange",
        defaultValues,
      });

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

      const handleFetchFrmQuestionInfo = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getQuestionListVerification(task.processInstanceId)
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
          r.creditCard.getDatEntryListVerific(task.processInstanceId)
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

      const handleFetchFrmExternalVerificationInfo = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getExternalVerifList(task.processInstanceId)
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
        );
    
        if (data !== null) {
          setExternalVerifList(data);
        }
      };

      useEffect(() => {
        const initializeProcess = async () => {
    
          const { data, err } = await Api.performRequest((r) =>
            r.creditCard.saveExternalInstanceTaskTwo(task.processInstanceId)
          );
    
          if (err === null) {
    
            await Promise.all([
              handleFetchGetInvestigationDetails(),
              handleFetchGetExternalVerificationDetails(),
              handleFetchGetActionPointDetails(),
              handleFetchGetVerificationInstructDetails(),
              handleFetchGetExptOpinionDetails(),
              handleFetchFrmExpertOpinionUserInfo(),
              handleFetchFrmQuestionInfo(),
              handleFetchFrmDatEntryInfo(),
              handleFetchFrmExternalVerificationInfo(),
              getMonths(),
            ]);
          }
        };
    
        initializeProcess();
      }, [task]);

      const newStepts=[{
        label: "FRM Investigation Details",
        content: <FrmInvestigationDetails form={getFrmInvestDetails} editable={true} monthList={monthList}/>,
      },
      {
          label: "External Verification",
          content: <FrmExternalVerificationForm procId={task.processInstanceId} form={getExternalVerif} editable={true} commentArea={false} task={task}/>,
        },
      {
        label: "FRM Actionpoint Details",
        content: <FrmActioPointDetials form={getActionPointDetails} editable={true} />,
      },];

      if(getExternalVerifList!=null && getExternalVerifList.length>0){
        newStepts.push(
          {
            label: "FRM External Verification Details",
            content: <FrmEOExternalVerificationForm form={getExternalVerifList} />,
          })
      }

      if(getVerifListOld!=null && getVerifListOld.length>0){
        newStepts.push(
          {
            label: "Verification Instruction Details",
            content: <FrmVerificationList form={getVerifListOld} editable={true} />,
          })
      }

      if(getExpertOpini!=null && getExpertOpini.length>0){
        newStepts.push(
          {
            label: "Expert Opinion",
            content: <FrmExpertOpinionForm form={getExpertOpini} frmexpertUsers={frmexpertUsers} editable={true}/>,
          })
      }

      if(getQuestion!=null && getQuestion.length>0){
        newStepts.push(
          {
            label: "FRM Question Details",
            content: <FrmEOQuestionnaireForm form={getQuestion} />,
          })
      }

      if(getDataEntry!=null && getDataEntry){
        newStepts.push(
          {
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
  [getFrmInvestDetails,getVerificationProctDetails,getDataEntry,getQuestion,getActionPointDetails,getVerifListOld,getExpertOpini,frmexpertUsers,monthList,getExternalVerifList,getExternalVerif,])

    return(
        <FormProvider {...methods}>
        <div
          // onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-12"
        >
          <Ve3StepWizard
            selectStep={1}
            currentSteps={[0, 1, 2,3,4,5,6]}
            steps={filteredSteps}
          />
        </div>
      </FormProvider>
    );

  };

  export default NeedImpliment;