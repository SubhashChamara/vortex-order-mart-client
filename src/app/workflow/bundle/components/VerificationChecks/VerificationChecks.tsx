import {
  Checkbox,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { formatCardNumber } from "../../@helpers/Common";

export interface VerificationChecksProps {
  editable: boolean;
}

const VerificationChecks: React.FC<VerificationChecksProps> = ({
  editable,
}) => {
  const methods = useFormContext();
  const { control, formState, setValue } = methods;
  const { errors } = formState;

  useEffect(() => {
    setValue("currentStep", 2);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-9">
      <Paper className="px-12 pb-10 w-full">
        <Ve3FormHeader
          icon="feather:check-circle"
          title="Verification Checks"
        />
        <div className="flex flex-col gap-9">
          <div className="flex flex-col w-full">
            {/* Left Side */}

            <div className="flex flex-col gap-9">
              {/* Company address controller */}
              <Controller
                name="refereeName"
                disabled={!editable}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Referee Name"
                    size="small"
                    type="text"
                    className="pr-10"
                    // required
                    helperText={<>{errors.refereeName?.message}</>}
                    error={!!errors.refereeName}
                  />
                )}
              />

              <div className="flex flex-row gap-9 pr-10">
                {/* Company address controller */}
                <Controller
                  name="refereeTelephone"
                  disabled={!editable}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Referee Telephone"
                      size="small"
                      type="number"
                      sx={{
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          display: "none",
                        },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                      }}
                      // required
                      inputProps={{
                        maxLength: 10,
                      }}
                      onChange={(e) => {
                        const value = e.target.value.slice(0, 10);
                        field.onChange(value);
                      }}
                      helperText={<>{errors.refereeTelephone?.message}</>}
                      error={!!errors.refereeTelephone}
                    />
                  )}
                />
                <Controller
                  name="refereeMobile"
                  disabled={!editable}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Referee Mobile"
                      size="small"
                      type="number"
                      sx={{
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          display: "none",
                        },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                      }}
                      // required
                      inputProps={{
                        maxLength: 10,
                      }}
                      onChange={(e) => {
                        const value = e.target.value.slice(0, 10);
                        field.onChange(value);
                      }}
                      helperText={<>{errors.refereeMobile?.message}</>}
                      error={!!errors.refereeMobile}
                    />
                  )}
                />
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <p> Customer Due Diligence</p>
                <Controller
                  name="customerDueDiligence"
                  control={control}
                  defaultValue="EDD"
                  render={({ field }) => (
                    <RadioGroup {...field} className="flex flex-col">
                      <div className="flex flex-row">
                        <FormControlLabel
                          disabled={!editable}
                          value="EDD"
                          control={<Radio />}
                          label="EDD"
                        />
                        <FormControlLabel
                          disabled={!editable}
                          value="SDD"
                          control={<Radio />}
                          label="SDD"
                        />
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              {/* Existing SCB customer controller */}
              <div className="w-full flex flex-row justify-between items-center">
                <p>Existing Scb Customer </p>
                <Controller
                  name="isExistingCustomer"
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

              {/* Address confirmation doc check controller */}
              <div className="w-full flex flex-row justify-between items-center">
                <p>Address Confirmation Document </p>
                <Controller
                  name="isAddressConfirmationDocProvided"
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

              {/* SCB A/C controller */}
              <Controller
                name="scbAccountNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="SCB A/C Number"
                    size="small"
                    type="text"
                    className="pr-10"
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      if (numericValue.length <= 11) {
                        field.onChange(numericValue);
                      }
                    }}
                    // sx={{
                    //   "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    //     {
                    //       display: "none",
                    //     },
                    //   "& input[type=number]": {
                    //     MozAppearance: "textfield",
                    //   },
                    // }}
                    error={!!errors.scbAccountNumber}
                    helperText={<>{errors?.scbAccountNumber?.message}</>}
                  // required
                  />
                )}
              />

              {/* Existing card controller */}

              <Controller
                name="existingCardNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Existing Number"
                    // required
                    disabled={!editable}
                    size="small"
                    type="text"
                    className="pr-10"
                    error={!!errors.existingCardNumber}
                    helperText={<>{errors?.existingCardNumber?.message}</>}
                    // onChange={(e) =>
                    //   field.onChange(formatCardNumber(e.target.value))
                    // }
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");

                      // Limit input to 16 digits only
                      if (numericValue.length <= 16) {
                        // Format the card number with spaces every 4 digits
                        const formattedValue = formatCardNumber(numericValue);
                        field.onChange(formattedValue);
                      }
                    }}
                  />
                )}
              />

              {/* Applicant age controller */}
              {/* <div className="flex flex-row items-center gap-10 pr-10">
                <Controller
                  name="applicantAge"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Applicant Age"
                      size="small"
                      type="number"
                      className="basis-1/3"
                      sx={{
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                          {
                            display: "none",
                          },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                      }}
                      // required
                      helperText={<>{errors.refereeName?.message}</>}
                      error={!!errors.refereeName}
                    />
                  )}
                />
                <p className="text-[10px] basis-2/3">
                  PRBC MAX AGE = 75 YRS / SALARIED AGE RANGE 18-65 YRS / SELF
                  EMPLOYED AGE RANGE 21-65 YRS
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </Paper>

      <Paper className="px-12 pb-10 w-full flex flex-col justify-between">
        <Ve3FormHeader
          icon="feather:check-circle"
          title="Application Verification Checks"
        />
        <div className="flex flex-col gap-9 pb-9 border-b border-b-gray-400">
          {/* Existing SCB customer controller */}
          <div className="w-full flex flex-row justify-between items-center">
            <p>Applicants Address Is The Same As In The Identification Doc </p>
            <Controller
              name="isApplicantAddressSameAsIdentification"
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
            <p style={{ maxWidth: "80%" }}>
              Clear Copy Of The NIC Copy / DL / PP
            </p>
            <Controller
              name="isClearCopyOfNicDlPpProvided"
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
            <p style={{ maxWidth: "80%" }}>
              Mothers Maiden Name Is Mentioned In The App
            </p>
            <Controller
              name="isMothersMaidenNameMentioned"
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
            <p style={{ maxWidth: "80%" }}>
              Customer Attestation & Sales Person "original Seen" Confirmation
              On All Copies
            </p>
            <Controller
              name="isCustomerAttestationAndOriginalSeenConfirmed"
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
            <p style={{ maxWidth: "80%" }}>
              The Residence Telephone Number Mentioned In The Application
              Belongs To The Same Residence Address Mentioned In The Application
            </p>
            <Controller
              name="isResidenceTelephoneMatchingAddress"
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

          <div className="flex flex-col gap-9">
            {/* Existing SCB customer controller */}
            <div className="w-full flex flex-row justify-between items-center">
              <p>Signature On All 5 Signature Panels </p>
              <Controller
                name="isSignatureOnAllFivePanels"
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
              <p>Amendments Are Counter Signed By The Applicants</p>
              <Controller
                name="isAmendmentCounterSignedByApplicant"
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

        {/* <div className="grid grid-cols-2 my-10"> */}
        {/* left */}

        {/* <div className="flex flex-col gap-9 border border-primary rounded-sm pl-10">
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
          </div> */}
        {/* </div> */}
      </Paper>
    </div>
  );
};

export default VerificationChecks;
