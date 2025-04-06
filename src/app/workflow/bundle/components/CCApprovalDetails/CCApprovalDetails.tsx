import {
  Autocomplete,
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

interface CCCUnderwriterChecklistProps {
  editable: boolean;
  uwLevelDropdowns: DropDownItem[];
}

const CCUnderwriterChecklist: React.FC<CCCUnderwriterChecklistProps> = ({
  editable,
  uwLevelDropdowns,
}) => {
  // const underwriterLevelDropdowns: DropDownItem[] = [
  //   { id: 1, name: "Option 1" },
  //   { id: 2, name: "Option 2" },
  //   { id: 3, name: "Option 3" },
  // ];
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
        <Controller
          name="ccApprovalStatus"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <RadioGroup
              value={value}
              onChange={(e) => onChange(e.target.value === "true")}
              {...rest}
            >
              <div className="flex justify-between items-center w-full flex-row">
                <p className="font-bold">Status:</p>
                <div className="flex items-center gap-4">
                  <FormControlLabel
                    disabled={!editable}
                    value="true"
                    control={<Radio />}
                    label="Approved"
                    className="text-gray-700"
                  />
                  <FormControlLabel
                    disabled={!editable}
                    value="false"
                    control={<Radio />}
                    label="Rejected"
                    className="text-gray-700"
                  />
                </div>
              </div>
            </RadioGroup>
          )}
        />

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
