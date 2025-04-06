import { Alert, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import { Api } from "../../../../api/Api";
import { ChecklistInfo } from "../../../core/types/ChecklistInfo";
import { DBRUser } from "../../../core/types/DBRUser";
import { DropDownItem } from "../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { formatCardNumber, formatCurrency } from "../@helpers/Common";
import { BundleCribpullInfo } from "../@types/BundleCribpullInfo";
import { BundleCribScoreInfo } from "../@types/BundleCribScore";
import { ClientInformation } from "../@types/ClientInfromation";
import { CreditInformation } from "../@types/CreditInfromation";
import { CreditRequest } from "../@types/CreditRequest";
import { ErrorCommentRequest } from "../@types/ErrorCommentRequest";
import { ExtendedVerificationInfo } from "../@types/ExtendedVerificationInfo";
import { ExtendedVerificationRequest } from "../@types/ExtendedVerificationRequest";
import { SalesInfromation } from "../@types/SalesInfromation";
import { VerificationInfromation } from "../@types/VerificationInfromation";
import ALPLCheckpointsTwoFields from "../components/ALPLCheckpointsTwoFields/ALPLCheckpointsTwoFields";
import CASACheckpoints from "../components/CASACheckpoints/CASACheckpoints";
import CASADocCheck from "../components/CASADocCheck/CASADocCheck";
import CCCheckpointsTwoFields from "../components/CCCheckpointsTwoFields/CCCheckpointsTwoFields";
import ClientBasicInformation from "../components/ClientBasicInformation/ClientBasicInformation";
import CribScore from "../components/CribScore/CribScore";
import ErrorCommentBox from "../components/ErrorCommentBox/ErrorCommentBox";
import FinalChecks from "../components/FinalChecks/FinalChecks";
import NonNationalChecks from "../components/NonNationalChecks/NonNationalChecks";
import SalesInfo from "../components/SalesInfo/SalesInfo";
import SendToCell from "../components/SendToCell/SendToCell";
import VerificationChecks from "../components/VerificationChecks/VerificationChecks";
import CreditCardInformation from "./components/CreditCardInformation";

interface BundledFlowProps {
  task: TaskDetailInfo;
}

type FormType = {
  currentStep: number | null;

  // credit information
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

  // CASA Send to cell
  isApplicationIncomplete: boolean;
  isSupportingDocumentIllegible: boolean;
  isNotCompliantWithExchangeControlRegulations: boolean;
  isAdditionalDocumentsRequiredForDataCapturing: boolean;

  // Comment box (error)
  isError: boolean;
  isErrorCASA: boolean;
  isErrorCard: boolean;
  isErrorLoan: boolean;
  errorComment: string;
};

const defaultValues: FormType = {
  currentStep: null,

  // credit information
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

  // send to cell checklist
  isApplicationIncomplete: false,
  isSupportingDocumentIllegible: false,
  isNotCompliantWithExchangeControlRegulations: false,
  isAdditionalDocumentsRequiredForDataCapturing: false,

  // Comment box (error)
  isError: false,
  isErrorCASA: false,
  isErrorCard: false,
  isErrorLoan: false,
  errorComment: "",
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

  const [creditInformation, setCreditInformation] =
    useState<CreditInformation | null>(null);

  const [clientInformation, setClientInformation] =
    useState<ClientInformation | null>(null);

  const [verificationInformation, setVerificationInformation] =
    useState<VerificationInfromation | null>(null);

  const [salesInformation, setSalesInformation] =
    useState<SalesInfromation | null>(null);

  const [casaChecklist, setCasaChecklist] = useState<ChecklistInfo[]>([]);
  const [sendToCellChecklist, setSendToCellChecklist] = useState<
    ChecklistInfo[]
  >([]);
  const [ccChecklist, setCCChecklist] = useState<ChecklistInfo[]>([]);

  const [extendedVerificationInfo, setExtendedVerificationInfo] =
    useState<ExtendedVerificationInfo | null>(null);

  const [cribScoreInformation, setCribScoreInformation] =
    useState<BundleCribScoreInfo | null>(null);

  const [cribPullInformation, setCribPullInformation] =
    useState<BundleCribpullInfo | null>(null);

  const [alplChecklist, setALPLChecklist] = useState<ChecklistInfo[]>([]);

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

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    // resolver: zodResolver(creditInformationSchema),
  });

  const { watch, setValue, handleSubmit } = methods;

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

  // get casa checklist items
  const getCasaChecklistValues = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCasaChecklistItems(
        task.processInstanceId,
        task.processDefinitionKey,
        "DOC_CHECKER"
      )
    );

    if (data !== null) {
      setCasaChecklist(data);
    } else {
      console.log(err?.msg);
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

  // get extended verification info
  const getExtendedVerificationInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getExtendedVerificationInformation(task.processInstanceId)
    );

    if (data !== null) {
      setExtendedVerificationInfo(data);
    } else {
      console.log(err);
    }
  };

  // get crib score
  const getCribScore = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundleCribScore(task.processInstanceId)
    );

    if (data !== null) {
      setCribScoreInformation(data);
    } else {
      console.log(err);
    }

    console.log(data);
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

  // handle method --> Submit etb / ntb
  const handleCasaDocCheckSubmission = async (formData: FormType) => {
    const request: CreditRequest = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
      isCard: formData.isCC,
      cardTypeId:
        formData.isCC && creditInformation?.cardTypeId
          ? creditInformation.cardTypeId
          : null,
      cardReconciled: formData.isCCReconsiled,
      isLoan: formData.isALPL,
      alplReconciled: formData.isALPLReconsiled,
      isCasa: formData.isAccountOpening,
      casaReconciled: formData.isCASAReconsiled,
      requestAmount: formData.reqLoanAmount
        ? parseFloat((formData.reqLoanAmount || "").replace(/[^0-9.]/g, ""))
        : null,
        loanRequestType: formData.isALPL
        ? formData.reqType
        ? formData.reqType === "PL NEW"
          ? "PL_NEW"
          : formData.reqType === "PL TOPUP"
          ? "PL_TOP_UP"
          : formData.reqType === "24hr PL"
          ? "PL_24_HOURS"
          : null
        : null
      : null,
      casaDefined: formData.isCASADefinite === true ? true : false,
      casaBBAccount: formData.isCASABBAccount === true ? true : false,
      relationShipType: formData.etbNtb,
      relationShipId: formData.relationshipId,
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveCreditInformation(request)
    );
    if (!err) {
      toast.success("Credit information saved");
      setValue(
        "currentStep",
        steps.findIndex((step) => step.label === "Doc Check") + 1
      );
    } else {
      toast.error(err.msg);
    }
  };

  // handle method --> casa checklist submission
  const handleCasaChecklistSubmission = async (formData: FormType) => {
    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveBundleChecklist(
        casaChecklist,
        task.processInstanceId,
        task.taskInstance
      )
    );

    try {
      if (!err) {
        toast.success("CASA checklist saved");
        setValue("currentStep", 6);
      } else {
        toast.error(err.msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      handleExtendedVerificationSubmission(formData);
    }
  };

  // Method to handle extended verification request submission
  const handleExtendedVerificationSubmission = async (formData: FormType) => {
    const extendedVerificationRequest: ExtendedVerificationRequest = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
      nicNotClear:
        formData.isNICNotClearWithSecondaryProof === true ? true : false,
      nicNotClearComment:
        formData.nicNotClearComment === "" ? null : formData.nicNotClearComment,
      relationshipIdentified:
        formData.isRelationshipIdentifiedByCBO === true ? true : false,
      relationshipIdentifiedComment:
        formData.cboRelationshipComment === ""
          ? null
          : formData.cboRelationshipComment,
    };

    const { err: ExtendedVerificationErr } = await Api.performRequest((r) =>
      r.creditCard.saveExtendedVerification(extendedVerificationRequest)
    );

    if (!ExtendedVerificationErr) {
      toast.success("Final checklist saved successfully");
    } else {
      toast.error(ExtendedVerificationErr.msg);
    }
  };

  // Method to handle error comment request submission
  const handleErrorCommentSubmission = async (formData: FormType) => {
    const errorRequest: ErrorCommentRequest = {
      taskInstance: task.taskInstance,
      errorTypes: ["CASA", "CARD", "LOAN"].filter(
        (type, index) =>
          (index === 0 && formData.isErrorCASA) ||
          (index === 1 && formData.isErrorCard) ||
          (index === 2 && formData.isErrorLoan)
      ),
      hasError: formData.isError,
      errorComment: formData.errorComment === "" ? null : formData.errorComment,
    };

    const { err: errorRequestErr } = await Api.performRequest((r) =>
      r.creditCard.saveErrorComment(errorRequest)
    );

    if (!errorRequestErr) {
      toast.success("Error comment added");
    } else {
      toast.error(errorRequestErr.msg);
    }
  };

  // handle method --> send to cell checklist submission
  const handleSendToCellChecklistSubmission = async () => {
    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveBundleChecklist(
        sendToCellChecklist,
        task.processInstanceId,
        task.taskInstance
      )
    );
    if (!err) {
      toast.success("Send to cell checklist saved");
      setValue(
        "currentStep",
        steps.findIndex((step) => step.label === "Send to Cell") + 1
      );
    } else {
      toast.error(err.msg);
    }
  };

  // handle method --> final checks form submission
  const handleFinalChecksSubmission = async (formData: FormType) => {
    const extendedVerificationRequest: ExtendedVerificationRequest = {
      processInstance: task.processInstanceId,
      nicNotClear:
        formData.isNICNotClearWithSecondaryProof === true ? true : false,
      nicNotClearComment:
        formData.nicNotClearComment === "" ? null : formData.nicNotClearComment,
      relationshipIdentified:
        formData.isRelationshipIdentifiedByCBO === true ? true : false,
      relationshipIdentifiedComment:
        formData.cboRelationshipComment === ""
          ? null
          : formData.cboRelationshipComment,
    };

    const { err: ExtendedVerificationErr } = await Api.performRequest((r) =>
      r.creditCard.saveExtendedVerification(extendedVerificationRequest)
    );

    if (!ExtendedVerificationErr) {
      toast.success("Final checklist saved successfully");
    } else {
      toast.error(ExtendedVerificationErr.msg);
    }

    if (formData.isError === true) {
      const errorRequest: ErrorCommentRequest = {
        taskInstance: task.taskInstance,
        errorTypes: ["CASA", "CARD", "LOAN"].filter(
          (type, index) =>
            (index === 0 && formData.isErrorCASA) ||
            (index === 1 && formData.isErrorCard) ||
            (index === 2 && formData.isErrorLoan)
        ),
        hasError: formData.isError,
        errorComment:
          formData.errorComment === "" ? null : formData.errorComment,
      };

      const { err: errorRequestErr } = await Api.performRequest((r) =>
        r.creditCard.saveErrorComment(errorRequest)
      );

      if (!errorRequestErr) {
        toast.success("Error comment added");
      } else {
        toast.error(errorRequestErr.msg);
      }
    }
  };

  // handle method --> CC Checklist save
  const handleCCChecklistSave = async (formData: FormType) => {
    try {
      const { err } = await Api.performRequest((r) =>
        r.creditCard.saveBundleChecklist(
          ccChecklist,
          task.processInstanceId,
          task.taskInstance
        )
      );

      if (!err) {
        toast.success("CC Checklist saved successfully");
        setValue(
          "currentStep",
          steps.findIndex((step) => step.label === "CC Checkpoints") + 1
        );
      } else {
        toast.error(err.msg);
      }
    } catch (err) {
      console.error(err);
    } finally {
      handleExtendedVerificationSubmission(formData);
    }
  };

  // handle method --> ALPL Checklist save
  const handleALPLChecklistSave = async (formData: FormType) => {
    try {
      const { err } = await Api.performRequest((r) =>
        r.creditCard.saveBundleChecklist(
          alplChecklist,
          task.processInstanceId,
          task.taskInstance
        )
      );

      if (!err) {
        toast.success("ALPL checklist saved");
        setValue(
          "currentStep",
          steps.findIndex((step) => step.label === "ALPL Checkpoints") + 1
        );
      } else {
        toast.error(err.msg);
      }
    } catch (err) {
      console.error(err);
    } finally {
      handleExtendedVerificationSubmission(formData);
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
    getCasaChecklistValues();
    getSendToCellChecklistValues();
    getExtendedVerificationInformation();
    getCribScore();
    getCribpullInformation();
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
    if (extendedVerificationInfo) {
      setValue(
        "isNICNotClearWithSecondaryProof",
        extendedVerificationInfo.nicNotClear || false
      );
      setValue(
        "nicNotClearComment",
        extendedVerificationInfo.nicNotClearComment || ""
      );
      setValue(
        "isRelationshipIdentifiedByCBO",
        extendedVerificationInfo.relationshipIdentified || false
      );
      setValue(
        "cboRelationshipComment",
        extendedVerificationInfo.relationshipIdentifiedComment || ""
      );
    }
  }, [extendedVerificationInfo]);

  const isAlpl = watch("isALPL");
  const isCC = watch("isCC");
  const currentStep = watch("currentStep");
  const isAccountOpening = watch("isAccountOpening");
  const sourceType = watch("sourceType");

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

  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    setStep(currentStep);
  }, [currentStep]);

  const steps = [
    {
      label: "Client Request",
      content: <CreditCardInformation editable={false} />,
    },
    {
      label: "Client Information",
      content: <ClientBasicInformation editable={false} />,
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

    {
      label: "Doc Check",
      content: (
        <div>
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(handleCasaDocCheckSubmission)}
          >
            <CASADocCheck editable={true} />
            <div className="w-full pt-12 flex items-end justify-end">
              <Button
                className="flex flex-row gap-3 items-center justify-center"
                type="submit"
              >
                <EdgeSvgIcon>feather:save</EdgeSvgIcon>
                Save & Next
              </Button>
            </div>
          </form>
        </div>
      ),
    },

    ...(isAccountOpening &&
    task.taskId !== "mainDocCheckLoanQ1" &&
    task.taskId !== "mainDocCheckLoanQ2" &&
    task.taskId !== "mainDocCheckCardQ1" &&
    task.taskId !== "mainDocCheckCardQ2" &&
    task.taskName !== "Please Review Doc Check(CARD)" &&
    task.taskName !== "Please Review Doc Check(LOAN)"
      ? [
          {
            label: "CASA Checklist",
            content: (
              <form onSubmit={handleSubmit(handleCasaChecklistSubmission)}>
                <div className="grid grid-cols-1 gap-12">
                  <CASACheckpoints
                    editable={true}
                    casaChecklist={casaChecklist}
                    setCasaChecklist={setCasaChecklist}
                  />
                  <FinalChecks editable={true} />
                </div>
                <div className="flex justify-end pt-12">
                  <Button type="submit">
                    <EdgeSvgIcon>feather:save</EdgeSvgIcon> Save & Next
                  </Button>
                </div>
              </form>
            ),
          },
        ]
      : []),
    ...(isAlpl &&
    task.taskId !== "mainDocCheckCardQ1" &&
    task.taskId !== "mainDocCheckCardQ2" &&
    task.taskId !== "mainDocCheckCasa" &&
    task.taskName !== "Please Review Doc Check(CARD)"
      ? [
          {
            label: "ALPL Checkpoints",
            content: (
              <form
                className="flex flex-col gap-12"
                onSubmit={handleSubmit(handleALPLChecklistSave)}
              >
                <ALPLCheckpointsTwoFields
                  alplChecklist={alplChecklist}
                  setALPLChecklist={setALPLChecklist}
                  salesEditable={false}
                  operationEditable={true}
                />
                <FinalChecks editable={true} />
                <div className="flex justify-end">
                  <Button type="submit">
                    <EdgeSvgIcon className="mr-3">feather:save</EdgeSvgIcon>
                    Save & Next
                  </Button>
                </div>
              </form>
            ),
          },
        ]
      : []),
    ...(isCC &&
    task.taskId !== "mainDocCheckLoanQ1" &&
    task.taskId !== "mainDocCheckLoanQ2" &&
    task.taskId !== "mainDocCheckCasa" &&
    task.taskName !== "Please Review Doc Check(LOAN)"
      ? [
          {
            label: "CC Checkpoints",
            content: (
              <form
                className="flex flex-col gap-12"
                onSubmit={handleSubmit(handleCCChecklistSave)}
              >
                <CCCheckpointsTwoFields
                  ccChecklist={ccChecklist}
                  isSalesEditable={false}
                  isOperationsEditable={true}
                  setCCChecklist={setCCChecklist}
                />
                <FinalChecks editable={true} />

                <div className="flex justify-end">
                  <Button type="submit">
                    <EdgeSvgIcon>feather:save</EdgeSvgIcon> Save & Next
                  </Button>
                </div>
              </form>
            ),
          },

          // {
          //   label: "CRIB Details",
          //   content: (
          //     <div className="grid grid-cols-2 gap-12">
          //       <CribDetails />
          //       <CribDocumentView />
          //     </div>
          //   ),
          // },
          {
            label: "Crib Score",
            content: (
              <div className="grid grid-cols-2 gap-12">
                <CribScore cribScore={cribScoreInformation} />
              </div>
            ),
          },
        ]
      : []),

    {
      label: "Send to Cell",
      content: (
        <form onSubmit={handleSubmit(handleSendToCellChecklistSubmission)}>
          <SendToCell
            editable={true}
            sendToCellChecklist={sendToCellChecklist}
            setSendToCellChecklist={setSendToCellChecklist}
          />
          <div className="flex justify-end pt-12">
            <Button type="submit">
              <EdgeSvgIcon>feather:save</EdgeSvgIcon> Save & Next
            </Button>
          </div>
        </form>
      ),
    },
    {
      label: "Error Checks",
      content: (
        <form onSubmit={handleSubmit(handleErrorCommentSubmission)}>
          <div className="grid grid-cols-2 gap-9">
            <ErrorCommentBox formType="CASA" />
          </div>
          <div className="w-full pt-12 flex items-end justify-end">
            <Button
              className="flex flex-row gap-3 items-center justify-center"
              type="submit"
            >
              <EdgeSvgIcon>heroicons-outline:exclamation-circle</EdgeSvgIcon>
              Add Error Comment
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

      <div className="flex flex-col gap-12">
        <Ve3StepWizard
          selectStep={
            currentStep || steps.findIndex((step) => step.label === "Doc Check")
          }
          currentSteps={steps
            .slice(steps.findIndex((step) => step.label === "Doc Check"))
            .map(
              (_, index) =>
                steps.findIndex((step) => step.label === "Doc Check") + index
            )}
          completedSteps={Array.from(
            {
              length: steps.findIndex((step) => step.label === "Doc Check"),
            },
            (_, index) => index
          )}
          steps={steps}
        />
      </div>
    </FormProvider>
  );
};

export default BundleForm;
