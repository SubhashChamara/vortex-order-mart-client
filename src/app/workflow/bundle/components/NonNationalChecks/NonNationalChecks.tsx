import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

export interface NonNationalChecksProps {
  editable: boolean;
}

const NonNationalChecks: React.FC<NonNationalChecksProps> = ({ editable }) => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <div className="grid grid-cols-3 gap-12">
      <Paper className="px-12 pb-10 w-full col-span-1">
        <Ve3FormHeader
          icon="material-outline:local_offer"
          title="Free Waiver"
        />
        <div className="flex flex-col gap-9 border border-primary rounded-sm pl-10">
          {/* Existing SCB customer controller */}
          <div className="w-full flex flex-row justify-between items-center">
            <p>Annual Fee Waiver</p>
            <Controller
              name="isAnnualFeeWaived"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  disabled={!editable}
                  control={<Checkbox {...field} checked={field.value} />}
                  label=""
                />
              )}
            />
          </div>
          {/* Existing SCB customer controller */}
          <div className="w-full flex flex-row justify-between items-center">
            <p>Joining Fee Waiver</p>
            <Controller
              name="isJoiningFeeWaived"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  disabled={!editable}
                  control={<Checkbox {...field} checked={field.value} />}
                  label=""
                />
              )}
            />
          </div>
        </div>
      </Paper>
      <Paper className="px-12 pb-10 w-full col-span-2">
        <Ve3FormHeader icon="feather:globe" title="Non National" />
        <div className="grid grid-cols-2 gap-12">
          {/* left */}
          <div className="flex flex-col gap-9">
            {/* Non national controller */}
            <div className="w-full flex flex-row justify-between items-center">
              <p style={{ maxWidth: "80%" }}>Non National</p>
              <Controller
                name="isNonNational"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    disabled={!editable}
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              />
            </div>

            {/* Min salary controller */}
            <div className="w-full flex flex-row justify-between items-center">
              <p style={{ maxWidth: "80%" }}>
                Minimum Per Month Salary USD 2,500/-
              </p>
              <Controller
                name="hasMinimumMonthlySalary"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    disabled={!editable}
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              />
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col gap-9">
            {/* Dep letter controller */}
            <div className="w-full flex flex-row justify-between items-center">
              <p style={{ maxWidth: "80%" }}>Departure Letter</p>
              <Controller
                name="hasDepartureLetter"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    disabled={!editable}
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              />
            </div>

            {/* Dep letter controller */}
            <div className="w-full flex flex-row justify-between items-center">
              <p style={{ maxWidth: "80%" }}>
                E-mail Confirmation From WB On Being Top 5 Executives Of A
                Corporate Company
              </p>
              <Controller
                name="hasEmailConfirmationTop5CorporateExecutive"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    disabled={!editable}
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default NonNationalChecks;
