import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface SendToCellProps {
  editable: boolean;
}

const SendToCell: React.FC<SendToCellProps> = ({ editable }) => {
  const { control } = useFormContext();
  return (
    <Paper className="px-12 pb-10">
      <Ve3FormHeader
        icon="material-outline:account_balance"
        title="Send to Cell Checkpoints"
      />
      <div className="grid grid-cols-2">
        {/* left */}
        <div className="flex flex-col gap-9">
          <div className="w-full flex flex-row justify-between items-center">
            <p>Application incomplete</p>
            <Controller
              name="isApplicationIncomplete"
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
            <p>Supporting documents illegible </p>
            <Controller
              name="isSupportingDocumentIllegible"
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

        {/* right */}
        <div className="flex flex-col gap-9">
          <div className="w-full flex flex-row justify-between items-center">
            <p>Not compliant with exchange control regulations</p>
            <Controller
              name="isNotCompliantWithExchangeControlRegulations"
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
            <p>Additional documents required for Data Capturing </p>
            <Controller
              name="isAdditionalDocumentsRequiredForDataCapturing"
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
    </Paper>
  );
};

export default SendToCell;
