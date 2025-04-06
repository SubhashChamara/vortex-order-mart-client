import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface DocumentDetailFormProps {
  editable: boolean;
}

const DocumentDetailForm: React.FC<DocumentDetailFormProps> = ({
  editable,
}) => {
  const { control } = useFormContext();

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:file-text" title="Document Detail" />
        <div>
          <div className="w-full flex flex-row justify-between items-center gap-9">
            <p>Documents Retained at Branch: </p>
            <Controller
              name="isDocRetainedAtBranch"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <ToggleButtonGroup
                  color="error"
                  // className="-mr-7"
                  value={field.value === true ? "true" : "false"}
                  exclusive
                  onChange={(event, newAlignment) => {
                    if (newAlignment !== null) {
                      field.onChange(newAlignment === "true");
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
        </div>
      </Paper>
    </div>
  );
};

export default DocumentDetailForm;
