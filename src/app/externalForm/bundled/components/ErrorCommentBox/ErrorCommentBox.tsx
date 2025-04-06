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

interface ErrorCommentBoxProps {
  formType: "CASA" | "CARD" | "LOAN";
}

const ErrorCommentBox: React.FC<ErrorCommentBoxProps> = ({ formType }) => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <Paper className="px-12 pb-10">
      <Ve3FormHeader icon="feather:alert-triangle" title="Error Comments" />
      <div className="flex flex-col gap-9">
        <div className="w-full flex flex-row justify-between items-center">
          <p>Error</p>
          <Controller
            name="isError"
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value === true}
                onChange={(e) => field.onChange(e.target.value === "true")}
                className="flex flex-col"
              >
                <div className="flex flex-row">
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                </div>
              </RadioGroup>
            )}
          />
        </div>

        {/* Select product checkbox */}
        <div className="w-full flex flex-row justify-between items-center">
          <p>Select Product</p>
          <div className="flex flex-row gap-9">
            <Controller
              name="isErrorCASA"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  //   disabled={!editable}
                  control={<Checkbox {...field} checked={field.value} />}
                  label="CASA"
                />
              )}
            />

            <Controller
              name="isErrorCard"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  //   disabled={!editable}
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Card"
                />
              )}
            />

            <Controller
              name="isErrorLoan"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  //   disabled={!editable}
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Loan"
                />
              )}
            />
          </div>
        </div>
        {/* commentbox controller */}
        <Controller
          name="errorComment"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              // disabled={!editable}
              label="Error comment"
              multiline
              fullWidth
              minRows={2}
              InputProps={{
                style: { height: "100%" }, // Ensures full height
              }}
              className="basis-1/2"
            />
          )}
        />
      </div>
    </Paper>
  );
};

export default ErrorCommentBox;
