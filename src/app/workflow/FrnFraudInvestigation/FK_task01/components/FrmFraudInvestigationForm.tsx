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
import { Api } from "../../../../../api/Api";
import { FemFraudInvestForm } from "../../@types/FemFraudInvestForm";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";

export interface FraudFinalizingFormProps {
  procId: string;
  form: FemFraudInvestForm | null
  task: TaskDetailInfo
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
  responsible_person: "",
  emailBody: "",
  investigationFlowProcInst: "",
  processInstance: ""
};

const FraudFinalizingForm: FC<FraudFinalizingFormProps> = ({ procId, form, task }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = z.object({
    fraudStatus: z.string().min(1, "Fraud Status is required"),
    requiredApprovalType: z.string().min(1, "Approval Type is required"),
    emailBody: z
      .string()
      .optional(),
    memoAttached: z.boolean().optional(),
    responsible_person: z.string().optional()
  });

  const { control, handleSubmit, formState, watch, setValue } = useForm<FormData>({
    defaultValues: {
      fraudStatus: "",
      requiredApprovalType: "",
      emailBody: "",
      memoAttached: false,
      responsible_person:""
    },
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  console.log(errors)

  // Watch for `requiredApprovalType` to conditionally render fields
  const requiredApprovalType = watch("requiredApprovalType");

  const onSubmit = async (formData: FormData) => {
    if (isSubmitted) {
      toast.warn("Form already submitted");
      return;
    }
    setIsSubmitted(true);

    const { requiredApprovalType, emailBody, fraudStatus, memoAttached, decisionEmail, emailApprovalAttached, background, scopeOfWork, investigation, modusOperandi, conclution, prepared_by
      , approved_by, memoGenDate, responsible_person, investigationFlowProcInst, processInstance
    } = formData;

    const request: FemFraudInvestForm = {
      requiredApprovalType,
      emailBody,
      fraudStatus,
      memoAttached,
      decisionEmail,
      emailApprovalAttached,
      background,
      scopeOfWork,
      investigation,
      modusOperandi,
      conclution,
      prepared_by,
      approved_by,
      memoGenDate,
      responsible_person,
      investigationFlowProcInst,
      processInstance: procId,
      taskInstance: task.taskInstance,
      taskType: "TASK_01"
    };

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.saveFraudInvestForm(request, procId)
    );

    if (err === null) {
      toast.success("Your Request Was Saved Successfully");
      setIsSubmitted(false);
    } else {
      toast.error(err.msg);
      setTimeout(() => setIsSubmitted(false), 3000);
    }

    // setTimeout(() => {
    //   console.log("Submitted Data:", data);
    //   toast.success("Details saved successfully!");
    //   setIsSubmitted(false);
    // }, 1000);
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
          {/* Fraud Status Radio Group */}
          <FormControl component="fieldset">
            <div className="flex flex-row items-center space-x-4">
              <p className="font-medium">Fraud Status: </p>
              <Controller
                name="fraudStatus"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="CONFIRMED FRAUD"
                      control={<Radio />}
                      label="Confirmed Fraud"
                      className="flex items-center"
                    />
                    <FormControlLabel
                      value="NO FRAUD"
                      control={<Radio />}
                      label="No Fraud"
                      className="flex items-center"
                    />
                  </RadioGroup>
                )}
              />
            </div>
            {errors.fraudStatus && (
              <p className="text-red-500 text-xs">{errors.fraudStatus.message}</p>
            )}
          </FormControl>

          {/* Approval Type Dropdown */}
          <Controller
            name="requiredApprovalType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Required Approval Type</InputLabel>
                <Select {...field} label="Required Approval Type">
                  <MenuItem value="" disabled>
                    Please Select
                  </MenuItem>
                  <MenuItem value="E mail Approval needed">
                    Approval via Email
                  </MenuItem>
                  <MenuItem value="WF Approval needed">
                    Approval via Workflow
                  </MenuItem>
                  {/* <MenuItem value="FRAUD_FINALISING_WITHOUT_APPROVAL">
                    Without Approval
                  </MenuItem> */}
                </Select>
              </FormControl>
            )}
          />
          {errors.requiredApprovalType && (
            <p className="text-red-500 text-xs">
              {errors.requiredApprovalType.message}
            </p>
          )}

          {/* Conditional Fields for Approval Type */}
          {requiredApprovalType === "E mail Approval needed" && (
            <>
              {/* Email Body */}
              <FormControl fullWidth>

                <div className="mb-6">
                  <Controller
                    name="responsible_person"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Responsible Person"
                        variant="outlined"
                        error={!!errors.responsible_person}
                        helperText={errors.responsible_person?.message}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="emailBody"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email Body"
                      multiline
                      rows={4}
                      variant="outlined"
                      error={!!errors.emailBody}
                      helperText={errors.emailBody?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Controller
                    name="memoAttached"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                }
                label="Memo Attached"
              />
            </>
          )}

          {requiredApprovalType === "WF Approval needed" && (
            <>
              {/* Memo Attached Checkbox */}
              <FormControlLabel
                control={
                  <Controller
                    name="memoAttached"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                }
                label="Memo Attached"
              />
            </>
          )}
        </div>

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

