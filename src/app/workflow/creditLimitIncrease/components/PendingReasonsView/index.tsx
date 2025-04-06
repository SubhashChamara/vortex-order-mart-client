import { zodResolver } from "@hookform/resolvers/zod";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FC, memo, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
// import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon"
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";
import { CLIProcessCheckListInfo } from "../../../../core/types/creditlimitIincreaseProcess/CLIProcessCheckListInfo";
import { DropDownItem } from "../../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { CliInfo } from "../../../creditLimitIncrease/types/CliInfo";
import { CLICheckListCategory } from "../../types/CLICheckListCategory";
import { CLICheckListHeading } from "../../types/CLICheckListHeading";
import CribCheckForm from "./components/CribCheckForm";
import PendingReasonsForm from "./components/PendingReasonsForm";

type VerificationCheckListViewProps = {
  task: TaskDetailInfo;
  cliProcessData: CliInfo|null;
  pendReasonList:CLIProcessCheckListInfo[];
  setPendReasonList: (pendReasonList: CLIProcessCheckListInfo[]) => void;
  editable:boolean;
};

const VerificationCheckListView: FC<VerificationCheckListViewProps> = (props) => {
  const { task,cliProcessData,pendReasonList,setPendReasonList,editable } = props;

  // const [cliProcessData, setCliProcessData] = useState<CliInfo | null>(null);
  const [verifyItems, setVerifyItems] = useState<CLIProcessCheckListInfo[]>([]);
  const [selectionCriteriaList, setSelectionCriteriaList] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  // const [pendReasonList, setPendReasonList] = useState<
  //   CLIProcessCheckListInfo[]
  // >([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  // const [docPage, setDocPage] = useState<number>(0);
  // const [file, setFile] = useState<File | null>(null);

  // const handleFetchCliProcessInfo = async () => {
  //   const { data, err } = await Api.performRequest((r) =>
  //     r.creditCard.getCliByProcess(task.processInstanceId)
  //   );

  //   Logger.debug(
  //     "(CLI Process) => { DATA: " +
  //       JSON.stringify(data) +
  //       " , ERROR: " +
  //       JSON.stringify(err)
  //   );

  //   if (data !== null) {
  //     setCliProcessData(data);
  //   }
  // };

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

  function createDayjsFromYearMonth(year: number, month: number): Dayjs | null {
    if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
      return dayjs().set('year', year).set('month', month - 1);
    }
    return null; 
  }
  

  useEffect(() => {
    // handleFetchCliProcessInfo();
    fetchSystemCheckListItems();
    fetchSelectionCheckListItems();
    fetchPendReasonItems();
  }, [task]);

  useEffect(()=>{
    setValue("cribNicNumber",cliProcessData?.cribNicNumber? cliProcessData?.cribNicNumber:"")
    setValue("contactNumber",cliProcessData?.contactNumber? cliProcessData?.contactNumber:"")
    setValue("cribAccountNumber",cliProcessData?.cribAccountNumber? cliProcessData?.cribAccountNumber:"")
    setValue("customer",cliProcessData?.customer? cliProcessData?.customer:"")
    setValue("employment",cliProcessData?.employment? cliProcessData?.employment:"")
    setValue("yearMonth",cliProcessData?.cardSinceYear && cliProcessData.cardSinceMonth?
       createDayjsFromYearMonth(cliProcessData.cardSinceYear,cliProcessData.cardSinceMonth):null)
    setValue("relationshipDuration",cliProcessData?.relationShipDuration? cliProcessData?.relationShipDuration:"")
  },[cliProcessData])

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
  };

  const schema = z
    .object({
      oldNicNumber: z
        .string()
        .refine(
          (value) => {
            return (
              value.trim() === "" ||
              /^[0-9]{9}[vVxX]$/.test(value) ||
              /^[0-9]{9}[XxVv]$/.test(value)
            );
          },
          {
            message: "Old NIC must Invalid",
          }
        )
        .optional(),

      newNicNumber: z
        .string()
        .refine(
          (value) => {
            return value.trim() === "" || /^[0-9]{12}$/.test(value);
          },
          {
            message: "New NIC must Invalid",
          }
        )
        .optional(),
      passport: z.string().optional(),
      firstName: z.string().trim().min(1, "Please enter first name."),
      lastName: z.string().trim().min(1, "Please ente last name."),
      addressLine1: z.string(),
      addressLine2: z.string(),
      addressLine3: z.string(),
      city: z.string(),
      country: z.string(),
      accountNumber: z
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
      reason: z.string().min(1, "Please enter reason for enhancement."),
      cardNumber: z
        .string()
        .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits.")
        .min(1, "Please enter card number."),
      presentLimit: z
        .string()
        .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
        .nonempty("Currency iPlease add present limit."),
      requestedLimit: z
        .string()
        .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add requested limit.")
        .nonempty("Please add requested limit."),
      cribJustificationAttached: z
        .boolean()
        .refine((value) => value === true || value === false, {
          message: "Crib Justification is required",
        }),
      cribAttached: z
        .boolean()
        .refine((value) => value === true || value === false, {
          message: "Crib is required",
        }),
      title: z
        .object({ id: z.number(), name: z.string() })
        .nullable()
        .refine((val) => val !== null, {
          message: "Please select title",
        }),
      cardType: z
        .object({ id: z.number(), name: z.string() })
        .nullable()
        .refine((val) => val !== null, {
          message: "Please select card type",
        }),
      upgradeRequire: z
        .boolean()
        .refine((value) => value === true || value === false, {
          message: "Upgrade is required",
        }),
      upgradeTo: z
        .nullable(
          z.object({
            id: z.number(),
            name: z.string(),
          })
        )
        .optional(),
      enhancementType: z
        .object({ id: z.number(), name: z.string() })
        .nullable()
        .refine((val) => val !== null, {
          message: "Please select enhancement type",
        }),
      requestedMode: z
        .object({ id: z.number(), name: z.string() })
        .nullable()
        .refine((val) => val !== null, {
          message: "Please select requested mode",
        }),

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

      customer: z.string().trim().min(1, "Please enter customer name."),

      employment: z.string().optional(),

      yearMonth: z
        .instanceof(dayjs)
        .nullable()
        .optional()
        .refine(
          (value) => {
            if (value === null) return true;
            return dayjs.isDayjs(value) && value.isBefore(dayjs(), "month");
          },
          {
            message: "Year and month must be in the past",
          }
        ),
      relationshipDuration: z.string().optional(),
    })
    .refine(
      (data) => {
        const { oldNicNumber, newNicNumber, passport } = data;
        return (
          (oldNicNumber && oldNicNumber.length > 0) ||
          (newNicNumber && newNicNumber.length > 0) ||
          (passport && passport.length > 0)
        );
      },
      {
        message: "Please enter at least one of old nic, new nic, or passport.",
        path: ["oldNicNumber"],
      }
    )
    .refine(
      (value) => {
        return value.upgradeRequire === true ? Boolean(value.upgradeTo) : true;
      },
      {
        message: "Please select upgrade type if upgrade required.",
        path: ["upgradeTo"],
      }
    )
    .refine(
      (value) => {
        return (
          parseFloat(value.requestedLimit.replace(/[^0-9.]/g, "")) >
          parseFloat(value.presentLimit.replace(/[^0-9.]/g, ""))
        );
      },
      {
        message: "Requested Limit must be higher than present limit",
        path: ["requestedLimit"],
      }
    );

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState,
    setError,
    setValue,
    watch,
    getValues,
  } = methods;

  const handleOnSubmit = async (formData: FormType) => {
    const {
      cribNicNumber,
      contactNumber,
      cribAccountNumber,
      customer,
      employment,
      yearMonth,
      relationshipDuration,
    } = formData;
    const cardSinceYear = getMonthAndYear(yearMonth).year!;
    const cardSinceMonth = getMonthAndYear(yearMonth).month!;
    
    // console.log(verifyItems);
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

    // console.log(cliProcessData)
    // console.log(pendReasonList)
    let updatedCliInfo: CliInfo;
    updatedCliInfo = {
      ...cliProcessData,
      cribNicNumber,
      contactNumber,
      cribAccountNumber,
      customer,
      employment,
      cardSinceYear,
      cardSinceMonth,
      relationshipDuration,
    };
    //   console.log(cliProcessData)
    //  console.log(updatedCliInfo);

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.verify(
        verifyItems,
        selectionCriteriaList,
        pendReasonList,
        updatedCliInfo
      )
    );

    if (err === null) {
      toast.success("Successfully Saved Verification Details");
    } else {
      toast.error(err.msg);
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

  return (
    <div className="grid grid-cols-1 gap-8">
      <FormProvider {...methods}>
        <form
          id="submit-form"
          onSubmit={handleSubmit(handleOnSubmit)}
          noValidate
        >
          {/* <CreditLimitIncreaseForm
            task={task}
            cliProcessData={cliProcessData}
          /> */}

          <div className="mt-6">
            <Accordion>
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
                        feather:clock
                      </EdgeSvgIcon>
                    </div>
                    <div>Pending Reasons</div>
                  </h1>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <PendingReasonsForm
                  task={task}
                  cliProcessData={cliProcessData}
                  pendReasonList={pendReasonList}
                  setPendReasonList={setPendReasonList}
                  editable={editable}
                />
              </AccordionDetails>
            </Accordion>
          </div>

          
        </form>
      </FormProvider>

    </div>
  );
};

export default memo(VerificationCheckListView);
