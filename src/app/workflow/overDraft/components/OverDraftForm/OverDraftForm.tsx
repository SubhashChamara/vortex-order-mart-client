import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface OverDraftFormProps {
  editable: boolean;
}

const OverDraftForm: React.FC<OverDraftFormProps> = ({ editable }) => {
  const { control, setValue, watch } = useFormContext();

  // Watching the values of the checkboxes
  const isNewOdAmend = watch("isNewOdAmend");
  const isOdCancellation = watch("isOdCancellation");
  const isRateChangeOrFacilityRenew = watch("isRateChangeOrFacilityRenew");

  const handleCheckboxChange = (fieldName: string) => {
    // Reset all checkboxes, then set the selected one
    setValue("isNewOdAmend", false);
    setValue("isOdCancellation", false);
    setValue("isRateChangeOrFacilityRenew", false);
    setValue(fieldName, true);
  };

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:check-square" title="Over Draft Type" />
        <div className="flex flex-col gap-9">
          {/* New OD/OD Amendment */}
          <div className="w-full flex flex-row justify-between items-center">
            <p>
              New OD/OD Amendment (Lien or collateral change and Enhancement or
              reduction)
            </p>
            <Controller
              name="isNewOdAmend"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  disabled={!editable}
                  control={
                    <Checkbox
                      {...field}
                      checked={isNewOdAmend}
                      onChange={() => handleCheckboxChange("isNewOdAmend")}
                    />
                  }
                  label=""
                />
              )}
            />
          </div>

          {/* OD Cancellation */}
          <div className="w-full flex flex-row justify-between items-center">
            <p>OD cancellation</p>
            <Controller
              name="isOdCancellation"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  disabled={!editable}
                  control={
                    <Checkbox
                      {...field}
                      checked={isOdCancellation}
                      onChange={() => handleCheckboxChange("isOdCancellation")}
                    />
                  }
                  label=""
                />
              )}
            />
          </div>

          {/* Rate Change/Facility Renewal */}
          <div className="w-full flex flex-row justify-between items-center">
            <p>Rate Change/ Facility Renewal</p>
            <Controller
              name="isRateChangeOrFacilityRenew"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  disabled={!editable}
                  control={
                    <Checkbox
                      {...field}
                      checked={isRateChangeOrFacilityRenew}
                      onChange={() =>
                        handleCheckboxChange("isRateChangeOrFacilityRenew")
                      }
                    />
                  }
                  label=""
                />
              )}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default OverDraftForm;
