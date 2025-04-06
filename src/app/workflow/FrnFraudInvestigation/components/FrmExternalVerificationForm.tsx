import React, { FC } from "react";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { Checkbox, TextField, Paper, Typography } from "@mui/material";
import { FrmExternVerifResponse } from "../@types/FrmExternVerifResponse";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";

type FrmExternalVerificationFormProps = {
  externalVerifications: FrmExternVerifResponse[];
};

const FrmExternalVerificationForm: FC<FrmExternalVerificationFormProps> = ({ externalVerifications }) => {
  const methods = useForm<{ externalVerifications: FrmExternVerifResponse[] }>({
    defaultValues: {
      externalVerifications,
    },
  });

  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <Paper className="p-6">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-md font-600 text-left flex text-blue-gray-800">
            <div>
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                feather:user-plus
              </EdgeSvgIcon>
            </div>
            <div>FRM EXTERNAL VERIFICATION</div>
          </h1>
        </div>
        {externalVerifications.map((verification, index) => (
          <div key={index} className="mb-6">
            <Typography variant="h6" className="mb-4">
              Verification {index + 1}
            </Typography>

            <div className="grid gap-4 mt-4">
              <Controller
                name={`externalVerifications.${index}.attempt1`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Checkbox {...field} checked={field.value} disabled />
                    <label>Attempt 1</label>
                  </div>
                )}
              />
              <Controller
                name={`externalVerifications.${index}.reason1`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reason for Attempt 1"
                    size="small"
                    fullWidth
                    multiline
                    minRows={2}
                    disabled
                  />
                )}
              />
              <Controller
                name={`externalVerifications.${index}.attempt2`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Checkbox {...field} checked={field.value} disabled />
                    <label>Attempt 2</label>
                  </div>
                )}
              />
              <Controller
                name={`externalVerifications.${index}.reason2`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reason for Attempt 2"
                    size="small"
                    fullWidth
                    multiline
                    minRows={2}
                    disabled
                  />
                )}
              />
              <Controller
                name={`externalVerifications.${index}.attempt3`}
                control={control}
                render={({ field }) => (
                  <div>
                    <Checkbox {...field} checked={field.value} disabled />
                    <label>Attempt 3</label>
                  </div>
                )}
              />
              <Controller
                name={`externalVerifications.${index}.reason3`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reason for Attempt 3"
                    size="small"
                    fullWidth
                    multiline
                    minRows={2}
                    disabled
                  />
                )}
              />
            </div>

            <Controller
              name={`externalVerifications.${index}.makerComment`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Comment"
                  size="small"
                  fullWidth
                  multiline
                  minRows={2}
                  disabled
                />
              )}
            />
          </div>
        ))}
      </Paper>
    </FormProvider>
  );
};

export default FrmExternalVerificationForm;
