import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface FraudCheckFormProps {
  editable: boolean;
}

const FraudCheckForm: React.FC<FraudCheckFormProps> = ({ editable }) => {
  const { control } = useFormContext();
  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:alert-triangle" title="Fraud Detection" />

        {/* renew anually controller */}
        <div className="w-full flex flex-row justify-between items-center gap-9">
          <p>Fraud Detected: </p>
          <Controller
            name="isFraudDetected"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <ToggleButtonGroup
                color="error"
                // className="-mr-7"
                value={
                  field.value === true
                    ? "true"
                    : field.value === false
                    ? "false"
                    : null
                } // Use strings to match ToggleButton values
                exclusive
                onChange={(event, newAlignment) => {
                  // Only update if the new value is valid
                  if (newAlignment !== null) {
                    field.onChange(newAlignment === "true"); // Update the form state with the selected value
                  }
                }}
              >
                <ToggleButton
                  disabled={!editable}
                  value="true"
                  className="min-w-32 h-24"
                >
                  Yes
                </ToggleButton>
                <ToggleButton
                  disabled={!editable}
                  value="false"
                  className="min-w-32 h-24"
                >
                  No
                </ToggleButton>
              </ToggleButtonGroup>
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default FraudCheckForm;
