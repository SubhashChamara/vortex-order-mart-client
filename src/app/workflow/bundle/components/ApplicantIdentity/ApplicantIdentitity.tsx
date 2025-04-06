import { Checkbox, FormControlLabel, Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { NicDetails } from "../../../../core/types/NicDetails";

interface ApplicantIdentitityProps {
  editable: boolean;
}

const ApplicantIdentitity: React.FC<ApplicantIdentitityProps> = ({
  editable
}) => {
  const methods = useFormContext();
  const { control, formState, watch } = methods;
  const { errors } = formState;


  const applicantNic = watch("applicantNic");
  const applicantEic = watch("applicantEic");
  const applicantAdditionalNic = watch("applicantAdditionalNic");
  const applicantAdditionalEic = watch("applicantAdditionalEic");

  return (
    <Paper className="px-12 pb-10 w-full">
      <Ve3FormHeader
        icon="heroicons-outline:identification"
        title="Applicant Identity"
      />
      <div className="flex flex-col gap-9 w-full">
        <div className="justify-center p-9 border border-gray-400 h-full rounded-sm">
          <div className="flex flex-col gap-9">
            <div className="w-full flex flex-row justify-between pb-9">
              <p>Applicant NIC Number</p>
              {/* <p>Primary ID</p> */}
            </div>

            {/* old nic row*/}
            <div className="flex flex-row w-full gap-12">
              {/* Applicant NIC Controller */}
              <Controller
                name="applicantNic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    required
                    label="Old NIC"
                    size="small"
                    type="text"
                    className="pr-10"
                    helperText={<>{errors.applicantNic?.message}</>}
                    error={!!errors.applicantNic}
                  // required
                  />
                )}
              />

              {/* Checkbox Controller */}
              {/* <Controller
                name="isApplicantNicPrimary"
                control={control}
                disabled={!editable || applicantNic === ""}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              /> */}
            </div>

            {/* new nic row */}
            <div className="flex flex-row w-full gap-12">
              {/* Applicant EIC Controller */}
              <Controller
                name="applicantEic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    required
                    label="New NIC (EIC)"
                    size="small"
                    type="text"
                    className="pr-10"
                    // required
                    helperText={<>{errors.applicantEic?.message}</>}
                    error={!!errors.applicantEic}
                  />
                )}
              />

              {/* Checkbox Controller */}
              {/* <Controller
                name="isApplicantEicPrimary"
                control={control}
                disabled={!editable || applicantEic === ""}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              /> */}
            </div>

            {/* additional nic row */}
            <div className="flex flex-row w-full gap-12">
              {/* Applicant Additional NIC Controller */}
              <Controller
                name="applicantAdditionalNic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Additional Old NIC"
                    size="small"
                    type="text"
                    className="pr-10"
                  // required
                  />
                )}
              />

              {/* Checkbox Controller */}
              {/* <Controller
                name="isApplicantAdditionalNicPrimary"
                control={control}
                disabled={!editable || applicantAdditionalNic === ""}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              /> */}
            </div>

            {/* additional eic row */}
            <div className="flex flex-row w-full gap-12">
              {/* Applicant Additional EIC Controller */}
              <Controller
                name="applicantAdditionalEic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Additional New NIC (EIC)"
                    size="small"
                    type="text"
                    className="pr-10"
                  // required
                  />
                )}
              />

              {/* Checkbox Controller */}
              {/* <Controller
                name="isApplicantAdditionalEicPrimary"
                control={control}
                disabled={!editable || applicantAdditionalEic === ""}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              /> */}
            </div>
          </div>
        </div>

        <div>
          {/* Applicant Passport Controller */}
          <Controller
            name="applicantPassportNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Applicant Passport Number"
                size="small"
                type="text"
              // required
              />
            )}
          />
        </div>
      </div>
    </Paper>
  );
};

export default ApplicantIdentitity;
