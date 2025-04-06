import { Paper, ToggleButtonGroup, ToggleButton } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";

interface StaticDataChangesProps {
  editable: boolean;
}
const StaticDataChanges: React.FC<StaticDataChangesProps> = ({ editable }) => {
  const { control } = useFormContext();
  return (
    <div className="h-full">
      <Paper className="px-12 pb-10 col-span-2 h-full">
        <Ve3FormHeader
          icon="material-outline:credit_card"
          title="Eyeballing pre-check Recommendation"
        />

        <div className="w-full flex flex-row justify-between items-center gap-9">
          <p>Static Data Changes: </p>
          <Controller
            name="isStaticDataChanged"
            control={control}
            defaultValue={false} // Ensures the initial value is a boolean
            render={({ field }) => (
              <ToggleButtonGroup
                color="error"
                value={field.value === true ? "true" : "false"} // Map boolean to string for UI
                exclusive
                onChange={(event, newAlignment) => {
                  if (newAlignment !== null) {
                    field.onChange(newAlignment === "true"); // Convert string back to boolean
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

export default StaticDataChanges;
