import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../../@helpers/Logger";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import { BranchInfo } from "../../../../../core/types/BranchInfo";
import { Api } from "../../../../../../api/Api";

export type ReportFilters = {
  fromDate: Date | null;
  toDate: Date | null;
  productType: BranchInfo | null;
  branch: BranchInfo | null;
  segment: BranchInfo | null;
};

type ReportFiltersProps = {
  handlePassFilters: (form: ReportFilters) => void;
  title: string;
};

const defaultValues: ReportFilters = {
  fromDate: dayjs().subtract(1, "month").toDate(),
  toDate: dayjs().toDate(),
  productType: { id: "ALL", name: "ALL" },
  branch: { id: "ALL", name: "ALL" },
  segment: { id: "ALL", name: "ALL" },
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
  productType: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  branch: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  segment: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
});

const ReportFilters: FC<ReportFiltersProps> = ({
  handlePassFilters,
  title,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    dayjs().startOf("month").toDate()
  );
  const [processBranchList, setProcessBranchList] = useState<BranchInfo[]>([]);
  const [segmentList, setSegmentList] = useState<BranchInfo[]>([]);
  const [productTypeList, setProductTypeList] = useState<BranchInfo[]>([]);
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, watch, setValue } =
    useForm<ReportFilters>({
      mode: "onSubmit",
      defaultValues,
      resolver: zodResolver(schema),
    });
  const { errors } = formState;

  const handleFetchBranchList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.reports.getBranchList()
    );
    Logger.debug(
      `(Proc Status List) => { DATA: ${JSON.stringify(
        data
      )}, ERROR: ${JSON.stringify(err)} }`
    );

    if (data !== null) {
      const updatedData = [
        { id: "ALL", name: "ALL" },
        ...data.map((item: BranchInfo) => ({
          ...item,
          id: item.id.toString(),
        })),
      ];
      setProcessBranchList(updatedData);
    }
  };

  const handleFetchSegmentList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundledDropdownData("category-type")
    );
    Logger.debug(
      `(Proc Status List) => { DATA: ${JSON.stringify(
        data
      )}, ERROR: ${JSON.stringify(err)} }`
    );

    if (data !== null) {
      const updatedData = [
        { id: "ALL", name: "ALL" },
        ...data.map((item: BranchInfo) => ({
          ...item,
          id: item.id.toString(),
        })),
      ];
      setSegmentList(updatedData);
    }
  };

  const handleFetchProductTypeList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundledDropdownData("prod-type")
    );
    Logger.debug(
      `(Prod Type List) => { DATA: ${JSON.stringify(
        data
      )}, ERROR: ${JSON.stringify(err)} }`
    );

    if (data !== null) {
      const updatedData = [
        { id: "ALL", name: "ALL" },
        ...data.map((item: BranchInfo) => ({
          ...item,
          id: item.id.toString(),
        })),
      ];

      setProductTypeList(updatedData);
    }
  };

  useEffect(() => {
    handleFetchBranchList();
    handleFetchSegmentList();
    handleFetchProductTypeList();
  }, []);

  const handleOnSubmit = (formData: ReportFilters) => {
    Logger.debug(
      `Bundle eod report filter Form Submitted: ${JSON.stringify(formData)}`
    );
    handlePassFilters(formData);
    console.log(formData);
  };

  useEffect(() => {
    if (processBranchList.length > 0 && !watch("branch")) {
      setValue("branch", processBranchList[0]); // Set the first branch as default
    }
  }, [processBranchList, setValue, watch]);

  useEffect(() => {
    if (segmentList.length > 0 && !watch("segment")) {
      setValue("segment", segmentList[0]); // Set the first segment as default
    }
  }, [segmentList, setValue, watch]);

  return (
    <Paper className="my-12 p-6">
      <div className="flex pb-6">
        <EdgeSvgIcon
          className="icon-size-28 cursor-pointer text-red-600"
          color="error"
        >
          feather:file-text
        </EdgeSvgIcon>
        <div className="text-red-600 font-bold flex-col pl-6">
          <div>{title} Report</div>
          <div className="text-[12px] text-gray">
            This report provides {title} information
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6"
              : "sm:grid-cols-2 md:grid-cols-1 sm:p-6"
          } lg:grid-cols-7`}
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

          {/* Product TYpe Dropdown */}
          <Controller
            name="productType"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={productTypeList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value || null} // Default to null if no value
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Type"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.branch}
                    helperText={errors?.branch?.message}
                  />
                )}
              />
            )}
          />

          {/* Branch Dropdown */}
          <Controller
            name="branch"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={processBranchList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value || null} // Default to null if no value
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Branch"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.branch}
                    helperText={errors?.branch?.message}
                  />
                )}
              />
            )}
          />

          {/* Segment Dropdown */}
          <Controller
            name="segment"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={segmentList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value || null} // Default to null if no value
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Segment"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.segment}
                    helperText={errors?.segment?.message}
                  />
                )}
              />
            )}
          />

          {/* Submit Button */}
          <div className="col-span-1 lg:col-span-2 flex justify-end gap-12 p-2">
            <Button aria-label="Submit" type="submit">
              <EdgeSvgIcon
                className="icon-size-12 cursor-pointer text-white mr-3"
                color="error"
              >
                feather:search
              </EdgeSvgIcon>
              Search
            </Button>
            <Button aria-label="Download" type="button" onClick={() => {}}>
              <EdgeSvgIcon
                className="icon-size-12 cursor-pointer text-white mr-3"
                color="error"
              >
                feather:download-cloud
              </EdgeSvgIcon>
              Download Excel
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default ReportFilters;
