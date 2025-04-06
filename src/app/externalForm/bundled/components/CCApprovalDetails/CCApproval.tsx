import { Autocomplete, Paper, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { DropDownItem } from "../../../../core/types/DropDown";

import { formatCurrency } from "../../../../workflow/bundle/@helpers/Common";
import CCAprovalStatus from "./CCAprovalStatus";

interface CCCUnderwriterChecklistProps {
  editable: boolean;
  ccStatusEditable: boolean;
  uwLevelDropdowns: DropDownItem[];
}

const CCUnderwriterChecklist: React.FC<CCCUnderwriterChecklistProps> = ({
  editable,
  ccStatusEditable,
  uwLevelDropdowns,
}) => {
  const { control, formState, watch } = useFormContext();
  const { errors } = formState;
  const ccApprovalStatus = watch("ccApprovalStatus");

  return (
    <Paper className="px-12 pb-10 h-full">
      <Ve3FormHeader
        icon="feather:check-square"
        title={
          <p>
            Credit Card Approval Details{" "}
            {ccApprovalStatus === false && (
              <span className="text-primary">- Rejected</span>
            )}
          </p>
        }
      />

      <div className="grid grid-cols-1 gap-12">
        <CCAprovalStatus editable={ccStatusEditable} />

        <Controller
          name="ccApproverLevel"
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
          name="ccApprovalCap"
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

        <Controller
          name="ccApprovalLimit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Approved Limit"
              required
              disabled={!editable}
              size="small"
              type="text"
              helperText={<>{errors.ccApprovalLimit?.message}</>}
              error={!!errors.ccApprovalLimit}
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
      </div>
    </Paper>
  );
};

export default CCUnderwriterChecklist;
