import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { useThemeMediaQuery } from "../../../../../@edgevantage/hooks";
import { ProcessInfo } from "../../../../core/types/ProcessInfo";


type ReportFiltersProps = {
    onSearchData: (payload: {
        startDate: Date | null;
        endDate: Date | null;
        defKey: string | "";
    }) => void;
    processInfo: ProcessInfo[]
};

type ReportFilters = {
    fromDate: Date | null;  
    toDate: Date | null;
    defKey: string | "";
};

const ReworkReportTable: FC<ReportFiltersProps> = ({ onSearchData, processInfo }) => {
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const defaultValues: ReportFilters = {
        fromDate: dayjs().startOf("month").toDate(),
        toDate: dayjs().toDate(),
        defKey: ""
    };

    const schema = z
        .object({
            defKey: z.string().nullable(),

            fromDate: z.date().nullable().refine((date) => !!date, {
                message: "Start Date cannot be empty",
            }),
            toDate: z.date().nullable().refine((date) => !!date, {
                message: "End Date cannot be empty",
            }),
        })
        .refine((data) => {
            if (!data.fromDate || !data.toDate) return true;
            const diffInDays = (data.toDate - data.fromDate) / (1000 * 60 * 60 * 24);
            return diffInDays <= 90;
        }, {
            message: "Your search has exceeded the maximum range of 90 days. Please revise the search period and retry.",
            path: ["toDate"],
        });


    const {
        control,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<ReportFilters>({
        defaultValues,
        resolver: zodResolver(schema),
    });

    const handleButtonClick = async () => {
        const isValid = await trigger();

        if (isValid) {
            const { fromDate, toDate, defKey } = getValues();
            const payload = {
                startDate: fromDate,
                endDate: toDate,
                defKey: defKey || '',
            };
            onSearchData(payload);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
            <div className="flex pb-6">
                <EdgeSvgIcon className="icon-size-28 cursor-pointer text-red-600" color="error">
                    feather:file-text
                </EdgeSvgIcon>
                <div className="text-red-600 font-bold flex-col pl-6">
                    <div>Rework Report</div>
                    <div className="text-[12px] text-gray">
                        This report provides rework information
                    </div>
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <form>
                    <div
                        className={`grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-6`}
                    >
                        <Controller
                            name="defKey"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Autocomplete
                                    options={[{ defKey: '', name: "Select" }, ...processInfo]}
                                    getOptionLabel={(option) => option.name || ""}
                                    value={
                                        processInfo.find((option) => option.defKey === value) || { defKey: '', name: "Select" }
                                    }
                                    onChange={(_, newValue) => onChange(newValue?.defKey || null)}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.defKey || "default"}>
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Workflow"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                />
                            )}
                        />

                        <Controller
                            name="fromDate"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        views={["year", "month", "day"]}
                                        format="DD-MM-YYYY"

                                        value={value ? dayjs(value) : null}
                                        label="Start Date"
                                        onChange={(newValue) =>
                                            onChange(newValue ? dayjs(newValue).toDate() : null)
                                        }
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                error: !!errors.fromDate,
                                                helperText: errors?.fromDate?.message || null,
                                            },
                                        }}
                                        maxDate={dayjs()}
                                    />
                                </LocalizationProvider>
                            )}
                        />

                        <Controller
                            name="toDate"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        views={["year", "month", "day"]}
                                        format="DD-MM-YYYY"
                                        value={value ? dayjs(value) : null}
                                        label="End Date"

                                        onChange={(newValue) =>
                                            onChange(newValue ? dayjs(newValue).toDate() : null)
                                        }
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                error: !!errors.toDate,
                                                helperText: errors?.toDate?.message || null,
                                            },
                                        }}
                                        maxDate={dayjs()}
                                    />
                                </LocalizationProvider>
                            )}
                        />

                        <div className="flex p-2">
                            <Button

                                aria-label="Submit"
                                type="button"
                                onClick={handleButtonClick}
                                variant="contained"
                                color="primary"
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
            </div>
        </Paper>
    );
};

export default ReworkReportTable;
