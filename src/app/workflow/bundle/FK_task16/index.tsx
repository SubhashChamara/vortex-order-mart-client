import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CreditCardInformation from "../components/CreditCardInformation/CreditCardInformation";
import ClientBasicInformation from "../components/ClientBasicInformation/ClientBasicInformation";
import { zodResolver } from "@hookform/resolvers/zod";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import dayjs, { Dayjs } from "dayjs";
import VerificationChecks from "../components/VerificationChecks/VerificationChecks";
import NonNationalChecks from "../components/NonNationalChecks/NonNationalChecks";
import SalesInfo from "../components/SalesInfo/SalesInfo";
import ALPLCheckpoints from "../components/ALPLCheckpoints/ALPLCheckpoints";
import { Api } from "../../../../api/Api";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { DropDownItem } from "../../../core/types/DropDown";
import { CreditInformation } from "../@types/CreditInfromation";
import { formatCardNumber, formatCurrency } from "../@helpers/Common";
import { ClientInformation } from "../@types/ClientInfromation";
import { VerificationInfromation } from "../@types/VerificationInfromation";
import { SalesInfromation } from "../@types/SalesInfromation";
import { DBRUser } from "../../../core/types/DBRUser";
import { creditInformationSchema, salesReworkSchema } from "../schema/Schema";
import CellUserCheckList from "../components/CellUserCheckList/CellUserCheckList";
import { ChecklistInfo } from "../../../core/types/ChecklistInfo";
import Logger from "../../../../@helpers/Logger";
import CCCheckpoints from "../components/CCCheckpoints/CCCheckpoints";
import CribDetails from "../components/CribDetails/CribDetails";
import CribDocumentView from "../components/CribDocumentView/CribDocumentView";
import LoanPersonalInformation from "../components/LoanPersonalInformation/LoanPersonalInformation";
import LoanApplicationInformation from "../components/LoanApplicationInformation/LoanApplicationInformation";
import { Alert, Button } from "@mui/material";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { BundleCribpullInfo } from "../@types/BundleCribpullInfo";
import CCCheckpointsAllFields from "../components/CCCheckpointsAllFields/CCCheckpointsAllFields";
import SalesRework from "../components/SalesRework/SalesRework";
import { SalesReworkRequest } from "../@types/SalesReworkRequest";
import { toast } from "react-toastify";
import { z } from "zod";
import { SalesReworkInfo } from "../@types/SalesReworkInfo";
import SendToCell from "../components/SendToCell/SendToCell";
import ALPLCheckpointsAllFields from "../components/ALPLCheckpointsAllFields/ALPLCheckpointsAllFields";

interface BundledFlowProps {
  task: TaskDetailInfo;
}

type FormType = {
  isCC: boolean;
  isALPL: boolean;
  isAccountOpening: boolean;
  isCCReconsiled: boolean;
  isALPLReconsiled: boolean;
  isCASAReconsiled: boolean;
  reqLoanAmount: string;
  reqType: "PL NEW" | "PL TOPUP" | "24hr PL";
  isCASADefinite: boolean;
  isCASABBAccount: boolean;
  etbNtb: "ETB" | "NTB";
  relationshipId: string;

  //   User Information
  isGroupSale: boolean;
  groupReference: string;
  sourceType: DropDownItem | null;
  creditCardType: DropDownItem | null;
  applicantTitle: DropDownItem | null;
  applicantFirstName: string;
  applicantLastName: string;
  applicantNic: string;
  isApplicantNicPrimary: boolean;
  applicantEic: string;
  isApplicantEicPrimary: boolean;
  applicantAdditionalNic: string;
  isApplicantAdditionalNicPrimary: boolean;
  applicantAdditionalEic: string;
  isApplicantAdditionalEicPrimary: boolean;
  applicantPassportNumber: string;
  applicantDateOfBirth: Dayjs | null;
  applicantResAddress1: string;
  applicantResAddress2: string;
  applicantResAddress3: string;
  applicantResAddressCity: string;
  residentialTelephoneNumber: string;
  mobileNumber: string;
  email: string;
  applicationDate: Dayjs | null;

  //   Workplace information
  companyName: DropDownItem | null;
  companyAddressNo: string;
  companyAddressStreet1: string;
  companyAddressStreet2: string;
  companyAddressCity: string;
  companyTelephone: string;
  basicSalary: string;

  //   Referee information
  refereeName: string;
  refereeTelephone: string;
  refereeMobile: string;

  //   Verification Checks
  customerDueDiligence: "EDD" | "SDD" | null;
  isExistingCustomer: boolean;
  isAddressConfirmationDocProvided: boolean;
  scbAccountNumber: string;
  existingCardNumber: string;
  isApplicantAddressSameAsIdentification: boolean;
  isClearCopyOfNicDlPpProvided: boolean;
  isMothersMaidenNameMentioned: boolean;
  isCustomerAttestationAndOriginalSeenConfirmed: boolean;
  isResidenceTelephoneMatchingAddress: boolean;
  applicantAge: number | null;
  isSignatureOnAllFivePanels: boolean;
  isAmendmentCounterSignedByApplicant: boolean;
  isAnnualFeeWaived: boolean;
  isJoiningFeeWaived: boolean;

  //   Non national checks
  isNonNational: boolean;
  hasMinimumMonthlySalary: boolean;
  hasDepartureLetter: boolean;
  hasEmailConfirmationTop5CorporateExecutive: boolean;

  //   Sales info
  salesAgentOrPfcName: string;
  staffCode: DBRUser | null;
  bdmOrManagerName: DBRUser | null;
  branch: DropDownItem | null;
  armCode: string;
  salesComments: string;

  // Final Checklist
  isNICNotClearWithSecondaryProof: boolean;
  nicNotClearComment: string;
  isRelationshipIdentifiedByCBO: boolean;
  cboRelationshipComment: string;

  // sales rework
  cribRating: string;
  norcom: string;
};

