import { FC, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import Logger from "../../../../../@helpers/Logger";
import { BasicProcessInfo } from "../../../types/BasicProcessInfo";
import { Api } from "../../../../../api/Api";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { useLocation } from "react-router-dom";
import { watch } from "fs";
import { Label } from "@mui/icons-material";
import { ProcessInfo } from "../../../types/ProcessInfo";

type FormType = {
  process: BasicProcessInfo | null;
  task: string;
  isAllTasks: boolean;
  label: string | null;
};

type FilterObject = {
  process: BasicProcessInfo;
};

const defaultValues: FormType = {
  process: null,
  task: "",
  isAllTasks: true,
  label: null,
};

const schema = z.object({
  process: z
    .object({ id: z.string(), name: z.string() })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select process",
    }),
  label: z.string().optional().nullable(),
  isAllTasks: z.boolean().optional(),
});
type ScoreboardFilterProps = {
  handleFetchTasks: (
    processName: string,
    workflowLabel: string | null,
    isAllTasks: boolean
  ) => void;
};

const ScoreboardFilter: FC<ScoreboardFilterProps> = (props) => {
  const [processList, setProcessList] = useState<ProcessInfo[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const processName = queryParams.get("process");
  // const [selectedProcess, setSelectedProcess] = useState(null);

  useEffect(() => {
    if (!processName || !processList) return;

    const process = processList.find((p) => p.name === processName);
    if (!process) return;

    setValue("process", process);

    const processFilter = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (processFilter) {
      const filterObject = JSON.parse(processFilter);
      filterObject.process.name = processName;
      const updatedProcessFilter = JSON.stringify(filterObject);
      localStorage.setItem(LOCAL_STORAGE_KEY, updatedProcessFilter);
    } else {
      const filterObject: FilterObject = { process };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filterObject));
    }

    handleFetchTasks(process.name, null, true);
  }, [processName, processList]);

  const { handleFetchTasks } = props;

  const formRef = useRef<HTMLFormElement | null>(null);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, setValue } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const LOCAL_STORAGE_KEY = "taskpadFilters";

  const handleOnSubmit = async (formData: FormType) => {
    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);

    const { process, label, task, isAllTasks } = formData;

    if (process === null) {
      Logger.debug("Process can not be null");
      return;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    handleFetchTasks(process?.name, label, isAllTasks);
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

      const savedFormState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedFormState) {
        const parsedState = JSON.parse(savedFormState) as FormType;
        setValue("process", parsedState.process);
        setValue("task", parsedState.task);
        setValue("label", parsedState.label);
        setValue("isAllTasks", parsedState.isAllTasks);

        formRef.current?.requestSubmit();
      } else if (data.length !== 0 && processName == null) {
        setValue("process", data[0]);
        handleFetchTasks(data[0].name, null, true);
      }
    }
  };

  useEffect(() => {
    handleFetchProcessList();
  }, []);

  return (
    <Paper className="my-12 p-6">
      <div className="flex pb-6">
        <EdgeSvgIcon
          className="icon-size-28 cursor-pointer text-red-600"
          color="error"
        >
          material-solid:task
        </EdgeSvgIcon>
        <div className="text-red-600 font-bold flex-col pl-6">
          <div>Task Pad</div>
          <div className="text-[12px] text-gray">
            All user tasks that user has to complete.
          </div>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6"
              : "sm:grid-cols-2 md:grid-cols-1 sm:p-6"
          } lg:grid-cols-5`}
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
                  formRef.current?.requestSubmit();
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Process"
                    required
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
            name="task"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={[]}
                // getOptionLabel={(option) => option.name}
                // isOptionEqualToValue={(option, val) => option.id === val.id}
                className="hidden"
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Task"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.task}
                    helperText={errors?.task?.message}
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
            name="isAllTasks"
            control={control}
            defaultValue={true} // Explicitly set default here if needed
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value ? "true" : "false"} // Ensure it's correctly handled
                onChange={(event) =>
                  field.onChange(event.target.value === "true")
                }
                className="flex justify-between items-center w-full flex-row"
              >
                <div className="flex items-center gap-4 w-full justify-center">
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="My Tasks"
                    className="text-gray-700"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="All Tasks"
                    className="text-gray-700"
                  />
                </div>
              </RadioGroup>
            )}
          />

          {/* Empty div TODO: remove after Task filter implementation*/}
          <div />

          <div className="flex w-full justify-end sm:col-span-2 lg:col-span-1">
            <Button
              className="w-[100px]"
              variant="contained"
              color="secondary"
              aria-label="Search"
              type="submit"
              size="small"
            >
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

export default ScoreboardFilter;
