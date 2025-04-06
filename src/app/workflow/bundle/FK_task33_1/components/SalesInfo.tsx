import { Autocomplete, Paper, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";

export interface SalesInfoProps {
  editable: boolean;
}

const SalesInfo: React.FC<SalesInfoProps> = ({ editable }) => {
  const methods = useFormContext();
  const { control } = methods;

  const options = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ];

  return (
    <Paper className="px-12 pb-10 w-full">
      <Ve3FormHeader icon="feather:tag" title="Sales Info" />
      <div className="grid grid-cols-2">
        {/* left */}
        <div className="flex flex-col gap-9">
          {/* Staff code Controller */}
          <Controller
            name="staffCode"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={options}
                disabled={!editable}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="DSR / Staff Code"
                    variant="outlined"
                    // required
                    size="small"
                    className="pr-10"
                  />
                )}
              />
            )}
          />
          {/* BDM / Manager name Controller */}
          <Controller
            name="bdmOrManagerName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={options}
                disabled={!editable}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Name of BDM / Manager"
                    variant="outlined"
                    // required
                    size="small"
                    className="pr-10"
                  />
                )}
              />
            )}
          />

          {/* Branch Controller */}
          <Controller
            name="branch"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={options}
                disabled={!editable}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Branch"
                    variant="outlined"
                    // required
                    size="small"
                    className="pr-10"
                  />
                )}
              />
            )}
          />

          {/* ARM code Controller */}
          <Controller
            name="armCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="ARM Code"
                size="small"
                type="text"
                className="pr-10"
                // required
              />
            )}
          />
        </div>

        {/* Sales comments Controller */}
        <Controller
          name="salesComments"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={!editable}
              label="Comments"
              multiline
              fullWidth
              minRows={6}
              // minRows={4} // Adjust based on how much height you want initially
              InputProps={{
                style: { height: "100%" }, // Ensures full height
              }}
              className="pr-10"
            />
          )}
        />
      </div>
    </Paper>
  );
};

export default SalesInfo;
