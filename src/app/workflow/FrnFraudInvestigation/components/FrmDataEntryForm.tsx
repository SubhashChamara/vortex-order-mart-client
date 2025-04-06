import { FC, memo, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Paper, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FrmDataEntryRequest } from "../@types/FrmDataEntryRequest";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../@hooks/useThemeMediaQuery";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";

type FrmDataEntryFormProps = {
  dataEntry: FrmDataEntryRequest | null;
  procId: string;
};

type FrmDataEntryType = {
  caseRefNo: string;
  caseReceived: string | null;
  channel: string;
  dataEntryDate: string | null;
  appRef_CardNo: string;
  accNo_WfNo: string;
  applicantsName: string;
  dateOfBirth: string | null;
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
  grossFraudLoss: number;
  potentialSavings: number;
  potentialSavingsUsd: number;
  recoveredAmount: number;
  netFraudLoss: number;
  reasonToSubmitBg: string;
  observeModulusOpr: string;
  recomendInBrief: string;
  conclusionStatus: string;
  scopeOfWork: string;
  fraudIdentifyDate: string | null;
  investigationConcludeDate: string | null;
  writeOffDate: string | null;
  timePeriod: string;
  caseHandledBy: string;
  nextActions: string;
  accountability: string;
  responsiblePerson: string;
  problemStatement: string;
  grossExposureUSD: number;
  expectedRecovery_USD: number;
  expectedNetLoss_USD: number;
  actualRecovery_USD: number;
  finalLossTaken_USD: number;
  status_Open_Closed: string;
  lossRecognition: string;
  dataEntryMonth: number;
  frmInvestigationProcessId: string;
  processInstanceId: string | null;
  executiveSummary: string;
  findings: string;
};

const defaultValues: FrmDataEntryType = {
  caseRefNo: "",
  caseReceived: null,
  channel: "",
  dataEntryDate: null,
  appRef_CardNo: "",
  accNo_WfNo: "",
  applicantsName: "",
  dateOfBirth: null,
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
  grossFraudLoss: 0,
  potentialSavings: 0,
  potentialSavingsUsd: 0,
  recoveredAmount: 0,
  netFraudLoss: 0,
  reasonToSubmitBg: "",
  observeModulusOpr: "",
  recomendInBrief: "",
  conclusionStatus: "",
  scopeOfWork: "",
  fraudIdentifyDate: null,
  investigationConcludeDate: null,
  writeOffDate: null,
  timePeriod: "",
  caseHandledBy: "",
  nextActions: "",
  accountability: "",
  responsiblePerson: "",
  problemStatement: "",
  grossExposureUSD: 0,
  expectedRecovery_USD: 0,
  expectedNetLoss_USD: 0,
  actualRecovery_USD: 0,
  finalLossTaken_USD: 0,
  status_Open_Closed: "",
  lossRecognition: "",
  dataEntryMonth: 0,
  frmInvestigationProcessId: "",
  processInstanceId: null,
  executiveSummary: "",
  findings: ""
};

const parseDateString = (dateStr: string | null): string | null => {
  if (!dateStr) return null; // Return null if the date string is null or empty
  const parsedDate = dayjs(dateStr, "DD-MM-YYYY", true); // Use strict parsing
  return parsedDate.isValid() ? parsedDate.toISOString() : null; // Return ISO string if valid
};


