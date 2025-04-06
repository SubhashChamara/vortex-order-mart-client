import { FC, useEffect, useState } from "react";
import { StatusInfo } from "../../../../../core/types/StatusInfo";
import { DecisionPathInfo } from "../../../../../core/types/DecisionPathInfo";
import Logger from "../../../../../../@helpers/Logger";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { Api } from "../../../../../../api/Api";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";

export type ReportFilters = {
  fromDate: Date | null;
  toDate: Date | null;
  wfLabel: string | null;
  accountNo: string | null;
  decision: DecisionPathInfo | null;
  status: StatusInfo | null;
  taskStatus: string;
};

type ReportFiltersProps = {
  handlePassFilters: (form: ReportFilters) => void;
  title: string;
  getCount: {
    completedCount: number;
    pendingCount: number;
    totalCount: number;
  };
};

const defaultValues: ReportFilters = {
  fromDate: dayjs().startOf("month").toDate(),
  toDate: dayjs().toDate(),
  wfLabel: "",
  status: "All",
  decision: "All",
  accountNo: "",
  taskStatus: "",
};

const schema = z.object({
  fromDate: z
    .instanceof(Date, { message: "Invalid Date" })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Start Date is required",
    }),
  toDate: z
    .instanceof(Date, { message: "Invalid Date" })
    .refine((date) => !isNaN(date.getTime()), {
      message: "End Date is required",
    }),
  wfLabel: string(),
  accountNo: z.string().optional(),
  decision: z.string().optional(),
  status: z.string().optional(),
});

