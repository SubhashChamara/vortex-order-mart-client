import {
  Checkbox,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";

export interface CreditCardInformationProps {
  editable: boolean;
}

const CreditCardInformation: React.FC<CreditCardInformationProps> = ({
  editable,
}) => {
  const methods = useFormContext();

  const { control, watch } = methods;

  const isALPL = watch("isALPL");
  const isAccountOpening = watch("isAccountOpening");
  const isCASADefinite = watch("isCASADefinite");

  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader icon="feather:credit-card" title="Credit Information" />

        <form>
          <div className="grid grid-cols-2">
            <div className="flex flex-col items-start gap-9">
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
                <p>NOKOM/ CRIB Check</p>
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
            </div>

            <div className="w-full flex flex-col gap-9 items-center">
              <div className="w-full flex flex-row justify-between items-center">
                <p>Credit Card Reconciled</p>
                <Controller
                  name="isCCReconsiled"
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-9 items-start">
            <div className="flex flex-col gap-9">
              {/* <Controller
                name="reqLoanAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Requested Loan Amount"
                    size="small"
                    type="number"
                    className="mt-12 pr-10"
                    required
                  />
                )}
              /> */}
              <div className="flex flex-col justify-between gap-9">
                {/* <div className="w-full flex flex-row justify-between items-center">
                  <p> Request Type</p>
                  <Controller
                    name="reqType"
                    control={control}
                    defaultValue="PL NEW"
                    render={({ field }) => (
                      <RadioGroup {...field} className="flex flex-col">
                        <div className="flex flex-row">
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
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div> */}

                <div className="w-full flex flex-row justify-between items-center">
                  <p> ETB/NTB</p>
                  <Controller
                    name="etbNtb"
                    control={control}
                    defaultValue="NTB"
                    render={({ field }) => (
                      <RadioGroup {...field} className="flex flex-col">
                        <div className="flex flex-row">
                          <FormControlLabel
                            disabled={!editable}
                            value="ETB"
                            control={<Radio />}
                            label="ETB"
                          />
                          <FormControlLabel
                            disabled={!editable}
                            value="NTB"
                            control={<Radio />}
                            label="NTB"
                          />
                        </div>
                      </RadioGroup>
                    )}
                  />
                </div>
              </div>

              <Controller
                name="relationshipId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Relationship ID"
                    size="small"
                    type="text"
                    className="pr-10"
                    required
                  />
                )}
              />
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default CreditCardInformation;
