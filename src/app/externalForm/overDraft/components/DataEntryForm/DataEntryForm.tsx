import { Autocomplete, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { DropDownItem } from "../../../../core/types/DropDown";
import { formatCurrency } from "../../../../workflow/bundle/@helpers/Common";
import { UWUser } from "../../../../workflow/overDraft/@types/UWUser";

interface DataEntryFormProps {
  editable: boolean;
  loanTypeDropdowns: DropDownItem[];
  uwUsers: UWUser[];
}

const DataEntryForm: React.FC<DataEntryFormProps> = ({
  editable,
  loanTypeDropdowns,
  uwUsers,
}) => {
  const { control, setValue, formState } = useFormContext();
  const { errors } = formState;

  useEffect(() => {
    setValue("currentStep", 7);
  }, []);

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:pen-tool" title="Data Entry" />

        <div className="grid grid-cols-2 gap-14">
          {/* loan type controller */}
          <Controller
            name="productLoanType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={loanTypeDropdowns}
                disabled={!editable}
                className=""
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Product"
                    variant="outlined"
                    // required
                    size="small"
                    error={!!errors.productLoanType}
                    helperText={<>{errors.productLoanType?.message}</>}
                  />
                )}
              />
            )}
          />

          <Controller
            name="approvedLevelAndUser"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={!editable}
                options={uwUsers}
                getOptionLabel={(option) =>
                  option
                    ? `${option.userName} (${option.underWriterLevel})`
                    : ""
                }
                isOptionEqualToValue={(option, val) => {
                  if (!option || !val) return false;
                  return option.userId === val.userId;
                }}
                value={value || null}
                onChange={(event, newValue) => {
                  onChange(newValue || null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Approved Level & User"
                    variant="outlined"
                    size="small"
                    error={!!errors.approvedLevelAndUser}
                    helperText={<>{errors.approvedLevelAndUser?.message}</>}
                  />
                )}
              />
            )}
          />

          <Controller
            name="approvedLevel"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled
                label="Approver Level"
                size="small"
                type="text"
                error={!!errors.approvedLevel}
                helperText={<>{errors.approvedLevel?.message}</>}
              />
            )}
          />

          <Controller
            name="approvedLevelUser"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled
                label="Approver Level User"
                size="small"
                type="text"
                error={!!errors.approvedLevelUser}
                helperText={<>{errors.approvedLevelUser?.message}</>}
              />
            )}
          />

          <Controller
            name="approvedAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled={!editable}
                label="Approved Amount"
                size="small"
                type="text"
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                error={!!errors.approvedAmount}
                helperText={<>{errors.approvedAmount?.message}</>}
              />
            )}
          />

          <Controller
            name="l2l3Cap"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled={!editable}
                label="L2/L3 Cap"
                size="small"
                type="text"
                error={!!errors.l2l3Cap}
                helperText={<>{errors.l2l3Cap?.message}</>}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default DataEntryForm;
