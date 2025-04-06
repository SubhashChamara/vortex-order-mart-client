import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CreditCardInformation from "../components/CreditCardInformation/CreditCardInformation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button } from "@mui/material";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import dayjs, { Dayjs } from "dayjs";
import VerificationChecks from "../components/VerificationChecks/VerificationChecks";
import NonNationalChecks from "../components/NonNationalChecks/NonNationalChecks";
import SalesInfo from "../components/SalesInfo/SalesInfo";
// import FinalChecks from "../components/FinalChecks/FinalChecks";
import ALPLCheckpoints from "../components/ALPLCheckpoints/ALPLCheckpoints";
import ClientBasicInformation from "../components/ClientBasicInformation/ClientBasicInformation";
import CCCheckpoints from "../components/CCCheckpoints/CCCheckpoints";
import { DropDownItem } from "../../../core/types/DropDown";
import { Api } from "../../../../api/Api";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { CreditRequest } from "../@types/CreditRequest";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { toast } from "react-toastify";
import { CreditInformation } from "../@types/CreditInfromation";
import { formatCardNumber, formatCurrency } from "../@helpers/Common";
import { BundleClientRequest } from "../@types/BundleClientRequest";
import { BundleVerificationRequest } from "../@types/BundleVerificationRequest";
import { BundleSalesInfoRequest } from "../@types/BundleSalesInfoRequest";
import { DBRUser } from "../../../core/types/DBRUser";
import { getSchema } from "../schema/Schema";
import { ClientInformation } from "../@types/ClientInfromation";
import { VerificationInfromation } from "../@types/VerificationInfromation";
import { SalesInfromation } from "../@types/SalesInfromation";
import CribDetails from "../components/CribDetails/CribDetails";
import CribDocumentView from "../components/CribDocumentView/CribDocumentView";
import { BundleCribpullInfo } from "../@types/BundleCribpullInfo";
import { ChecklistInfo } from "../../../core/types/ChecklistInfo";
import { NicDetails } from "../../../core/types/NicDetails";

interface BundledFlowProps {
  task: TaskDetailInfo;
}

type FormType = {
  currentStep: number;

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
  customerDueDiligence: "EDD" | "SDD";
  isExistingCustomer: boolean;
  isAddressConfirmationDocProvided: boolean;
  scbAccountNumber: string;
  existingCardNumber: string;
  isApplicantAddressSameAsIdentification: boolean;
  isClearCopyOfNicDlPpProvided: boolean;
  isMothersMaidenNameMentioned: boolean;
  isCustomerAttestationAndOriginalSeenConfirmed: boolean;
  isResidenceTelephoneMatchingAddress: boolean;
  applicantAge: string | null;
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
};

const defaultValues: FormType = {
  currentStep: 0,

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
  applicantAge: null,
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
};

