import { Checkbox, FormControlLabel, Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

export interface FinalChecksProps {
  editable: boolean;
}

const FinalChecks: React.FC<FinalChecksProps> = ({ editable }) => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <Paper className="px-12 pb-10 w-full">
      <Ve3FormHeader
        icon="material-outline:checklist"
        title="Final Checklist"
      />
      <div className="flex flex-col gap-9">
        <div className="flex flex-row gap-10">
          {/* Non national controller */}
          <div className="w-full flex flex-row justify-between items-start  basis-1/2">
            <p>NIC Not Clear. Secondary Identification Proof Provided </p>
            <Controller
              name="isNICNotClearWithSecondaryProof"
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
          {/* Sales comments Controller */}
          <Controller
            name="nicNotClearComment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Comments"
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

        <div className="flex flex-row gap-10">
          {/* Non national controller */}
          <div className="w-full flex flex-row justify-between items-start  basis-1/2">
            <p>Relationship Identified by the CBO</p>
            <Controller
              name="isRelationshipIdentifiedByCBO"
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
          {/* Sales comments Controller */}
          <Controller
            name="cboRelationshipComment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Comments"
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
      </div>
    </Paper>
  );
};

export default FinalChecks;
