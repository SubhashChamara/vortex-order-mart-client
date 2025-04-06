import {
  Checkbox,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface CASADocCheckProps {
  editable: boolean;
  casaEditable?: boolean;
}

const CASADocCheck: React.FC<CASADocCheckProps> = ({
  editable,
  casaEditable,
}) => {
  const { control, watch } = useFormContext();
  const etbNtb = watch("etbNtb");

  return (
    <Paper className="px-12 pb-10">
      <Ve3FormHeader
        icon="material-outline:account_balance"
        title="Doc Check"
      />

      <div className="grid grid-cols-4">
        {/* NTB ETB Controller */}
        <div className="w-full flex flex-row justify-between items-center">
          <p> ETB/NTB</p>
          <Controller
            name="etbNtb"
            control={control}
            defaultValue="NTB"
            render={({ field }) => (
              <RadioGroup {...field} className="flex flex-col">
                <div className="flex flex-row">
                  <FormControlLabel
                    disabled={!editable}
                    value="ETB"
                    control={<Radio />}
                    label="ETB"
                  />
                  <FormControlLabel
                    disabled={!editable}
                    value="NTB"
                    control={<Radio />}
                    label="NTB"
                  />
                </div>
              </RadioGroup>
            )}
          />
        </div>

        {/* Relationship id controller */}
        <Controller
          name="relationshipId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={!editable}
              label="Relationship ID"
              size="small"
              type="text"
              required={etbNtb === "ETB" ? true : false}
            />
          )}
        />
      </div>
      {/* <div className="grid grid-cols-4"> */}
      <div className="flex flex-col col-span-1">
        <div className="w-full flex flex-row justify-between items-center">
          {/* <p>CASA Definite</p> */}
          <Controller
            name="isCASADefinite"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                disabled={!casaEditable}
                control={<Checkbox {...field} checked={field.value} />}
                label="CASA Definite"
              />
            )}
          />
        </div>

        <div className="w-full flex flex-row justify-between items-center">
          {/* <p>CASA BB Account</p> */}
          <Controller
            name="isCASABBAccount"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                // disabled={!editable}
                disabled={true}
                control={<Checkbox {...field} checked={field.value} />}
                label="CASA BB Account"
              />
            )}
          />
        </div>
      </div>
      {/* </div> */}
    </Paper>
  );
};

export default CASADocCheck;
