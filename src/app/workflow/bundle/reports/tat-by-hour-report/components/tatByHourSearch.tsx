import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Paper, Button, Autocomplete, TextField } from "@mui/material";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

type ReportFiltersProps = {
    onSearchData: (payload: {
        startDate: Date | null;
        endDate: Date | null;
        workflow: string | "";
    }) => void;
    isTimeRestricted: boolean;
};

type ReportFilters = {
    fromDate: Date | null;
    toDate: Date | null;
    workflow: string | null;
};

const TatAppRAHSearch: FC<ReportFiltersProps> = ({ onSearchData, isTimeRestricted }) => {
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const defaultValues: ReportFilters = {
        fromDate: dayjs().startOf("month").toDate(),
        toDate: dayjs().toDate(),
        workflow: "CLI",
    };

    const schema = z
        .object({
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
        })

    const {
        control,
        getValues,
        formState: { errors },
        trigger,
    } = useForm<ReportFilters>({
        defaultValues,
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const handleButtonClick = async () => {
        const isValid = await trigger();

        if (isValid) {
            const { fromDate, toDate, workflow } = getValues();
            const payload = {
                startDate: fromDate,
                endDate: toDate,
                workflow: workflow || "CLI",
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
                    <div>App Received At Hours Report</div>
                    <div className="text-[12px] text-gray">
                        This report provides app received at hours information
                    </div>
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <form>
                    <div
                        className={`grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-6`}
                    >
                        <Controller
                            name="workflow"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Autocomplete
                                    options={[
                                        { id: "BUNDLED", name: "BUNDLED" },
                                        { id: "CLI", name: "CLI" },
                                    ]}
                                    getOptionLabel={(option) => option.name || ""}
                                    value={
                                        [
                                            { id: "BUNDLED", name: "BUNDLED" },
                                            { id: "CLI", name: "CLI" },
                                        ].find((option) => option.id === value) || { id: "CLI", name: "CLI" }
                                    }
                                    onChange={(_, newValue) => onChange(newValue?.id || "CLI")}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.id}>
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Workflow"
                                            size="small"
                                            InputLabelProps={{ shrink: true }}
                                            disabled={!isTimeRestricted}
                                        />
                                    )}
                                />
                            )}
                        />

                        <Controller
                            name="fromDate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        views={["year", "month", "day"]}
                                        format="DD-MM-YYYY"
                                        disabled={!isTimeRestricted}
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
                            render={({ field: { onChange, value } }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        views={["day", "month", "year"]}
                                        format="DD-MM-YYYY"
                                        value={value ? dayjs(value) : null}
                                        label="End Date"
                                        disabled={!isTimeRestricted}
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
                                disabled={!isTimeRestricted}
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

export default TatAppRAHSearch;
