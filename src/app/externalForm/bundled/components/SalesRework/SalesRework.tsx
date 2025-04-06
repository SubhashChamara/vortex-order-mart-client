import { Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface SalesReworkProps {
  editable: boolean;
}

const SalesRework: React.FC<SalesReworkProps> = ({ editable }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-1/2">
      <Paper className="px-12 pb-10 w-full">
        <Ve3FormHeader icon="feather:tag" title="Sales Rework" />

        <div className="grid grid-cols-1 gap-12">
          {/* crib rating controller */}
          <Controller
            name="cribRating"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Crib Rating"
                size="small"
                type="text"
                // required
                helperText={<>{errors.salesAgentOrPfcName?.message}</>}
                error={!!errors.salesAgentOrPfcName}
              />
            )}
          />

          {/* norcom controller */}
          <Controller
            name="norcom"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="NORCOM"
                size="small"
                type="text"
                // required
                helperText={<>{errors.salesAgentOrPfcName?.message}</>}
                error={!!errors.salesAgentOrPfcName}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default SalesRework;
