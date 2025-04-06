import {
  Autocomplete,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { DropDownItem } from "../../../../core/types/DropDown";

interface CCDataEntryProps {
  editable: boolean;
  cardTypeDropdowns: DropDownItem[];
}
const CCDataEntry: React.FC<CCDataEntryProps> = ({
  editable,
  cardTypeDropdowns,
}) => {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="material-outline:credit_card"
          title="Credit Card Data Entry"
        />

        <div className="grid grid-cols-3 gap-12">
          {/* Card Type Controller */}
          <Controller
            name="creditCardType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled
                options={cardTypeDropdowns || []}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Card Type"
                    variant="outlined"
                    size="small"
                    helperText={<>{errors.creditCardType?.message}</>}
                    error={!!errors.creditCardType}
                  />
                )}
              />
            )}
          />

          {/* ecapRef Id */}
          <Controller
            name="ecapRef"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled={!editable}
                label="Ecaps Ref"
                size="small"
                type="text"
                helperText={<>{errors.ecapRef?.message}</>}
                error={!!errors.ecapRef}
              />
            )}
          />

          {/* Sup Ref Id */}
          <Controller
            name="supRef"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled={!editable}
                label="Sup Ref"
                size="small"
                type="text"
                helperText={<>{errors.supRef?.message}</>}
                error={!!errors.supRef}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default CCDataEntry;
