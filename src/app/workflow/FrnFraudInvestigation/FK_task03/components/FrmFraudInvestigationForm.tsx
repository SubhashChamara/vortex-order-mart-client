import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { FemFraudInvestForm } from "../../@types/FemFraudInvestForm";
import { Api } from "../../../../../api/Api";
import { DocumentInfo } from "../../../../core/types/DocumentInfo";
import { Pageable } from "../../../../../api/types/Pageable";
import { DocumentListParams } from "../../../../../api/types/params/DocumentListParams";
import Logger from "../../../../../@helpers/Logger";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";

export interface FraudFinalizingFormProps {
  procId: string;
  form: FemFraudInvestForm | null
  task: TaskDetailInfo;
}

type FormData = {
  requiredApprovalType: string;
  emailBody: string;
  fraudStatus?: string;
  memoAttached?: boolean;
  decisionEmail: string;
  emailApprovalAttached: boolean;
  background: string;
  scopeOfWork: string;
  investigation: string;
  modusOperandi: string;
  conclution: string;
  prepared_by: string;
  approved_by: string;
  memoGenDate: Date;
  responsible_person: string;
  investigationFlowProcInst: string;
  processInstance: string;
};

const defaultValues: FormData = {
  requiredApprovalType: "",
  fraudStatus: "",
  memoAttached: false,
  decisionEmail: "",
  emailApprovalAttached: false,
  background: "",
  scopeOfWork: "",
  investigation: "",
  modusOperandi: "",
  conclution: "",
  prepared_by: "",
  approved_by: "",
  responsible_person: ""
};