const defaultValues: FormType = {
  isCC: false,
  isALPL: false,
  isAccountOpening: false,
  isCCReconsiled: false,
  isALPLReconsiled: false,
  isCASAReconsiled: false,
  reqLoanAmount: "",
  reqType: "PL NEW",
  isCASADefinite: false,
  isCASABBAccount: false,
  etbNtb: "ETB",
  relationshipId: "",

  //   user information
  isGroupSale: false,
  groupReference: "",
  sourceType: null,
  creditCardType: null,
  applicantTitle: null,
  applicantFirstName: "",
  applicantLastName: "",
  applicantNic: "",
  isApplicantNicPrimary: false,
  applicantEic: "",
  isApplicantEicPrimary: false,
  applicantAdditionalNic: "",
  isApplicantAdditionalNicPrimary: false,
  applicantAdditionalEic: "",
  isApplicantAdditionalEicPrimary: false,
  applicantPassportNumber: "",
  applicantDateOfBirth: null,
  applicantResAddress1: "",
  applicantResAddress2: "",
  applicantResAddress3: "",
  applicantResAddressCity: "",
  residentialTelephoneNumber: "",
  mobileNumber: "",
  email: "",
  applicationDate: null,

  //   company values
  companyName: null,
  companyAddressNo: "",
  companyAddressStreet1: "",
  companyAddressStreet2: "",
  companyAddressCity: "",
  companyTelephone: "",
  basicSalary: "",

  //   Referee information
  refereeName: "",
  refereeTelephone: "",
  refereeMobile: "",
  customerDueDiligence: "EDD",
  isExistingCustomer: false,
  isAddressConfirmationDocProvided: false,
  scbAccountNumber: "",
  existingCardNumber: "",
  isApplicantAddressSameAsIdentification: false,
  isClearCopyOfNicDlPpProvided: false,
  isMothersMaidenNameMentioned: false,
  isCustomerAttestationAndOriginalSeenConfirmed: false,
  isResidenceTelephoneMatchingAddress: false,
  applicantAge: 0,
  isSignatureOnAllFivePanels: false,
  isAmendmentCounterSignedByApplicant: false,
  isAnnualFeeWaived: false,
  isJoiningFeeWaived: false,

  // Non national checks
  isNonNational: false,
  hasMinimumMonthlySalary: false,
  hasDepartureLetter: false,
  hasEmailConfirmationTop5CorporateExecutive: false,
  salesAgentOrPfcName: "",
  staffCode: null,
  bdmOrManagerName: null,
  branch: null,
  armCode: "",
  salesComments: "",

  // Final Checklist
  isNICNotClearWithSecondaryProof: false,
  nicNotClearComment: "",
  isRelationshipIdentifiedByCBO: false,
  cboRelationshipComment: "",

  // sales rework
  cribRating: "",
  norcom: "",
};

