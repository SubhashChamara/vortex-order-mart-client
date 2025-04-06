import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface FDStatusProps {
  editable: boolean;
}

const FDStatus: React.FC<FDStatusProps> = ({ editable }) => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <div className="w-1/2">
      <Paper className="px-12 pb-10 w-full">
        <Ve3FormHeader
          icon="material-outline:checklist"
          title="Fixed Deposit"
        />
        <div className="w-full flex flex-row justify-between items-center">
          <p>FD Special Rate</p>
          <Controller
            name="FDSpecialStatus"
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

export default FDStatus;