const FraudFinalizingForm: FC<FraudFinalizingFormProps> = ({ procId, form, task }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [documentList, setDocumentList] = useState<Pageable<DocumentInfo> | null>(null);
  const [page, setPage] = useState<number>(0);

  const schema = z.object({
    fraudStatus: z.string().min(1, "Fraud Status is required"),
    requiredApprovalType: z.string().min(1, "Approval Type is required"),
    memoAttached: z.boolean().optional(),
    decisionEmail: z.string().optional(),
    responsible_person: z.string().optional(),
    emailBody: z.string().optional(),
    emailApprovalAttached: z.boolean().refine((val) => val === true, {
      message: "Email Approval Attached is required",
    }),
  });

  const { control, handleSubmit, formState, watch, setValue } = useForm<FormData>({
    defaultValues: {
      fraudStatus: "",
      requiredApprovalType: "",
      memoAttached: false,
      decisionEmail: "",
      responsible_person: "",
      emailBody: "",
      emailApprovalAttached: false,
    },
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  // Watch for dynamic field conditions
  const requiredApprovalType = watch("requiredApprovalType");
  const decisionEmail = watch("decisionEmail");

  const handleFetchDocumentList = async () => {
    if (procId === null) {
      return null;
    }

    const params: DocumentListParams = {
      processInstance: procId,
      page: page,
      size: 3,
      sort: "createdDate,desc",
      endDate: null,
      startDate: null,
      idProcess: null,
      workflowLabel: null,
      processName: null,
    };

    const { data, err } = await Api.performRequest((r) => r.document.list(params));
    Logger.debug(
      "(Document List) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setDocumentList(data);
      return data;
    }

    return null;
  };

  const onSubmit = async (formData: FormData) => {
    if (isSubmitted) {
      toast.warn("Form already submitted");
      return;
    }

    const documentData = await handleFetchDocumentList();

    if (!documentData || !documentData?.content || documentData?.content.length === 0) {
      toast.error("Please attach Email before saving.");
      return;
    }
    const request: Partial<FemFraudInvestForm> = {
      requiredApprovalType: formData.requiredApprovalType,
      emailBody: formData.emailBody,
      fraudStatus: formData.fraudStatus,
      memoAttached: formData.memoAttached,
      decisionEmail: formData.decisionEmail,
      emailApprovalAttached: formData.emailApprovalAttached,
      responsible_person: formData.responsible_person,
      processInstance: procId,
      taskInstance: task.taskInstance,
      taskType: "TASK_03"
    };

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.saveFraudInvestForm(request, procId)
    );

    if (err === null) {
      toast.success("Your Request Was Saved Successfully");
      setIsSubmitted(true);
    } else {
      toast.error(err.msg);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };


  useEffect(() => {
    if (form) {
      setValue("requiredApprovalType", form.requiredApprovalType ?? defaultValues.requiredApprovalType);
      setValue("fraudStatus", form.fraudStatus ?? defaultValues.fraudStatus);
      setValue("memoAttached", form.memoAttached ?? defaultValues.memoAttached);
      setValue("emailApprovalAttached", form.emailApprovalAttached ?? defaultValues.emailApprovalAttached);
      setValue("decisionEmail", form.decisionEmail ?? defaultValues.decisionEmail);
      setValue("responsible_person", form.responsible_person ?? defaultValues.responsible_person);
      setValue("emailBody", form.emailBody ?? defaultValues.emailBody);
    }
  }, [form, setValue]);

  return (
    <Paper className="px-12 py-8">
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex text-blue-gray-800">
          <EdgeSvgIcon className="icon-size-18 cursor-pointer mr-3" color="error">
            feather:alert-triangle
          </EdgeSvgIcon>
          FRAUD FINALIZING DETAILS
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-6">
          {/* Approval Type Dropdown */}
          <Controller
            name="requiredApprovalType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Required Approval Type</InputLabel>
                <Select {...field} label="Required Approval Type" disabled>
                  <MenuItem value="" disabled>
                    Please Select
                  </MenuItem>
                  <MenuItem value="WF Approval needed">
                    Approval via Workflow
                  </MenuItem>
                  <MenuItem value="E mail Approval needed">
                    Approval via Email
                  </MenuItem>
                  <MenuItem value="FRAUD_FINALISING_WITHOUT_APPROVAL">
                    Without Approval
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.requiredApprovalType && (
            <p className="text-red-500 text-xs">
              {errors.requiredApprovalType.message}
            </p>
          )}

          {/* Conditional Fields for Email Approval */}
          {requiredApprovalType === "E mail Approval needed" && (
            <>
              <FormControl component="fieldset">
                <div className="flex flex-col space-y-4">
                  {/* Memo Attached */}
                  <div>
                    <FormControlLabel disabled
                      control={
                        <Controller
                          name="memoAttached"
                          control={control}
                          render={({ field }) => (
                            <Checkbox {...field} checked={field.value} disabled />
                          )}
                        />
                      }
                      label="Memo Attached"
                    />
                  </div>
                  {/* Fraud Status */}
                  <div>
                    <p className="font-medium mb-2">Fraud Status:</p>
                    <Controller
                      name="fraudStatus"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          <FormControlLabel
                            value="CONFIRMED FRAUD"
                            control={<Radio />}
                            label="Confirmed Fraud"
                          />
                          <FormControlLabel
                            value="NO FRAUD"
                            control={<Radio />}
                            label="No Fraud"
                          />
                        </RadioGroup>
                      )}
                    />
                    {errors.fraudStatus && (
                      <p className="text-red-500 text-xs">{errors.fraudStatus.message}</p>
                    )}
                  </div>

                  {/* Email Approval Attached */}
                  <div>
                    <FormControlLabel
                      control={
                        <Controller
                          name="emailApprovalAttached"
                          control={control}
                          render={({ field }) => (
                            <Checkbox {...field} checked={field.value} />
                          )}
                        />
                      }
                      label="Email Approval Attached"
                    />
                    {errors.emailApprovalAttached && (
                      <p className="text-red-500 text-xs">{errors.emailApprovalAttached.message}</p>
                    )}
                  </div>


                  {/* Final Decision Email Required */}
                  <div>
                    <p className="font-medium mb-2">Final Decision Email Required:</p>
                    <Controller
                      name="decisionEmail"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      )}
                    />
                  </div>
                </div>
              </FormControl>
              {decisionEmail === "Yes" && (
                <>
                  <TextField
                    label="Responsible Person"
                    fullWidth
                    {...control.register("responsible_person")}
                  />
                  <TextField
                    label="Email Body"
                    fullWidth
                    multiline
                    rows={4}
                    {...control.register("emailBody")}
                  />
                </>
              )}

            </>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-left my-6">
          <Button
            aria-label="Save"
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitted}
          >
            <EdgeSvgIcon
              className="icon-size-12 cursor-pointer text-white mr-3"
              color="error"
            >
              feather:save
            </EdgeSvgIcon>
            Save Details
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default FraudFinalizingForm;

