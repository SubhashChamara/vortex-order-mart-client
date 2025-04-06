import { Paper, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { formatCurrency } from "../../@helpers/Common";

interface RequestApprovalInfoProps {
  editable: boolean;
}

const RequestApprovalInfo: React.FC<RequestApprovalInfoProps> = ({
  editable,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Paper className="px-12 pb-10 w-full col-span-1">
        <Ve3FormHeader
          icon="material-outline:request_quote"
          title="Request and Approval Details"
        />

        <div className="grid grid-cols-1 gap-12">
          <Controller
            name="reqAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Requested Amount"
                size="small"
                type="text"
                required
                // className="pr-10"
                helperText={<>{errors.reqAmount?.message}</>}
                error={!!errors.reqAmount}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          <Controller
            name="approvedAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Approved Amount"
                size="small"
                type="text"
                required
                // className="pr-10"
                helperText={<>{errors.approvedAmount?.message}</>}
                error={!!errors.approvedAmount}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default RequestApprovalInfo;
