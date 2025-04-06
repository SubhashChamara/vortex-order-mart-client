import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import { DBRUser } from "../../../../../core/types/DBRUser";
import { DropDownItem } from "../../../../../core/types/DropDown";
import { UWApprover } from "../../../../../core/types/UWApproverUser";

export type ReportFilters = {
  categoryType: string | null;
  flowType: string | null;
  nicPPNumber: string | null;
  fromDate: Date | null;
  toDate: Date | null;
  status: { id: string; name: string } | null;
  cardType: DropDownItem | null;
  sourceType: DropDownItem | null;
  approver: UWApprover | null;
  dsr: DBRUser | null;
};

type ReportFiltersProps = {
  title: string;
  categoryTypeDropdowns: DropDownItem[];
  flowTypeDropdowns: DropDownItem[];
  statusDropdown: DropDownItem[];
  sourceTypeDropdowns: DropDownItem[];
  cardTypeDropdowns: DropDownItem[];
  branchManagersDropdowns: UWApprover[];
  dbrUserDropdowns: DBRUser[];
  handlePassFilters: (form: ReportFilters) => void;

};

const defaultValues: ReportFilters = {
  fromDate: dayjs().startOf("month").toDate(),
  toDate: dayjs().toDate(),
  categoryType: null,
  flowType: null,
  nicPPNumber: null,
  status: null,
  cardType: null,
  sourceType: null,
  approver: null,
  dsr: null,

};

const schema = z.object({
  categoryType: z.object({
    id: z.string(),
    name: z.string()
  }).nullable().optional(),
  flowType: z.object({
    id: z.string(),
    name: z.string()
  }).nullable().optional(),
  nicPPNumber: z.string().nullable().optional(),
  status: z.object({
    id: z.string(),
    name: z.string()
  }).nullable().optional(),
  cardType: z.object({
    id: z.number(),
    name: z.string()
  }).nullable().optional(),
  sourceType: z.object({
    id: z.number(),
    name: z.string()
  }).nullable().optional(),
  approver: z.object({
    userId: z.string(),
    userName: z.string()
  }).nullable().optional(),
  dsr: z.object({
    id: z.string(),
    name: z.string()
  }).nullable().optional(),
  fromDate: z.instanceof(Date, { message: "Invalid Date" })
    .refine((date) => !isNaN(date.getTime()), { message: "Start Date is required" }),
  toDate: z.instanceof(Date, { message: "Invalid Date" })
    .refine((date) => !isNaN(date.getTime()), { message: "End Date is required" }),
});

const ReportFilters: FC<ReportFiltersProps> = (
  { handlePassFilters, title, categoryTypeDropdowns, flowTypeDropdowns,
    statusDropdown, cardTypeDropdowns, sourceTypeDropdowns, dbrUserDropdowns, branchManagersDropdowns }
) => {
  const [startDate, setStartDate] = useState<Date | null>(dayjs().startOf("month").toDate());
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, getValues } = useForm<ReportFilters>({
    mode: "onSubmit",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;


  const handleOnSubmit = () => {
    const formData = getValues(); // get the latest form data
    // Logger.debug(`Bundle eod report filter Form Submitted: ${JSON.stringify(formData)}`);
    handlePassFilters(formData); // Pass latest form values
    // console.log(formData)
  };

  return (
    <Paper className="my-12 p-6">
      <div className="flex pb-6">
        <EdgeSvgIcon className="icon-size-28 cursor-pointer text-red-600" color="error">
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
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${mobileOpen && isMobile ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6" : "sm:grid-cols-3 md:grid-cols-1 sm:p-6"
            } lg:grid-cols-5`}
        >

          {/* Category Type Dropdown */}
          <Controller
            name="categoryType"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={categoryTypeDropdowns || []}
                getOptionLabel={(option) => option ? option.name : ""}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value as DropDownItem | null}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category Type"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.categoryType}
                    helperText={errors?.categoryType?.message}
                  />
                )}
              />
            )}
          />

          {/* Flow Type Dropdown */}
          <Controller
            name="flowType"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={flowTypeDropdowns || []}
                getOptionLabel={(option) => option ? option.name : ""}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value as DropDownItem | null}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Flow Type"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.flowType}
                    helperText={errors?.flowType?.message}
                  />
                )}
              />
            )}
          />

          {/* NIC/PP */}
          <Controller
            name="nicPPNumber"
            control={control}
            render={({ field }) => (
              < TextField
                {...field}
                label="NIC/PP Number"
                size="small"
                type="text"
                value={field.value || ""}
                helperText={<>{errors.nicPPNumber?.message}</>}
                error={!!errors.nicPPNumber}
              />
            )}
          />

          {/* Status Dropdown */}
          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={statusDropdown || []}
                getOptionLabel={(option) => option ? option.name : ""}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value as DropDownItem | null}
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

          {/* Card Type Dropdown */}
          <Controller
            name="cardType"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={cardTypeDropdowns || []}
                getOptionLabel={(option) => option ? option.name : ""}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value as DropDownItem | null}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Card Type"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.cardType}
                    helperText={errors?.cardType?.message}
                  />
                )}
              />
            )}
          />

          {/* Source Type Dropdown */}
          <Controller
            name="sourceType"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={sourceTypeDropdowns || []}
                getOptionLabel={(option) => option ? option.name : ""}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value as DropDownItem | null}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Source Type"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.sourceType}
                    helperText={errors?.sourceType?.message}
                  />
                )}
              />
            )}
          />

          {/* Approver Dropdown */}
          <Controller
            name="approver"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={branchManagersDropdowns || []}
                getOptionLabel={(option) => option ? option.userName : ""}
                isOptionEqualToValue={(option, val) => option.userId === val.userId}
                value={value as UWApprover | null}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Approver"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.approver}
                    helperText={errors?.approver?.message}
                  />
                )}
              />
            )}
          />

          {/* DSR User Dropdown */}
          <Controller
            name="dsr"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={dbrUserDropdowns || []}
                getOptionLabel={(option) => option ? option.name : ""}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value as DBRUser | null}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="DSR User"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dsr}
                    helperText={errors?.dsr?.message}
                  />
                )}
              />
            )}
          />


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
                    const dateOnly = newValue ? dayjs(newValue).endOf("day").toDate() : null;
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
                    const dateOnly = newValue ? dayjs(newValue).endOf("day").toDate() : null;
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



          {/* Submit Button */}
          <div className=" justify-end p-2">
            <Button aria-label="Submit" type="submit">
              <EdgeSvgIcon className="icon-size-12 cursor-pointer text-white mr-3" color="error">
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
