import { FC, memo, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { Api } from "../../../../../api/Api";
import { toast } from "react-toastify";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { FrmDataEntryRequest } from "../../@types/FrmDataEntryRequest";
import Logger from "../../../../../@helpers/Logger";
import { formatCurrency } from "../../../bundle/@helpers/Common";

type FrmDataEntryFormProps = {
  task: TaskDetailInfo;
  dataEntry: FrmDataEntryRequest | null;
};

type FrmDataEntryType = {
  caseRefNo: string;
  caseReceived: string;
  channel: string;
  dataEntryDate: string;
  appRef_CardNo: string;
  accNo_WfNo: string;
  applicantsName: string;
  dateOfBirth: string;
  nicPPNo: string;
  product: string;
  customerCategoryDE: string;
  companyName: string;
  suspisiousDocument: string;
  bdmLm: string;
  staffID: string;
  staffName: string;
  dsrStaffInvolved: string;
  applicantInvolved: string;
  escalationType: string;
  grossFraudLoss: number | null;
  potentialSavings: number | null;
  potentialSavingsUsd: number | null;
  recoveredAmount: number | null;
  netFraudLoss: number | null;
  reasonToSubmitBg: string;
  observeModulusOpr: string;
  recomendInBrief: string;
  conclusionStatus: string;
  scopeOfWork: string;
  fraudIdentifyDate: string;
  investigationConcludeDate: string;
  writeOffDate: string;
  timePeriod: string;
  caseHandledBy: string;
  nextActions: string;
  accountability: string;
  responsiblePerson: string;
  problemStatement: string;
  grossExposureUSD: number | null;
  expectedRecovery_USD: number | null;
  expectedNetLoss_USD: number | null;
  actualRecovery_USD: number | null;
  finalLossTaken_USD: number | null;
  status_Open_Closed: string;
  lossRecognition: string;
  dataEntryMonth: number | null;
  frmInvestigationProcessId: string;
  processInstanceId: string;
  executiveSummary: string;
  findings: string;
  processInstance: string;
};

const defaultValues: FrmDataEntryType = {
  caseRefNo: "",
  caseReceived: "",
  channel: "",
  dataEntryDate: "",
  appRef_CardNo: "",
  accNo_WfNo: "",
  applicantsName: "",
  dateOfBirth: "",
  nicPPNo: "",
  product: "",
  customerCategoryDE: "",
  companyName: "",
  suspisiousDocument: "",
  bdmLm: "",
  staffID: "",
  staffName: "",
  dsrStaffInvolved: "",
  applicantInvolved: "",
  escalationType: "",
  grossFraudLoss: "",
  potentialSavings: "",
  potentialSavingsUsd: "",
  recoveredAmount: "",
  netFraudLoss: "",
  reasonToSubmitBg: "",
  observeModulusOpr: "",
  recomendInBrief: "",
  conclusionStatus: "",
  scopeOfWork: "",
  fraudIdentifyDate: "",
  investigationConcludeDate: "",
  writeOffDate: "",
  timePeriod: "",
  caseHandledBy: "",
  nextActions: "",
  accountability: "",
  responsiblePerson: "",
  problemStatement: "",
  grossExposureUSD: "",
  expectedRecovery_USD: "",
  expectedNetLoss_USD: "",
  actualRecovery_USD: "",
  finalLossTaken_USD: "",
  status_Open_Closed: "",
  lossRecognition: "",
  dataEntryMonth: null,
  frmInvestigationProcessId: "",
  processInstanceId: "",
  executiveSummary: "",
  findings: ""
};

const parseCurrency = (value: string | null): number | null => {
  if (!value) return null;
  return parseFloat(value.replace(/,/g, ""));
};

const FrmDataEntryForm: FC<FrmDataEntryFormProps> = (props) => {
  const { task, dataEntry } = props;
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<FrmDataEntryType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(
      z.object({
        caseRefNo: z.string().optional(),
        caseReceived: z.string().regex(dateRegex, "Invalid date format (dd-mm-yyyy)").optional().or(z.literal("")),
        channel: z.string().optional(),
        dataEntryDate: z.string().regex(dateRegex, "Invalid date format (dd-mm-yyyy)").optional().or(z.literal("")),
        appRef_CardNo: z.string().optional(),
        accNo_WfNo: z.string().optional(),
        applicantsName: z.string().optional(),
        dateOfBirth: z.string().regex(dateRegex, "Invalid date format (dd-mm-yyyy)").optional().or(z.literal("")),
        nicPPNo: z.string().optional(),
        product: z.string().optional(),
        customerCategoryDE: z.string().optional(),
        companyName: z.string().optional(),
        suspisiousDocument: z.string().optional(),
        bdmLm: z.string().optional(),
        staffID: z.string().optional(),
        staffName: z.string().optional(),
        dsrStaffInvolved: z.string().optional(),
        applicantInvolved: z.string().optional(),
        escalationType: z.string().optional(),
        grossFraudLoss: z.string().optional(),
        potentialSavings: z.string().optional(),
        potentialSavingsUsd: z.string().optional(),
        recoveredAmount: z.string().optional(),
        netFraudLoss: z.string().optional(),
        reasonToSubmitBg: z.string().optional(),
        observeModulusOpr: z.string().optional(),
        recomendInBrief: z.string().optional(),
        conclusionStatus: z.string().optional(),
        scopeOfWork: z.string().optional(),
        fraudIdentifyDate: z.string().regex(dateRegex, "Invalid date format (dd-mm-yyyy)").optional().or(z.literal("")),
        investigationConcludeDate: z.string().regex(dateRegex, "Invalid date format (dd-mm-yyyy)").optional().or(z.literal("")),
        writeOffDate: z.string().regex(dateRegex, "Invalid date format (dd-mm-yyyy)").optional().or(z.literal("")),
        timePeriod: z.string().optional(),
        caseHandledBy: z.string().optional(),
        nextActions: z.string().optional(),
        accountability: z.string().optional(),
        responsiblePerson: z.string().optional(),
        problemStatement: z.string().optional(),
        grossExposureUSD: z.string().optional(),
        expectedRecovery_USD: z.string().optional(),
        expectedNetLoss_USD: z.string().optional(),
        actualRecovery_USD: z.string().optional(),
        finalLossTaken_USD: z.string().optional(),
        status_Open_Closed: z.string().optional(),
        lossRecognition: z.string().optional(),
        dataEntryMonth: z.number().nullable(),
        frmInvestigationProcessId: z.string().optional(),
        executiveSummary: z.string().optional(),
        findings: z.string().optional(),
        processInstanceId: z.string().optional(),
      })
    )
  });

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleOnSubmit = async (data: FrmDataEntryType) => {
    try {

      // if (isSubmitted) {
      //   Logger.debug("Form Already Submitted");
      //   return;
      // }
      setIsSubmitted(true);

      // Prevent default form submission
      const request: FrmDataEntryType = {
        ...data,
        processInstanceId: task.processInstanceId,
        processInstance: task.processInstanceId,
        taskInstance: task.taskInstance,
        grossFraudLoss: parseCurrency(data.grossFraudLoss),
        potentialSavings: parseCurrency(data.potentialSavings),
        potentialSavingsUsd: parseCurrency(data.potentialSavingsUsd),
        recoveredAmount: parseCurrency(data.recoveredAmount),
        netFraudLoss: parseCurrency(data.netFraudLoss),
        grossExposureUSD: parseCurrency(data.grossExposureUSD),
        expectedRecovery_USD: parseCurrency(data.expectedRecovery_USD),
        expectedNetLoss_USD: parseCurrency(data.expectedNetLoss_USD),
        actualRecovery_USD: parseCurrency(data.actualRecovery_USD),
        finalLossTaken_USD: parseCurrency(data.finalLossTaken_USD)

      };

      const { err } = await Api.performRequest((r) =>
        r.creditCard.saveFrmDataEntry(request)
      );

      if (err === null) {
        toast.success("Form data submitted successfully");
      } else {
        toast.error("Failed to submit form data");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Form submission error:", error);
    }
  };

  useEffect(() => {
    if (dataEntry) {
      setValue("caseRefNo", dataEntry.caseRefNo ?? defaultValues.caseRefNo);
      setValue("caseReceived", dataEntry.caseReceived ?? defaultValues.caseReceived);
      setValue("channel", dataEntry.channel ?? defaultValues.channel);
      setValue("dataEntryDate", dataEntry.dataEntryDate ?? defaultValues.dataEntryDate);
      setValue("appRef_CardNo", dataEntry.appRef_CardNo ?? defaultValues.appRef_CardNo);
      setValue("accNo_WfNo", dataEntry.accNo_WfNo ?? defaultValues.accNo_WfNo);
      setValue("applicantsName", dataEntry.applicantsName ?? defaultValues.applicantsName);
      setValue("dateOfBirth", dataEntry.dateOfBirth ?? defaultValues.dateOfBirth);
      setValue("nicPPNo", dataEntry.nicPPNo ?? defaultValues.nicPPNo);
      setValue("product", dataEntry.product ?? defaultValues.product);
      setValue("customerCategoryDE", dataEntry.customerCategoryDE ?? defaultValues.customerCategoryDE);
      setValue("companyName", dataEntry.companyName ?? defaultValues.companyName);
      setValue("suspisiousDocument", dataEntry.suspisiousDocument ?? defaultValues.suspisiousDocument);
      setValue("bdmLm", dataEntry.bdmLm ?? defaultValues.bdmLm);
      setValue("staffID", dataEntry.staffID ?? defaultValues.staffID);
      setValue("staffName", dataEntry.staffName ?? defaultValues.staffName);
      setValue("dsrStaffInvolved", dataEntry.dsrStaffInvolved ?? defaultValues.dsrStaffInvolved);
      setValue("applicantInvolved", dataEntry.applicantInvolved ?? defaultValues.applicantInvolved);
      setValue("escalationType", dataEntry.escalationType ?? defaultValues.escalationType);
      setValue("grossFraudLoss", formatCurrency(dataEntry.grossFraudLoss?.toString() ?? ""));
      setValue("potentialSavings", formatCurrency(dataEntry.potentialSavings?.toString() ?? ""));
      setValue("potentialSavingsUsd", formatCurrency(dataEntry.potentialSavingsUsd?.toString() ?? ""));
      setValue("recoveredAmount", formatCurrency(dataEntry.recoveredAmount?.toString() ?? ""));
      setValue("netFraudLoss", formatCurrency(dataEntry.netFraudLoss?.toString() ?? ""));
      setValue("reasonToSubmitBg", dataEntry.reasonToSubmitBg ?? defaultValues.reasonToSubmitBg);
      setValue("observeModulusOpr", dataEntry.observeModulusOpr ?? defaultValues.observeModulusOpr);
      setValue("recomendInBrief", dataEntry.recomendInBrief ?? defaultValues.recomendInBrief);
      setValue("conclusionStatus", dataEntry.conclusionStatus ?? defaultValues.conclusionStatus);
      setValue("scopeOfWork", dataEntry.scopeOfWork ?? defaultValues.scopeOfWork);
      setValue("executiveSummary", dataEntry.executiveSummary ?? defaultValues.executiveSummary);
      setValue("findings", dataEntry.findings ?? defaultValues.findings);
      setValue("fraudIdentifyDate", dataEntry.fraudIdentifyDate ?? defaultValues.fraudIdentifyDate);
      setValue("investigationConcludeDate", dataEntry.investigationConcludeDate ?? defaultValues.investigationConcludeDate);
      setValue("writeOffDate", dataEntry.writeOffDate ?? defaultValues.writeOffDate);
      setValue("timePeriod", dataEntry.timePeriod ?? defaultValues.timePeriod);
      setValue("caseHandledBy", dataEntry.caseHandledBy ?? defaultValues.caseHandledBy);
      setValue("nextActions", dataEntry.nextActions ?? defaultValues.nextActions);
      setValue("accountability", dataEntry.accountability ?? defaultValues.accountability);
      setValue("responsiblePerson", dataEntry.responsiblePerson ?? defaultValues.responsiblePerson);
      setValue("problemStatement", dataEntry.problemStatement ?? defaultValues.problemStatement);
      setValue("grossExposureUSD", formatCurrency(dataEntry.grossExposureUSD?.toString() ?? ""));
      setValue("expectedRecovery_USD", formatCurrency(dataEntry.expectedRecovery_USD?.toString() ?? ""));
      setValue("expectedNetLoss_USD", formatCurrency(dataEntry.expectedNetLoss_USD?.toString() ?? ""));
      setValue("actualRecovery_USD", formatCurrency(dataEntry.actualRecovery_USD?.toString() ?? ""));
      setValue("finalLossTaken_USD", formatCurrency(dataEntry.finalLossTaken_USD?.toString() ?? ""));
      setValue("status_Open_Closed", dataEntry.status_Open_Closed ?? defaultValues.status_Open_Closed);
      setValue("lossRecognition", dataEntry.lossRecognition ?? defaultValues.lossRecognition);
      setValue("dataEntryMonth", dataEntry.dataEntryMonth ?? defaultValues.dataEntryMonth);
      setValue("frmInvestigationProcessId", dataEntry.frmInvestigationProcessId ?? defaultValues.frmInvestigationProcessId);
      setValue("processInstanceId", dataEntry.processInstanceId ?? defaultValues.processInstanceId);
    }
  }, [dataEntry, setValue]);


  return (
    <Paper className="px-12">
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex text-blue-gray-800">
          <div>
            <EdgeSvgIcon
              className="icon-size-18 cursor-pointer mr-3"
              color="error"
            >
              feather:user-plus
            </EdgeSvgIcon>
          </div>
          <div>DATA ENTRY DETAILS</div>
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div
          className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
            ? "sm:grid-cols-1 md:grid-cols-2"
            : "sm:grid-cols-2 md:grid-cols-1"
            } lg:grid-cols-2`}
        >
          <Controller
            name="caseRefNo"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Case Ref No" fullWidth error={!!errors.caseRefNo} helperText={errors.caseRefNo?.message} />
            )}
          />

          <Controller
            name="caseReceived"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value, "DD-MM-YYYY") : null}
                  label="Case Received"
                  onChange={(newValue) => {
                    const formattedDate = newValue ? dayjs(newValue).format("DD-MM-YYYY") : "";
                    onChange(formattedDate);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      helperText: <>{errors?.caseReceived?.message}</>,
                      error: !!errors.caseReceived,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="channel"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Channel" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="dataEntryMonth"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select {...field} label="Month">
                  <MenuItem value={1}>January</MenuItem>
                  <MenuItem value={2}>February</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                  <MenuItem value={6}>June</MenuItem>
                  <MenuItem value={7}>July</MenuItem>
                  <MenuItem value={8}>August</MenuItem>
                  <MenuItem value={9}>September</MenuItem>
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={11}>November</MenuItem>
                  <MenuItem value={12}>December</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="dataEntryDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value, "DD-MM-YYYY") : null}
                  label="Date"
                  onChange={(newValue) => {
                    const formattedDate = newValue ? dayjs(newValue).format("DD-MM-YYYY") : "";
                    onChange(formattedDate);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      helperText: <>{errors?.caseReceived?.message}</>,
                      error: !!errors.caseReceived,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="appRef_CardNo"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="AppRef Card No" fullWidth error={!!errors.appRef_CardNo} helperText={errors.appRef_CardNo?.message} />
            )}
          />

          <Controller
            name="accNo_WfNo"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Account No / WorkFlow No" fullWidth error={!!errors.accNo_WfNo} helperText={errors.accNo_WfNo?.message} />
            )}
          />

          <Controller
            name="applicantsName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Applicant's Name" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value, "DD-MM-YYYY") : null}
                  label="Date of Birth"
                  onChange={(newValue) => {
                    const formattedDate = newValue ? dayjs(newValue).format("DD-MM-YYYY") : "";
                    onChange(formattedDate);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      helperText: <>{errors?.caseReceived?.message}</>,
                      error: !!errors.caseReceived,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="nicPPNo"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="NIC/PP No" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="product"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Product</InputLabel>
                <Select {...field} label="Product">
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Mortgage">Mortgage</MenuItem>
                  <MenuItem value="Personal Loan">Personal Loan</MenuItem>
                  <MenuItem value="CLI">CLI</MenuItem>
                  <MenuItem value="Business Banking">Business Banking</MenuItem>
                  <MenuItem value="CASA">CASA</MenuItem>
                  <MenuItem value="CAC">CAC</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="customerCategoryDE"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Customer Category</InputLabel>
                <Select {...field} label="Customer Category">
                  <MenuItem value="Retail">Retail</MenuItem>
                  <MenuItem value="Corporate">Corporate</MenuItem>
                  <MenuItem value="SME">SME</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Company Name" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="suspisiousDocument"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Suspicious Document" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="bdmLm"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="BDM / LM" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="staffID"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Staff ID" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="staffName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Staff Name" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="dsrStaffInvolved"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="DSR / Staff Involved" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="applicantInvolved"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Applicant Involved" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="escalationType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Escalation Type</InputLabel>
                <Select {...field} label="Escalation Type">
                  <MenuItem value="Pre booking">Pre booking</MenuItem>
                  <MenuItem value="Post booking">Post booking</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="grossFraudLoss"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                {...rest}
                label="Gross Fraud Loss(LKR)"
                required
                size="small"
                type="text"
                helperText={<>{errors.grossFraudLoss?.message}</>}
                error={!!errors.grossFraudLoss}
                onChange={(e) => onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />
            )}
          />

          <Controller
            name="potentialSavings"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                {...rest}
                label="Potential Savings (LKR)"
                required
                size="small"
                type="text"
                helperText={<>{errors.potentialSavings?.message}</>}
                error={!!errors.potentialSavings}
                onChange={(e) => onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />
            )}
          />

          <Controller
            name="potentialSavingsUsd"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                {...rest}
                label="Potential Savings (USD)"
                required
                size="small"
                type="text"
                helperText={<>{errors.potentialSavingsUsd?.message}</>}
                error={!!errors.potentialSavingsUsd}
                onChange={(e) => onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />)}
          />

          <Controller
            name="recoveredAmount"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                {...rest}
                label="Recovered Amount (LKR)"
                required
                size="small"
                type="text"
                helperText={<>{errors.recoveredAmount?.message}</>}
                error={!!errors.recoveredAmount}
                onChange={(e) => onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />)}
          />

          <Controller
            name="netFraudLoss"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                {...rest}
                label="Net Fraud Loss (LKR)"
                required
                size="small"
                type="text"
                helperText={<>{errors.netFraudLoss?.message}</>}
                error={!!errors.netFraudLoss}
                onChange={(e) => onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />)}
          />

          <Controller
            name="grossExposureUSD"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                {...rest}
                label="Gross Exposure (USD)"
                required
                size="small"
                type="text"
                helperText={<>{errors.grossExposureUSD?.message}</>}
                error={!!errors.grossExposureUSD}
                onChange={(e) => onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />)}
          />

          <Controller
            name="expectedRecovery_USD"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                {...rest}
                label="Expected Recovery (USD)"
                required
                size="small"
                type="text"
                helperText={<>{errors.expectedRecovery_USD?.message}</>}
                error={!!errors.expectedRecovery_USD}
                onChange={(e) => onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />)}
          />

          <Controller
            name="expectedNetLoss_USD"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                {...rest}
                label="Expected Net Loss (USD)"
                required
                size="small"
                type="text"
                helperText={<>{errors.expectedNetLoss_USD?.message}</>}
                error={!!errors.expectedNetLoss_USD}
                onChange={(e) => onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />)}
          />

          <Controller
            name="actualRecovery_USD"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                {...rest}
                label="Actual Recovery (USD)"
                required
                size="small"
                type="text"
                helperText={<>{errors.actualRecovery_USD?.message}</>}
                error={!!errors.actualRecovery_USD}
                onChange={(e) => onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />)}
          />

          <Controller
            name="finalLossTaken_USD"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <TextField
                {...rest}
                label="Final Loss Taken (USD)"
                required
                size="small"
                type="text"
                helperText={<>{errors.finalLossTaken_USD?.message}</>}
                error={!!errors.finalLossTaken_USD}
                onChange={(e) => onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />)}
          />

          <Controller
            name="reasonToSubmitBg"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="Reason to submit (Background)" fullWidth error={!!errors.reasonToSubmitBg} helperText={errors.reasonToSubmitBg?.message} />
            )}
          />

          <Controller
            name="executiveSummary"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="Executive Summary" fullWidth error={!!errors.executiveSummary} helperText={errors.executiveSummary?.message} />
            )}
          />

          <Controller
            name="scopeOfWork"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="Scope of work" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="problemStatement"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="Approach" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="findings"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="Findings" fullWidth error={!!errors.findings} helperText={errors.findings?.message} />
            )}
          />

          <Controller
            name="accountability"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="People Involved and Extent of Involvement" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="observeModulusOpr"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="MODUS OPERANDI" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="status_Open_Closed"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select {...field} label="Status">
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="nextActions"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="Immediate Actions Recommended" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="conclusionStatus"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="Conclusion status" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="recomendInBrief"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="Recommendations in brief" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="responsiblePerson"
            control={control}
            render={({ field }) => (
              <TextField {...field} multiline label="Responsible Person" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="lossRecognition"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Loss Recognition</InputLabel>
                <Select {...field} label="Loss Recognition">
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="fraudIdentifyDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value, "DD-MM-YYYY") : null}
                  label="Fraud Identification Date"
                  onChange={(newValue) => {
                    const formattedDate = newValue ? dayjs(newValue).format("DD-MM-YYYY") : "";
                    onChange(formattedDate);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      helperText: <>{errors?.caseReceived?.message}</>,
                      error: !!errors.caseReceived,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="investigationConcludeDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value, "DD-MM-YYYY") : null}
                  label="Investigation Concluded Date"
                  onChange={(newValue) => {
                    const formattedDate = newValue ? dayjs(newValue).format("DD-MM-YYYY") : "";
                    onChange(formattedDate);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      helperText: <>{errors?.caseReceived?.message}</>,
                      error: !!errors.caseReceived,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="writeOffDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value, "DD-MM-YYYY") : null}
                  label="Write off Date"
                  onChange={(newValue) => {
                    const formattedDate = newValue ? dayjs(newValue).format("DD-MM-YYYY") : "";
                    onChange(formattedDate);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      helperText: <>{errors?.caseReceived?.message}</>,
                      error: !!errors.caseReceived,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="timePeriod"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Time Period" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="caseHandledBy"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Case handled by" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

        </div>
        <div className="flex justify-left my-6">
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
    </Paper>
  );
};

export default memo(FrmDataEntryForm);
