import { Paper, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";

interface IBankingFormProps {
  editable: boolean;
}

const IBankingForm: React.FC<IBankingFormProps> = ({ editable }) => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <div className="w-1/2">
      <Paper className="px-12 pb-10 w-full">
        <Ve3FormHeader
          icon="material-outline:account_balance"
          title="I Banking"
        />
        <div className="w-full flex flex-row justify-between items-center">
          <p>Beneficiary</p>
          <Controller
            name="iBankingBeneficiary"
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
          <p>Internal</p>
          <Controller
            name="iBankingInternal"
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
          <p>External</p>
          <Controller
            name="iBankingExternal"
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
      </Paper>
    </div>
  );
};

export default IBankingForm;
