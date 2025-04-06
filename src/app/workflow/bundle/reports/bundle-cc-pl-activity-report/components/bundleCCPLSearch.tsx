import { FC, useState } from "react";
import dayjs from "dayjs";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Paper, Button } from "@mui/material";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

type ReportFiltersProps = {
    onSearchData: (payload: {
        startDate: Date | null;
        endDate: Date | null;
        action: string;
    }) => void;
};

type ReportFilters = {
    fromDate: Date | null;
    toDate: Date | null;
};

const BundleCCPLSearch: FC<ReportFiltersProps> = ({ onSearchData }) => {
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const defaultValues: ReportFilters = {
        fromDate: dayjs().startOf("month").toDate(),
        toDate: dayjs().toDate(),
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
        .refine(
            (data) => {
                if (data.fromDate && data.toDate) {
                    const fromTime = data.fromDate.getTime();
                    const toTime = data.toDate.getTime();
                    const diff = (toTime - fromTime) / (1000 * 60 * 60 * 24);
                    return diff >= 0 && diff <= 31;
                }
                return false;
            },
            {
                message: "The date range must not exceed 31 days",
                path: ["toDate"],
            }
        );

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

    const handleButtonClick = async (actionType: string) => {
        const isValid = await trigger();  
        if (isValid) {
            const { fromDate, toDate } = getValues();
            const payload = {
                startDate: fromDate,
                endDate: toDate,
                action: actionType,
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
                    <div>CC/PL Activity Report</div>
                    <div className="text-[12px] text-gray">
                        This report provides CC/PL activity information
                    </div>
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <form>
                    <div
                        className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${
                            mobileOpen && isMobile
                                ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6"
                                : "sm:grid-cols-3 md:grid-cols-1 sm:p-6"
                        } lg:grid-cols-5`}
                    >
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
                                    />
                                </LocalizationProvider>
                            )}
                        />

                        <Button
                            aria-label="approvals"
                            type="button"
                            onClick={() => handleButtonClick("APPROVAL")}
                        >
                            Generate Approvals
                        </Button>

                        <Button
                            aria-label="sourcing"
                            type="button"
                            onClick={() => handleButtonClick("SOURCING")}
                        >
                            Generate Sourcing
                        </Button>

                        <Button
                            aria-label="processing"
                            type="button"
                            onClick={() => handleButtonClick("PROCESSING")}
                        >
                            Generate Processing
                        </Button>
                    </div>
                </form>
            </div>
        </Paper>
    );
};

export default BundleCCPLSearch;
