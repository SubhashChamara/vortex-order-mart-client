import { Checkbox, FormControlLabel, Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface FraudScreeningChecklistProps {
  editable: boolean;
}

const FraudScreeningChecklist: React.FC<FraudScreeningChecklistProps> = ({
  editable,
}) => {
  const { control } = useFormContext();
  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="material-outline:shield" title="Fraud Screening" />

        <div className="flex flex-col gap-12">
          <Controller
            name="isDocFraudScreenAttached"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                disabled={!editable}
                required
                control={<Checkbox {...field} checked={field.value} />}
                label="Document and Fraud Screening Checklist Attached"
                sx={{
                  "& .MuiFormControlLabel-asterisk": {
                    color: "red",
                  },
                }}
              />
            )}
          />

          {/* Sales comments Controller */}
          <Controller
            name="fraudScreenComments"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Comments"
                required
                multiline
                fullWidth
                minRows={2}
                InputProps={{
                  style: { height: "100%" }, // Ensures full height
                }}
                className="basis-1/2"
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default FraudScreeningChecklist;
