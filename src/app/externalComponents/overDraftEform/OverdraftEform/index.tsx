import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import { DropDownItem } from "../../../core/types/DropDown";
import dayjs, { Dayjs } from "dayjs";
// import PersonalAndContactForm from "./components/PersonalAndContactFormPrimary/PersonalAndContactFormPrimary";
// import ResidentialAndProfessionalForm from "./components/ResidentialAndProfessionalFormPrimary/ResidentialAndProfessionalFormPrimary";
import FacilityDetails from "./components/FacilityDetails/FacilityDetails";
import OverDraftFacility from "./components/OverDraftFacility/OverDraftFacility";
import TermLoanFacility from "./components/TermLoanFacility/TermLoanFacility";
import LienDetailsForm from "./components/LienDetails/LienDetailsForm";
import { Button } from "@mui/material";
import JointCustomerTable from "./components/JointCustomerTable/JointCustomerTable";
import { Api } from "../../../../api/Api";
import { odRequest } from "./@types/odRequest";
import { odInfo } from "./@types/odInfo";
import { toast } from "react-toastify";
import { odFacilityRequest } from "./@types/odFacilityRequest";
import { odCollateralRequest } from "./@types/odCollateralRequest";
import { odCollateralInfo } from "./@types/odCollateralInfo";
import { odProcessInfo } from "./@types/odProcessInfo";
import PersonalAndContactFormPrimary from "./components/PersonalAndContactFormPrimary/PersonalAndContactFormPrimary";
import ResidentialAndProfessionalFormPrimary from "./components/ResidentialAndProfessionalFormPrimary/ResidentialAndProfessionalFormPrimary";
import PersonalAndContactFormJoint from "./components/PersonalAndContactFormJoint/PersonalAndContactFormJoint";
import ResidentialAndProfessionalFormJoint from "./components/ResidentialAndProfessionalFormJoint/ResidentialAndProfessionalFormJoint";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { tlFacilityRequest } from "./@types/tlFacilityRequest";
import { EFormInfo } from "./@types/eFormInfo";
import { mainSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCurrency } from "../../../workflow/bundle/@helpers/Common";
import { getFormSchema } from "./schema/schema";
// import { getFormSchema } from "./schema/Schema";

type FormType = {
  currentStep: number;
  /**Primary Customer details Form step 1 */

  applicationType: DropDownItem | null;
  termLoanType: DropDownItem | null;
  overDraftType: DropDownItem | null;

  // primary
  primaryTitle: DropDownItem | null;
  primaryName: string;
  primaryEmail: string;
  primaryOccupation: string;
  primaryMobile: string;
  primaryResTelNo: string;
  primaryNicPP: string;
  primaryDob: Dayjs | null;
  primaryResAddress1: string;
  primaryResAddress2: string;
  primaryResAddress3: string;
  primaryMonthlyIncome: string;
  primaryResStatus: string;
  primaryMasterNumber: string;
  primaryNationality: string;

  /**Joint Customer details Form step 2 */

  // joint
  jointTitle: DropDownItem | null;
  jointName: string;
  jointEmail: string;
  jointOccupation: string;
  jointMobile: string;
  jointResTelNo: string;
  jointNicPP: string;
  jointDob: Dayjs | null;
  jointResAddress1: string;
  jointResAddress2: string;
  jointResAddress3: string;
  jointMonthlyIncome: string;
  jointResStatus: string;
  jointNationality: string;
  jointMasterNumber: string;
  jointRelationshipWithPrimary: string;

  /**Facility & Collateral details Form step 3 */

  // Facility & Collateral
  date: Dayjs | null;
  customerMaster: string;
  branch: DropDownItem | null;
  armCode: string;
  segmentCode: string;

  // od facility details
  isRenewAnnually: boolean | null;
  odFacilityAccount: string;
  odFacilityCurrency: DropDownItem | null;
  odFacilityExpDate: Dayjs | null;
  odFacilityInterestRate: string;
  odFacilityExcessRate: string;
  odFacilityRequiredAmountFigs: string;
  odFacilityRequiredAmountWords: string;
  odFacilityPurpose: string;

  // tl facility details
  tlFacilityAccount: string;
  tlFacilityCurrency: DropDownItem | null;
  tlFacilityInterestRate: string;
  tlFacilityRepayPeriod: DropDownItem | null;
  tlFacilityRepayPeriodOther: string;
  tlFacilityRepayAccount: string;
  tlFacilityRepayCurrency: DropDownItem | null;
  tlFacilityRequiredAmountFigs: string;
  tlFacilityRequiredAmountWords: string;
  tlFacilityExpDate: Dayjs | null;
  tlFacilityCreditAccount: string;
  tlFacilityCreditingCurrency: DropDownItem | null;
  tlFacilityPurpose: string;

  /**Lien details Form step 4 */

  // lien account
  lienAccountNumber: string;
  lienAccountCurrency: DropDownItem | null;
  lienAccountName: string;
  lienAccountInterest: string;
  lienAccountMatureDate: Dayjs | null;
  lienAccountBalance: string;
  lienAccountAmount: string;
  lienAccountApplicableLtv: string;
};

