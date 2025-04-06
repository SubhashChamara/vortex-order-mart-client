import { Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface AccountRelationshipProps {
  editable: boolean;
}
const AccountRelationship: React.FC<AccountRelationshipProps> = ({
  editable,
}) => {
  const { control } = useFormContext();
  return (
    <Paper className="px-12 pb-10">
      <Ve3FormHeader
        icon="material-outline:account_balance"
        title="Account Relationship"
      />
      <div className="flex flex-col gap-9">
        {/* SCB A/C controller */}
        <Controller
          name="scbAccountNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={!editable}
              label="SCB A/C Number"
              size="small"
              type="number"
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
          name="relationshipId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={!editable}
              label="Relationship ID"
              size="small"
              type="text"
              required
            />
          )}
        />
      </div>
    </Paper>
  );
};

export default AccountRelationship;
