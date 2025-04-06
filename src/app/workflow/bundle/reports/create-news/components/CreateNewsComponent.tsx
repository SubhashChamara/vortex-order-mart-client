import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { string, z } from "zod";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../../@helpers/Logger";
import { CreateNews } from "../../../../../core/types/reports/CreateNews";
import { Api } from "../../../../../../api/Api";
import { toast } from "react-toastify";
import EdgeButton from "../../../../../../@edgevantage/core/EdgeButton/EdgeButton";

// Types
export type FormType = {
  startDate: Date | null;
  endDate: Date | null;
  message: string;
  isEditable?: boolean;
};

type CreateNewsProps = {
  title: string;
  actionName: string;
  newsForUpdate: CreateNews | null;
  formReset: () => void;
  fetchNewsList: () => void;
};

const defaultValues: FormType = {
  startDate: dayjs().startOf("month").toDate(),
  endDate: dayjs().toDate(),
  message: "",
  isEditable: false,
};

const schema = z.object({
  startDate: z.instanceof(Date, { message: "Invalid Date" })
    .refine((date) => !isNaN(date.getTime()), { message: "Start Date is required" }),
  endDate: z.instanceof(Date, { message: "Invalid Date" })
    .refine((date) => !isNaN(date.getTime()), { message: "End Date is required" }),
  message: string().min(1, { message: "Message is required" }),
});

const CreateNewsComponent: FC<CreateNewsProps> = ({ formReset, fetchNewsList, title, actionName, newsForUpdate }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [startedDate, setStartedDate] = useState<Date | null>(null);


  const { control, handleSubmit, formState, setValue, reset } = useForm<FormType>({
    mode: "onSubmit",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  useEffect(() => {
    if (actionName === "UPDATE" && newsForUpdate) {
      setValue("startDate", dayjs(newsForUpdate.startDate).toDate());
      setValue("endDate", dayjs(newsForUpdate.endDate).toDate());
      setValue("message", newsForUpdate.message);
    }
  }, [actionName, newsForUpdate, setValue]);


  const handleOnSubmit = async (formData: FormType) => {
    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }

    setIsSubmitted(true);


    const request: CreateNews = {
      startDate: formData.startDate ? dayjs(formData.startDate).format("YYYY-MM-DDTHH:mm:ss") : "",
      endDate: formData.endDate ? dayjs(formData.endDate).format("YYYY-MM-DDTHH:mm:ss") : "",
      message: formData.message,
      isEditable: formData.isEditable || false,
    };

    const { data, err } =
      actionName == "CREATE"
        ? await Api.performRequest((r) =>
          r.reports.createNews(request))
        : await Api.performRequest((r) =>
          r.reports.updateNews(request || null, newsForUpdate?.id || 0)
        );


    Logger.debug(
      "(Process Creation) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (err == null) {
      let successMsg: string;
      actionName == "CREATE"
        ? (successMsg = "News created Successfully")
        : (successMsg = "News Updated Successfully");
      fetchNewsList();
      toast.success(successMsg);
      reset();
    } else {
      toast.error(err?.msg);
    }

    setTimeout(() => setIsSubmitted(false), 3000);
    formReset();
  };

  const resetForm = () => {
    setValue("startDate", dayjs().toDate());
    setValue("endDate", dayjs().toDate());
    setValue("message", "");
    formReset();
  };

  return (
    <Paper className="my-12 p-6">
      <div className="flex pb-6">
        <EdgeSvgIcon className="icon-size-28 cursor-pointer text-red-600" color="error">
          feather:file-text
        </EdgeSvgIcon>
        <div className="text-red-600 font-bold flex-col pl-6">
          <div>{title}</div>
          {/* <div className="text-[12px] text-gray">This provides {title} information</div> */}
        </div>
      </div>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Box sx={{ width: { lg: "50%", md: "70%" }, p: 1 }}>
          <Grid container spacing={3}>
            {/* Start Date */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="startDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year", "month", "day"]}
                      format="DD-MM-YYYY"
                      value={value ? dayjs(value) : null}
                      label="Start Date"
                      onChange={(newValue) => {
                        const dateOnly = newValue ? dayjs(newValue).endOf("day").toDate() : null;
                        onChange(dateOnly);
                        setStartedDate(dateOnly);
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          error: !!errors.startDate,
                          helperText: errors?.startDate?.message,
                        },
                      }}
                      maxDate={dayjs()}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="endDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year", "month", "day"]}
                      format="DD-MM-YYYY"
                      value={value ? dayjs(value) : null}
                      label="End Date"
                      onChange={(newValue) => {
                        const dateOnly = newValue ? dayjs(newValue).endOf("day").toDate() : null;
                        onChange(dateOnly);
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          error: !!errors.endDate,
                          helperText: errors?.endDate?.message,
                        },
                      }}
                      maxDate={dayjs()}
                      minDate={startedDate ? dayjs(startedDate) : undefined}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>

            {/* Message Field */}
            <Grid item xs={12}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Message"
                    multiline
                    fullWidth
                    minRows={3}
                    size="small"
                    error={!!errors.message}
                    helperText={errors?.message?.message}
                  />
                )}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} className="flex gap-6">
              <EdgeButton
                label="Reset"
                icon="feather:refresh-cw"
                onClick={resetForm}

              />

              <EdgeButton label={actionName}
                type="submit"
                icon={actionName == "CREATE" ? "feather:save" : "feather:edit"}
              />

            </Grid>
          </Grid>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateNewsComponent;
