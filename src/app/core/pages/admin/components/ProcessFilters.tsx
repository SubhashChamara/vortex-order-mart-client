import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";

import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import Logger from "../../../../../@helpers/Logger";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Api } from "../../../../../api/Api";
import { ProcessInfo } from "../../../types/ProcessInfo";
import EdgeButton from "../../../../../@edgevantage/core/EdgeButton/EdgeButton";

export type ReportFilters = {
  processStatus: string | null;
};

type ReportFiltersProps = {
  handlePassFilters: (form: ReportFilters) => void;
};

const defaultValues: ReportFilters = {
  processStatus: null,
};

const schema = z.object({
  processStatus: z.string().nullable(),
});

const ReportFilters: FC<ReportFiltersProps> = (props) => {
  const { handlePassFilters } = props;
  const [procStatus, setProcStatus] = useState<String | null>();
  const [processList, setProcessList] = useState<ProcessInfo[]>([]);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState } = useForm<ReportFilters>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const handleOnSubmit = async (formData: ReportFilters) => {
    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
    console.log("formData", formData);

    handlePassFilters(formData);
  };
  const fetchProcessList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.processInfoList()
    );

    Logger.debug(
      "(Process List) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setProcessList(data);
    }
  };
  useEffect(() => {
    fetchProcessList();
  }, [])


  return (
    <Paper className="my-12 p-6">

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 
            ${mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6"
              : "sm:grid-cols-3 md:grid-cols-1 sm:p-6"
            } lg:grid-cols-4`}
        >
          <Controller
            name="processStatus"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={processList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, val) => option.defKey === val.defKey}
                value={processList.find((item) => item.defKey === value) || null}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue.defKey : null);  // Send `defKey` as the value
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Process"
                    variant="outlined"
                    // required
                    size="small"
                    error={!!errors.processStatus}
                    helperText={errors?.processStatus?.message}
                    InputLabelProps={{
                      sx: {
                        "&.Mui-focused": {
                          color: "#FF181B",
                          fontWeight: 600,
                        },
                      },
                      shrink: true,
                    }}
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF181B",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF181B",
                        },
                      },
                    }}
                  />
                )}
              />
            )}
          />
          <div className="flex justify-center my-6">
            <EdgeButton label="Search" icon="feather:search" type="submit" />
          </div>

        </div>
      </form>
    </Paper>
  );
};

export default ReportFilters;
