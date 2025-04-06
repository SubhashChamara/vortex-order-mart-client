import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { DropDownItem } from "../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import CreditLimitIncreaseForm from "../components/CreditLimitIncreaseForm";
import { CliInfo } from "../types/CliInfo";
import { CliRequest } from "../types/CliRequest";

type FK_Task22Props = {
  task: TaskDetailInfo;
};

const FK_Task22: FC<FK_Task22Props> = (props) => {
  const { task } = props;

  const [cliProcessData, setCliProcessData] = useState<CliInfo | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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

  useEffect(() => {
    handleFetchCliProcessInfo();
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
    cribAttached: boolean;
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
    cribAttached: false,
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
      firstName: z.string().min(1, "Please enter first name."),
      lastName: z.string().min(1, "Please ente last name."),
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
    // console.log();
    const {
      oldNicNumber,
      newNicNumber,
      passport,
      title,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      country,
      accountNumber,
      presentLimit,
      requestedLimit,
      cardNumber,
      reason,
      cardType,
      upgradeRequire,
      upgradeTo,
      enhancementType,
      requestedMode,
      cribAttached,
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

    if (title === null) {
      Logger.debug("Title cannot be null");
      setIsSubmitted(false);
      return;
    }
    if (cardType === null) {
      Logger.debug("Card Type cannot be null");
      setIsSubmitted(false);
      return;
    }
    if (upgradeRequire && upgradeTo === null) {
      Logger.debug("Upgrade To cannot be null");
      setIsSubmitted(false);
      return;
    }
    if (requestedMode === null) {
      Logger.debug("Request mode cannot be null");
      setIsSubmitted(false);
      return;
    }
    if (enhancementType === null) {
      Logger.debug("Enhancement Type cannot be null");
      setIsSubmitted(false);
      return;
    }
    // console.log(requestedMode);
    const request: CliRequest = {
      processInstance: task.processInstanceId,
      oldNicNumber: oldNicNumber.trim() == "" ? null : oldNicNumber.trim(),
      newNicNumber: newNicNumber.trim() == "" ? null : newNicNumber.trim(),
      passport: passport.trim() == "" ? null : passport.trim(),
      firstName,
      lastName,
      title: title.name,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      country,
      accountNumber,
      cardNumber: cardNumber.replace(/\s+/g, ""),
      presentLimit: parseFloat(presentLimit.replace(/[^0-9.]/g, "")),
      newLimit: parseFloat(requestedLimit.replace(/[^0-9.]/g, "")),
      reasonForEnhancement: reason,
      cardType: cardType.name,
      isUpgradeRequired: upgradeRequire,
      upgradeTo: upgradeRequire && upgradeTo ? upgradeTo.name : null,
      enhancementType: enhancementType.name,
      modeType: requestedMode.name,
      isCribJustificationAttached: cribAttached,
    };

    // console.log(request);

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.saveCliRequest(request)
    );

    if (err === null) {
      toast.success("Successfully Saved CLI Details");
      setIsSubmitted(false);
    } else {
      toast.error(err.msg);
      /**
       * set submit false to identify form submitted but failed
       * help to resubmit
       * and timeout prevent double clicks
       */
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      <FormProvider {...methods}>
        <form
          id="submit-form"
          onSubmit={handleSubmit(handleOnSubmit)}
          noValidate
        >
          <CreditLimitIncreaseForm
            task={task}
            cliProcessData={cliProcessData}
            editable={false}
          />
          {/* <Ve3StepWizard
            selectStep={0}
            currentSteps={[0]}
            // completedSteps={[0, 1, 2, 3]}
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
            ]}
          /> */}
          {/* <CreditLimitIncreaseForm
            task={task}
            cliProcessData={cliProcessData}
          />

          <VerificationCheckListView
            task={task}
            cliProcessData={cliProcessData}
          />

          <div className="mt-6">
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
                  editable={false}
                />
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="mt-6">
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
          </div>

          <div className="mt-6">
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
                  editable={true}
                />
              </AccordionDetails>
            </Accordion>
          </div> */}
          {/* <div className="mt-6">
            <Button aria-label="Save" type="submit">
              <EdgeSvgIcon
                className="icon-size-12 cursor-pointer text-white mr-3"
                color="error"
              >
                feather:save
              </EdgeSvgIcon>
              Save
            </Button>
          </div> */}
        </form>
      </FormProvider>
    </div>
  );
};

export default memo(FK_Task22);