const FrmDataEntryForm: FC<FrmDataEntryFormProps> = (props) => {
  const { dataEntry } = props;

  const { control, formState: { errors }, setValue } = useForm<FrmDataEntryType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(
      z.object({
        caseRefNo: z.string().min(1, "Case Ref No is required."),
      })
    )
  });

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  useEffect(() => {
    if (dataEntry) {
      // Map incoming data to form values, parsing dates
      setValue("caseRefNo", dataEntry.caseRefNo || "");
      setValue("caseReceived", parseDateString(dataEntry.caseReceived));
      setValue("channel", dataEntry.channel || "");
      setValue("dataEntryDate", parseDateString(dataEntry.dataEntryDate));
      setValue("appRef_CardNo", dataEntry.appRef_CardNo || "");
      setValue("accNo_WfNo", dataEntry.accNo_WfNo || "");
      setValue("applicantsName", dataEntry.applicantsName || "");
      setValue("dateOfBirth", parseDateString(dataEntry.dateOfBirth));
      setValue("nicPPNo", dataEntry.nicPPNo || "");
      setValue("product", dataEntry.product || "");
      setValue("customerCategoryDE", dataEntry.customerCategoryDE || "");
      setValue("companyName", dataEntry.companyName || "");
      setValue("suspisiousDocument", dataEntry.suspisiousDocument || "");
      setValue("bdmLm", dataEntry.bdmLm || "");
      setValue("staffID", dataEntry.staffID || "");
      setValue("staffName", dataEntry.staffName || "");
      setValue("dsrStaffInvolved", dataEntry.dsrStaffInvolved || "");
      setValue("applicantInvolved", dataEntry.applicantInvolved || "");
      setValue("escalationType", dataEntry.escalationType || "");
      setValue("grossFraudLoss", dataEntry.grossFraudLoss || 0);
      setValue("potentialSavings", dataEntry.potentialSavings || 0);
      setValue("potentialSavingsUsd", dataEntry.potentialSavingsUsd || 0);
      setValue("recoveredAmount", dataEntry.recoveredAmount || 0);
      setValue("netFraudLoss", dataEntry.netFraudLoss || 0);
      setValue("reasonToSubmitBg", dataEntry.reasonToSubmitBg || "");
      setValue("observeModulusOpr", dataEntry.observeModulusOpr || "");
      setValue("recomendInBrief", dataEntry.recomendInBrief || "");
      setValue("conclusionStatus", dataEntry.conclusionStatus || "");
      setValue("scopeOfWork", dataEntry.scopeOfWork || "");
      setValue("fraudIdentifyDate", parseDateString(dataEntry.fraudIdentifyDate));
      setValue("investigationConcludeDate", parseDateString(dataEntry.investigationConcludeDate));
      setValue("writeOffDate", parseDateString(dataEntry.writeOffDate));
      setValue("timePeriod", dataEntry.timePeriod || "");
      setValue("caseHandledBy", dataEntry.caseHandledBy || "");
      setValue("nextActions", dataEntry.nextActions || "");
      setValue("accountability", dataEntry.accountability || "");
      setValue("responsiblePerson", dataEntry.responsiblePerson || "");
      setValue("problemStatement", dataEntry.problemStatement || "");
      setValue("grossExposureUSD", dataEntry.grossExposureUSD || 0);
      setValue("expectedRecovery_USD", dataEntry.expectedRecovery_USD || 0);
      setValue("expectedNetLoss_USD", dataEntry.expectedNetLoss_USD || 0);
      setValue("actualRecovery_USD", dataEntry.actualRecovery_USD || 0);
      setValue("finalLossTaken_USD", dataEntry.finalLossTaken_USD || 0);
      setValue("status_Open_Closed", dataEntry.status_Open_Closed || "");
      setValue("lossRecognition", dataEntry.lossRecognition || "");
      setValue("dataEntryMonth", dataEntry.dataEntryMonth || 0);
      setValue("frmInvestigationProcessId", dataEntry.frmInvestigationProcessId || "");
      setValue("processInstanceId", dataEntry.processInstanceId || null);
      setValue("executiveSummary", dataEntry.executiveSummary ?? defaultValues.executiveSummary);
      setValue("findings", dataEntry.findings ?? defaultValues.findings);
    }
  }, [dataEntry, setValue]);

  return (
    <Paper className="px-12 pb-8">
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
          <div>DATA ENTRY - REF: {dataEntry?.businessKey}</div>
        </h1>
      </div>
      <form noValidate>
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
              <TextField disabled {...field} label="Case Ref No" fullWidth error={!!errors.caseRefNo} helperText={errors.caseRefNo?.message} />
            )}
          />

          <Controller
            name="caseReceived"
            control={control}
            render={({ field }) => {
              const formattedDate = field.value
                ? new Date(field.value).toLocaleDateString('en-GB')
                : '';
              return (
                <TextField
                  disabled
                  {...field}
                  value={formattedDate}
                  label="Case Received"
                  fullWidth

                />
              );
            }}
          />

          <Controller
            name="channel"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Channel" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="dataEntryMonth"
            control={control}
            render={({ field }) => {
              const selectedMonth = props.monthList.find((month) => month.id === field.value)?.name || "";
              return (
                <TextField
                  disabled
                  {...field}
                  value={selectedMonth}
                  label="Month"
                  fullWidth
                  error={!!errors.channel}
                  helperText={errors.channel?.message}
                />
              );
            }}
          />

          <Controller
            name="dataEntryDate"
            control={control}
            render={({ field }) => {
              const formattedDate = field.value
                ? new Date(field.value).toLocaleDateString('en-GB')
                : '';
              return (
                <TextField
                  disabled
                  {...field}
                  value={formattedDate}
                  label="Data Entry Date"
                  fullWidth

                />
              );
            }}
          />

          <Controller
            name="appRef_CardNo"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="AppRef Card No" fullWidth error={!!errors.appRef_CardNo} helperText={errors.appRef_CardNo?.message} />
            )}
          />


          <Controller
            name="accNo_WfNo"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Account No / WorkFlow No" fullWidth error={!!errors.accNo_WfNo} helperText={errors.accNo_WfNo?.message} />
            )}
          />

          <Controller
            name="applicantsName"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Applicant's Name" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => {
              const formattedDate = field.value
                ? new Date(field.value).toLocaleDateString('en-GB')
                : '';
              return (
                <TextField
                  disabled
                  {...field}
                  value={formattedDate}
                  label="Date Of Birth"
                  fullWidth

                />
              );
            }}
          />


          <Controller
            name="nicPPNo"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="NIC/PP No" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="product"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Product" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="customerCategoryDE"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Customer Category" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Company Name" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="suspisiousDocument"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Suspicious Document" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="bdmLm"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="BDM / LM" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="staffID"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Staff ID" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="staffName"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Staff Name" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="dsrStaffInvolved"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="DSR / Staff Involved" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="applicantInvolved"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Applicant Involved" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="escalationType"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Escalation Type" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="grossFraudLoss"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Gross Fraud Loss (LKR)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="potentialSavings"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Potential Savings (LKR)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="potentialSavingsUsd"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Potential Savings (USD)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="recoveredAmount"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Recovered Amount (LKR)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="netFraudLoss"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Net Fraud Loss (LKR)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="reasonToSubmitBg"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} multiline label="Reason to submit (Background)" fullWidth error={!!errors.reasonToSubmitBg} helperText={errors.reasonToSubmitBg?.message} />
            )}
          />

          <Controller
            name="executiveSummary"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} multiline label="Executive Summary" fullWidth error={!!errors.executiveSummary} helperText={errors.executiveSummary?.message} />
            )}
          />

          <Controller
            name="scopeOfWork"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} multiline label="Scope of work" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="problemStatement"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} multiline label="Approach" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="findings"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} multiline label="Findings" fullWidth error={!!errors.findings} helperText={errors.findings?.message} />
            )}
          />

          <Controller
            name="accountability"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} multiline label="People Involved and Extent of Involvement" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="observeModulusOpr"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} multiline label="MODUS OPERANDI" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="nextActions"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} multiline label="Immediate Actions Recommended" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="conclusionStatus"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} multiline label="Conclusion status" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="recomendInBrief"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} multiline label="Recommendations in brief" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="fraudIdentifyDate"
            control={control}
            render={({ field }) => {
              const formattedDate = field.value
                ? new Date(field.value).toLocaleDateString('en-GB')
                : '';
              return (
                <TextField
                  disabled
                  {...field}
                  value={formattedDate}
                  label="Fraud Identify Date"
                  fullWidth

                />
              );
            }}
          />

          <Controller
            name="investigationConcludeDate"
            control={control}
            render={({ field }) => {
              const formattedDate = field.value
                ? new Date(field.value).toLocaleDateString('en-GB')
                : '';
              return (
                <TextField
                  disabled
                  {...field}
                  value={formattedDate}
                  label="Investigation Conclude Date"
                  fullWidth

                />
              );
            }}
          />

          <Controller
            name="writeOffDate"
            control={control}
            render={({ field }) => {
              const formattedDate = field.value
                ? new Date(field.value).toLocaleDateString('en-GB')
                : '';
              return (
                <TextField
                  disabled
                  {...field}
                  value={formattedDate}
                  label="Write Off Date"
                  fullWidth

                />
              );
            }}
          />

          <Controller
            name="timePeriod"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Time Period" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="caseHandledBy"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Case handled by" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="responsiblePerson"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Responsible Person" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="grossExposureUSD"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Gross Exposure (USD)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="expectedRecovery_USD"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Expected Recovery (USD)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="expectedNetLoss_USD"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Expected Net Loss (USD)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="actualRecovery_USD"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Actual Recovery (USD)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="finalLossTaken_USD"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Final Loss Taken (USD)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="status_Open_Closed"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Status (Open/ Closed)" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

          <Controller
            name="lossRecognition"
            control={control}
            render={({ field }) => (
              <TextField disabled {...field} label="Loss Recognition" fullWidth error={!!errors.channel} helperText={errors.channel?.message} />
            )}
          />

        </div>
      </form>
    </Paper>
  );
};

export default memo(FrmDataEntryForm);
