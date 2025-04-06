import { Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { formatCurrency } from "../../../../../workflow/bundle/@helpers/Common";

interface ResidentialAndProfessionalForm {
  userType: "primary" | "joint";
}

const ResidentialAndProfessionalFormPrimary: React.FC<
  ResidentialAndProfessionalForm
> = ({ userType }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="feather:user"
          title="Residence and Professional Information"
        />

        <div className="flex flex-col gap-14">
          <div className="flex flex-row gap-14">
            {/* address 1 controller */}
            <Controller
              name={`primaryResAddress1`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  label="Address 1"
                  size="small"
                  type="text"
                />
              )}
            />

            {/* address 2 controller */}
            <Controller
              name={`primaryResAddress2`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  label="Address 2"
                  size="small"
                  type="text"
                />
              )}
            />
          </div>

          <div className="flex flex-row gap-14">
            {/* address 3 controller */}
            <Controller
              name={`primaryResAddress3`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  label="Address 3"
                  size="small"
                  type="text"
                />
              )}
            />

            {/* res status controller */}
            <Controller
              name={`primaryResStatus`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  label="Resident Status"
                  size="small"
                  type="text"
                />
              )}
            />
          </div>

          <div className="flex flex-row gap-14">
            {/* income controller */}
            <Controller
              name={`primaryMonthlyIncome`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  label="Monthly Fixed Income"
                  size="small"
                  type="text"
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
                  InputProps={{
                    inputProps: { style: { textAlign: "right" } },
                  }}
                  error={!!errors.primaryMonthlyIncome}
                  helperText={<>{errors.primaryMonthlyIncome?.message}</>}
                />
              )}
            />

            {/* master number controller */}
            <Controller
              name={`primaryMasterNumber`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  label="Master Number"
                  size="small"
                  type="text"
                />
              )}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ResidentialAndProfessionalFormPrimary;
