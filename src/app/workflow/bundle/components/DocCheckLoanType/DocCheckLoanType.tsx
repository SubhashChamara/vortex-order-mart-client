import { Autocomplete, Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { DropDownItem } from "../../../../core/types/DropDown";

interface DocCheckLoanTypeProps {
  editable: boolean;
  loanTypeDropdowns: DropDownItem[];
}

const DocCheckLoanType: React.FC<DocCheckLoanTypeProps> = ({
  editable,
  loanTypeDropdowns,
}) => {
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="material-outline:request_quote"
          title="Loan Type"
        />

        <Controller
          name="loanApplicationType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              disabled={!editable}
              options={loanTypeDropdowns || []}
              getOptionLabel={(option) => (option ? option.name : "")}
              isOptionEqualToValue={(option, val) => option.id === val.id}
              value={value}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Loan Type"
                  variant="outlined"
                  required
                  size="small"
                  helperText={<>{errors.loanApplicationType?.message}</>}
                  error={!!errors.loanApplicationType}
                />
              )}
            />
          )}
        />
      </Paper>
    </div>
  );
};

export default DocCheckLoanType;
