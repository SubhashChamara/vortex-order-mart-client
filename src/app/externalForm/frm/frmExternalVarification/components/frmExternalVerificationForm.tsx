import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";

import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { FemExternVerifForm } from "../../../../workflow/frmExternalVerification/components/FemExternVerifForm";



export interface FrmVerificationFormProps {
  editable: boolean;
  commentArea?: boolean;
  form: FemExternVerifForm | null;
}

type FormType = {
  checkerComment: string;
  makerComment: string;
  attempt1: boolean;
  attempt2: boolean;
  attempt3: boolean;
  reason1: string;
  reason2: string;
  reason3: string;
  businessKey: string;
};

const defaultValues: FormType = {
  checkerComment: "",
  makerComment: "",
  attempt1: false,
  attempt2: false,
  attempt3: false,
  reason1: "",
  reason2: "",
  reason3: "",
  businessKey: "",
};

const frmExternalVerificationForm: FC<FrmVerificationFormProps> = (props) => {
  const { form, editable } = props;
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const schema = z.object({
    makerComment: z.union([z.string().max(255, "External Verificaion Instruction must be at most 225 characters long."), z.null()]).optional(),
    attempt1: z.union([z.boolean(), z.null()]).optional(),
    attempt2: z.union([z.boolean(), z.null()]).optional(),
    attempt3: z.union([z.boolean(), z.null()]).optional(),
    checkerComment: z.union([z.string().max(255, "Comment must be at most 225 characters long."), z.null()]).optional(),
  });

  const { control, handleSubmit, formState, setError, setValue } =
    useForm<FormType>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });
  const { errors } = formState;

  useEffect(() => {
    if (form !== null) {
      setValue("checkerComment", form.checkerComment);
      setValue("makerComment", form.makerComment);
      setValue("attempt1", form.attempt1);
      setValue("attempt2", form.attempt2);
      setValue("attempt3", form.attempt3);
      setValue("reason1", form.reason1);
      setValue("reason2", form.reason2);
      setValue("reason3", form.reason3);
      setValue("businessKey", form.businessKey);
    }
  }, [form]);

  return (
    <Paper className="px-12" style={{ margin: '5px' }}>
      <br />
      <form>
        <div
          className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
            ? "sm:grid-cols-1 md:grid-cols-2"
            : "sm:grid-cols-2 md:grid-cols-1"
            } lg:grid-cols-2`}
        >
          <div className="w-full flex flex-col space-y-4">

            <Controller
              disabled
              name="makerComment"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="External Verification Instruction"
                  type="text"
                  multiline
                  minRows={3}
                  maxRows={5}
                  error={!!errors.makerComment}
                  helperText={errors?.makerComment?.message}
                  className="mb-20"
                />
              )}
            />

            {editable && (
              <div className="flex flex-row justify-between items-center">
                <p>Attempt 1</p>
                <Controller
                  disabled
                  name="attempt1"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup {...field} className="flex flex-col" >
                      <div className="flex flex-row" >
                        <FormControlLabel
                          disabled
                          value={true}
                          control={<Radio />}
                          label="Successful"
                        />
                        <FormControlLabel
                          disabled
                          value={false}
                          control={<Radio />}
                          label="Not Successful"
                        />
                      </div>
                    </RadioGroup>

                  )}
                />
              </div>
            )}
            {editable && (
              <Controller
                disabled
                name="reason1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reason"
                    type="text"
                    multiline
                    minRows={3}
                    maxRows={5}
                    className="mb-20"
                  />
                )}
              />
            )}
            {editable && (
              <div className="flex flex-row justify-between items-center">
                <p>Attempt 2</p>
                <Controller
                  disabled
                  name="attempt2"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup {...field} className="flex flex-col">
                      <div className="flex flex-row">
                        <FormControlLabel
                          disabled
                          value={true}
                          control={<Radio />}
                          label="Successful"
                        />
                        <FormControlLabel
                          disabled
                          value={false}
                          control={<Radio />}
                          label="Not Successful"
                        />
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
            )}
            {editable && (
              <Controller
                disabled
                name="reason2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reason"
                    type="text"
                    multiline
                    minRows={3}
                    maxRows={5}
                    className="mb-20"
                  />

                )}
              />
            )}
            {editable && (
              <div className="flex flex-row justify-between items-center">
                <p>Attempt 3</p>
                <Controller
                  disabled
                  name="attempt3"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup {...field} className="flex flex-col">
                      <div className="flex flex-row">
                        <FormControlLabel
                          disabled
                          value={true}
                          control={<Radio />}
                          label="Successful"
                        />
                        <FormControlLabel
                          disabled
                          value={false}
                          control={<Radio />}
                          label="Not Successful"
                        />
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
            )}
            {editable && (
              <Controller
                disabled
                name="reason3"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reason"
                    type="text"
                    multiline
                    minRows={3}
                    maxRows={5}
                    className="mb-20"
                  />

                )}
              />
            )}
            {editable && (
              <Controller
                disabled
                name="checkerComment"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Comment"
                    type="text"
                    multiline
                    minRows={3}
                    maxRows={5}
                    className="mb-20"
                  />
                )}
              />
            )}

          </div>

        </div>
        <br />
      </form>
    </Paper>
  );

};

export default frmExternalVerificationForm;