import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { DropDownItem } from "../../../../core/types/DropDown";
import { formatCurrency } from "../../@helpers/Common";

interface ALPLUnderwriterChecklistProps {
  editable: boolean;
  statusEditable?: boolean;
  uwLevelDropdowns: DropDownItem[];
}

const ALPLApprovalDetails: React.FC<ALPLUnderwriterChecklistProps> = ({
  editable,
  statusEditable,
  uwLevelDropdowns,
}) => {
  const { control, formState, watch } = useFormContext();
  const { errors } = formState;

  const loanApprovalStatus = watch("loanApprovalStatus");

  return (
    <Paper className="px-12 pb-10">
      <Ve3FormHeader
        icon="feather:check-square"
        title={
          <p>
            Loan Approval Details{" "}
            {loanApprovalStatus === false && (
              <span className="text-primary">- Rejected</span>
            )}
          </p>
        }
      />

      <div className="grid grid-cols-1 gap-12">
        <Controller
          name="loanApprovalStatus"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => {
            const isDisabled =
              !editable && (statusEditable === undefined || !statusEditable);

            return (
              <RadioGroup
                value={value}
                onChange={(e) => onChange(e.target.value === "true")}
                {...rest}
              >
                <div className="flex justify-between items-center w-full flex-row">
                  <p className="font-bold">Status:</p>
                  <div className="flex items-center gap-4">
                    <FormControlLabel
                      disabled={isDisabled}
                      value="true"
                      control={<Radio />}
                      label="Approved"
                      className="text-gray-700"
                    />
                    <FormControlLabel
                      disabled={isDisabled}
                      value="false"
                      control={<Radio />}
                      label="Rejected"
                      className="text-gray-700"
                    />
                  </div>
                </div>
              </RadioGroup>
            );
          }}
        />

        <Controller
          name="loanApproverLevel"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              options={uwLevelDropdowns || []}
              disabled={!editable}
              getOptionLabel={(option) => (option ? option.name : "")}
              isOptionEqualToValue={(option, val) => option.id === val.id}
              value={value}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Approver Level"
                  variant="outlined"
                  size="small"
                  helperText={<>{errors.ccApproverLevel?.message}</>}
                  error={!!errors.ccApproverLevel}
                />
              )}
            />
          )}
        />

        <Controller
          name="loanApprovalCap"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="CAP"
              disabled={!editable}
              size="small"
              type="text"
              helperText={<>{errors.ccApprovalCap?.message}</>}
              error={!!errors.ccApprovalCap}
              onChange={(e) => field.onChange(formatCurrency(e.target.value))}
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

        <div className="grid grid-cols-2 gap-12">
          <Controller
            name="loanRequestAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Requested Amount"
                disabled
                size="small"
                type="text"
                helperText={<>{errors.loanRequestAmount?.message}</>}
                error={!!errors.loanRequestAmount}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
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
            name="loanApprovalLimit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Approved Amount"
                required
                disabled={!editable}
                size="small"
                type="text"
                helperText={<>{errors.loanApprovalLimit?.message}</>}
                error={!!errors.loanApprovalLimit}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
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
            name="loanNetAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Net Amount"
                required
                disabled={!editable}
                size="small"
                type="text"
                helperText={<>{errors.loanNetAmount?.message}</>}
                error={!!errors.loanNetAmount}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
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
            name="isLoanApprovalAttached"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                disabled={!editable}
                control={<Checkbox {...field} checked={field.value} />}
                label="Approval Attached"
              />
            )}
          />
        </div>
      </div>
    </Paper>
  );
};

export default ALPLApprovalDetails;