const defaultValues: FormType = {
  currentStep: 0,

  primaryName: "",
  termLoanType: null,
  applicationType: null,
  overDraftType: null,
  primaryTitle: null,
  primaryEmail: "",
  primaryOccupation: "",
  primaryMobile: "",
  primaryResTelNo: "",
  primaryNicPP: "",
  primaryDob: null,
  primaryResAddress1: "",
  primaryResAddress2: "",
  primaryResAddress3: "",
  primaryMonthlyIncome: "",
  primaryResStatus: "",
  primaryMasterNumber: "",
  primaryNationality: "",
  jointTitle: null,
  jointName: "",
  jointEmail: "",
  jointOccupation: "",
  jointMobile: "",
  jointResTelNo: "",
  jointNicPP: "",
  jointDob: null,
  jointResAddress1: "",
  jointResAddress2: "",
  jointResAddress3: "",
  jointMonthlyIncome: "",
  jointResStatus: "",
  jointNationality: "",
  jointMasterNumber: "",
  jointRelationshipWithPrimary: "",
  date: null,
  customerMaster: "",
  branch: null,
  armCode: "",
  segmentCode: "",
  // od facility
  isRenewAnnually: null,
  odFacilityAccount: "",
  odFacilityCurrency: null,
  odFacilityExpDate: null,
  odFacilityInterestRate: "",
  odFacilityExcessRate: "",
  odFacilityRequiredAmountFigs: "",
  odFacilityRequiredAmountWords: "",
  odFacilityPurpose: "",

  // tl facility
  tlFacilityAccount: "",
  tlFacilityCurrency: null,
  tlFacilityInterestRate: "",
  tlFacilityRepayPeriod: null,
  tlFacilityRepayAccount: "",
  tlFacilityRepayCurrency: null,
  tlFacilityRequiredAmountFigs: "",
  tlFacilityRequiredAmountWords: "",
  tlFacilityExpDate: null,
  tlFacilityCreditAccount: "",
  tlFacilityCreditingCurrency: null,
  tlFacilityPurpose: "",

  // lien details
  lienAccountNumber: "",
  lienAccountCurrency: null,
  lienAccountName: "",
  lienAccountInterest: "",
  lienAccountMatureDate: null,
  lienAccountBalance: "",
  lienAccountAmount: "",
  lienAccountApplicableLtv: "",
  tlFacilityRepayPeriodOther: "",
};

