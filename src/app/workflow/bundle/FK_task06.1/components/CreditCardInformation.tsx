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

interface CreditCardInformationProps {
  editable: boolean;
}

const CreditCardInformation: React.FC<CreditCardInformationProps> = ({
  editable,
}) => {
  const methods = useFormContext();

  const { control } = methods;

  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader icon="feather:credit-card" title="Credit Information" />

        <form>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col items-start">
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
            </div>

            <div className="w-full flex flex-col justify-between items-center">
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
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default CreditCardInformation;
