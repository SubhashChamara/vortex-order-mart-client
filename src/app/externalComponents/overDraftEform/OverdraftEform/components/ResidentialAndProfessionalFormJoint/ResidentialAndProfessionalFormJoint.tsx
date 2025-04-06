import { Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { formatCurrency } from "../../../../../workflow/bundle/@helpers/Common";

interface ResidentialAndProfessionalFormProps {
  userType: "primary" | "joint";
  editable: boolean;
}

const ResidentialAndProfessionalFormJoint: React.FC<
  ResidentialAndProfessionalFormProps
> = ({ userType, editable }) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;
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
              name={`jointResAddress1`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Address 1"
                  size="small"
                  type="text"
                />
              )}
            />

            {/* address 2 controller */}
            <Controller
              name={`jointResAddress2`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
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
              name={`jointResAddress3`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Address 3"
                  size="small"
                  type="text"
                />
              )}
            />

            {/* res status controller */}
            <Controller
              name={`jointResStatus`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
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
              name={`jointMonthlyIncome`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Monthly Fixed Income"
                  size="small"
                  type="text"
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
                  InputProps={{
                    inputProps: { style: { textAlign: "right" } },
                  }}
                />
              )}
            />

            {/* master number controller */}
            <Controller
              name={`jointMasterNumber`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Master Number"
                  size="small"
                  type="text"
                />
              )}
            />
          </div>
          {userType == "joint" && (
            <div className="flex w-1/2 pr-7">
              {/* relationship controller */}
              <Controller
                name={`jointRelationshipWithPrimary`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    disabled={!editable}
                    label="Relationship with the Primary User"
                    size="small"
                    type="text"
                    helperText={
                      <>{errors.jointRelationshipWithPrimary?.message}</>
                    }
                    error={!!errors.jointRelationshipWithPrimary}
                  />
                )}
              />
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default ResidentialAndProfessionalFormJoint;
