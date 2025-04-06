import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, memo, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { CLIProcessCheckListInfo } from "../../../core/types/creditlimitIincreaseProcess/CLIProcessCheckListInfo";
import { DropDownItem } from "../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { CliInfo } from "../../creditLimitIncrease/types/CliInfo";

import CreditLimitIncreaseForm from "../components/CreditLimitIncreaseForm";
import PendingReasonsForm from "../components/PendingReasonsForm";
import RejectReasonsForm from "../components/RejectReasonsView/RejectReasonsForm";
import UnderWriterViewForm from "../components/UnderWriterCheckListView/UnderWriterViewForm";
import VerificationCheckList from "../components/VerificationCheckList";
import { CLICheckListHeading } from "../types/CLICheckListHeading";
import { CliRequest } from "../types/CliRequest";
import { CLICheckListCategory } from "../types/CLICheckListCategory";
import CribCheckForm from "../components/CribCheckForm";

type FK_Task07Props = {
  task: TaskDetailInfo;
};

const FK_Task07: FC<FK_Task07Props> = (props) => {
  const { task } = props;

  const [cliProcessData, setCliProcessData] = useState<CliInfo | null>(null);
  const [verifyItems, setVerifyItems] = useState<CLIProcessCheckListInfo[]>([]);
  const [selectionCriteriaList, setSelectionCriteriaList] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [rejectReasonList, setRejectReasonList] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [pendReasonList, setPendReasonList] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(4);
  // const [docPage, setDocPage] = useState<number>(0);
  // const [file, setFile] = useState<File | null>(null);)

  const handleFetchCliProcessInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCliByProcess(task.processInstanceId)
    );

    Logger.debug(
      "(CLI Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setCliProcessData(data);
    }
  };

  const fetchSystemCheckListItems = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCheckListItems(
          task.processInstanceId,
          CLICheckListCategory.VERIFICATOR,
          CLICheckListHeading.VERIFICATION
        )
      );

      Logger.debug(
        "(Check List Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setVerifyItems(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSelectionCheckListItems = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCheckListItems(
          task.processInstanceId,
          CLICheckListCategory.VERIFICATOR,
          CLICheckListHeading.SELECTION_CRITERIA
        )
      );

      Logger.debug(
        "(Seelction Criteria Check List Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setSelectionCriteriaList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPendReasonItems = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCheckListItems(
          task.processInstanceId,
          CLICheckListCategory.PEND_REASON,
          null
        )
      );

      Logger.debug(
        "(Pending Reason Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setPendReasonList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRejectReasonItems = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCheckListItems(
          task.processInstanceId,
          CLICheckListCategory.REJECT_REASON,
          null
        )
      );

      Logger.debug(
        "(Pending Reason Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setRejectReasonList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchCliProcessInfo();
    fetchSystemCheckListItems();
    fetchSelectionCheckListItems();
    fetchPendReasonItems();
    fetchRejectReasonItems();
  }, [task]);

  type FormType = {
    oldNicNumber: string;
    newNicNumber: string;
    passport: string;
    title: DropDownItem | null;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    country: string;
    accountNumber: string;
    cardNumber: string;
    presentLimit: string;
    requestedLimit: string;
    reason: string;
    cardType: DropDownItem | null;
    upgradeRequire: boolean;
    enhancementType: DropDownItem | null;
    upgradeTo: DropDownItem | null;
    requestedMode: DropDownItem | null;
    cribJustificationAttached: boolean;
    cribAttached: boolean;

    cribNicNumber: string;
    contactNumber: string;
    cribAccountNumber: string;
    customer: string;
    employment: string;
    yearMonth: Dayjs | null;
    relationshipDuration: string;

    enhancementTypeUW: DropDownItem | null;
    enhancementFee: string;
    category: DropDownItem | null;
    grossIncome: string;
    evaluatedOn: DropDownItem | null;
    approvedLimit: string;
    newCardTypeUW: DropDownItem | null;
    dbr: string;
    mueOnUs: string;
    mueOffUs: string;
    tmpStartDate: Dayjs | null;
    tmpEndDate: Dayjs | null;
    approvedLevel: DropDownItem | null;
    cap: string;
    isGenerateLetter: boolean;
    currentStep: number;
  };

  const defaultValues: FormType = {
    oldNicNumber: "",
    newNicNumber: "",
    passport: "",
    title: null,
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    country: "",
    accountNumber: "",
    presentLimit: "",
    requestedLimit: "",
    cardNumber: "",
    reason: "",
    cardType: null,
    upgradeRequire: false,
    upgradeTo: null,
    enhancementType: null,
    requestedMode: null,
    cribJustificationAttached: false,
    cribAttached: false,

    cribNicNumber: "",
    contactNumber: "",
    cribAccountNumber: "",
    customer: "",
    employment: "",
    yearMonth: null,
    relationshipDuration: "",

    enhancementTypeUW: null,
    enhancementFee: "",
    category: null,
    grossIncome: "",
    evaluatedOn: null,
    approvedLimit: "",
    newCardTypeUW: null,
    dbr: "",
    mueOnUs: "",
    mueOffUs: "",
    tmpStartDate: null,
    tmpEndDate: null,
    approvedLevel: null,
    cap: "",
    isGenerateLetter: false,
    currentStep: 0,
  };

  const schema = z
    .object({
      isValidationRequired: z.boolean().default(true),
      // oldNicNumber: z
      //   .string()
      //   .refine(
      //     (value) => {
      //       return (
      //         value.trim() === "" ||
      //         /^[0-9]{9}[vVxX]$/.test(value) ||
      //         /^[0-9]{9}[XxVv]$/.test(value)
      //       );
      //     },
      //     {
      //       message: "Old NIC must Invalid",
      //     }
      //   )
      //   .optional(),

      // newNicNumber: z
      //   .string()
      //   .refine(
      //     (value) => {
      //       return value.trim() === "" || /^[0-9]{12}$/.test(value);
      //     },
      //     {
      //       message: "New NIC must Invalid",
      //     }
      //   )
      //   .optional(),
      // passport: z.string().optional(),
      // firstName: z.string().trim().min(1, "Please enter first name."),
      // lastName: z.string().trim().min(1, "Please ente last name."),
      // addressLine1: z.string(),
      // addressLine2: z.string(),
      // addressLine3: z.string(),
      // city: z.string(),
      // country: z.string(),
      // accountNumber: z
      //   .string()
      //   .refine(
      //     (value) => {
      //       return value.trim() === "" || /^\d{11}$/.test(value);
      //     },
      //     {
      //       message: "Account number must be 11 digits.",
      //     }
      //   )
      //   .optional(),
      // reason: z.string().min(1, "Please enter reason for enhancement."),
      // cardNumber: z
      //   .string()
      //   .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits.")
      //   .min(1, "Please enter card number."),
      presentLimit: z
        .string()
        .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
        .nonempty("Currency iPlease add present limit."),
      // requestedLimit: z
      //   .string()
      //   .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add requested limit.")
      //   .nonempty("Please add requested limit."),
      // cribJustificationAttached: z
      //   .boolean()
      //   .refine((value) => value === true || value === false, {
      //     message: "Crib Justification is required",
      //   }),
      // cribAttached: z
      //   .boolean()
      //   .refine((value) => value === true || value === false, {
      //     message: "Crib is required",
      //   }),
      // title: z
      //   .object({ id: z.number(), name: z.string() })
      //   .nullable()
      //   .refine((val) => val !== null, {
      //     message: "Please select title",
      //   }),
      // cardType: z
      //   .object({ id: z.number(), name: z.string() })
      //   .nullable()
      //   .refine((val) => val !== null, {
      //     message: "Please select card type",
      //   }),
      // upgradeRequire: z
      //   .boolean()
      //   .refine((value) => value === true || value === false, {
      //     message: "Upgrade is required",
      //   }),
      // upgradeTo: z
      //   .nullable(
      //     z.object({
      //       id: z.number(),
      //       name: z.string(),
      //     })
      //   )
      //   .optional(),
      // enhancementType: z
      //   .object({ id: z.number(), name: z.string() })
      //   .nullable()
      //   .refine((val) => val !== null, {
      //     message: "Please select enhancement type",
      //   }),
      // requestedMode: z
      //   .object({ id: z.number(), name: z.string() })
      //   .nullable()
      //   .refine((val) => val !== null, {
      //     message: "Please select requested mode",
      //   }),

      cribNicNumber: z
        .string()
        .refine(
          (value) => {
            return (
              value.trim() === "" ||
              /^[0-9]{9}[vVxX]$/.test(value) ||
              /^[0-9]{9}[XxVv]$/.test(value) ||
              /^[0-9]{12}$/.test(value)
            );
          },
          {
            message: "Invalid NIC number",
          }
        )
        .optional(),

      cribAccountNumber: z
        .string()
        .refine(
          (value) => {
            return value.trim() === "" || /^\d{11}$/.test(value);
          },
          {
            message: "Account number must be 11 digits.",
          }
        )
        .optional(),
      contactNumber: z
        .string()
        .refine(
          (value) => {
            return value.trim() === "" || /^[0-9]{10}$/.test(value);
          },
          {
            message: "Invalid contact nunmber",
          }
        )
        .optional(),

      // customer: z.string().trim().min(1, "Please enter customer name."),

      employment: z.string().optional(),

      relationshipDuration: z.string().optional(),

      enhancementTypeUW: z
        .object({ id: z.number(), name: z.string() })
        .nullable()
        .optional()
        .refine(
          (value) => {
            // Only require a non-null value if `isValidationRequired` is true
            return !false || value !== null;
          },
          {
            message: "Please select enhancement type",
          }
        ),

      enhancementFee: z
        .string()
        .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
        .nonempty("Currency iPlease add present limit."),

      category: z.object({ id: z.number(), name: z.string() }).nullable(),

      // grossIncome: z
      //   .string()
      //   .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
      //   .nonempty("please add gross income."),

      grossIncome: z
        .string()
        .refine(
          (value) => {
            return (
              value.trim() === "" ||
              /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/.test(value)
            );
          },
          {
            message: "Invalid income value",
          }
        )
        .optional(),

      evaluatedOn: z.object({ id: z.number(), name: z.string() }).nullable(),

      approvedLimit: z
        .string()
        .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
        .nonempty("please add approved limit."),

      newCardTypeUW: z.object({ id: z.number(), name: z.string() }).nullable(),

      dbr: z
        .string()
        .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
        .nonempty("please add dbr amount."),

      mueOnUs: z
        .string()
        .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
        .nonempty("please add MUE-ON US amount."),

      // mueOffUs: z
      //   .string()
      //   .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
      //   .nonempty("please add MUE-OFF US amount."),
      mueOffUs: z
        .string()
        .refine(
          (value) => {
            return (
              value.trim() === "" ||
              /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/.test(value)
            );
          },
          {
            message: "Invalid MUE-OFF US",
          }
        )
        .optional(),

      tmpStartDate: z.instanceof(dayjs).nullable().optional(),
      tmpEndDate: z.instanceof(dayjs).nullable().optional(),
      approvedLevel: z.object({ id: z.number(), name: z.string() }).nullable(),
      // .refine((val) => val !== null, {
      //   message: "Please select approved level",
      // }),

      // cap: z
      //   .string()
      //   .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
      //   .nonempty("please add CAP."),

      cap: z
        .string()
        .refine(
          (value) => {
            return (
              value.trim() === "" ||
              /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/.test(value)
            );
          },
          {
            message: "Invalid CAP",
          }
        )
        .optional(),
      isGenerateLetter: z
        .boolean()
        .refine((value) => value === true || value === false, {
          message: "Generate lettere is required",
        }),
    })
    // .refine(
    //   (data) => {
    //     const { oldNicNumber, newNicNumber, passport } = data;
    //     return (
    //       (oldNicNumber && oldNicNumber.length > 0) ||
    //       (newNicNumber && newNicNumber.length > 0) ||
    //       (passport && passport.length > 0)
    //     );
    //   },
    //   {
    //     message: "Please enter at least one of old nic, new nic, or passport.",
    //     path: ["oldNicNumber"],
    //   }
    // )

    // .refine(
    //   (value) => {
    //     return value.upgradeRequire === true ? Boolean(value.upgradeTo) : true;
    //   },
    //   {
    //     message: "Please select upgrade type if upgrade required.",
    //     path: ["upgradeTo"],
    //   }
    // )
    .refine(
      (value) => {
        return value.enhancementTypeUW?.name === "TEMPORARY"
          ? Boolean(value.tmpStartDate)
          : true;
      },
      {
        message: "Please select Temp Start Date for Temporaly Increase.",
        path: ["tmpStartDate"],
      }
    )
    .refine(
      (value) => {
        return value.enhancementTypeUW?.name === "TEMPORARY"
          ? Boolean(value.tmpEndDate)
          : true;
      },
      {
        message: "Please select Temp End Date for Temporaly Increase.",
        path: ["tmpEndDate"],
      }
    )
    .refine(
      (value) => {
        return value.approvedLevel?.name === "APPROVER L2" ||
          value.approvedLevel?.name === "APPROVER L3"
          ? Boolean(value.cap?.trim() != "")
          : true;
      },
      {
        message: "Please select CAP for Approval.",
        path: ["cap"],
      }
    )
    // .refine(
    //   (value) => {
    //     return value.upgradeRequire === true
    //       ? Boolean(value.newCardTypeUW)
    //       : true;
    //   },
    //   {
    //     message: "Please select new card type.",
    //     path: ["newCardTypeUW"],
    //   }
    // )
    // .refine(
    //   (value) => {
    //     return (
    //       parseFloat(value.requestedLimit.replace(/[^0-9.]/g, "")) >
    //       parseFloat(value.presentLimit.replace(/[^0-9.]/g, ""))
    //     );
    //   },
    //   {
    //     message: "Requested Limit must be higher than present limit",
    //     path: ["requestedLimit"],
    //   }
    // )
    .refine(
      (value) => {
        if (value.tmpStartDate && value.tmpEndDate) {
          return value.tmpStartDate.isBefore(value.tmpEndDate);
        } else return true;
      },
      {
        message: "End Date should be after the Start Date",
        path: ["tmpEndDate"],
      }
    )
    .refine(
      (value) => {
        return (
          parseFloat(value.approvedLimit.replace(/[^0-9.]/g, "")) >
          parseFloat(value.presentLimit.replace(/[^0-9.]/g, ""))
        );
      },
      {
        message: "Approved Limit must be higher than present limit",
        path: ["approvedLimit"],
      }
    );
  // .refine(
  //   (data) => {
  //     const { enhancementTypeUW, tmpStartDate , tmpEndDate } = data;
  //     return (
  //       (enhancementTypeUW.name=='PERMENANT2'));
  //   },
  //   {
  //     message: "Please add Temp start date and rnd date",
  //     path: ["tmpEndDate"],
  //   }
  // )

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(currentStep == 4 ? schema : z.object({})),
  });

  const { handleSubmit, formState, setValue } = methods;

  const { errors } = formState;

  const handleOnSubmit = async (formData: FormType) => {
    const {
      enhancementTypeUW,
      enhancementFee,
      category,
      grossIncome,
      evaluatedOn,
      approvedLimit,
      newCardTypeUW,
      dbr,
      mueOnUs,
      mueOffUs,
      tmpStartDate,
      tmpEndDate,
      approvedLevel,
      cap,
      isGenerateLetter,
    } = formData;

    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }

    /**
     * set submit true to identify form submitted already
     * help to prevent multiple submissions
     */
    setIsSubmitted(true);

    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);

    if (currentStep === 4 && enhancementTypeUW === null) {
      Logger.debug("Enhancement type cannot be null");
      setIsSubmitted(false);
      return;
    }

    if (currentStep === 4) {
      const request: CliRequest = {
        ...cliProcessData,
        enhancementTypeUW: enhancementTypeUW ? enhancementTypeUW.name : "",
        enhancementFee: enhancementFee
          ? parseFloat(enhancementFee.replace(/[^0-9.]/g, ""))
          : 0,
        category: category ? category.name : null,
        grossIncome: parseFloat(grossIncome.replace(/[^0-9.]/g, "")),
        evaluatedOn: evaluatedOn ? evaluatedOn.name : null,
        approvedLimit: parseFloat(approvedLimit.replace(/[^0-9.]/g, "")),
        newCardTypeUW: newCardTypeUW ? newCardTypeUW.name : null,
        dbr: parseFloat(dbr.replace(/[^0-9.]/g, "")),
        mueOnUs: parseFloat(mueOnUs.replace(/[^0-9.]/g, "")),
        mueOffUs: parseFloat(mueOffUs.replace(/[^0-9.]/g, "")),
        tmpStartDate,
        tmpEndDate,
        approvedLevel: approvedLevel?.name ? approvedLevel?.name : null,
        cap: parseFloat(cap.replace(/[^0-9.]/g, "")),
        isGenerateLetter,
      };
      const { err } = await Api.performRequest((r) =>
        r.creditCard.underWriter(
          task.processInstanceId,
          request,
          pendReasonList,
          rejectReasonList
        )
      );

      if (err === null) {
        toast.success("Successfully Saved Under Writer Details");
      } else {
        toast.error(err.msg);
      }
    } else {
      const { err } = await Api.performRequest((r) =>
        r.creditCard.underWriter(
          task.processInstanceId,
          null,
          pendReasonList,
          rejectReasonList
        )
      );

      if (err === null) {
        toast.success("Successfully Saved Under Writer Details");
      } else {
        toast.error(err.msg);
      }
    }

    /**
     * set submit false to identify form submitted but failed
     * help to resubmit
     * and timeout prevent double clicks
     */
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  function getMonthAndYear(yearMonth: Dayjs | null): {
    month: number | null;
    year: number | null;
  } {
    if (yearMonth) {
      return {
        month: yearMonth.month() + 1,
        year: yearMonth.year(),
      };
    } else {
      return {
        month: null,
        year: null,
      };
    }
  }

  const formatCurrency = (value: String) => {
    if (!value) return value;
    let cleanedValue = value.replace(/[^0-9.]/g, "");
    if (cleanedValue.includes(".")) {
      const [integer, decimal] = cleanedValue.split(".");
      cleanedValue = `${integer}.${decimal.slice(0, 2)}`;
    }
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedValue}`;
  };
  function createDayjsFromYearMonth(year: number, month: number): Dayjs | null {
    if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
      return dayjs()
        .set("year", year)
        .set("month", month - 1);
    }
    return null;
  }

  useEffect(() => {
    setValue(
      "presentLimit",
      cliProcessData?.presentLimit
        ? formatCurrency(String(cliProcessData.presentLimit))
        : ""
    );
    setValue(
      "cribNicNumber",
      cliProcessData?.cribNicNumber ? cliProcessData?.cribNicNumber : ""
    );
    setValue(
      "contactNumber",
      cliProcessData?.contactNumber ? cliProcessData?.contactNumber : ""
    );
    setValue(
      "cribAccountNumber",
      cliProcessData?.cribAccountNumber ? cliProcessData?.cribAccountNumber : ""
    );
    setValue(
      "customer",
      cliProcessData?.customer ? cliProcessData?.customer : ""
    );
    setValue(
      "employment",
      cliProcessData?.employment ? cliProcessData?.employment : ""
    );
    setValue(
      "yearMonth",
      cliProcessData?.cardSinceYear && cliProcessData.cardSinceMonth
        ? createDayjsFromYearMonth(
            cliProcessData.cardSinceYear,
            cliProcessData.cardSinceMonth
          )
        : null
    );
    setValue(
      "relationshipDuration",
      cliProcessData?.relationshipDuration
        ? cliProcessData?.relationshipDuration
        : ""
    );
  }, [cliProcessData]);

  return (
    <div className="grid grid-cols-1 gap-8">
      <FormProvider {...methods}>
        <form
          id="submit-form"
          onSubmit={handleSubmit(handleOnSubmit)}
          noValidate
        >
          <Ve3StepWizard
            selectStep={4}
            currentStep={4}
            setCurrentStep={setCurrentStep}
            currentSteps={[3, 4, 5]}
            completedSteps={[0, 1, 2]}
            steps={[
              {
                label: "Request",
                content: (
                  <CreditLimitIncreaseForm
                    task={task}
                    cliProcessData={cliProcessData}
                    editable={false}
                  />
                ),
              },
              {
                label: "Crib Check",
                content: (
                  <CribCheckForm
                    task={task}
                    cliProcessData={cliProcessData}
                    editable={false}
                  />
                ),
              },
              {
                label: "Verification",
                content: (
                  <VerificationCheckList
                    task={task}
                    cliProcessData={cliProcessData}
                    verifyItems={verifyItems}
                    setVerifyItems={setVerifyItems}
                    selectionCriteriaList={selectionCriteriaList}
                    setSelectionCriteriaList={setSelectionCriteriaList}
                    editable={false}
                  />
                ),
              },
              {
                label: "Pending Reasons",
                content: (
                  <PendingReasonsForm
                    task={task}
                    cliProcessData={cliProcessData}
                    pendReasonList={pendReasonList}
                    setPendReasonList={setPendReasonList}
                    editable={true}
                  />
                ),
              },
              {
                label: "Under-Writer",
                content: (
                  <UnderWriterViewForm
                    task={task}
                    cliProcessData={cliProcessData}
                    editable={true}
                  />
                ),
              },
              {
                label: "Reject Reasons",
                content: (
                  <RejectReasonsForm
                    task={task}
                    cliProcessData={cliProcessData}
                    rejectReasonList={rejectReasonList}
                    setRejectReasonList={setRejectReasonList}
                    editable={true}
                  />
                ),
              },
            ]}
          />
          {/* <CreditLimitIncreaseForm
            task={task}
            cliProcessData={cliProcessData}
          />

          <VerificationCheckListView
            task={task}
            cliProcessData={cliProcessData}
          />

          <PendingReasonsView
            task={task}
            cliProcessData={cliProcessData}
            pendReasonList={pendReasonList}
            setPendReasonList={setPendReasonList}
            editable={true}
          /> */}

          {/* <div className="mt-6">
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <div className="text-center border-b-1 border-b-gray-200 py-6 w-full">
                  <h1 className="text-md font-600 text-left flex text-blue-gray-800">
                    <div>
                      <EdgeSvgIcon
                        className="icon-size-18 cursor-pointer mr-3"
                        color="error"
                      >
                        feather:check-square
                      </EdgeSvgIcon>
                    </div>
                    <div>Under-Writer Check List</div>
                  </h1>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <UnderWriterForm task={task} cliProcessData={cliProcessData} />
              </AccordionDetails>
            </Accordion>
          </div> */}

          {/* <div className="mt-6">
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <div className="text-center border-b-1 border-b-gray-200 py-6 w-full">
                  <h1 className="text-md font-600 text-left flex text-blue-gray-800">
                    <div>
                      <EdgeSvgIcon
                        className="icon-size-18 cursor-pointer mr-3"
                        color="error"
                      >
                        feather:check-square
                      </EdgeSvgIcon>
                    </div>
                    <div>Reject Reasons</div>
                  </h1>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <RejectReasonsForm
                  task={task}
                  cliProcessData={cliProcessData}
                  rejectReasonList={rejectReasonList}
                  setRejectReasonList={setRejectReasonList}
                />
              </AccordionDetails>
            </Accordion>
          </div> */}

          <div className="mt-6">
            <Button aria-label="Save" type="submit">
              <EdgeSvgIcon
                className="icon-size-12 cursor-pointer text-white mr-3"
                color="error"
              >
                feather:save
              </EdgeSvgIcon>
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default memo(FK_Task07);
