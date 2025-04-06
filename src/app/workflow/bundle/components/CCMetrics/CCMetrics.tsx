import { Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { formatCurrency } from "../../@helpers/Common";

interface CCMetricsProps {
  editable: boolean;
}

const CCMetrics: React.FC<CCMetricsProps> = ({ editable }) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <Paper className="px-12 pb-10 h-full">
      <Ve3FormHeader icon="feather:check-square" title="Metrics" />
      <div className="grid grid-cols-1 gap-12">
        <Controller
          name="ccDsr"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={!editable}
              required
              label="DSR"
              size="small"
              type="text"
              inputProps={{
                inputProps: { style: { textAlign: "right" } },
                inputMode: "decimal",
                pattern: "[0-9]*\\.?[0-9]*",
              }}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  field.onChange(value);
                }
              }}
              helperText={<>{errors.ccDsr?.message}</>}
              error={!!errors.ccDsr}
            />
          )}
        />

        <Controller
          name="ccDti"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="DTI"
              required
              disabled={!editable}
              size="small"
              type="text"
              helperText={<>{errors.ccDti?.message}</>}
              error={!!errors.ccDti}
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
          name="ccGrossIncome"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Gross Income"
              required
              disabled={!editable}
              size="small"
              type="text"
              helperText={<>{errors.ccGrossIncome?.message}</>}
              error={!!errors.ccGrossIncome}
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

export default CCMetrics;
