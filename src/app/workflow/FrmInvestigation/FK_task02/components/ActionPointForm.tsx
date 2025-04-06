import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { ActionPointInfo } from "../@types/ActionPointInfo";
import { FC, memo, useEffect, useState } from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import {
  Autocomplete,
  Checkbox,
  Button,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Logger from "../../../../../@helpers/Logger";
import { toast } from "react-toastify";
import { Api } from "../../../../../api/Api";
import { ActionPointRequest } from "../@types/ActionPointRequest";
import { ActionPointInfoList } from "../@types/ActionPointInfoList";

type ActionPointProps = {
  task: TaskDetailInfo;
  file: File | null;
  form: ActionPointRequest | null;
};

const ActionPointForm: FC<ActionPointProps> = (props) => {
  const { task, file, form } = props;

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [actionPoints, setActionPoints] = useState<ActionPointInfoList[]>([]);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  type FormType = {
    actionPointemail: string;
    actionPoint: string;
  };

  const defaultValues: FormType = {
    actionPointemail: "",
    actionPoint: "",
  };

  const schema = z.object({
    actionPointemail: z
    .string()
    .min(1, "Email is mandatory.")
    .email("Please provide a valid email address.")
    .refine(value => value !== null, { message: "Email cannot be null." }),
    
  actionPoint: z
    .string()
    .min(1, "Action point is mandatory.")
    .max(255, "Action point must be at most 255 characters long.")
    .refine(value => value !== null, { message: "Action point cannot be null." })
});

  const { control, handleSubmit, formState, setError, setValue, watch } =
    useForm<FormType>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });

  const { errors } = formState;

  const handleNewActionPoint = (formData: FormType) => {
    setActionPoints((prevActionPoints) => [
      ...prevActionPoints, // Append the new action point to the existing array
      {
        email: formData.actionPointemail,
        actionPoint: formData.actionPoint,
      },
    ]);
    toast.success("Your Action Point Was SavedSuccessfully Added");
  };

  const handleOnSubmit = async () => {
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }
    setIsSubmitted(true);


    let doc = null;
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("processInstance", task.processInstanceId);

    }

    const request: ActionPointRequest = {
      processInstance: task.processInstanceId,
      actionPoints: actionPoints
    };
    
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.saveActionPoinForm(request)
    );

    if (err === null) {
      toast.success("Your Request Was Saved Successfully");
      setIsSubmitted(false);
    } else {
      toast.error(err.msg);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  function handleRemove(index: number) {
    console.log("Removing item at index:", index);
    const newRows = [...actionPoints];
    newRows.splice(index, 1);
    setActionPoints(newRows);
    toast.success("Your Action Point Was SavedSuccessfully Removed");
    console.log("Updated action points:", newRows);
  }
  


  useEffect(() => {
    if (form?.actionPoints) {
      setActionPoints((prevActionPoints) => [
        ...prevActionPoints,
        ...form.actionPoints.map((actionPoint) => ({
          email: actionPoint.email,
          actionPoint: actionPoint.actionPoint,
        })),
      ]);
    }
  }, [form]);

  return (
    <Paper className="px-12 h-full flex flex-col">
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
          <div>ACTION POINTS</div>
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(handleNewActionPoint)}
        className="flex-grow"
        noValidate
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
          <div className="col-span-2">
            <Controller
              name="actionPointemail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  label="Action Point Email"
                  disabled={false}
                  fullWidth
                  size="small"
                  type="email"
                  error={!!errors.actionPointemail}
                  helperText={errors?.actionPointemail?.message}
                />
              )}
            />
          </div>

          <div className="col-span-2">
            <Controller
              name="actionPoint"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  label="Action Point"
                  fullWidth
                  size="small"
                  type="text"
                  multiline
                  minRows={3}
                  maxRows={3}
                  error={!!errors.actionPoint}
                  helperText={errors?.actionPoint?.message}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "calc(1.5em + 70px)",
                    },
                  }}
                />
              )}
            />
          </div>

          <div className="col-span-2">
            <Button aria-label="Save" type="submit">
              <EdgeSvgIcon
                className="icon-size-12 cursor-pointer text-white mr-3"
                color="error"
              >
                feather:save
              </EdgeSvgIcon>
              ADD ACTION POINT
            </Button>
          </div>

          <div className="col-span-2">
            <TableContainer component={Paper} className="max-w-screen-md">
              <Table className="max-w-screen-md">
                <TableHead>
                  <TableRow>
                    <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6 w-1/2">
                      Email
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6 w-1/2">
                      Action Point
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6 w-1/2"></TableCell>
                  </TableRow>
                </TableHead>
                {actionPoints.map((row, index) => (
                  <TableRow key={row.email + index}>
                    <TableCell className="border border-gray-300 w-1/2">
                      {row.email}
                    </TableCell>
                    <TableCell className="border border-gray-300 pb-0 pt-0 w-1/2">
                      {row.actionPoint}
                    </TableCell>
                    <TableCell className="border border-gray-300 pb-0 pt-0 w-1/2">
                    <button onClick={() => handleRemove(index)}>Remove</button></TableCell>
                  </TableRow>
                ))}
              </Table>
            </TableContainer>
          </div>
          <div className="mt-auto flex justify-left mb-6">
            <Button aria-label="Save" type="button" onClick={handleOnSubmit}>
              <EdgeSvgIcon
                className="icon-size-12 cursor-pointer text-white mr-3"
                color="error"
              >
                feather:save
              </EdgeSvgIcon>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default memo(ActionPointForm);