const ReportFilters: FC<ReportFiltersProps> = ({
  handlePassFilters,
  title,
  getCount,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    dayjs().startOf("month").toDate()
  );
  const [getDecisionhList, setDecisionhList] = useState<DecisionPathInfo[]>([]);
  const [getStatusList, setStatusList] = useState<StatusInfo[]>([]);

  const { control, handleSubmit, formState, getValues } =
    useForm<ReportFilters>({
      mode: "onSubmit",
      defaultValues,
      resolver: zodResolver(schema),
    });
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { errors } = formState;

  //   const handleFetchBranchList = async () => {
  //     const { data, err } = await Api.performRequest((r) => r.reports.getBranchList());
  //     Logger.debug(`(Proc Status List) => { DATA: ${JSON.stringify(data)}, ERROR: ${JSON.stringify(err)} }`);

  //     if (data !== null) {
  //       console.log(data)
  //       const updatedData = [
  //         { id: "ALL", name: "ALL" },
  //         ...data.map((item :BranchInfo) => ({
  //           ...item,
  //           id: item.id.toString()
  //         }))
  //       ];
  //       setProcessBranchList(updatedData);
  //     }
  //   };

  // useEffect(() => {
  //     handleFetchBranchList();
  //   }, []);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const { data: decisionData } = await Api.performRequest((r) =>
          r.reports.getDecisionDropdown()
        );
        const { data: statusData } = await Api.performRequest((r) =>
          r.reports.getStatusDropdown()
        );

        setDecisionhList([{ id: "ALL", name: "ALL" }, ...decisionData]);
        setStatusList([{ id: "ALL", name: "ALL" }, ...statusData]);
      } catch (error) {
        Logger.error(`Error fetching dropdown data: ${error}`);
      }
    };

    fetchDropdownData();
  }, []);

  const handleOnSubmit = (data: ReportFilters) => {
    console.log("Submitted Data: ", data);

    const formData = {
      ...data,
      decision: data.decision || { id: "ALL", name: "ALL" },
      status: data.status || { id: "ALL", name: "ALL" },
      taskStatus: data.taskStatus || "ALL",
    };

    console.log("Processed Data for API: ", formData);
    handlePassFilters(formData);
  };

  return (
    <Paper className="my-12 p-6">
      <div className="flex flex-wrap pb-6 items-center justify-between gap-4">
        <div className="text-red-600 font-bold">
          <div>{title} Report</div>
          <div className="text-[12px] text-gray">
            This report provides {title} information
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-end mx-11">
          <button
            onClick={() => {
              const formData = getValues();
              handleOnSubmit({ ...formData, taskStatus: "ALL" });
            }}
            className="bg-[#b3b3b3] border border-black w-128 text-black px-6 py-3 rounded-sm shadow-md hover:bg-grey-300 transition duration-300 flex items-center"
          >
            <EdgeSvgIcon className="mr-5">
              heroicons-outline:document-duplicate
            </EdgeSvgIcon>
            <div className="flex flex-row w-full justify-between">
              <p>TOTAL TASKS</p>
              <p>{getCount.totalCount}</p>
            </div>
          </button>
          <button
            onClick={() => {
              const formData = getValues();
              handleOnSubmit({ ...formData, taskStatus: "PENDING" });
            }}
            className="bg-[#b3b3b3] border border-black w-128 text-black px-6 py-3 rounded-sm shadow-md hover:bg-grey-300 transition duration-300 flex items-center"
          >
            <EdgeSvgIcon className="mr-5">
              heroicons-outline:document-duplicate
            </EdgeSvgIcon>
            <div className="flex flex-row w-full justify-between">
              <p>PENDING</p>
              <p>{getCount.pendingCount}</p>
            </div>
          </button>
          <button
            onClick={() => {
              const formData = getValues();
              handleOnSubmit({ ...formData, taskStatus: "COMPLETED" });
            }}
            className="bg-[#b3b3b3] border border-black w-128 text-black px-6 py-3 rounded-sm shadow-md hover:bg-grey-300 transition duration-300 flex items-center"
          >
            <EdgeSvgIcon className="mr-5">
              heroicons-outline:document-duplicate
            </EdgeSvgIcon>
            <div className="flex flex-row w-full justify-between">
              <p>COMPLETED</p>
              <p>{getCount.completedCount}</p>
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${mobileOpen && isMobile
            ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6"
            : "sm:grid-cols-3 md:grid-cols-1 sm:p-6"
            } lg:grid-cols-5`}
        >
          {/* From Date Picker */}
          <Controller
            name="fromDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year", "month", "day"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value) : null}
                  label="Start Date"
                  onChange={(newValue) => {
                    const dateOnly = newValue
                      ? dayjs(newValue).endOf("day").toDate()
                      : null;
                    onChange(dateOnly);
                    setStartDate(dateOnly);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.fromDate,
                      helperText: <>{errors?.fromDate?.message}</>,
                    },
                  }}
                  maxDate={dayjs()}
                />
              </LocalizationProvider>
            )}
          />

          {/* To Date Picker */}
          <Controller
            name="toDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value) : null}
                  label="End Date"
                  onChange={(newValue) => {
                    const dateOnly = newValue
                      ? dayjs(newValue).endOf("day").toDate()
                      : null;
                    onChange(dateOnly);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.toDate,
                      helperText: <>{errors?.toDate?.message}</>,
                    },
                  }}
                  maxDate={dayjs()}
                  minDate={startDate ? dayjs(startDate) : undefined}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="wfLabel"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Wf Label" size="small" type="text" />
            )}
          />

          <Controller
            name="accountNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Account Number"
                size="small"
                type="text"
              />
            )}
          />

          <Controller
            name="decision"
            control={control}
            defaultValue={defaultValues.decision?.id || "ALL"} // Set defaultValue to the id
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={getDecisionhList}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, val) => option.id === val}
                value={getDecisionhList.find((option) => option.id === value) || { id: "ALL", name: "ALL" }}
                onChange={(_, newValue) => {
                  onChange(newValue?.id || "ALL"); // Update form state with id
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Decision"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.decision}
                    helperText={errors?.decision?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            defaultValue={defaultValues.status?.id || "ALL"} // Set defaultValue to the id
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={getStatusList}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, val) => option.id === val}
                value={getStatusList.find((option) => option.id === value) || { id: "ALL", name: "ALL" }}
                onChange={(_, newValue) => {
                  onChange(newValue?.id || "ALL"); // Update form state with id
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

          {/* Submit Button */}
          <div className=" justify-end p-2">
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

export default ReportFilters;
