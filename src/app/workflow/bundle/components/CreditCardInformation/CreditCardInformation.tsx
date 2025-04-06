import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { determineIfDisabled, formatCurrency } from "../../@helpers/Common";
import { DropDownItem } from "../../../../core/types/DropDown";

export interface CreditCardInformationProps {
  editable: boolean;
  semiEditable?: boolean;
  cardTypeDropdowns?: DropDownItem[];

  // if editable (true) -> editable
  // if editable (true) & semiEditable (true) -> editable
  // if editable (false) -> not editable
  // if editable (false) & semiEditable(true) -> semiEditable (etc, ntc, rel id)
  // if editable (false) & semiEditable(false) -> not editable
}

const CreditCardInformation: React.FC<CreditCardInformationProps> = ({
  editable,
  semiEditable,
  cardTypeDropdowns,
}) => {
  const methods = useFormContext();

  const { control, watch, resetField, formState, setValue } = methods;
  const { errors } = formState;

  const isALPL = watch("isALPL");
  const isAccountOpening = watch("isAccountOpening");
  const isCASADefinite = watch("isCASADefinite");
  const isCC = watch("isCC");
  const etbNtb = watch("etbNtb");

  useEffect(() => {
    if (isAccountOpening === false) {
      resetField("isCASADefinite");
      resetField("isCASABBAccount");
    }
  }, [isAccountOpening]);

  useEffect(() => {
    if (isALPL === false) {
      resetField("reqLoanAmount");
      resetField("reqType");
    }
  }, [isALPL]);

  // useEffect(() => {
  //   setValue("currentStep", 0);
  // }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-12">
        <Paper className="px-12 pb-10">
          <Ve3FormHeader icon="material-outline:savings" title="CASA" />
          <div className="flex flex-col gap-12">
            <div className="w-full flex flex-row justify-between items-center">
              <p>Account Opening</p>
              <Controller
                name="isAccountOpening"
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
              <p>CASA Reconciled</p>
              <Controller
                name="isCASAReconsiled"
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

            {isAccountOpening && (
              <>
                <div className="w-full flex flex-row justify-between items-center">
                  <p>CASA Definite</p>
                  <Controller
                    name="isCASADefinite"
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
                  <p>CASA BB Account</p>
                  <Controller
                    name="isCASABBAccount"
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
              </>
            )}

            <div className="w-full flex flex-row items-center gap-9 pr-9">
              {/* <p> ETB/NTB</p> */}
              <Controller
                name="etbNtb"
                control={control}
                defaultValue="NTB"
                render={({ field }) => (
                  <RadioGroup {...field} className="flex flex-col">
                    <div className="flex flex-row">
                      <FormControlLabel
                        disabled={determineIfDisabled(editable, semiEditable)}
                        value="ETB"
                        control={<Radio />}
                        label="ETB"
                      />
                      <FormControlLabel
                        disabled={determineIfDisabled(editable, semiEditable)}
                        value="NTB"
                        control={<Radio />}
                        label="NTB"
                      />
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            {/* relationship Id */}
            <Controller
              name="relationshipId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={determineIfDisabled(editable, semiEditable)}
                  label="Relationship ID"
                  size="small"
                  type="text"
                  className="pr-10"
                  required={etbNtb === "ETB" ? true : false}
                  helperText={<>{errors.relationshipId?.message}</>}
                  error={!!errors.relationshipId}
                />
              )}
            />
          </div>
        </Paper>

        <Paper className="px-12 pb-10">
          <Ve3FormHeader icon="material-outline:credit_card" title="Card" />
          <div className="flex flex-col gap-12">
            <div className="w-full flex flex-row justify-between items-center">
              <p>Credit Card</p>
              <Controller
                name="isCC"
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
              <p>Credit Card Reconciled</p>
              <Controller
                name="isCCReconsiled"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    disabled={!editable || !isCC}
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              />
            </div>

            {/* Card Type Controller */}
            <Controller
              name="creditCardType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  disabled={!editable || !isCC}
                  options={cardTypeDropdowns || []}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Card Type"
                      variant="outlined"
                      required={isCC}
                      size="small"
                      helperText={<>{errors.creditCardType?.message}</>}
                      error={!!errors.creditCardType}
                    />
                  )}
                />
              )}
            />
          </div>
        </Paper>

        <Paper className="px-12 pb-10">
          <Ve3FormHeader icon="material-outline:credit_score" title="Loan" />
          <div className="flex flex-col gap-12">
            <div className="w-full flex flex-row justify-between items-center">
              <p>ALPL</p>
              <Controller
                name="isALPL"
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
              <p>ALPL Reconciled</p>
              <Controller
                name="isALPLReconsiled"
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

            {isALPL && (
              <div className="flex flex-col gap-12">
                <div className="w-full flex flex-row gap-9 items-center">
                  {/* <p> Request Type</p> */}
                  <Controller
                    name="reqType"
                    control={control}
                    defaultValue="PL NEW"
                    render={({ field }) => (
                      <RadioGroup {...field} className="flex flex-col">
                        <div className="flex flex-row justify-between">
                          <FormControlLabel
                            disabled={!editable}
                            value="PL NEW"
                            control={<Radio />}
                            label="PL NEW"
                          />
                          <FormControlLabel
                            disabled={!editable}
                            value="PL TOPUP"
                            control={<Radio />}
                            label="PL TOPUP"
                          />
                          <FormControlLabel
                            disabled={!editable}
                            value="24hr PL"
                            control={<Radio />}
                            label="24hr PL"
                          />
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>
                <Controller
                  name="reqLoanAmount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Requested Loan Amount"
                      required
                      disabled={!editable}
                      size="small"
                      type="text"
                      error={!!errors.reqLoanAmount}
                      onChange={(e) =>
                        field.onChange(formatCurrency(e.target.value))
                      }
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
            )}
          </div>
        </Paper>
      </div>
    </>
  );
};

export default CreditCardInformation;