const BundleForm: React.FC<BundledFlowProps> = ({ task }) => {
  const [sourceTypeDropdowns, setSourceTypeDropdowns] = useState<
    DropDownItem[]
  >([]);
  const [cardTypeDropdowns, setCardTypeDropdowns] = useState<DropDownItem[]>(
    []
  );
  const [titleTypeDropdowns, setTitleTypeDropdowns] = useState<DropDownItem[]>(
    []
  );
  const [branchDropdowns, setBranchDropdowns] = useState<DropDownItem[]>([]);
  const [companyDropdowns, setCompanyDropdowns] = useState<DropDownItem[]>([]);

  const [dbrUserDropdowns, setDBRUserDropdowns] = useState<DBRUser[]>([]);

  const [branchManagersDropdowns, setBranchManagersDropdowns] = useState<
    DBRUser[]
  >([]);

  const [ccChecklist, setCCChecklist] = useState<ChecklistInfo[]>([]);

  const [alplChecklist, setALPLChecklist] = useState<ChecklistInfo[]>([]);

  const [creditInformation, setCreditInformation] =
    useState<CreditInformation | null>(null);

  const [clientInformation, setClientInformation] =
    useState<ClientInformation | null>(null);

  const [verificationInformation, setVerificationInformation] =
    useState<VerificationInfromation | null>(null);

  const [salesInformation, setSalesInformation] =
    useState<SalesInfromation | null>(null);

  const [cribPullInformation, setCribPullInformation] =
    useState<BundleCribpullInfo | null>(null);

  const [salesReworkInformation, setSalesReworkInformation] =
    useState<SalesReworkInfo | null>(null);
  const [sendToCellChecklist, setSendToCellChecklist] = useState<
    ChecklistInfo[]
  >([]);
  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(salesReworkSchema),
  });

  const { watch, setValue, handleSubmit } = methods;

  const isAlpl = watch("isALPL");
  const isCC = watch("isCC");
  const sourceType = watch("sourceType");

  // get credit information on load
  const getCreditInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCreditInformation(task.processInstanceId)
    );

    if (data !== null) {
      console.log(data);
      setCreditInformation(data);
    } else {
      console.log(err);
    }
  };

  // get credit information on load
  const getClientInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getClientInformation(task.processInstanceId)
    );

    if (data !== null) {
      console.log(data);
      setClientInformation(data);
    } else {
      console.log(err);
    }
  };

  // get verification information on load
  const getVerificationInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getVerificationInformation(task.processInstanceId)
    );

    if (data !== null) {
      console.log(data);
      setVerificationInformation(data);
    } else {
      console.log(err);
    }
  };

  // get sales information on load
  const getSalesInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getSalesInformation(task.processInstanceId)
    );

    if (data !== null) {
      console.log(data);
      setSalesInformation(data);
    } else {
      console.log(err);
    }
  };

  // get DBR Users
  const getDBRUsers = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getDBRUsers()
    );

    if (data !== null) {
      setDBRUserDropdowns(data);
    } else {
      console.log(err?.msg);
    }
  };

  // get branch managers
  const getBranchManagers = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBranchManagers(task.processInstanceId)
    );
    if (data !== null) {
      setBranchManagersDropdowns(data);
    } else {
      console.log(err);
    }
  };

  // Common method for fetching dropdown data
  const getDropdownData = async (
    dropdownType: string,
    setState: React.Dispatch<React.SetStateAction<DropDownItem[]>>
  ) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundledDropdownData(dropdownType)
    );

    if (data !== null) {
      setState(data);
    } else {
      console.log(err);
    }
  };

  const [cellUserCheckList, setCellUserChecklist] = useState<ChecklistInfo[]>(
    []
  );
  // get cell user checklist items -> chaneg when api implemented
  const getCellUserChecklistValues = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCasaChecklistItems(
        task.processInstanceId,
        task.processDefinitionKey,
        "CELL_USER"
      )
    );

    if (data !== null) {
      setCellUserChecklist(data);
      Logger.debug("Cell User Checklist: " + data);
    } else {
      console.log(err?.msg);
    }
  };

  // get cribpull information
  const getCribpullInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundleCribPullInfo(task.processInstanceId)
    );

    if (data !== null) {
      setCribPullInformation(data);
    } else {
      console.log(err);
    }
  };

  // get sales rework info
  const getSalesReworkInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getReworkData(task.processInstanceId)
    );

    if (data !== null) {
      setSalesReworkInformation(data);
    } else {
      console.error(err);
    }
  };

  // handle method --> save sales rework data
  const handleReworkDataSave = async (formData: FormType) => {
    console.log(formData);
    const request: SalesReworkRequest = {
      jshareLink: formData.cribRating,
      norcomLink: formData.norcom,
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveReworkData(
        task.processInstanceId,
        task.taskInstance,
        request
      )
    );

    if (!err) {
      toast.success("Sales rework data saved successfully");
    } else {
      toast.error(err.msg);
    }
  };

  // get send to cell checklist items
  const getSendToCellChecklistValues = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCasaChecklistItems(
        task.processInstanceId,
        task.processDefinitionKey,
        "CBO_CHECKER"
      )
    );

    if (data !== null) {
      setSendToCellChecklist(data);
    } else {
      console.log(err?.msg);
    }
  };

  // get alpl checklist
  const getALPLChecklist = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCCChecklist(task.processInstanceId, "ALPL")
    );

    if (data !== null) {
      setALPLChecklist(data);
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    getDropdownData("customer-source-type", setSourceTypeDropdowns);
    getDropdownData("card-type", setCardTypeDropdowns);
    getDropdownData("branch", setBranchDropdowns);
    getDropdownData("company", setCompanyDropdowns);
    getDropdownData("applicant-title", setTitleTypeDropdowns);

    getDBRUsers();
    getBranchManagers();

    getCreditInformation();
    getClientInformation();
    getVerificationInformation();
    getSalesInformation();
    getCellUserChecklistValues();
    getCribpullInformation();
    getSalesReworkInfo();

    getSendToCellChecklistValues();
    getALPLChecklist();
  }, []);

  // page load side effects
  useEffect(() => {
    if (creditInformation) {
      setValue("isCC", creditInformation.isCard);
      setValue("isALPL", creditInformation.isLoan);
      setValue("isAccountOpening", creditInformation.isCasa);
      setValue("isCASAReconsiled", creditInformation.casaReconciled);
      setValue("isCCReconsiled", creditInformation.cardReconciled);
      setValue("isALPLReconsiled", creditInformation.alplReconciled);
      setValue(
        "reqLoanAmount",
        creditInformation.requestAmount
          ? formatCurrency(creditInformation.requestAmount.toString())
          : ""
      );
      setValue(
        "reqType",
        creditInformation.loanRequestType === "PL_TOP_UP"
          ? "PL TOPUP"
          : creditInformation.loanRequestType === "PL_NEW"
          ? "PL NEW"
          : "24hr PL"
      );
      setValue("isCASADefinite", creditInformation.casaDefined);
      setValue("isCASABBAccount", creditInformation.casaBBAccount);
      setValue(
        "etbNtb",
        creditInformation.relationShipType === "ETB" ? "ETB" : "NTB"
      );
      setValue("relationshipId", creditInformation.relationShipId);
    }
  }, [creditInformation]);

  useEffect(() => {
    if (clientInformation) {
      //set applicant informations
      setValue(
        "isGroupSale",
        clientInformation.groupSale ? clientInformation.groupSale : false
      );
      setValue(
        "groupReference",
        clientInformation.groupReference ? clientInformation.groupReference : ""
      );

      const matchingSourceType = sourceTypeDropdowns.find(
        (item) => item.id === clientInformation.customerSourceTypeId
      );
      setValue("sourceType", matchingSourceType || null);

      const matchingCardType = cardTypeDropdowns.find(
        (item) => item.id === clientInformation.cardTypeId
      );
      setValue("creditCardType", matchingCardType || null);

      const matchingTitle = titleTypeDropdowns.find(
        (item) => item.id.toString() === clientInformation.title
      );
      setValue("applicantTitle", matchingTitle || null);
      setValue("applicantFirstName", clientInformation.applicantName || "");
      setValue("applicantLastName", clientInformation.applicantLastName || "");
      setValue("applicantDateOfBirth", dayjs(clientInformation.dob));
      setValue("applicantResAddress1", clientInformation.resAddress1 || "");
      setValue("applicantResAddress1", clientInformation.resAddress1 || "");
      setValue("applicantResAddress3", clientInformation.resAddress3 || "");
      setValue("applicantResAddressCity", clientInformation.resAddress4 || "");
      setValue(
        "residentialTelephoneNumber",
        clientInformation.teleResident || ""
      );
      setValue("mobileNumber", clientInformation.teleMobile || "");
      setValue("email", clientInformation.email || "");
      setValue("applicationDate", dayjs(clientInformation.requestedDateTime));

      //set applicant identity
      setValue("applicantNic", clientInformation.applicantNIC || "");
      setValue("applicantEic", clientInformation.applicantNewNIC || "");
      setValue(
        "applicantAdditionalNic",
        clientInformation.applicantPassport || ""
      );

      //set company information
      const matchingCompany = companyDropdowns.find(
        (item) => item.id === clientInformation.companyId
      );
      setValue("companyName", matchingCompany || null);
      setValue("companyAddressNo", clientInformation.companyAddressNo || "");
      setValue(
        "companyAddressStreet1",
        clientInformation.companyAddress1 || ""
      );
      setValue(
        "companyAddressStreet2",
        clientInformation.companyAddress2 || ""
      );
      setValue(
        "companyAddressCity",
        clientInformation.companyAddressArea || ""
      );
      setValue("companyTelephone", clientInformation.companyTelephone || "");
      setValue(
        "basicSalary",
        formatCurrency(clientInformation.basicSalary?.toString() || "")
      );
    }
  }, [clientInformation]);

  useEffect(() => {
    if (verificationInformation) {
      //set verification checks
      setValue("refereeName", verificationInformation.refereeName || "");
      setValue(
        "refereeTelephone",
        verificationInformation.refereeTeleRes || ""
      );
      setValue(
        "refereeMobile",
        verificationInformation.refereeTeleMobile || ""
      );
      setValue(
        "customerDueDiligence",
        verificationInformation.customerDueDiligence === "EDD"
          ? "EDD"
          : "SDD" || null
      );
      setValue(
        "isExistingCustomer",
        verificationInformation.existCustomer || false
      );
      setValue(
        "isAddressConfirmationDocProvided",
        verificationInformation.addressConfirmation || false
      );
      setValue("scbAccountNumber", verificationInformation.scbAC || "");
      setValue(
        "existingCardNumber",
        (verificationInformation.existingCard &&
          formatCardNumber(verificationInformation.existingCard)) ||
          ""
      );
      setValue("applicantAge", verificationInformation.age || null);

      //set application verification checks
      setValue(
        "isApplicantAddressSameAsIdentification",
        verificationInformation.addressConfirmation || false
      );

      setValue(
        "isClearCopyOfNicDlPpProvided",
        verificationInformation.clearCopyOfID || false
      );
      setValue(
        "isMothersMaidenNameMentioned",
        verificationInformation.mothersMaidenName || false
      );
      setValue(
        "isCustomerAttestationAndOriginalSeenConfirmed",
        verificationInformation.customerAttestation || false
      );
      setValue(
        "isResidenceTelephoneMatchingAddress",
        verificationInformation.addressConfirmation || false
      );
      setValue(
        "isSignatureOnAllFivePanels",
        verificationInformation.signatureOnFivePanels || false
      );
      setValue(
        "isAmendmentCounterSignedByApplicant",
        verificationInformation.amendmentsSigned || false
      );
      setValue("isAnnualFeeWaived", verificationInformation.annualFee || false);
      setValue(
        "isJoiningFeeWaived",
        verificationInformation.joiningFee || false
      );

      // set non-national fields
      setValue("isNonNational", verificationInformation.nonNational || false);
      setValue(
        "hasMinimumMonthlySalary",
        verificationInformation.minimumPerMonthSal || false
      );
      setValue(
        "hasDepartureLetter",
        verificationInformation.departureLetter || false
      );
      setValue(
        "hasEmailConfirmationTop5CorporateExecutive",
        verificationInformation.emailConfirmation || false
      );
    }
  }, [verificationInformation]);

  useEffect(() => {
    if (salesInformation) {
      setValue("salesAgentOrPfcName", salesInformation.nameOfSalesAgent || "");

      const matchingDsrUser = dbrUserDropdowns.find(
        (item) => item.id === salesInformation.dsrUserId
      );
      setValue("staffCode", matchingDsrUser || null);

      const matchingManager = branchManagersDropdowns.find(
        (item) => item.id === salesInformation.teamLeaderId
      );
      setValue("bdmOrManagerName", matchingManager || null);

      const matchingBranch = branchDropdowns.find(
        (item) => item.id === salesInformation.branchId
      );
      setValue("branch", matchingBranch || null);
      setValue("armCode", salesInformation.armNumber || "");
      setValue("salesComments", salesInformation.salesComments || "");
    }
  }, [salesInformation]);

  useEffect(() => {
    if (salesReworkInformation) {
      setValue("cribRating", salesReworkInformation.jshareLink || "");
      setValue("norcom", salesReworkInformation.norcomLink || "");
    }
  }, [salesReworkInformation]);

  // get cc checklist
  const getCCChecklist = async () => {
    if (!sourceType) {
      return;
    }

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCCChecklist(task.processInstanceId, sourceType.code || "")
    );

    if (data !== null) {
      setCCChecklist(data);
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    getCCChecklist();
  }, [sourceType]);

  const steps = [
    {
      label: "Client Request",
      content: <CreditCardInformation editable={false} />,
    },
    {
      label: "Client Information",
      content: (
        <ClientBasicInformation
          editable={false}
          sourceTypeDropdowns={sourceTypeDropdowns}
          cardTypeDropdowns={cardTypeDropdowns}
          titleTypeDropdowns={titleTypeDropdowns}
          companyDropdowns={companyDropdowns}
        />
      ),
    },
    {
      label: "Verification Steps",
      content: (
        <div className="flex flex-col gap-9">
          <VerificationChecks editable={false} />
          <NonNationalChecks editable={false} />
        </div>
      ),
    },
    {
      label: "Sales Info",
      content: <SalesInfo editable={false} />,
    },
    ...(isAlpl
      ? [
          {
            label: "ALPL Checkpoints",
            content: (
              <ALPLCheckpointsAllFields
                alplChecklist={alplChecklist}
                setALPLChecklist={setALPLChecklist}
                salesEditable={false}
                operationEditable={false}
                creditEditable={false}
              />
            ),
          },
        ]
      : []),
    ...(isCC
      ? [
          {
            label: "CC Checkpoints",
            content: (
              <CCCheckpointsAllFields
                ccChecklist={ccChecklist}
                isCreditEditable={false}
                isOperationsEditable={false}
                isSalesEditable={false}
                setCCChecklist={setCCChecklist}
              />
            ),
          },
          // {
          //   label: "CRIB Details",
          //   content: (
          //     <div className="grid grid-cols-2 gap-12">
          //       <CribDetails cribPullInformation={cribPullInformation} />
          //       <CribDocumentView
          //         nicPath={cribPullInformation?.nicPDFCribDocPath}
          //         eicPath={cribPullInformation?.eicPDFCribDocIdPath}
          //         ppPath={cribPullInformation?.passportPDFCribDocIdPath}
          //       />
          //     </div>
          //   ),
          // },
        ]
      : []),
    ...(task.taskId === "authoriseapplicationatbranchcasa"
      ? [
          {
            label: "Cell User Checklist",
            content: (
              <CellUserCheckList
                editable={false}
                cellUserChecklist={cellUserCheckList}
                setCellUserChecklist={setCellUserChecklist}
              />
            ),
          },
        ]
      : []),
    ...(isAlpl
      ? [
          {
            label: "Send to Cell",
            content: (
              <form>
                <SendToCell
                  editable={false}
                  sendToCellChecklist={sendToCellChecklist}
                  setSendToCellChecklist={setSendToCellChecklist}
                />
              </form>
            ),
          },
        ]
      : []),
    {
      label: "Sales Rework",
      content: (
        <form
          className="flex flex-col gap-12"
          onSubmit={handleSubmit(handleReworkDataSave)}
        >
          <SalesRework editable={true} />
          <div className="flex justify-end">
            <Button type="submit">
              <EdgeSvgIcon className="mr-3">feather:save</EdgeSvgIcon> Save
            </Button>
          </div>
        </form>
      ),
    },
  ];

  return (
    <FormProvider {...methods}>
      {cribPullInformation &&
        typeof cribPullInformation.isCribPassed === "boolean" && (
          <Alert
            variant="standard"
            color={
              cribPullInformation.isCribPassed === true ? "success" : "error"
            }
            className="mb-12"
            icon={false}
            sx={{
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              border: "0.5px solid",
              borderColor:
                cribPullInformation.isCribPassed === true
                  ? "success.main"
                  : "error.main",
              borderRadius: "4px",
            }}
          >
            {cribPullInformation.isCribPassed === true
              ? "CRIB PASSED"
              : "CRIB FAILED"}
          </Alert>
        )}
      <Ve3StepWizard
        selectStep={steps.findIndex((item) => item.label === "Sales Rework")}
        currentSteps={steps
          .slice(steps.findIndex((step) => step.label === "Sales Rework"))
          .map(
            (_, index) =>
              steps.findIndex((step) => step.label === "Sales Rework") + index
          )}
        completedSteps={Array.from(
          {
            length: steps.findIndex((step) => step.label === "Sales Rework"),
          },
          (_, index) => index
        )}
        steps={steps}
      />
    </FormProvider>
  );
};

export default BundleForm;