const OverDraftEForm: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [odProcessInfo, setOdProcessInfo] = useState<odProcessInfo | null>(
    null
  );
  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: zodResolver(
      getFormSchema(step, odProcessInfo ? odProcessInfo.facilityType : "")
    ),
  });

  const { handleSubmit, setValue, watch, resetField, reset, formState } =
    methods;

  const { errors } = formState;

  console.log("Errors", errors);

  const currentStep = watch("currentStep");
  const applicationType = watch("applicationType");
  const overDraftType = watch("overDraftType");
  const termLoanType = watch("termLoanType");

  const [applicationTypeDropdowns, setApplicationTypeDropdowns] = useState<
    DropDownItem[]
  >([]);
  const [termLoanTypeDropdowns, setTermLoanTypeDropdowns] = useState<
    DropDownItem[]
  >([]);
  const [overDraftTypeDropdowns, setOverDraftTypeDropdowns] = useState<
    DropDownItem[]
  >([]);
  const [titleDropdowns, setTitleDropdowns] = useState<DropDownItem[]>([]);
  const [branchDropdowns, setBranchDropdowns] = useState<DropDownItem[]>([]);
  const [currencyDropdowns, setCurrencyDropdowns] = useState<DropDownItem[]>(
    []
  );
  const [repaymentTypeDropdowns, setRepaymentTypeDropdowns] = useState<
    DropDownItem[]
  >([]);
  const [primaryUser, setPrimaryUser] = useState<odInfo | null>(null);
  const [eFormData, setEformData] = useState<EFormInfo | null>(null);
  const [jointCustomers, setJointCustomers] = useState<odInfo[]>([]);
  const [selectedJointCustomerToEdit, setSelectedJointCustomerToEdit] =
    useState<odInfo | null>(null);
  const [collateralTableData, setCollateralTableData] = useState<
    odCollateralInfo[]
  >([]);

  const [triggerJointCustomersTable, setTriggerJointCustomersTable] =
    useState<boolean>(false);
  const [triggerLienTable, setTriggerLienTable] = useState<boolean>(false);

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  // Common method for fetching dropdown data
  const getDropdownData = async (
    dropdownType: string,
    setState: React.Dispatch<React.SetStateAction<DropDownItem[]>>
  ) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getOverDraftDropdownData(dropdownType)
    );

    if (data !== null) {
      setState(data);
    } else {
      console.log(err);
    }
  };

  // get primary customer details
  const getPrimaryCustomerData = async () => {
    const primaryProcessCred = localStorage.getItem("odProcessCred");
    const primaryProcessId = primaryProcessCred
      ? JSON.parse(primaryProcessCred).id
      : null;

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getPrimaryCustomerDetails(primaryProcessId)
    );
    if (data !== null) {
      setPrimaryUser(data);
    } else {
      console.log(err);
    }
  };

  // get joint customer details
  const getJointCustomerData = async () => {
    const primaryProcessCred = localStorage.getItem("odProcessCred");
    const primaryProcessId = primaryProcessCred
      ? JSON.parse(primaryProcessCred).id
      : null;

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getSavedJointCustomers(primaryProcessId)
    );

    if (data !== null) {
      setJointCustomers(data);
    } else {
      console.log(err);
    }
  };

  // get collateral details
  const getCollateralTableData = async () => {
    const primaryProcessCred = localStorage.getItem("odProcessCred");
    const primaryProcessId = primaryProcessCred
      ? JSON.parse(primaryProcessCred).id
      : null;

    if (primaryProcessId) {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCollateralDetails(primaryProcessId)
      );

      if (data !== null) {
        setCollateralTableData(data);
      } else {
        console.log(err?.msg);
      }
    }
  };

  const getEformData = async () => {
    const primaryProcessCred = localStorage.getItem("odProcessCred");
    const primaryProcessId = primaryProcessCred
      ? JSON.parse(primaryProcessCred).id
      : null;

    if (primaryProcessId) {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getEformData(primaryProcessId)
      );
      if (data !== null) {
        setEformData(data);
      } else {
        console.log(err);
      }
    }
  };

  const handlePrimaryCustomerSubmission = async (formData: FormType) => {
    const primaryProcessCred = localStorage.getItem("odProcessCred");
    const primaryProcessId = primaryProcessCred
      ? JSON.parse(primaryProcessCred).id
      : null;
    const request: odRequest = {
      id: primaryUser ? primaryUser.id : null,
      title: formData.primaryTitle ? formData.primaryTitle?.id.toString() : "",
      name: formData.primaryName,
      email: formData.primaryEmail,
      occupation: formData.primaryOccupation,
      mobileNo: formData.primaryMobile,
      resTel: formData.primaryResTelNo === "" ? null : formData.primaryResTelNo,
      nic: formData.primaryNicPP,
      dob: formData.primaryDob
        ? dayjs(formData.primaryDob).format("YYYY-MM-DD")
        : "",
      resAdd1:
        formData.primaryResAddress1 === "" ? null : formData.primaryResAddress1,
      resAdd2:
        formData.primaryResAddress2 === "" ? null : formData.primaryResAddress2,
      resAdd3:
        formData.primaryResAddress3 === "" ? null : formData.primaryResAddress3,
      income: formData.primaryMonthlyIncome
        ? parseFloat(formData.primaryMonthlyIncome.replace(/[^0-9.]/g, ""))
        : 0,
      resStatus:
        formData.primaryResStatus === "" ? null : formData.primaryResStatus,
      masterNo:
        formData.primaryMasterNumber === ""
          ? null
          : formData.primaryMasterNumber,
      nationality:
        formData.primaryNationality === "" ? null : formData.primaryNationality,
      overDraftProcess: {
        id: primaryProcessId ? primaryProcessId : null,
        facilityType: formData.applicationType
          ? formData.applicationType?.id.toString()
          : "",
        overDraftFacilityType:
          formData.applicationType?.id.toString() == "OVER_DRAFT"
            ? formData.overDraftType?.id.toString()
            : null,
        termLoanFacilityType:
          formData.applicationType?.id.toString() == "TERM_LOAN"
            ? formData.termLoanType?.id.toString()
            : null,
      },
    };

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.saveOverdraftPrimaryCustomer(request)
    );
    if (data !== null) {
      setOdProcessInfo(data);
      localStorage.setItem("odProcessCred", JSON.stringify(data));
    }
    if (!err) {
      toast.success("Primary customer added successfully");
      if (isMoreThanOneApplicant() === true) {
        setValue("currentStep", 1);
      } else {
        setValue("currentStep", 2);
      }
    } else {
      toast.error(err.msg);
    }
  };

  const handleJointCustomerSubmission = async (formData: FormType) => {
    const request: odRequest = {
      id: selectedJointCustomerToEdit ? selectedJointCustomerToEdit.id : null,
      title: formData.jointTitle ? formData.jointTitle?.id.toString() : "",
      name: formData.jointName,
      email: formData.jointEmail,
      occupation:
        formData.jointOccupation === "" ? null : formData.jointOccupation,
      mobileNo: formData.jointMobile,
      resTel: formData.jointResTelNo === "" ? null : formData.jointResTelNo,
      nic: formData.jointNicPP,
      dob: formData.jointDob
        ? dayjs(formData.jointDob).format("YYYY-MM-DD")
        : "",
      resAdd1:
        formData.jointResAddress1 === "" ? null : formData.jointResAddress1,
      resAdd2:
        formData.jointResAddress2 === "" ? null : formData.jointResAddress2,
      resAdd3:
        formData.jointResAddress3 === "" ? null : formData.jointResAddress3,
      income:
        formData.jointMonthlyIncome === ""
          ? null
          : parseFloat(formData.jointMonthlyIncome.replace(/[^0-9.]/g, "")),
      resStatus:
        formData.jointResStatus === "" ? null : formData.jointResStatus,
      masterNo:
        formData.jointMasterNumber === "" ? null : formData.jointMasterNumber,
      nationality:
        formData.jointNationality === "" ? null : formData.jointNationality,
      relPrimaryApplicant:
        formData.jointRelationshipWithPrimary === ""
          ? null
          : formData.jointRelationshipWithPrimary,
    };

    const odProcessCred = localStorage.getItem("odProcessCred");
    const OdProcessId = odProcessCred ? JSON.parse(odProcessCred).id : null;

    if (selectedJointCustomerToEdit !== null) {
      const { err } = await Api.performRequest((r) =>
        r.creditCard.updateOverdraftJointCustomer(request)
      );

      if (!err) {
        toast.success("Joint Customer Updated Successfully");
        setSelectedJointCustomerToEdit(null);
      } else {
        toast.error(err.msg);
      }
    } else {
      const { err } = await Api.performRequest((r) =>
        r.creditCard.saveOverdraftJointCustomer(request, OdProcessId)
      );
      if (!err) {
        toast.success("Joint Customer Saved Successfully");
      } else {
        toast.error(err.msg);
      }
    }
    setTriggerJointCustomersTable(!triggerJointCustomersTable);
    setSelectedJointCustomerToEdit(null);
    resetJointCustomerFields();
  };

  const handleCollateralDetailsSubmission = async (formData: FormType) => {
    const odProcessCred = localStorage.getItem("odProcessCred");
    const odProcessId = odProcessCred ? JSON.parse(odProcessCred).id : null;

    const requestOverDraft: odFacilityRequest = {
      id: odProcessId,
      facilityDate: dayjs(formData.date).format("YYYY-MM-DD"),
      customerMaster:
        formData.customerMaster === "" ? null : formData.customerMaster,
      branchId: formData.branch ? formData.branch?.id : 1,
      armCode: formData.armCode === "" ? null : formData.armCode,
      segmentCode: formData.segmentCode === "" ? null : formData.segmentCode,

      odAnnuallyRenew: formData.isRenewAnnually
        ? formData.isRenewAnnually.toString() == "true"
          ? true
          : false
        : null,
      odAccount: formData.odFacilityAccount,
      currencyId: formData.odFacilityCurrency
        ? formData.odFacilityCurrency?.id
        : null,
      odExDate: formData.odFacilityExpDate
        ? dayjs(formData.odFacilityExpDate).format("YYYY-MM-DD")
        : null,
      odRateInt: formData.odFacilityInterestRate
        ? parseFloat(formData.odFacilityInterestRate)
        : null,
      odStandardRateInt: formData.odFacilityExcessRate
        ? parseFloat(formData.odFacilityExcessRate)
        : null,
      odReqAmount: formData.odFacilityRequiredAmountFigs
        ? parseFloat(
            formData.odFacilityRequiredAmountFigs.replace(/[^0-9.]/g, "")
          )
        : null,
      odReqAmountInWords:
        formData.odFacilityRequiredAmountWords === ""
          ? null
          : formData.odFacilityRequiredAmountWords,
      odPurpose:
        formData.odFacilityPurpose === "" ? null : formData.odFacilityPurpose,
    };

    const requestTermLoan: tlFacilityRequest = {
      id: odProcessId,
      facilityDate: dayjs(formData.date).format("YYYY-MM-DD"),
      customerMaster:
        formData.customerMaster === "" ? null : formData.customerMaster,
      branchId: formData.branch ? formData.branch?.id : 1,
      armCode: formData.armCode === "" ? null : formData.armCode,
      segmentCode: formData.segmentCode === "" ? null : formData.segmentCode,

      tlAccount: formData.tlFacilityAccount,
      tlCurrency: formData.tlFacilityCurrency
        ? formData.tlFacilityCurrency?.id
        : null,
      tlRateInt:
        formData.tlFacilityInterestRate === ""
          ? null
          : parseFloat(formData.tlFacilityInterestRate),
      repaymentPeriod: formData.tlFacilityRepayPeriod
        ? formData.tlFacilityRepayPeriod?.id.toString()
        : null,
      repaymentPeriodOther:
        formData.tlFacilityRepayPeriod?.id.toString() == "OTHER"
          ? formData.tlFacilityRepayPeriodOther
          : null,
      repaymentAcc:
        formData.tlFacilityRepayAccount === ""
          ? null
          : formData.tlFacilityRepayAccount,
      tlReqCurrencyId: formData.tlFacilityRepayCurrency
        ? formData.tlFacilityRepayCurrency?.id
        : null,
      tlReqAmount:
        formData.tlFacilityRequiredAmountFigs === ""
          ? null
          : formData.tlFacilityRequiredAmountFigs
          ? parseInt(
              formData.tlFacilityRequiredAmountFigs.replace(/[^0-9.]/g, "")
            )
          : null,
      tlReqAmountWords:
        formData.tlFacilityRequiredAmountWords === ""
          ? null
          : formData.tlFacilityRequiredAmountWords,
      tlExDate: formData.tlFacilityExpDate
        ? dayjs(formData.tlFacilityExpDate).format("YYYY-MM-DD")
        : null,
      tlCreditAcc:
        formData.tlFacilityCreditAccount === ""
          ? null
          : formData.tlFacilityCreditAccount,
      tlCreditCurrencyId: formData.tlFacilityCreditingCurrency
        ? formData.tlFacilityCreditingCurrency?.id
        : null,
      tlPurpose:
        formData.tlFacilityPurpose === "" ? null : formData.tlFacilityPurpose,
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveFacilityDetails(
        isOverdraftApplication() ? requestOverDraft : requestTermLoan,
        odProcessId
      )
    );

    if (!err) {
      toast.success("Facility details added successfully");
      setValue("currentStep", 3);
    } else {
      toast.error(err.msg);
    }
  };

  const handleLienDetailsSubmission = async (formData: FormType) => {
    const odProcessCred = localStorage.getItem("odProcessCred");
    const odProcessId = odProcessCred ? JSON.parse(odProcessCred).id : null;

    const request: odCollateralRequest = {
      accountNo: formData.lienAccountNumber,
      currencyId: formData.lienAccountCurrency
        ? formData.lienAccountCurrency?.id
        : null,
      name: formData.lienAccountName === "" ? null : formData.lienAccountName,
      interest:
        formData.lienAccountInterest === ""
          ? null
          : parseFloat(formData.lienAccountInterest),
      maturityDate: formData.lienAccountMatureDate
        ? dayjs(formData.lienAccountMatureDate).format("YYYY-MM-DD")
        : null,
      currentBalance:
        formData.lienAccountBalance === ""
          ? null
          : parseFloat(formData.lienAccountBalance),
      lienAmount: parseFloat(
        formData.lienAccountAmount.replace(/[^0-9.]/g, "")
      ),
      applicableLTV: parseFloat(formData.lienAccountApplicableLtv),
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveCollateralDetails(request, odProcessId)
    );

    if (!err) {
      toast.success("Collateral details added successfully");
      resetLienFields();
    } else {
      toast.error(err.msg);
    }
    setTriggerLienTable(!triggerLienTable);
  };

  const handleFormComplete = async () => {
    const odProcessCred = localStorage.getItem("odProcessCred");
    const odProcessId = odProcessCred ? JSON.parse(odProcessCred).id : null;

    const { err } = await Api.performRequest((r) =>
      r.creditCard.completeEForm(odProcessId)
    );

    if (!err) {
      toast.success("E-Form submitted successfully");
      localStorage.removeItem("odProcessCred");
      setCollateralTableData([]);
      setJointCustomers([]);
      reset();
    } else {
      toast.error(err.msg);
    }
  };
  /**
   *  ---- USE EFFECTS ----
   */

  useEffect(() => {
    setStep(currentStep);
  }, [currentStep]);

  // initially loading the dropdown masters
  useEffect(() => {
    getDropdownData("application-type", setApplicationTypeDropdowns);
    getDropdownData("term-loan-type", setTermLoanTypeDropdowns);
    getDropdownData("over-draft-type", setOverDraftTypeDropdowns);
    getDropdownData("title", setTitleDropdowns);
    getDropdownData("branch", setBranchDropdowns);
    getDropdownData("currency", setCurrencyDropdowns);
    getDropdownData("re-payment-type", setRepaymentTypeDropdowns);

    // data on reload
  }, []);

  // Handle joint table edit button click
  useEffect(() => {
    if (selectedJointCustomerToEdit) {
      const matchingTitle = titleDropdowns.find(
        (item) => item.id.toString() === selectedJointCustomerToEdit.title
      );
      // setValue("jointTitle", selectedJointCustomerToEdit.title);
      setValue("jointTitle", matchingTitle ? matchingTitle : null);
      setValue("jointName", selectedJointCustomerToEdit.name || "");
      setValue("jointDob", dayjs(selectedJointCustomerToEdit.dob) || "");
      setValue("jointNicPP", selectedJointCustomerToEdit.nic || "");
      setValue(
        "jointNationality",
        selectedJointCustomerToEdit.nationality
          ? selectedJointCustomerToEdit.nationality
          : ""
      );
      setValue("jointEmail", selectedJointCustomerToEdit.email || "");
      setValue("jointMobile", selectedJointCustomerToEdit.mobileNo);
      setValue("jointResTelNo", selectedJointCustomerToEdit.resTel || "");
      setValue("jointOccupation", selectedJointCustomerToEdit.occupation || "");
      setValue("jointResAddress1", selectedJointCustomerToEdit.resAdd1 || "");
      setValue(
        "jointResAddress2",
        selectedJointCustomerToEdit.resAdd2
          ? selectedJointCustomerToEdit.resAdd2
          : ""
      );
      setValue(
        "jointResAddress3",
        selectedJointCustomerToEdit.resAdd3
          ? selectedJointCustomerToEdit.resAdd3
          : ""
      );
      setValue("jointResStatus", selectedJointCustomerToEdit.resStatus || "");
      setValue(
        "jointMonthlyIncome",
        formatCurrency(
          selectedJointCustomerToEdit.income
            ? formatCurrency(selectedJointCustomerToEdit.income.toString())
            : ""
        )
      );
      setValue("jointMasterNumber", selectedJointCustomerToEdit.masterNo || "");
      setValue(
        "jointRelationshipWithPrimary",
        selectedJointCustomerToEdit.relPrimaryApplicant
          ? selectedJointCustomerToEdit.relPrimaryApplicant
          : ""
      );
    }
  }, [selectedJointCustomerToEdit]);

  // trigger joint customers table
  useEffect(() => {
    getJointCustomerData();
  }, [triggerJointCustomersTable]);

  // trigger lien table data
  useEffect(() => {
    getCollateralTableData();
  }, [triggerLienTable]);

  useEffect(() => {
    if (odProcessInfo !== null) {
      getPrimaryCustomerData();
      getEformData();
    } else {
      const odProcessInfo = localStorage.getItem("odProcessCred");
      if (odProcessInfo) {
        setOdProcessInfo(JSON.parse(odProcessInfo));
      }
    }
  }, [odProcessInfo]);

  // set primary user if available
  useEffect(() => {
    if (odProcessInfo) {
      const matchingApplicationType = applicationTypeDropdowns.find(
        (item) => item.id.toString() === odProcessInfo.facilityType
      );
      setValue("applicationType", matchingApplicationType || null);

      if (matchingApplicationType?.id.toString() === "OVER_DRAFT") {
        const matchingOverdraftType = overDraftTypeDropdowns.find(
          (item) => item.id.toString() === odProcessInfo.overDraftFacilityType
        );
        setValue("overDraftType", matchingOverdraftType || null);
      } else {
        const matchingTermLoanType = termLoanTypeDropdowns.find(
          (item) => item.id.toString() === odProcessInfo.termLoanFacilityType
        );
        setValue("termLoanType", matchingTermLoanType || null);
      }
    }

    if (primaryUser) {
      const matchingTitle = titleDropdowns.find(
        (item) => item.id.toString() === primaryUser.title
      );
      setValue("primaryTitle", matchingTitle || null);
      primaryUser.name && setValue("primaryName", primaryUser.name || "");
      primaryUser.dob && setValue("primaryDob", dayjs(primaryUser.dob) || null);
      primaryUser.nic && setValue("primaryNicPP", primaryUser.nic || "");
      primaryUser.nationality &&
        setValue("primaryNationality", primaryUser.nationality || "");
      primaryUser.email && setValue("primaryEmail", primaryUser.email);
      primaryUser.mobileNo && setValue("primaryMobile", primaryUser.mobileNo);
      primaryUser.resTel &&
        setValue("primaryResTelNo", primaryUser.resTel || "");
      primaryUser.occupation &&
        setValue("primaryOccupation", primaryUser.occupation || "");
      primaryUser.resAdd1 &&
        setValue("primaryResAddress1", primaryUser.resAdd1);
      setValue("primaryResAddress2", primaryUser.resAdd2 || "");
      setValue("primaryResAddress3", primaryUser.resAdd3 || "");
      setValue("primaryResStatus", primaryUser.resStatus || "");
      setValue(
        "primaryMonthlyIncome",
        primaryUser.income ? formatCurrency(primaryUser.income.toString()) : ""
      );
      setValue("primaryMasterNumber", primaryUser.masterNo || "");
    }

    if (eFormData) {
      const matchingBranchId = branchDropdowns.find(
        (item) => item.id === eFormData.branchId
      );
      const odMatchingCurrency = currencyDropdowns.find(
        (item) => item.id === eFormData.currencyId
      );
      const tlMatchingCurrency = currencyDropdowns.find(
        (item) => item.id === eFormData.tlCurrencyId
      );
      const tlMatchingRepayPeriod = repaymentTypeDropdowns.find(
        (item) => item.id.toString() === eFormData.repaymentPeriod
      );
      const repayMatchingCurrency = currencyDropdowns.find(
        (item) => item.id === eFormData.tlReqCurrencyId
      );
      const creditMatchingCurrency = currencyDropdowns.find(
        (item) => item.id === eFormData.tlCreditCurrency
      );

      eFormData.facilityDate && setValue("date", dayjs(eFormData.facilityDate));
      eFormData.customerMaster &&
        setValue("customerMaster", eFormData.customerMaster);
      setValue("branch", matchingBranchId || null);
      eFormData.armCode && setValue("armCode", eFormData.armCode);
      eFormData.segmentCode && setValue("segmentCode", eFormData.segmentCode);
      setValue("isRenewAnnually", eFormData.odAnnuallyRenew || null);
      eFormData.odAccount && setValue("odFacilityAccount", eFormData.odAccount);
      setValue("odFacilityCurrency", odMatchingCurrency || null);
      eFormData.odExDate &&
        setValue("odFacilityExpDate", dayjs(eFormData.odExDate) || null);
      eFormData.odRateInt &&
        setValue(
          "odFacilityInterestRate",
          eFormData.odRateInt.toString() || ""
        );
      eFormData.odStandardRateInt &&
        setValue(
          "odFacilityExcessRate",
          eFormData.odStandardRateInt.toString() || ""
        );
      setValue(
        "odFacilityRequiredAmountFigs",
        eFormData.odReqAmount
          ? formatCurrency(eFormData.odReqAmount.toString())
          : ""
      );
      setValue(
        "odFacilityRequiredAmountWords",
        eFormData.odReqAmountInWords || ""
      );
      setValue("odFacilityPurpose", eFormData.odPurpose || "");

      eFormData.tlAccount && setValue("tlFacilityAccount", eFormData.tlAccount);
      setValue("tlFacilityCurrency", tlMatchingCurrency || null);
      eFormData.tlRateInt &&
        setValue("tlFacilityInterestRate", eFormData.tlRateInt.toString());
      setValue("tlFacilityRepayPeriod", tlMatchingRepayPeriod || null);
      setValue(
        "tlFacilityRepayPeriodOther",
        eFormData.repaymentPeriodOther || ""
      );
      eFormData.repaymentAcc &&
        setValue("tlFacilityRepayAccount", eFormData.repaymentAcc);
      setValue("tlFacilityRepayCurrency", repayMatchingCurrency || null);
      setValue(
        "tlFacilityRequiredAmountFigs",
        eFormData.tlReqAmount
          ? formatCurrency(eFormData.tlReqAmount.toString())
          : ""
      );
      setValue(
        "tlFacilityRequiredAmountWords",
        eFormData.tlReqAmountWords || ""
      );
      eFormData.tlCreditAcc &&
        setValue("tlFacilityCreditAccount", eFormData.tlCreditAcc || "");
      setValue("tlFacilityCreditingCurrency", creditMatchingCurrency || null);
      eFormData.tlExDate &&
        setValue("tlFacilityExpDate", dayjs(eFormData.tlExDate) || null);
      setValue("tlFacilityPurpose", eFormData.tlPurpose || "");
    }
  }, [
    odProcessInfo,
    primaryUser,
    eFormData,
    applicationTypeDropdowns,
    overDraftTypeDropdowns,
    termLoanTypeDropdowns,
    titleDropdowns,
    currencyDropdowns,
    branchDropdowns,
  ]);

  // Reset Fields
  const resetLienFields = () => {
    resetField("lienAccountNumber");
    resetField("lienAccountAmount");
    resetField("lienAccountCurrency");
    resetField("lienAccountName");
    resetField("lienAccountInterest");
    resetField("lienAccountMatureDate");
    resetField("lienAccountBalance");
    resetField("lienAccountApplicableLtv");
  };

  const resetJointCustomerFields = () => {
    resetField("jointTitle");
    resetField("jointName");
    resetField("jointEmail");
    resetField("jointOccupation");
    resetField("jointMobile");
    resetField("jointResTelNo");
    resetField("jointNicPP");
    resetField("jointDob");
    resetField("jointResAddress1");
    resetField("jointResAddress2");
    resetField("jointResAddress3");
    resetField("jointMonthlyIncome");
    resetField("jointResStatus");
    resetField("jointNationality");
    resetField("jointMasterNumber");
    resetField("jointRelationshipWithPrimary");
  };

  // form type checker
  const isMoreThanOneApplicant = () => {
    if (
      applicationType?.id.toString() === "OVER_DRAFT" &&
      overDraftType?.id.toString() === "OD_ONE_YEAR_JOINT"
    ) {
      return true;
    }

    if (
      applicationType?.id.toString() === "TERM_LOAN" &&
      (termLoanType?.id.toString() === "TL_ONE_YEAR_JOINT" ||
        termLoanType?.id.toString() === "TL_5_YEAR_JOINT")
    ) {
      return true;
    }

    return false;
  };

  // applicationTypeChecker
  const isOverdraftApplication = () => {
    if (applicationType?.id.toString() === "OVER_DRAFT") {
      return true;
    }
    return false;
  };

  const steps = [
    {
      label: "Customer Details (Primary)",
      content: (
        <form onSubmit={handleSubmit(handlePrimaryCustomerSubmission)}>
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-12">
              <PersonalAndContactFormPrimary
                userType="primary"
                applicationTypeDropdowns={applicationTypeDropdowns}
                termLoanTypeDropdowns={termLoanTypeDropdowns}
                overDraftTypeDropdowns={overDraftTypeDropdowns}
                titleDropdowns={titleDropdowns}
              />
              <ResidentialAndProfessionalFormPrimary userType="primary" />
            </div>
            <div className="flex justify-end items-end">
              <Button type="submit">
                Next <EdgeSvgIcon>feather:chevron-right</EdgeSvgIcon>
              </Button>
            </div>
          </div>
        </form>
      ),
    },
    {
      label: "Customer Details (Joint)",
      content: (
        <form onSubmit={handleSubmit(handleJointCustomerSubmission)}>
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-12">
              <PersonalAndContactFormJoint
                userType="joint"
                editable={isMoreThanOneApplicant()}
                applicationTypeDropdowns={applicationTypeDropdowns}
                termLoanTypeDropdowns={termLoanTypeDropdowns}
                overDraftTypeDropdowns={overDraftTypeDropdowns}
                titleDropdowns={titleDropdowns}
              />
              <ResidentialAndProfessionalFormJoint
                userType="joint"
                editable={isMoreThanOneApplicant()}
              />
            </div>
            <div className="flex justify-end items-end">
              <Button type="submit" disabled={!isMoreThanOneApplicant()}>
                {selectedJointCustomerToEdit !== null ? (
                  <div className="flex flex-row gap-3">
                    <EdgeSvgIcon>feather:edit</EdgeSvgIcon> Update Joint
                    Customer
                  </div>
                ) : (
                  <div className="flex flex-row gap-3">
                    <EdgeSvgIcon>feather:save</EdgeSvgIcon> Save Joint Customer
                  </div>
                )}
              </Button>
            </div>
            <div className="flex flex-col">
              <JointCustomerTable
                data={jointCustomers}
                setSelectedJointCustomerToEdit={setSelectedJointCustomerToEdit}
              />
            </div>
            <div className="flex gap-14 justify-end items-end">
              <Button
                onClick={() => setValue("currentStep", 0)}
                className="flex flex-row gap-3"
              >
                <EdgeSvgIcon>feather:chevron-left</EdgeSvgIcon> Previous
              </Button>
              <Button onClick={() => setValue("currentStep", 2)}>
                Next <EdgeSvgIcon>feather:chevron-right</EdgeSvgIcon>
              </Button>
            </div>
          </div>
        </form>
      ),
    },
    {
      label: "Facility & Collateral Details",
      content: (
        <form onSubmit={handleSubmit(handleCollateralDetailsSubmission)}>
          <div className="flex flex-col gap-14">
            <FacilityDetails branchDropdowns={branchDropdowns} />
            <div className="grid grid-cols-2 gap-14">
              <OverDraftFacility
                currencyDropdowns={currencyDropdowns}
                editable={isOverdraftApplication()}
              />
              <TermLoanFacility
                repaymentTypeDropdowns={repaymentTypeDropdowns}
                currencyDropdowns={currencyDropdowns}
                editable={!isOverdraftApplication()}
              />
            </div>
            <div className="flex gap-14 justify-end items-end">
              <Button
                onClick={() => setValue("currentStep", 1)}
                className="flex flex-row gap-3"
              >
                <EdgeSvgIcon>feather:chevron-left</EdgeSvgIcon> Previous
              </Button>
              <Button type="submit">
                Next <EdgeSvgIcon>feather:chevron-right</EdgeSvgIcon>
              </Button>
            </div>
          </div>
        </form>
      ),
    },
    {
      label: "Lien Details",
      content: (
        <form onSubmit={handleSubmit(handleLienDetailsSubmission)}>
          <div className="flex flex-col gap-14">
            <LienDetailsForm
              currencyDropdowns={currencyDropdowns}
              collateralTableData={collateralTableData}
            />
            <div className="flex gap-14 justify-end items-end">
              <Button
                onClick={() => setValue("currentStep", 2)}
                className="flex flex-row gap-3"
              >
                <EdgeSvgIcon>feather:chevron-left</EdgeSvgIcon> Previous
              </Button>
              <Button
                onClick={handleFormComplete}
                className="flex flex-row gap-3"
                type="button"
              >
                Complete <EdgeSvgIcon>feather:check-circle</EdgeSvgIcon>
              </Button>
            </div>
          </div>
        </form>
      ),
    },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}></form>
      <div>
        <Ve3StepWizard
          selectStep={currentStep}
          currentSteps={[0, 1, 2, 3]}
          steps={steps}
        />
      </div>
    </FormProvider>
  );
};

export default OverDraftEForm;
