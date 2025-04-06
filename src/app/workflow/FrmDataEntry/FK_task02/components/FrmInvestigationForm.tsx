import { FC, memo, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Paper, TextField } from "@mui/material";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { FemInvsProcessInfi } from "../../@types/FemInvsProcessInfi";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

type FormType = {
  workFlowLabel: string;
  source: string;
  bundledRef: string;
  oldNic: string;
  newNic: string;
  month: number;
  year: number;
  groupAccNo: string;
  ecapsRef: string;
  bucket: number;
  delinquency: number;
  invokerComment: string;
  makerComment: string;
  processInstanceId: string;
};

const defaultValues: FormType = {
  workFlowLabel: "",
  source: "",
  bundledRef: "",
  oldNic: "",
  newNic: "",
  month: 0,
  year: 0,
  groupAccNo: "",
  ecapsRef: "",
  bucket: 0,
  delinquency: 0,
  invokerComment: "",
  makerComment: "",
  processInstanceId: ""
};

type FrmInvestProps = {
  form: FemInvsProcessInfi | null;
};

const FrmInvstForm: FC<FrmInvestProps> = (props) => {
  const { form } = props;

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [gettitleList] = useState([
    {
      id: 1,
      name: "January"
    },
    {
      id: 2,
      name: "February"
    },
    {
      id: 3,
      name: "March"
    },
    {
      id: 4,
      name: "April"
    },
    {
      id: 5,
      name: "May"
    },
    {
      id: 6,
      name: "June"
    },
    {
      id: 7,
      name: "July"
    },
    {
      id: 8,
      name: "August"
    },
    {
      id: 9,
      name: "September"
    },
    {
      id: 10,
      name: "October"
    },
    {
      id: 11,
      name: "November"
    },
    {
      id: 12,
      name: "December"
    }
  ]);

  const schema = z.object({
    // workFlowLabel: z.string().min(1, "Workflow is mandatory."),
    source: z.string().min(1, "Source is mandatory."),
    bundledRef: z.string().min(1, "Bundled Ref is mandatory."),
    oldNic: z.string().min(1, "Old NIC is mandatory."),
    newNic: z.string(),
    year: z
      .number()
      .refine((value) => /^\d{4}$/.test(String(value)), {
        message: "Year must be a valid 4-digit number.",
      })
      .refine((value) => value >= 1900 && value <= new Date().getFullYear(), {
        message: `Year must be between 1900 and ${new Date().getFullYear()}.`,
      }),
    groupAccNo: z.string(),
    ecapsRef: z.string(),
    bucket: z.number().min(1, "Bucket is mandatory."),
    delinquency: z.number().min(1, "Bucket is mandatory."),
    comment: z.string(),
    makerComment: z.string(),
  });

  const { control, formState, setValue } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  useEffect(() => {
    if (form !== null) {
      console.log("form inside:", form)
      // setValue("workFlowLabel", form.workFlowLabel);
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
  })

  return (
    <Paper className="px-12 pb-8">
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
      <form noValidate>
        <div
          className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
            ? "sm:grid-cols-1 md:grid-cols-2"
            : "sm:grid-cols-2 md:grid-cols-1"
            } lg:grid-cols-2`}
        >
          {/* <Controller
            name="workFlowLabel"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Workflow Label"
                disabled={false} 
                size="small"
                type="text"
                error={!!errors.workFlowLabel}
                helperText={errors?.workFlowLabel?.message}
              />
            )}
          /> */}

          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled
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
                required
                disabled
                label="Bundled Ref"
                size="small"
                type="text"
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
                required
                disabled
                label="Old NIC"
                size="small"
                type="text"
                error={!!errors.oldNic}
                helperText={errors?.oldNic?.message}
              />
            )}
          />

          <Controller
            name="newNic"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled
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
            render={({ field: { onChange } }) => (
              <Autocomplete
                disabled
                options={gettitleList}
                getOptionLabel={(option) => option.name || ""}
                // isOptionEqualToValue={(option, val) => option.id === val.id}
                value={gettitleList.find((option) => option.id === form?.month) || null}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue.id : ""); // Use the `name` or empty string
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled
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
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled
                label="Year"
                size="small"
                type="number" // Use type="number" to allow only numeric input
                onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
                error={!!errors.year}
                helperText={errors?.year?.message}
              />
            )}
          />

          <Controller
            name="groupAccNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled
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
                disabled
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
                required
                disabled
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
                required
                disabled
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
                disabled
                label="FRM Invoker Comment"
                size="small"
                type="text"
                multiline
                minRows={3}
                maxRows={5}
                error={!!errors.comment}
                helperText={errors?.comment?.message}
              />
            )}
          />

          <Controller
            name="makerComment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled
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


        </div>
      </form>
    </Paper>
  );
};


export default memo(FrmInvstForm);
