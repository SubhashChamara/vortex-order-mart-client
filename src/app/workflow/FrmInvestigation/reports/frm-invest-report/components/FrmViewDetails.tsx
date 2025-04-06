import { FC, memo, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Ve3StepWizard from "../../../../../../@core/ui/Ve3StepWizard";
import { FemInvsProcessInfi } from "./subcomponents/FemInvsProcessInfi";
import { ActionPointRequest } from "./subcomponents/ActionPointRequest";
import { FemVerificForm } from "./subcomponents/FemVerificForm";
import { FemVerificFormList } from "./subcomponents/FemVerificFormList";
import { DropDownItem, ExpertOpinion } from "./subcomponents/ExpertOpinion";
import { FrmExpertOpinionExternalVerificationResponse } from "./subcomponents/FrmExpertOpinionExternalVerificationResponse";
import { FrmExpertOpinionQuestionnaireResponse } from "./subcomponents/FrmExpertOpinionQuestionnaireResponse";
import { FrmExpertOpinionDataEntryResponse } from "./subcomponents/FrmExpertOpinionDataEntryResponse";
import FrmInvestigationDetails from "./subcomponents/FrmInvestigationDetails";
import FrmActioPointDetials from "./subcomponents/FrmActioPointDetials";
import FrmVerificationList from "./subcomponents/FrmVerificationInstList";
import FrmExpertOpinionForm from "./subcomponents/FrmExpertOpinionDetail";
import FrmEOExternalVerificationForm from "./subcomponents/FrmEOExternalVerificationForm";
import FrmEOQuestionnaireForm from "./subcomponents/FrmEOQuestionnaireForm";
import FrmEODataEntryForm from "./subcomponents/FrmEODataEntryForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import Logger from "../../../../../../@helpers/Logger";
import { Api } from "../../../../../../api/Api";

type VIEW_PROPS = {
  open: boolean;
  handleClose: () => void;
  id:string;
};

type FormType = {
  valueOne: string;
  valueTwo: string;
};

const defaultValues: FormType = {
  valueOne: "",
  valueTwo: "",
};

const FrmViewDetails: FC<VIEW_PROPS> = ({ open, handleClose,id }) => {
  console.log("id=",id)
  const [getFrmInvestDetails, setFrmInvestDetails] =
    useState<FemInvsProcessInfi | null>(null);
  const [getActionPointDetails, setActionPointDetails] =
    useState<ActionPointRequest | null>(null);
  const [getVerificationProctDetails, setVerificationProctDetails] =
    useState<FemVerificForm | null>(null);
  const [getVerifListOld, setVerifListOld] = useState<
    FemVerificFormList[] | null
  >(null);
  const [getExpertOpini, setExpertOpini] = useState<ExpertOpinion[] | null>(
    null
  );
  const [frmexpertUsers, frmCExpertUserData] = useState<DropDownItem[] | null>(
    null
  );
  const [getExternalVerif, setExternalVerif] = useState<
    FrmExpertOpinionExternalVerificationResponse[] | null
  >(null);
  const [getQuestion, setQuestions] = useState<
    FrmExpertOpinionQuestionnaireResponse[] | null
  >(null);
  const [getDataEntry, setDatEnry] =
    useState<FrmExpertOpinionDataEntryResponse | null>(null);
  const [monthList, setMonthList] = useState([{ id: 0, name: "" }]);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
  });

  const handleFetchFrmInvestDetails = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmInvestView(id)
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

  const handleFetchFrmProcessVerificInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmVerificationDataView(id)
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

  const handleFetchFrmProcessActionPointVerificInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmActionPtVerificationDataView(id)
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

  const handleFetchFrmQuestion = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmQuestionView(id)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
        setQuestions(data);
    }
  };

  const handleFetchExpertOpi = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getExpertOpi(id)
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

  
  const handleFetchDataEnty = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getDataEntryView(id)
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

  const handleExternalVerif = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getExternalVeridView(id)
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




  const newStepts = [
    {
      label: "FRM Investigation Details",
      content: (
        <FrmInvestigationDetails
          form={getFrmInvestDetails}
          editable={true}
          monthList={monthList}
        />
      ),
    },
    {
      label: "FRM Actionpoint Details",
      content: (
        <FrmActioPointDetials form={getActionPointDetails} editable={true} />
      ),
    },
  ];

  if (getVerifListOld != null && getVerifListOld.length > 0) {
    newStepts.push({
      label: "Verification Instruction Details",
      content: <FrmVerificationList form={getVerifListOld} editable={true} />,
    });
  }
  if (getExpertOpini != null && getExpertOpini.length > 0) {
    newStepts.push({
      label: "Expert Opinion Details",
      content: (
        <FrmExpertOpinionForm
          form={getExpertOpini}
          frmexpertUsers={frmexpertUsers}
          editable={true}
        />
      ),
    });
  }
  if (getExternalVerif != null && getExternalVerif.length > 0) {
    newStepts.push({
      label: "FRM External Verification Details",
      content: <FrmEOExternalVerificationForm form={getExternalVerif} />,
    });
  }
  if (getQuestion != null && getQuestion.length > 0) {
    newStepts.push({
      label: "FRM Question Details",
      content: <FrmEOQuestionnaireForm form={getQuestion} />,
    });
  }
  if (getDataEntry != null && getDataEntry) {
    newStepts.push({
      label: "FRM Data Entry Details",
      content: (
        <FrmEODataEntryForm dataEntry={getDataEntry} monthList={monthList} />
      ),
    });
  }


  useEffect(() => {
 
    handleFetchFrmProcessVerificInfo(),
    handleFetchFrmProcessActionPointVerificInfo(),
    handleFetchFrmQuestion(),
    handleFetchExpertOpi(),
    handleFetchDataEnty(),
    handleExternalVerif(),
    getMonths(),
    handleFetchFrmExpertOpinionUserInfo(),
    handleFetchFrmInvestDetails()
  }, [id]);

  useEffect(() => {
    setFilteredSteps(newStepts);
  }, [
    getFrmInvestDetails,
    getVerificationProctDetails,
    getVerifListOld,
    getExternalVerif,
    getQuestion,
    getDataEntry,
    getActionPointDetails,
    getVerifListOld,
    getExpertOpini,
    frmexpertUsers,
    monthList,
  ]);

  const [filteredSteps, setFilteredSteps] = useState<
    {
      label: string;
      content: React.ReactNode | null;
    }[]
  >(newStepts);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{
    '& .MuiDialog-paper': {
        
      minWidth: '80%',
      height:'80%'
    },
  }}>
        <DialogTitle>View</DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
            <div className="flex flex-col gap-12">
              <Ve3StepWizard
                selectStep={0}
                currentSteps={[0, 1, 2, 3, 4, 5, 6]}
                steps={filteredSteps}
              />
            </div>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(FrmViewDetails);
