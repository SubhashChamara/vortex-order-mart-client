import { Checkbox, FormControlLabel, Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";

interface CustomerVerificationProps {
  editable: boolean;
}

const CustomerVerification: React.FC<CustomerVerificationProps> = ({
  editable,
}) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="feather:user-check"
          title="Customer Verification"
        />

        <div className="flex flex-col gap-14">
          {/* contact person controller */}
          <Controller
            name="contactPerson"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-1/2"
                disabled={!editable}
                label="Contact Person"
                size="small"
                type="text"
                error={!!errors.contactPerson}
                helperText={<>{errors.contactPerson?.message}</>}
              />
            )}
          />

          <div className="flex flex-row justify-between">
            <div className="w-full flex flex-row justify-between items-center">
              {/* <p>Address</p> */}
              <Controller
                name="isAddressVerified"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={!!field.value}
                        disabled={!editable}
                      />
                    }
                    label="Address"
                  />
                )}
              />
            </div>

            <div className="w-full flex flex-row justify-between items-center">
              {/* <p>NIC</p> */}
              <Controller
                name="isNicVerified"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={!!field.value}
                        disabled={!editable}
                      />
                    }
                    label="NIC"
                  />
                )}
              />
            </div>

            <div className="w-full flex flex-row justify-between items-center">
              {/* <p>DOB</p> */}
              <Controller
                name="isDobVerified"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={!!field.value}
                        disabled={!editable}
                      />
                    }
                    label="DOB"
                  />
                )}
              />
            </div>
          </div>
          {/* specialVerificationComment controller */}
          <Controller
            name="specialVerificationComment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Special Comment"
                size="small"
                type="text"
                error={!!errors.specialVerificationComment}
                helperText={<>{errors.specialVerificationComment?.message}</>}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default CustomerVerification;
