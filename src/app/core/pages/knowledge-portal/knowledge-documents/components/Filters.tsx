import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextField } from "@mui/material";

import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import Logger from "../../../../../../@helpers/Logger";
import { DocumentListParams } from "../../../../../../api/types/params/DocumentListParams";

type FormType = {
  startDate: string;
  endDate: string;
  label: string;
};

const defaultValues: FormType = {
  startDate: moment().subtract(1, "months").format("YYYY-MM-DD"),
  endDate: moment().format("YYYY-MM-DD"),
  label: "",
};

const schema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  label: z.string(),
});

type FiltersProps = {
  setFilterValues: (v: DocumentListParams | null) => void;
};

const Filters: FC<FiltersProps> = (props) => {
  const { setFilterValues } = props;

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const handleOnSubmit = async (formData: FormType) => {
    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);

    const { label, startDate, endDate } = formData;

    const params: DocumentListParams = {
      endDate: moment(endDate).format("YYYY-MM-DD"),
      startDate: moment(startDate).format("YYYY-MM-DD"),
      workflowLabel: label,
      idProcess: null,
      processInstance: null,
      processName: null,
      page: 0,
      size: 10,
      sort: "createdDate,desc",
    };

    setFilterValues(params);
  };

  return (
    <div className="sm:p-0 bg-white rounded-md ml-5 mr-5 sm:ml-0 sm:mr-0">
      <div className="text-left mb-5 border-b-1 border-b-gray-200 ml-4">
        <h1 className="text-sm font-600 text-blue-900 ">Filter Section</h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 p-6 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2 sm:p-5"
              : "sm:grid-cols-2 md:grid-cols-1 sm:p-5"
          } lg:grid-cols-4`}
        >
          <Controller
            name="label"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="PF Label"
                size="small"
                type="text"
                error={!!errors.label}
                helperText={errors?.label?.message}
              />
            )}
          />

          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="From Date"
                required
                size="small"
                type="date"
                error={!!errors.startDate}
                helperText={errors?.startDate?.message}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="To Date"
                required
                size="small"
                type="date"
                error={!!errors.endDate}
                helperText={errors?.endDate?.message}
              />
            )}
          />
        </div>
        <div className="flex justify-center gap-10 sm:justify-end my-6 w-full">
          <Button aria-label="Cancel" type="reset">
            Cancel
          </Button>
          <Button aria-label="Submit" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
