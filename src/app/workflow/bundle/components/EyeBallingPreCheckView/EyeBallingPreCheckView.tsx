import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import CARDAddressMatch from "../EyeBalling/Tables/Cards/AddressMatch";
import CARDNICMatchTable from "../EyeBalling/Tables/Cards/NICMatchTable";
import CribNICMatchTable from "../EyeBalling/Tables/CribMatch/NICMatchTable";
import CribTPSearchEmployment from "../EyeBalling/Tables/CribMatch/TPSearchEmployment";
import CribTPSearchResidence from "../EyeBalling/Tables/CribMatch/TPSearchResidence";
import AddressMatch from "../EyeBalling/Tables/EBBS/AddressMatch";
import NICMatchTable from "../EyeBalling/Tables/EBBS/NICMatchTable";
import TPSearchEmployment from "../EyeBalling/Tables/EBBS/TPSearchEmployment";
import TPSearchResidence from "../EyeBalling/Tables/EBBS/TPSearchResidence";
import FCUAddressMatch from "../EyeBalling/Tables/FCUBase/AddressMatch";
import FCUNICMatchTable from "../EyeBalling/Tables/FCUBase/NICMatchTable";
import FCUTPSearchEmployment from "../EyeBalling/Tables/FCUBase/TPSearchEmployment";
import FCUTPSearchResidence from "../EyeBalling/Tables/FCUBase/TPSearchResidence";
import RelationshipHistoryTable from "../EyeBalling/Tables/RelationshipHistory/RelationshipHistory";
import WFBNICMatchTable from "../EyeBalling/Tables/WorkflowBase/NICMatchTable";
import WFBTPSearchEmployment from "../EyeBalling/Tables/WorkflowBase/TPSearchEmployment";
import WFBTPSearchResidence from "../EyeBalling/Tables/WorkflowBase/TPSearchResidence";
import EyeballingPreCheckRecommendation from "../EyeBalling/Tables/Precheck/EyeballingPreCheckRecommendation";
import EyeBallingPrecheckFields from "../EyeBalling/EyeBallingPrecheckFields";
import { RelationshipProcessInfo } from "../../@types/RelationshipProcessInfo";
import { EyeballingPrecheckInfo } from "../../@types/EyeballingPrecheckInfo";
import { Api } from "../../../../../api/Api";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { RelationshipFraudInfo } from "../../@types/RelationshipFraudInfo";
import { RelationshipCribInfo } from "../../@types/RelationshipCribInfo";
import WFBAddressMatch from "../EyeBalling/Tables/WorkflowBase/AddressMatch";
import CribAddressMatch from "../EyeBalling/Tables/CribMatch/AddressMatch";
import { RelationshipHistoryInfo } from "../../@types/RelationshipHistoryInfo";
import { RelationshipVerificationAlertInfo } from "../../@types/RelationshipVerificationAlertInfo";
import VerificationAlertInfo from "../EyeBalling/Tables/VerificationAlertInfo/VerificationAlertInfo";
import { RelationshipRecommendationInfo } from "../../@types/RelationshipRecommendationInfo";
import { RelationshipEBBSInfo } from "../../@types/RelationshipEBBSInfo";
import { RelationshipCardInfo } from "../../@types/RelationshipCardInfo";
import FRMAlerts from "../FRMAlerts/FRMAlerts";
import { FRMAlertInfo } from "../../@types/FRMAlertInfo";

interface EyeBallingPreCheckViewProps {
  task: TaskDetailInfo;
}

