import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";

import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import Logger from "../../../../../@helpers/Logger";
import { BasicProcessInfo } from "../../../types/BasicProcessInfo";
import { Api } from "../../../../../api/Api";
import moment from "moment";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { ProcessStatusInfo } from "../../../types/ProcessStatusInfo";
import { ProcessInfo } from "../../../types/ProcessInfo";

export type ScoreBoardFilters = {
  process: BasicProcessInfo | null;
  label: string;
  fromDate: string;
  toDate: string;
  status: ProcessStatusInfo | null;
};

type ScoreBoardFiltersProps = {
  handlePassFilters: (form: ScoreBoardFilters) => void;
};

const defaultValues: ScoreBoardFilters = {
  process: null,
  label: "",
  fromDate: moment().subtract(1, "months").format("YYYY-MM-DD"),
  toDate: moment().format("YYYY-MM-DD"),
  status: null,
};

const schema = z.object({
  process: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
  label: z.string().optional(),
  fromDate: z.string().min(1, "Please select start date"),
  toDate: z.string().min(1, "Please select end date"),
  status: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});

const ScoreboardFilters: FC<ScoreBoardFiltersProps> = (props) => {
  const { handlePassFilters } = props;
  const [processList, setProcessList] = useState<ProcessInfo[]>([]);
  const [processStatusList, setProcessStatusList] = useState<
    ProcessStatusInfo[]
  >([]);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState } = useForm<ScoreBoardFilters>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const handleOnSubmit = async (formData: ScoreBoardFilters) => {
    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
    handlePassFilters(formData);
  };

  const handleFetchProcessList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.processInfoList()
    );
    Logger.debug(
      "(Proc List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setProcessList(data);
    }
  };
  const handleFetchProcessStatusList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.workflow.processStatusList()
    );
    Logger.debug(
      "(Proc Status List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setProcessStatusList(data);
    }
  };

  useEffect(() => {
    handleFetchProcessList();
    handleFetchProcessStatusList();
  }, []);

  return (
    <Paper className="my-12 p-6">
      <div className="flex pb-6">
        <EdgeSvgIcon
          className="icon-size-28 cursor-pointer text-red-600"
          color="error"
        >
          material-solid:leaderboard
        </EdgeSvgIcon>
        <div className="text-red-600 font-bold flex-col pl-6">
          <div>Track & Trace</div>
          <div className="text-[12px] text-gray">
            Process monitoring panel with history.
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6"
              : "sm:grid-cols-2 md:grid-cols-1 sm:p-6"
          } lg:grid-cols-6`}
        >
          <Controller
            name="process"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={processList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Process"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.process}
                    helperText={errors?.process?.message}
                  />
                )}
              />
            )}
          />

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
            name="fromDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="From Date"
                required
                size="small"
                type="date"
                error={!!errors.fromDate}
                helperText={errors?.fromDate?.message}
              />
            )}
          />

          <Controller
            name="toDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="To Date"
                required
                size="small"
                type="date"
                error={!!errors.toDate}
                helperText={errors?.toDate?.message}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={processStatusList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.status}
                    helperText={errors?.status?.message}
                  />
                )}
              />
            )}
          />

          <div className="flex w-full justify-end xsm:col-span-2 md:col-span-1">
            <Button aria-label="Submit" type="submit">
              <EdgeSvgIcon
                className="icon-size-12 cursor-pointer text-white mr-3"
                color="error"
              >
                feather:search
              </EdgeSvgIcon>
              Search
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default ScoreboardFilters;