const BundleForm: React.FC<BundledFlowProps> = ({ task }) => {
  const [step, setStep] = useState<number>(0);

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

  const [cribPullInformation, setCribPullInformation] =
    useState<BundleCribpullInfo | null>(null);

  const [ccChecklist, setCCChecklist] = useState<ChecklistInfo[]>([]);

  const [alplChecklist, setALPLChecklist] = useState<ChecklistInfo[]>([]);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(getSchema(step)),
  });

  const { watch, handleSubmit, setValue, formState } = methods;

  const { errors } = formState;

  console.log("Form errors", errors);

  const isAlpl = watch("isALPL");
  const isCC = watch("isCC");
  const currentStep = watch("currentStep");
  const sourceType = watch("sourceType");

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

  // get credit information on load
  const getCreditInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCreditInformation(task.processInstanceId)
    );

    if (data !== null) {
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
      setSalesInformation(data);
    } else {
      console.log(err);
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

  // handle method -> credit information submission
  const handleCreditInformationSubmission = async (formData: FormType) => {
    const request: CreditRequest = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
      isCard: formData.isCC,
      cardTypeId: formData.creditCardType && formData.creditCardType.id,
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
      setStep(1);
    } else {
      toast.error(err.msg);
    }
  };

  // handle method --> client information submission
  const handleClientInformationSubmission = async (formData: FormType) => {
    const request: BundleClientRequest = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
      customerSourceTypeId: formData.sourceType && formData.sourceType.id,
      // cardTypeId: formData.creditCardType && formData.creditCardType.id,
      title: formData.applicantTitle && formData.applicantTitle.id.toString(),
      applicantName: formData.applicantFirstName && formData.applicantFirstName,
      applicantLastName:
        (formData.applicantLastName && formData.applicantLastName) || null,
      applicantNIC: formData.applicantNic === "" ? null : formData.applicantNic,
      applicantNewNIC:
        formData.applicantEic === "" ? null : formData.applicantEic,
      applicantPassport:
        formData.applicantPassportNumber === ""
          ? null
          : formData.applicantPassportNumber,
      dob: formData.applicantDateOfBirth
        ? dayjs(formData.applicantDateOfBirth).format("YYYY-MM-DD")
        : null,
      age: formData.applicantAge ? formData.applicantAge : null,
      resAddress1:
        formData.applicantResAddress1 === ""
          ? null
          : formData.applicantResAddress1,
      resAddress2:
        formData.applicantResAddress2 === ""
          ? null
          : formData.applicantResAddress2,
      resAddress3:
        formData.applicantResAddress3 === ""
          ? null
          : formData.applicantResAddress3,
      resAddress4:
        formData.applicantResAddressCity === ""
          ? null
          : formData.applicantResAddressCity,
      teleResident:
        formData.residentialTelephoneNumber === ""
          ? null
          : formData.residentialTelephoneNumber,
      teleMobile: formData.mobileNumber === "" ? null : formData.mobileNumber,
      teleEmp:
        formData.companyTelephone === "" ? null : formData.companyTelephone,
      email: formData.email,
      requestedDateTime: dayjs(formData.applicationDate).format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
      companyId: formData.companyName ? formData.companyName.id : null,
      companyAddressNo:
        formData.companyAddressNo === "" ? null : formData.companyAddressNo,
      companyAddress1:
        formData.companyAddressStreet1 === ""
          ? null
          : formData.companyAddressStreet1,
      companyAddress2:
        formData.companyAddressStreet2 === ""
          ? null
          : formData.companyAddressStreet2,
      companyAddressArea:
        formData.companyAddressCity === "" ? null : formData.companyAddressCity,
      companyTelephone:
        formData.companyTelephone === "" ? null : formData.companyTelephone,
      basicSalary: parseFloat(
        (formData.basicSalary || "").replace(/[^0-9.]/g, "")
      ),
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveBundleClientInformation(request)
    );

    if (!err) {
      toast.success("Client information saved successfully");
      setStep(2);
    } else {
      toast.error(err.msg);
    }
  };

  // handle method --> verification information submission
  const handleVerificationInformationSubmission = async (
    formData: FormType
  ) => {
    const request: BundleVerificationRequest = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
      refereeName: formData.refereeName === "" ? null : formData.refereeName,
      refereeTeleRes:
        formData.refereeTelephone === "" ? null : formData.refereeTelephone,
      refereeTeleMobile:
        formData.refereeMobile === "" ? null : formData.refereeMobile,
      customerDueDiligence: formData.customerDueDiligence,
      addressConfirmation: formData.isAddressConfirmationDocProvided,
      scbAC:
        formData.scbAccountNumber === "" ? null : formData.scbAccountNumber,
      existingCard:
        formData.existingCardNumber === ""
          ? null
          : formData.existingCardNumber.replace(/\s+/g, ""),
      clearCopyOfID: formData.isClearCopyOfNicDlPpProvided,
      mothersMaidenName: formData.isMothersMaidenNameMentioned,
      customerAttestation:
        formData.isCustomerAttestationAndOriginalSeenConfirmed,
      age: formData.applicantAge
        ? parseFloat(formData.applicantAge.toString())
        : null,
      signatureOnFivePanels: formData.isSignatureOnAllFivePanels,
      amendmentsSigned: formData.isAmendmentCounterSignedByApplicant,
      annualFee: formData.isAnnualFeeWaived,
      joiningFee: formData.isJoiningFeeWaived,
      nonNational: formData.isNonNational,
      minimumPerMonthSal: formData.hasMinimumMonthlySalary,
      departureLetter: formData.hasDepartureLetter,
      emailConfirmation: formData.hasEmailConfirmationTop5CorporateExecutive,
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveBundleVerificationInformation(request)
    );

    if (!err) {
      toast.success("Verification steps saved");
      setStep(3);
    } else {
      toast.error(err.msg);
    }
  };

  // handle method --> Sales Information Submission
  const handleSalesInformationSubmission = async (formData: FormType) => {
    const request: BundleSalesInfoRequest = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
      groupSale: formData.isGroupSale,
      groupReference:
        formData.groupReference === "" ? null : formData.groupReference,
      nameOfSalesAgent:
        formData.salesAgentOrPfcName === ""
          ? null
          : formData.salesAgentOrPfcName,
      dsrUserId: formData.staffCode && formData.staffCode.id.toString(),
      teamLeaderId:
        formData.bdmOrManagerName && formData.bdmOrManagerName.id.toString(),
      branchId: formData.branch && formData.branch.id,
      salesComments:
        formData.salesComments === "" ? null : formData.salesComments,
      armNumber: formData.armCode,
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveBundledSalesInformation(request)
    );

    if (!err) {
      toast.success("Sales information saved");
      if (isAlpl || isCC) {
        setStep(4);
      }
    } else {
      toast.error(err.msg);
    }
  };

  // handle method --> crib pull request
  const handleCribPullRequest = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.requestCribPull(task.processInstanceId, task.taskInstance)
    );

    if (!err) {
      toast.success("Crib pull document requested.");
      getCribpullInformation();
    } else {
      toast.error(err.msg);
    }
  };

  // handle method --> CC Checklist save
  const handleCCChecklistSave = async () => {
    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveBundleChecklist(
        ccChecklist,
        task.processInstanceId,
        task.taskInstance
      )
    );

    if (!err) {
      toast.success("CC Checklist saved successfully");
      setStep(5);
    } else {
      toast.error(err.msg);
    }
  };

  // handle method --> ALPL Checklist save
  const handleALPLChecklistSave = async () => {
    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveBundleChecklist(
        alplChecklist,
        task.processInstanceId,
        task.taskInstance
      )
    );

    if (!err) {
      toast.success("ALPL checklist saved");
      setStep(steps.findIndex((step) => step.label === "ALPL Checkpoints") + 1);
    }
  };

  const calculateAge = (dob: Dayjs | null): string => {
    if (!dob) return "";
    const today = dayjs();
    const birthDate = dayjs(dob);
    const age = today.diff(birthDate, "year");
    return age.toString();
  };

  const fetchNICData = async (nic: string) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getNicDetails(nic)
    );
    if (data) {
      // setValue("applicantEic", data?.eic || "");
      setValue("applicantDateOfBirth", data?.birthDay?.toString().slice(0, 10));
      const age = calculateAge(
        dayjs(data?.birthDay?.toString().slice(0, 10)).toDate()
      );
      setValue("applicantAge", age);
    }
  };

  const fetchEICData = async (nic: string) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getNicDetails(nic)
    );
    if (data) {
      setValue("applicantDateOfBirth", data?.birthDay?.toString().slice(0, 10));
      const age = calculateAge(
        dayjs(data?.birthDay?.toString().slice(0, 10)).toDate()
      );
      setValue("applicantAge", age);
    }
  };

  /**
   * ---- USE EFFECTS ----
   */

  useEffect(() => {
    setStep(currentStep);
  }, [currentStep]);

  const nic = watch("applicantNic");
  const eic = watch("applicantEic");

  useEffect(() => {
    const regex = /^\d{9}[VvXx]$/;
    if (nic && regex.test(nic)) {
      fetchNICData(nic);
    }
  }, [nic]);

  useEffect(() => {
    const regex = /^\d{12}$/;
    if (eic && regex.test(eic)) {
      fetchEICData(eic);
    }
  }, [eic]);

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
      setValue("applicantAge", verificationInformation.age?.toString() || null);

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

  const steps = [
    {
      label: "Client Request",
      content: (
        <form onSubmit={handleSubmit(handleCreditInformationSubmission)}>
          <CreditCardInformation
            editable={true}
            cardTypeDropdowns={cardTypeDropdowns}
          />
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
      ),
    },
    {
      label: "Client Information",
      content: (
        <form
          onSubmit={handleSubmit(handleClientInformationSubmission)}
          noValidate
        >
          <ClientBasicInformation
            editable={true}
            sourceTypeDropdowns={sourceTypeDropdowns}
            cardTypeDropdowns={cardTypeDropdowns}
            titleTypeDropdowns={titleTypeDropdowns}
            companyDropdowns={companyDropdowns}
          />
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
      ),
    },
    {
      label: "Verification Steps",
      content: (
        <form onSubmit={handleSubmit(handleVerificationInformationSubmission)}>
          <div className="flex flex-col gap-9">
            <VerificationChecks editable={true} />
            <NonNationalChecks editable={true} />
          </div>
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
      ),
    },
    {
      label: "Sales Info",
      content: (
        <form onSubmit={handleSubmit(handleSalesInformationSubmission)}>
          <SalesInfo
            editable={true}
            dbrUserDropdowns={dbrUserDropdowns}
            branchManagersDropdowns={branchManagersDropdowns}
            branchDropdowns={branchDropdowns}
          />
          <div className="w-full pt-12 flex items-end justify-end">
            <Button
              className="flex flex-row gap-3 items-center justify-center"
              type="submit"
            >
              <EdgeSvgIcon>feather:save</EdgeSvgIcon>
              {isAlpl || isCC ? "Save & Next" : "Save"}
            </Button>
          </div>
        </form>
      ),
    },
    ...(isAlpl
      ? [
          {
            label: "ALPL Checkpoints",
            content: (
              <div className="flex flex-col gap-12">
                <ALPLCheckpoints
                  alplChecklist={alplChecklist}
                  setALPLChecklist={setALPLChecklist}
                  salesEditable={true}
                />

                <div className="flex justify-end">
                  <Button onClick={handleALPLChecklistSave}>
                    <EdgeSvgIcon className="mr-3">feather:save</EdgeSvgIcon>Save
                    & Next
                  </Button>
                </div>
              </div>
            ),
          },
        ]
      : []),
    ...(isCC
      ? [
          {
            label: "CC Checkpoints",
            content: (
              <div className="flex flex-col gap-12">
                <CCCheckpoints
                  ccChecklist={ccChecklist}
                  editable={true}
                  setCCChecklist={setCCChecklist}
                />
                <div className="flex justify-end">
                  <Button onClick={handleCCChecklistSave}>
                    <EdgeSvgIcon className="mr-3">feather:save</EdgeSvgIcon>{" "}
                    Save & Next
                  </Button>
                </div>
              </div>
            ),
          },
        ]
      : []),
    ...(isAlpl || isCC
      ? [
          {
            label: "CRIB Details",
            content: (
              <div className="grid grid-cols-2 gap-12">
                <CribDetails cribPullInformation={cribPullInformation} />
                <CribDocumentView
                  nicPath={cribPullInformation?.nicPDFCribDocPath}
                  eicPath={cribPullInformation?.eicPDFCribDocIdPath}
                  ppPath={cribPullInformation?.passportPDFCribDocIdPath}
                  onButtonClick={handleCribPullRequest}
                />
                {/* 
                  <div className="col-span-2 flex justify-end">
                    <Button onClick={handleCribPullRequest}>
                      <EdgeSvgIcon>material-outline:request_quote</EdgeSvgIcon>{" "}
                      CRIB Pull
                    </Button>
                  </div> */}
              </div>
            ),
          },
        ]
      : []),
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
        selectStep={step}
        currentSteps={[0, 1, 2, 3, 4, 5, 6]}
        //   completedSteps={[0, 1, 2]}
        steps={steps}
      />
    </FormProvider>
  );
};

export default BundleForm;
