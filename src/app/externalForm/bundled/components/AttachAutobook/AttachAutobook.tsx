import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface AttachAutobookProps {
  editable: boolean;
}

const AttachAutobook: React.FC<AttachAutobookProps> = ({ editable }) => {
  const methods = useFormContext();
  const { control } = methods;
  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:paperclip" title="Auto Book Attachment" />

        <Controller
          name="isAutobookAttached"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              disabled={!editable}
              control={<Checkbox {...field} checked={field.value} />}
              label="Attach Book: "
              labelPlacement="start" // Places the label before the checkbox
              sx={{
                justifyContent: "space-between", // Adds space between label and checkbox
                width: "100%", // Ensures the component stretches to fill its container
                margin: 0, // Optional: Removes default margin
              }}
            />
          )}
        />
      </Paper>
    </div>
  );
};

export default AttachAutobook;
