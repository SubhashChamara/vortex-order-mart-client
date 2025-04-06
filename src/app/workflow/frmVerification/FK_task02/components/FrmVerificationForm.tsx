import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { FC, useEffect, useState } from "react";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";
import { toast } from "react-toastify";
import { FemVerificForm } from "../../components/FemVerificForm";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";

export interface FrmVerificationFormProps {
  editable: boolean;
  commentArea?: boolean;
  form: FemVerificForm | null;
  procId: string;
  task: TaskDetailInfo
}

// Long: number;
// rsdVerification: boolean;
//   empVerification: boolean;
// reason:string;
// checkerComment: string;

type FormType = {
  rsdVerification: boolean;
  empVerification: boolean;
  reason: string;
  checkerComment: string;
  procId: string;
};

const defaultValues: FormType = {
  rsdVerification: false,
  empVerification: false,
  reason: "",
  checkerComment: "",
  procId:"",
};

const FrmVerificationForm: FC<FrmVerificationFormProps> = (props) => {
  const { procId,form, task } = props;
  
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { editable, commentArea } = props;
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const schema = z.object({
    reason: z.union([z.string().max(255, "Maker comment must be at most 225 characters long."), z.null()]).optional(),
    rsdVerification: z.union([z.boolean(), z.null()]).optional(),
    empVerification: z.union([z.boolean(), z.null()]).optional(),
    checkerComment: z.union([z.string().max(255, "Checker comment must be at most 225 characters long."), z.null()]).optional(),
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
      setIsSubmitted(true);
  
      const { rsdVerification, empVerification, reason, checkerComment } = formData;
  
      const request: FemVerificForm = {
        rsdVerification,
        empVerification,
        reason,
        checkerComment,
        processInstance: task.processInstanceId,
        taskInstance: task.taskInstance
      };
      
  console.log('reason',reason)
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.saveVerificCommentForm(request,procId)
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
      setValue("rsdVerification", form.rsdVerification);
      setValue("empVerification", form.empVerification);
      setValue("reason", form.reason);
      setValue("checkerComment", form.checkerComment);
      setValue("procId",procId);
    }
    console.log(procId)
  }, [form]);

  return (
    <Paper className="px-12">
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex text-blue-gray-800">
          <EdgeSvgIcon className="icon-size-18 cursor-pointer mr-3" color="error">
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
            <div className="flex flex-row justify-between items-center">
              <p>Do RSD Verification</p>
              <Controller
                name="rsdVerification"
                control={control}
                defaultValue={false}
                disabled={editable}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <p>Do EMP Verification</p>
              <Controller
                name="empVerification"
                control={control}
                defaultValue={false}
                disabled={editable}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              />
            </div>
            <Controller
              name="reason"
              control={control}
              disabled={editable}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Reason"
                  type="text"
                  multiline
                  minRows={3}
                  maxRows={5}
                  error={!!errors.reason}
                  helperText={errors?.reason?.message}
                  className="mb-20"
                />
              )}
            />
            {commentArea && (
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

export default FrmVerificationForm;
