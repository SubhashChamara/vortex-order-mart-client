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
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { FemFraudInvestForm } from "../../../../workflow/FrnFraudInvestigation/@types/FemFraudInvestForm";

export interface FraudFinalizingFormProps {
  form: FemFraudInvestForm | null
  task: string;
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

const FraudFinalizingForm: FC<FraudFinalizingFormProps> = ({ form, task }) => {
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
      responsible_person: ""
    },
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  console.log(errors)

  // Watch for `requiredApprovalType` to conditionally render fields
  const requiredApprovalType = watch("requiredApprovalType");
  const decisionEmail = watch("decisionEmail");

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

      <form>
        <div className="space-y-6">

          {/* Approval Type Dropdown */}
          <Controller
            name="requiredApprovalType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth disabled>
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
          {task === "task1" && requiredApprovalType === "E mail Approval needed" && (
            <>
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
                          disabled
                          value="CONFIRMED FRAUD"
                          control={<Radio />}
                          label="Confirmed Fraud"
                          className="flex items-center"
                        />
                        <FormControlLabel
                          disabled
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
              {/* Email Body */}
              <FormControl fullWidth>

                <div className="mb-6">
                  <Controller
                    name="responsible_person"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled
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
                      disabled
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
                    disabled
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

          {task === "task1" && requiredApprovalType === "WF Approval needed" && (
            <>
              {/* Memo Attached Checkbox */}
              <FormControlLabel
                control={
                  <Controller
                    disabled
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

          {task === "task2" && requiredApprovalType === "WF Approval needed" && (
            <>
              <Controller
                disabled
                name="memoAttached"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Memo Attached"
                    disabled
                  />
                )}
              />
              <br />
              <FormControl component="fieldset">
                <div className="flex flex-row items-center space-x-4">
                  <p className="font-medium">Fraud Status: </p>
                  <Controller
                    name="fraudStatus"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel
                          disabled
                          value="CONFIRMED FRAUD"
                          control={<Radio />}
                          label="Confirmed Fraud"
                        />
                        <FormControlLabel
                          disabled
                          value="NO FRAUD"
                          control={<Radio />}
                          label="No Fraud"
                        />
                      </RadioGroup>
                    )}
                  />
                </div>
              </FormControl>
              <br />
              <FormControl component="fieldset">
                <div className="flex flex-row items-center space-x-4">
                  <p className="font-medium">Final Decision Email Required:</p>
                  <Controller
                    name="decisionEmail"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel disabled value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel disabled value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    )}
                  />
                </div>

              </FormControl>
              {decisionEmail === "Yes" && (
                <>
                  <TextField
                    label="Responsible Person"
                    disabled
                    fullWidth
                    {...control.register("responsible_person")}
                  />
                  <TextField
                    label="Email Body"
                    disabled
                    fullWidth
                    multiline
                    rows={4}
                    {...control.register("emailBody")}
                  />
                </>
              )}
            </>
          )}

          {task === "task3" && requiredApprovalType === "E mail Approval needed" && (
            <>
              <FormControl component="fieldset">
                <div className="flex flex-col space-y-4">
                  {/* Memo Attached */}
                  <div>
                    <FormControlLabel disabled
                      control={
                        <Controller
                          disabled
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
                      disabled
                      name="fraudStatus"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          <FormControlLabel
                            disabled
                            value="CONFIRMED FRAUD"
                            control={<Radio />}
                            label="Confirmed Fraud"
                          />
                          <FormControlLabel
                            disabled
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
                          disabled
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
                          <FormControlLabel disabled value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel disabled value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      )}
                    />
                  </div>
                </div>
              </FormControl>
              {decisionEmail === "Yes" && (
                <>
                  <TextField
                    disabled
                    label="Responsible Person"
                    fullWidth
                    {...control.register("responsible_person")}
                  />
                  <TextField
                    disabled
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
      </form>
    </Paper>
  );
};

export default FraudFinalizingForm;

