import { FC, memo, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { FemInvsProcessInfi } from "../../@types/FemInvsProcessInfi";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";
import { toast } from "react-toastify";
import { FemlnvsRequest } from "../../@types/FemlnvsRequest";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { NicDetails } from "../../../../core/types/NicDetails";

type FormType = {
  workFlowLabel: string;
  source: string;
  bundledRef: string;
  oldNic: string;
  newNic: string;
  month: number;
  year: number | null;
  groupAccNo: string;
  ecapsRef: string;
  bucket: number | null;
  delinquency: number | null;
  invokerComment: string;
  makerComment: string;
  processInstanceId: string;
};

const defaultValues: FormType = {
  workFlowLabel: "",
  source: "Manual",
  bundledRef: "",
  oldNic: "",
  newNic: "",
  month: 0,
  year: null,
  groupAccNo: "",
  ecapsRef: "",
  bucket: null,
  delinquency: null,
  invokerComment: "",
  makerComment: "",
  processInstanceId: "",
};

type FrmInvestProps = {
  task: TaskDetailInfo;
  file: File | null;
  form: FemInvsProcessInfi | null;
  commentStatus: boolean;
  monthList: { id: number; name: string }[];
  taskName : string;
};

const FrmInvstForm: FC<FrmInvestProps> = (props) => {
  const { task, file, form, commentStatus, monthList,taskName } = props;

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [getNewNIC, setNewNIC] = useState<NicDetails | null>(null);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [gettitleList, settitleList] = useState([
    {
      id: 1,
      name: "January",
    },
    {
      id: 2,
      name: "February",
    },
  ]);

  const schema = z.object({
    // workFlowLabel: z.string().min(1, "Workflow is mandatory."),
    month: z.number().min(1, "Source is mandatory."),
    oldNic: z.union([
      z
        .string()
        .trim()
        .regex(/^\d{9}[VvXx]$/, {
          message:
            "Old NIC must be 9 digits followed by 'V', 'v', 'X', or 'x'.",
        }),
      z.null(),
      z.literal("").optional(),
    ]),
    source: z.union([z.string(), z.null()]).optional(),
    bundledRef: z.union([z.string(), z.null()]).optional(),
    newNic: z.union([
      z
        .string()
        .trim()
        .length(12, { message: "New NIC must be exactly 12 characters long." }),
      z.null(),
      z.literal("").optional(),
    ]),
    year: z.union([z.number(), z.null()]).optional(),
    groupAccNo: z.union([z.string(), z.null()]).optional(),
    ecapsRef: z
    .string()
    .refine((val) => !val || val.length === 11 || val.length === 16, {
      message: "Ecaps Ref must be either 11 or 16 characters long",
    }),
    bucket: z.union([z.number(), z.null()]).optional(),
    delinquency: z.union([z.number(), z.null()]).optional(),
    invokerComment: z.union([z.string().max(255, "Invoker comment must be at most 225 characters long."), z.null()]).optional(),
    makerComment: z.union([z.string().max(255, "Maker comment must be at most 225 characters long."), z.null()]).optional(),
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

    const {
      workFlowLabel,
      source,
      bundledRef,
      oldNic,
      newNic,
      month,
      year,
      groupAccNo,
      ecapsRef,
      bucket,
      delinquency,
      invokerComment,
      makerComment,
      processInstanceId,
    } = formData;

    let doc = null;
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("processInstance", task.processInstanceId);

      const { data, err } = await Api.performRequest((r) =>
        r.document.upload(formData)
      );

      if (data !== null) {
        doc = data;
        toast.success("Successfully Uploaded File");
      } else {
        toast.error(err?.msg);
      }
    }

    const request: FemlnvsRequest = {
      workFlowLabel,
      source: "Manual",
      bundledRef,
      oldNic,
      newNic,
      month,
      year,
      groupAccNo,
      ecapsRef,
      bucket,
      delinquency,
      invokerComment,
      makerComment,
      processInstanceId: task.processInstanceId,
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
      taskName : taskName
    };
    console.log(request);
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.saveForm(request)
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
      setValue("workFlowLabel", form.workFlowLabel);
      setValue("source", form.source);
      setValue("bundledRef", form.bundledRef);
      setValue("oldNic", form.oldNic);
      setValue("newNic", form.newNic);
      setValue("month", form.month);
      setValue("year", form.year);
      setValue("groupAccNo", form.groupAccNo);
      setValue("ecapsRef", form.ecapsRef);
      setValue("bucket", form.bucket);
      setValue("invokerComment", form.invokerComment);
      setValue("makerComment", form.makerComment);
      setValue("delinquency", form.delinquency);
    }
  }, [form]);

  const convertOldNICToNewNIC = async (value: string) => {

    if(value.toUpperCase().endsWith("V") || value.toUpperCase().endsWith("X")){
      console.log("Testing Old NIC:", value);
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getNewNIC(value)
      );

      if (err === null) {
        setNewNIC(data);
        setValue("newNic", data.eic); 
      } else {
        setTimeout(() => setIsSubmitted(false), 3000);
      }
      console.log(getNewNIC);
    }
  };

  return (
    <Paper className="px-12">
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
          <div>FRM INVESTGATION FLOW</div>
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
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="Source"
                size="small"
                type="email"
                error={!!errors.source}
                helperText={errors?.source?.message}
              />
            )}
          />

          <Controller
            name="bundledRef"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Bundled Ref"
                size="small"
                type="text"
                disabled={!commentStatus || field.value === "BUNDLED" || (control._formValues?.source === "BUNDLED")}
                error={!!errors.bundledRef}
                helperText={errors?.bundledRef?.message}
              />
            )}
          />

          <Controller
            name="oldNic"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Old NIC"
                size="small"
                type="text"
                error={!!errors.oldNic}
                helperText={errors?.oldNic?.message}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  convertOldNICToNewNIC(value);
                }}
              />
            )}
          />

          <Controller
            name="newNic"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="New NIC"
                size="small"
                type="text"
                error={!!errors.newNic}
                helperText={errors?.newNic?.message}
              />
            )}
          />

          <Controller
            name="month"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={monthList}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={monthList.find((option) => option.id === value) || null}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue.id : "");
                  console.log("value", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Month"
                    size="small"
                    error={!!errors.month}
                    helperText={errors?.month?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="year"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  format="YYYY"
                  value={value ? dayjs(String(value), "YYYY") : null}
                  label="Year"
                  onChange={(newValue) => {
                    if (newValue) {
                      const yearNumber = newValue.year(); 
                      onChange(yearNumber);
                    } else {
                      onChange(null);
                    }
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      helperText: <>{errors?.year?.message}</>,
                      error: !!errors.year,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="groupAccNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Group Account No"
                size="small"
                type="text"
                error={!!errors.groupAccNo}
                helperText={errors?.groupAccNo?.message}
              />
            )}
          />

          <Controller
            name="ecapsRef"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="ECAPS Ref"
                size="small"
                type="text"
                error={!!errors.ecapsRef}
                helperText={errors?.ecapsRef?.message}
              />
            )}
          />

          <Controller
            name="bucket"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Bucket"
                size="small"
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors.bucket}
                helperText={errors?.bucket?.message}
              />
            )}
          />

          <Controller
            name="delinquency"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Delinquency"
                size="small"
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors.delinquency}
                helperText={errors?.delinquency?.message}
              />
            )}
          />

          <Controller
            name="invokerComment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!commentStatus}
                label="FRM Invoker Comment"
                size="small"
                type="text"
                multiline
                minRows={3}
                maxRows={5}
                error={!!errors.invokerComment}
                helperText={errors?.invokerComment?.message}
              />
            )}
          />

          {!commentStatus && (
            <Controller
              name="makerComment"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="FRM Maker Comment"
                  size="small"
                  type="text"
                  multiline
                  minRows={3}
                  maxRows={5}
                  error={!!errors.makerComment}
                  helperText={errors?.makerComment?.message}
                />
              )}
            />
          )}
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

export default memo(FrmInvstForm);
