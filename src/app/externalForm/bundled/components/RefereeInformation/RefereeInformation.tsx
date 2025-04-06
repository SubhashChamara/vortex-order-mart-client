import { Paper, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";

const RefereeInformation: React.FC = () => {
  const methods = useFormContext();

  const { control } = methods;

  return (
    <Paper className="px-12 pb-10  w-full">
      <Ve3FormHeader icon="feather:user" title="Referee Information" />
      {/* Right side */}
      <div className="w-full flex flex-col gap-9">
        {/* Company address controller */}
        <Controller
          name="refereeName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Referee Name"
              size="small"
              type="text"
              className="pr-10"
              // required
            />
          )}
        />
        {/* Company address controller */}
        <Controller
          name="refereeTelephone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Referee Telephone"
              size="small"
              type="number"
              className="pr-10"
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              // required
            />
          )}
        />
        <Controller
          name="refereeMobile"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Referee Mobile"
              size="small"
              type="number"
              className="pr-10"
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              // required
            />
          )}
        />
      </div>
    </Paper>
  );
};

export default RefereeInformation;
