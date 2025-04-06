import { FC, useEffect, useState } from "react";
import { FemExternVerifForm } from "../../components/FemExternVerifForm";
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
import { determineIfDisabled } from "../../../bundle/@helpers/Common";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import Logger from "../../../../../@helpers/Logger";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { toast } from "react-toastify";
import { Api } from "../../../../../api/Api";

export interface FrmVerificationFormProps {
  editable: boolean;
  commentArea?: boolean;
  form: FemExternVerifForm | null;
  procId: string;
  task: TaskDetailInfo;
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
  const { task } = props;
  const { procId, form, editable } = props;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const schema = z.object({
    makerComment: z
      .union([
        z
          .string()
          .max(
            255,
            "External Verificaion Instruction must be at most 225 characters long."
          ),
        z.null(),
      ])
      .optional(),
    attempt1: z.boolean().optional(),
    attempt2: z.boolean().optional(),
    attempt3: z.boolean().optional(),
    checkerComment: z
      .union([
        z.string().max(255, "Comment must be at most 225 characters long."),
        z.null(),
      ])
      .optional(),
    reason1: z
      .union([
        z.string().max(255, "Reason1 must be at most 225 characters long."),
        z.null(),
      ])
      .optional(),
    reason2: z
      .union([
        z.string().max(255, "Reason2 must be at most 225 characters long."),
        z.null(),
      ])
      .optional(),
    reason3: z
      .union([
        z.string().max(255, "Reason3 must be at most 225 characters long."),
        z.null(),
      ])
      .optional(),
  });

  const { control, handleSubmit, formState, setError, setValue } =
    useForm<FormType>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });

  const { errors } = formState;

  const handleOnSubmit = async (formData: FormType) => {
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }

    const {
      checkerComment,
      makerComment,
      attempt1,
      attempt2,
      attempt3,
      reason1,
      reason2,
      reason3,
    } = formData;

    const request: FemExternVerifForm = {
      checkerComment,
      makerComment,
      attempt1,
      attempt2,
      attempt3,
      reason1,
      reason2,
      reason3,
      businessKey: "",
      processInstance: task.processInstanceId,
      taskInstance:task.taskInstance
    };

    const proId: string | null = task.processInstanceId;

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.saveExternalVerificationAttampts(request, proId)
    );

    if (err === null) {
      toast.success("Your Request Was Saved Successfully");
      setIsSubmitted(false);
    } else {
      toast.error(err.msg);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  useEffect(() => {
    if (form !== null) {
      setValue("checkerComment", form.checkerComment);
      setValue("makerComment", form.makerComment);
      setValue("attempt1", form.attempt1 ?? false);
      setValue("attempt2", form.attempt2 ?? false);
      setValue("attempt3", form.attempt3 ?? false);
      setValue("reason1", form.reason1);
      setValue("reason2", form.reason2);
      setValue("reason3", form.reason3);
      setValue("businessKey", form.businessKey);
    }
  }, [form,setValue]);

  return (
    <Paper className="px-12">
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex text-blue-gray-800">
          <EdgeSvgIcon
            className="icon-size-18 cursor-pointer mr-3"
            color="error"
          >
            feather:user-plus
          </EdgeSvgIcon>
          VERIFICATION INSTRUCTION
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div
          className={`grid grid-cols-1 gap-9 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-1"
          } lg:grid-cols-2`}
        >
          <div className="w-full flex flex-col space-y-4">
            <Controller
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
                  disabled={editable}
                />
              )}
            />

            {editable && (
              <div className="flex flex-row justify-between items-center">
                <p>Attempt 1</p>
                <Controller
                  name="attempt1"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      className="flex flex-col"
                      value={field.value ? "true" : "false"}
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
                    >
                      <div className="flex flex-row">
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Successful"
                        />
                        <FormControlLabel
                          value="false"
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
                    error={!!errors.reason1}
                    helperText={errors?.reason1?.message}
                    className="mb-20"
                  />
                )}
              />
            )}
            {editable && (
              <div className="flex flex-row justify-between items-center">
                <p>Attempt 2</p>
                <Controller
                  name="attempt2"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      className="flex flex-col"
                      value={field.value ? "true" : "false"}
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
                    >
                      <div className="flex flex-row">
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Successful"
                        />
                        <FormControlLabel
                          value="false"
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
                    error={!!errors.reason2}
                    helperText={errors?.reason2?.message}
                    className="mb-20"
                  />
                )}
              />
            )}
            {editable && (
              <div className="flex flex-row justify-between items-center">
                <p>Attempt 3</p>
                <Controller
                  name="attempt3"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      className="flex flex-col"
                      value={field.value ? "true" : "false"}
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
                    >
                      <div className="flex flex-row">
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Successful"
                        />
                        <FormControlLabel
                          value="false"
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
                    error={!!errors.reason3}
                    helperText={errors?.reason3?.message}
                    className="mb-20"
                  />
                )}
              />
            )}
            {editable && (
              <Controller
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
                    error={!!errors.checkerComment}
                    helperText={errors?.checkerComment?.message}
                    className="mb-20"
                  />
                )}
              />
            )}
          </div>
        </div>
        <div className="flex justify-left my-6">
          <Button aria-label="Save" type="submit">
            <EdgeSvgIcon
              className="icon-size-12 cursor-pointer text-white mr-3"
              color="error"
            >
              feather:save
            </EdgeSvgIcon>
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default frmExternalVerificationForm;