const EyeBallingPreCheckView: React.FC<EyeBallingPreCheckViewProps> = ({
  task,
}) => {
  // Relationship checks

  const [eyeBallingPreCheckInfo, setEyeBallingPreCheckInfo] =
    useState<EyeballingPrecheckInfo | null>(null);

  // Relationship Data - EBBS
  const [ebbsNicMatch, setEbbsNicMatch] = useState<RelationshipEBBSInfo | null>(
    null
  );
  const [ebbsAddressMatch, setEbbsAddressMatch] =
    useState<RelationshipEBBSInfo | null>(null);
  const [ebbsResMatch, setEbbsResMatch] = useState<RelationshipEBBSInfo | null>(
    null
  );
  const [ebbsEmpMatch, setEbbsEmpMatch] = useState<RelationshipEBBSInfo | null>(
    null
  );

  // Relationship Data - Card
  const [cardNicMatch, setCardNicMatch] = useState<RelationshipCardInfo | null>(
    null
  );
  const [cardAddressMatch, setCardAddressMatch] =
    useState<RelationshipCardInfo | null>(null);

  //Relationship Data - Process
  const [eyeBallingNicMatch, setEyeBallingNicMatch] =
    useState<RelationshipProcessInfo | null>(null);

  const [eyeBallingResMatch, setEyeBallingResMatch] =
    useState<RelationshipProcessInfo | null>(null);

  const [eyeBallingMobileMatch, setEyeBallingMobileMatch] =
    useState<RelationshipProcessInfo | null>(null);

  const [eyeBallingAddressMatch, setEyeBallingAddressMatch] =
    useState<RelationshipProcessInfo | null>(null);

  //Relationship Data - Fraud

  const [fcuBaseNicMatch, setFCUBaseNicMatch] =
    useState<RelationshipFraudInfo | null>(null);

  const [fcuBaseResMatch, setFCUBaseResMatch] =
    useState<RelationshipFraudInfo | null>(null);

  const [fcuBaseMobileMatch, setFCUBaseMobileMatch] =
    useState<RelationshipFraudInfo | null>(null);

  const [fcuBaseAddressMatch, setFCUBaseAddressMatch] =
    useState<RelationshipFraudInfo | null>(null);

  // Relationship data - Crib
  // RelationshipCribInfo

  const [cribNicMatch, setCribNicMatch] = useState<RelationshipCribInfo | null>(
    null
  );

  const [cribResMatch, setCribResMatch] = useState<RelationshipCribInfo | null>(
    null
  );

  const [cribMobileMatch, setCribMobileMatch] =
    useState<RelationshipCribInfo | null>(null);

  const [cribAddressMatch, setCribAddressMatch] =
    useState<RelationshipCribInfo | null>(null);

  // Relationship data - History
  const [relationshipHistory, setRelationshipHistory] =
    useState<RelationshipHistoryInfo | null>(null);

  // Relationship data - verification alert info
  const [relationshipVerificationAlert, setRelationshipVerificationAlert] =
    useState<RelationshipVerificationAlertInfo | null>(null);

  // Relationship data - recommendation
  const [relationshipRecommendation, setRelationshipRecommendation] = useState<
    RelationshipRecommendationInfo[]
  >([]);

  // FRM Alerts data
  const [frmAlerts, setFrmAlerts] = useState<FRMAlertInfo[]>([]);

  // get eyeballing precheck values
  const getEyeballingPrecheckInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getEyeballingPrecheckInformation(task.processInstanceId)
    );

    if (data !== null) {
      setEyeBallingPreCheckInfo(data);
    } else {
      console.log(err);
    }
  };

  //Relationship API Calls - ebbs
  const getEbbsNicMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getEbbsNicMatch(task.processInstanceId)
    );

    if (data !== null) {
      setEbbsNicMatch(data);
    } else {
      console.log(err);
    }
  };

  const getEbbsAddressMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getEbbsAddressMatch(task.processInstanceId)
    );
    if (data !== null) {
      setEbbsAddressMatch(data);
    } else {
      console.log(err);
    }
  };

  const getResNumberMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getResNumberMatch(task.processInstanceId)
    );
    if (data !== null) {
      setEbbsResMatch(data);
    } else {
      console.log(err);
    }
  };

  const getEmpNumberMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getEmpNumberMatch(task.processInstanceId)
    );
    if (data !== null) {
      setEbbsEmpMatch(data);
    } else {
      console.log(err);
    }
  };

  // Relationship API Calls - Cards
  const getCardNicMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCardNicMatch(task.processInstanceId)
    );

    if (data !== null) {
      setCardNicMatch(data);
    } else {
      console.log(err);
    }
  };

  const getCardAddressMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCardAddressMatch(task.processInstanceId)
    );
    if (data !== null) {
      setCardAddressMatch(data);
    } else {
      console.log(err);
    }
  };

  //Relationship API Calls - Process
  const getEyeBallingNicMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getEyeBallingNicMatch(task.processInstanceId)
    );

    if (data !== null) {
      setEyeBallingNicMatch(data);
    } else {
      console.log(err);
    }
  };

  const getEyeBallingResNumberMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getEyeBallingResNumberMatch(task.processInstanceId)
    );

    if (data !== null) {
      setEyeBallingResMatch(data);
    } else {
      console.log(err);
    }
  };

  const getEyeBallingMobileNumberMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getEyeBallingMobileNumberMatch(task.processInstanceId)
    );

    if (data !== null) {
      setEyeBallingMobileMatch(data);
    } else {
      console.log(err);
    }
  };

  const getEyeBallingAddressMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getEyeBallingAddressMatch(task.processInstanceId)
    );

    if (data !== null) {
      setEyeBallingAddressMatch(data);
    } else {
      console.log(err);
    }
  };

  // fcu API calls
  const getFraudNicMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudNicMatch(task.processInstanceId)
    );

    if (data !== null) {
      setFCUBaseNicMatch(data);
    } else {
      console.log(err);
    }
  };
  const getFraudResNumberMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudResNumberMatch(task.processInstanceId)
    );

    if (data !== null) {
      setFCUBaseResMatch(data);
    } else {
      console.log(err);
    }
  };

  const getFraudMobileNumberMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudMobileNumberMatch(task.processInstanceId)
    );

    if (data !== null) {
      setFCUBaseMobileMatch(data);
    } else {
      console.log(err);
    }
  };

  const getFraudAddressMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFraudAddressMatch(task.processInstanceId)
    );

    if (data !== null) {
      setFCUBaseAddressMatch(data);
    } else {
      console.log(err);
    }
  };

  // crib API calls

  const getCribNicMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCribNicMatch(task.processInstanceId)
    );

    if (data !== null) {
      setCribNicMatch(data);
    } else {
      console.log(err);
    }
  };
  const getCribResNumberMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCribResNumberMatch(task.processInstanceId)
    );

    if (data !== null) {
      setCribResMatch(data);
    } else {
      console.log(err);
    }
  };

  const getCribMobileNumberMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCribMobileNumberMatch(task.processInstanceId)
    );

    if (data !== null) {
      setCribMobileMatch(data);
    } else {
      console.log(err);
    }
  };

  const getCribAddressMatch = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCribAddressMatch(task.processInstanceId)
    );

    if (data !== null) {
      setCribAddressMatch(data);
    } else {
      console.log(err);
    }
  };

  // relationship history
  const getHistoryData = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getHistoryData(task.processInstanceId)
    );
    if (data !== null) {
      setRelationshipHistory(data);
    } else {
      console.log(err);
    }
  };

  // getVerificationAlertData

  const getVerificationAlertData = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getVerificationAlertData(task.processInstanceId)
    );
    if (data !== null) {
      setRelationshipVerificationAlert(data);
    } else {
      console.log(err);
    }
  };

  // get relationship recommendation
  const getRelationshipRecommendation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getRecommendation(task.processInstanceId)
    );

    if (data !== null) {
      setRelationshipRecommendation(data);
    } else {
      console.log(err);
    }
  };

  // get frm alerts
  const getFrmAlerts = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmAlerts(task.processInstanceId)
    );

    if (data !== null) {
      setFrmAlerts(data);
    } else {
      console.log(err);
    }
  };

  //use effects
  useEffect(() => {
    getEyeballingPrecheckInformation();

    // ebbs match
    getEbbsNicMatch();
    getEbbsAddressMatch();
    getResNumberMatch();
    getEmpNumberMatch();

    // card match
    getCardNicMatch();
    getCardAddressMatch();

    //workflow base
    getEyeBallingNicMatch();
    getEyeBallingResNumberMatch();
    getEyeBallingMobileNumberMatch();
    getEyeBallingAddressMatch();

    // fcu base
    getFraudNicMatch();
    getFraudResNumberMatch();
    getFraudMobileNumberMatch();
    getFraudAddressMatch();

    // crib match
    getCribNicMatch();
    getCribResNumberMatch();
    getCribMobileNumberMatch();
    getCribAddressMatch();

    // relationship history
    getHistoryData();

    // relationship alert
    getVerificationAlertData();

    // recommendation data
    getRelationshipRecommendation();

    // frm alerts
    getFrmAlerts();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-12">
      <div className="col-span-2">
        <EyeBallingPrecheckFields
          preCheckNicOld={eyeBallingPreCheckInfo?.nicOld || ""}
          preCheckNicNew={eyeBallingPreCheckInfo?.nicNew || ""}
          preCheckDob={eyeBallingPreCheckInfo?.dob || ""}
          preCheckCustomerCategory={
            eyeBallingPreCheckInfo?.customerCategory || ""
          }
          preCheckName={eyeBallingPreCheckInfo?.name || ""}
          preCheckAge={eyeBallingPreCheckInfo?.age || ""}
        />
      </div>
      <Accordion className="col-span-2">
        <AccordionSummary
          expandIcon={<EdgeSvgIcon>feather:chevron-down</EdgeSvgIcon>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="w-full -mb-10">
            <Ve3FormHeader
              icon="material-outline:account_balance"
              title="EBBS"
            />
          </div>
        </AccordionSummary>
        <AccordionDetails className="grid grid-cols-2 gap-12">
          <NICMatchTable ebbsNicMatch={ebbsNicMatch} />
          <AddressMatch ebbsAddressMatch={ebbsAddressMatch} />
          <TPSearchResidence ebbsResMatch={ebbsResMatch} />
          <TPSearchEmployment ebbsEmpMatch={ebbsEmpMatch} />
        </AccordionDetails>
      </Accordion>

      <Accordion className="col-span-2">
        <AccordionSummary
          expandIcon={<EdgeSvgIcon>feather:chevron-down</EdgeSvgIcon>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="w-full -mb-10">
            <Ve3FormHeader icon="material-outline:credit_card" title="CARDS" />
          </div>
        </AccordionSummary>
        <AccordionDetails className="grid grid-cols-2 gap-12">
          <CARDNICMatchTable cardNicMatch={cardNicMatch} />
          <CARDAddressMatch cardAddressMatch={cardAddressMatch} />
        </AccordionDetails>
      </Accordion>

      <Accordion className="col-span-2">
        <AccordionSummary
          expandIcon={<EdgeSvgIcon>feather:chevron-down</EdgeSvgIcon>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="w-full -mb-10">
            <Ve3FormHeader
              icon="material-outline:credit_card"
              title="Workflow Base"
            />
          </div>
        </AccordionSummary>
        <AccordionDetails className="grid grid-cols-2 gap-12">
          <div className="col-span-2">
            <WFBNICMatchTable eyeBallingNicMatch={eyeBallingNicMatch} />
          </div>
          <WFBTPSearchResidence eyeBallingResMatch={eyeBallingResMatch} />
          <WFBTPSearchEmployment
            eyeBallingMobileMatch={eyeBallingMobileMatch}
          />
          <div className="col-span-2">
            <WFBAddressMatch eyeBallingAddressMatch={eyeBallingAddressMatch} />
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion className="col-span-2">
        <AccordionSummary
          expandIcon={<EdgeSvgIcon>feather:chevron-down</EdgeSvgIcon>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="w-full -mb-10">
            <Ve3FormHeader
              icon="material-outline:credit_card"
              title="FCU BASE"
            />
          </div>
        </AccordionSummary>
        <AccordionDetails className="grid grid-cols-2 gap-12">
          <div className="col-span-2">
            <FCUNICMatchTable fcuBaseNicMatch={fcuBaseNicMatch} />
          </div>
          <FCUTPSearchResidence fcuBaseResMatch={fcuBaseResMatch} />
          <FCUTPSearchEmployment fcuBaseMobileMatch={fcuBaseMobileMatch} />
          <div className="col-span-2">
            <FCUAddressMatch fcuBaseAddressMatch={fcuBaseAddressMatch} />
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion className="col-span-2">
        <AccordionSummary
          expandIcon={<EdgeSvgIcon>feather:chevron-down</EdgeSvgIcon>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="w-full -mb-10">
            <Ve3FormHeader
              icon="material-outline:credit_card"
              title="Crib Match"
            />
          </div>
        </AccordionSummary>
        <AccordionDetails className="grid grid-cols-2 gap-12">
          <div className="col-span-2">
            <CribNICMatchTable cribNicMatch={cribNicMatch} />
          </div>
          <CribTPSearchResidence cribResMatch={cribResMatch} />
          <CribTPSearchEmployment cribMobileMatch={cribMobileMatch} />
          <div className="col-span-2">
            <CribAddressMatch cribAddressMatch={cribAddressMatch} />
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion className="col-span-2">
        <AccordionSummary
          expandIcon={<EdgeSvgIcon>feather:chevron-down</EdgeSvgIcon>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="w-full -mb-10">
            <Ve3FormHeader
              icon="material-outline:credit_card"
              title="Relationship History"
            />
          </div>
        </AccordionSummary>
        <AccordionDetails className="grid grid-cols-2 gap-12">
          <div className="col-span-2">
            <RelationshipHistoryTable
              relationshipHistory={relationshipHistory}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      <div className="grid grid-cols-3 col-span-2 gap-12">
        <Paper className="px-12 pb-10 col-span-1">
          <Ve3FormHeader
            icon="material-outline:fingerprint"
            title="Verification Alert"
          />
          <VerificationAlertInfo
            relationshipVerificationAlert={relationshipVerificationAlert}
          />
        </Paper>

        <div className="col-span-2">
          <EyeballingPreCheckRecommendation
            relationshipRecommendation={relationshipRecommendation}
          />
        </div>
      </div>

      <Accordion className="col-span-2" defaultExpanded>
        <AccordionSummary
          expandIcon={<EdgeSvgIcon>feather:chevron-down</EdgeSvgIcon>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="w-full -mb-10">
            <Ve3FormHeader
              icon="material-outline:credit_card"
              title="FRM Alert(s)"
            />
          </div>
        </AccordionSummary>
        <AccordionDetails className="grid grid-cols-2 gap-12">
          <div className="col-span-2">
            <FRMAlerts
              task={task}
              editable={
                task.taskName === "Please Authorize FRM Alert Check"
                  ? true
                  : false
              }
              frmAlerts={frmAlerts}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default EyeBallingPreCheckView;
