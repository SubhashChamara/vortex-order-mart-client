import { Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface LoanPersonalInformationProps {
  editable: boolean;
}
const LoanPersonalInformation: React.FC<LoanPersonalInformationProps> = ({
  editable,
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader icon="feather:user" title="Applicant Information" />
        <div className="grid grid-cols-2 gap-12 text-gray-600">
          <div className="col-span-2 flex flex-row gap-3 items-center w-full">
            <p className="text-nowrap">Personal Info</p>
            <hr className="border-t border-gray-400 w-full" />
          </div>

          <Controller
            name="loanApplicantNIC"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="NIC"
                size="small"
                type="text"
                required
                className="basis-2/3"
                helperText={<>{errors.loanApplicantNIC?.message}</>}
                error={!!errors.loanApplicantNIC}
              />
            )}
          />

          <Controller
            name="loanApplicantName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Applicant Name"
                size="small"
                type="text"
                required
                className="basis-2/3"
                helperText={<>{errors.loanApplicantName?.message}</>}
                error={!!errors.loanApplicantName}
              />
            )}
          />

          <Controller
            name="loanApplicantDesignation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Designation"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicantDesignation?.message}</>}
                error={!!errors.loanApplicantDesignation}
              />
            )}
          />

          <div className="col-span-2 flex flex-row gap-3 items-center w-full">
            <p className="text-nowrap">Residential Information</p>
            <hr className="border-t border-gray-400 w-full" />
          </div>

          <Controller
            name="loanApplicantResAddress1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Address 1"
                size="small"
                type="text"
                className="col-span-2"
                helperText={<>{errors.loanApplicantResAddress1?.message}</>}
                error={!!errors.loanApplicantResAddress1}
              />
            )}
          />

          <Controller
            name="loanApplicantResAddress2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Address 2"
                size="small"
                type="text"
                className="col-span-2"
                helperText={<>{errors.loanApplicantResAddress2?.message}</>}
                error={!!errors.loanApplicantResAddress2}
              />
            )}
          />

          <Controller
            name="loanApplicantResAddress3"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Address 3"
                size="small"
                type="text"
                className="col-span-2"
                helperText={<>{errors.loanApplicantResAddress3?.message}</>}
                error={!!errors.loanApplicantResAddress3}
              />
            )}
          />

          <div className="col-span-2 flex flex-row gap-3 items-center w-full">
            <p className="text-nowrap">Contact Information</p>
            <hr className="border-t border-gray-400 w-full" />
          </div>

          <Controller
            name="loanApplicantMobile"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Mobile No"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicantMobile?.message}</>}
                error={!!errors.loanApplicantMobile}
              />
            )}
          />

          <Controller
            name="loanApplicantResTel"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Residential Telephone No"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicantResTel?.message}</>}
                error={!!errors.loanApplicantResTel}
              />
            )}
          />

          <div className="col-span-2 flex flex-row gap-3 items-center w-full">
            <p className="text-nowrap">Workplace Information</p>
            <hr className="border-t border-gray-400 w-full" />
          </div>

          <Controller
            name="loanApplicantCompany"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Company Name"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicantCompany?.message}</>}
                error={!!errors.loanApplicantCompany}
              />
            )}
          />

          <Controller
            name="loanApplicantNatureOfBusiness"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Nature of Business"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={
                  <>{errors.loanApplicantNatureOfBusiness?.message}</>
                }
                error={!!errors.loanApplicantNatureOfBusiness}
              />
            )}
          />

          <Controller
            name="loanApplicantSalesChannel"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Sales Channel"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicantSalesChannel?.message}</>}
                error={!!errors.loanApplicantSalesChannel}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default LoanPersonalInformation;
