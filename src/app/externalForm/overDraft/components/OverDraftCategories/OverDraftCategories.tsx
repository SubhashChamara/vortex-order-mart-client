import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface OverDraftCategoriesProps {
  editable: boolean;
}

const OverDraftCategories: React.FC<OverDraftCategoriesProps> = ({
  editable,
}) => {
  const { control } = useFormContext();

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:layers" title="OverDraft Categories" />
        <div className="flex flex-col gap-14">
          <div className="w-full flex flex-row justify-between items-center gap-9">
            <p>
              FCY backed OD<span className="text-primary">*</span>
            </p>
            <Controller
              name="isFCYBackedOD"
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

          <div className="w-full flex flex-row justify-between items-center gap-9">
            <p>
              T-Bill backed OD<span className="text-primary">*</span>
            </p>
            <Controller
              name="isTBillBackedOD"
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

          <div className="w-full flex flex-row justify-between items-center gap-9">
            <p>
              OD for overage customer<span className="text-primary">*</span>
            </p>
            <Controller
              name="isODforAverageCustomer"
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

export default OverDraftCategories;
