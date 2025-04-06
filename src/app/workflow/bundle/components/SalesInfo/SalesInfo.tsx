import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { DBRUser } from "../../../../core/types/DBRUser";
import { DropDownItem } from "../../../../core/types/DropDown";

export interface SalesInfoProps {
  editable: boolean;
  dbrUserDropdowns?: DBRUser[];
  branchManagersDropdowns?: DBRUser[];
  branchDropdowns?: DropDownItem[];
}

const SalesInfo: React.FC<SalesInfoProps> = ({
  editable,
  branchDropdowns,
  branchManagersDropdowns,
  dbrUserDropdowns,
}) => {
  const methods = useFormContext();
  const { control, setValue, formState } = methods;
  const { errors } = formState;

  useEffect(() => {
    setValue("currentStep", 3);
  }, []);

  return (
    <Paper className="px-12 pb-10 w-full">
      <Ve3FormHeader icon="feather:tag" title="Sales Info" />
      <div className="grid grid-cols-2">
        {/* left */}
        <div className="flex flex-col gap-9">
          {/* Group sale row */}
          <div className="flex flex-row gap-9">
            {/* Group sale controller */}
            <div className="w-full flex flex-row justify-between items-center">
              {/* <p>Group Sale</p> */}
              <Controller
                name="isGroupSale"
                control={control}
                disabled={!editable}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Group Sale"
                  />
                )}
              />
            </div>

            {/* Group Reference Controller */}
            <Controller
              name="groupReference"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Group Reference"
                  size="small"
                  type="text"
                  className="pr-10"
                  helperText={<>{errors.groupReference?.message}</>}
                  error={!!errors.groupReference}
                />
              )}
            />
          </div>
          {/* sales agent name */}
          <Controller
            name="salesAgentOrPfcName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Name of Sales Agent / PFC"
                size="small"
                type="text"
                className="pr-10"
                // required
                helperText={<>{errors.salesAgentOrPfcName?.message}</>}
                error={!!errors.salesAgentOrPfcName}
              />
            )}
          />

          {/* Staff code Controller */}
          <Controller
            name="staffCode"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={dbrUserDropdowns || []}
                // options={dbrUserDropdowns || []}
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
                    required
                    helperText={<>{errors.staffCode?.message}</>}
                    error={!!errors.staffCode}
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
                options={branchManagersDropdowns || []}
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
                    required
                    helperText={<>{errors.bdmOrManagerName?.message}</>}
                    error={!!errors.bdmOrManagerName}
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
                options={branchDropdowns || []}
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
                    required
                    helperText={<>{errors.branch?.message}</>}
                    error={!!errors.branch}
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
                required
                helperText={<>{errors.armCode?.message}</>}
                error={!!errors.armCode}
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
              minRows={12}
              // minRows={4} // Adjust based on how much height you want initially
              InputProps={{
                style: { height: "100%" },
              }}
              className="pr-10"
              helperText={<>{errors.salesComments?.message}</>}
              error={!!errors.salesComments}
            />
          )}
        />
      </div>
    </Paper>
  );
};

export default SalesInfo;
