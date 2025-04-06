import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, Paper } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import { Api } from "../../../../../../api/Api";
import Logger from "../../../../../../@helpers/Logger";
import moment from "moment";

export type ReportFilters = {
    fromDate: Date | null;
    toDate: Date | null;
};

type MisReportProps = {

};

const defaultValues: ReportFilters = {
    fromDate: dayjs().startOf("month").toDate(),
    toDate: dayjs().toDate(),
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
});

const FrmMisReportFilter: FC<MisReportProps> = ({ }) => {
    const [startDate, setStartDate] = useState<Date | null>(
        dayjs().startOf("month").toDate()
    );
    const [isFileDownloading, setIsFileDownloading] = useState<boolean>(false);

    const { control, handleSubmit, formState, getValues } =
        useForm<ReportFilters>({
            mode: "onSubmit",
            defaultValues,
            resolver: zodResolver(schema),
        });

    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const { errors } = formState;

    const handleExcelGenerate = async (data: ReportFilters) => {
        try {
            setIsFileDownloading(true);
            console.log("Submitted Data: ", data);
            const { fromDate, toDate } = data;
            const startDate = fromDate ? moment(fromDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
            const endDate = toDate ? moment(toDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

            const { data: responseData, err } = await Api.performRequest((r) =>
                r.reports.generateInvestMisExcelFile(startDate, endDate)
            );

            if (responseData) {
                console.log("Response Data: ", responseData);

                const blob = new Blob([responseData], { type: "application/vnd.ms-excel" });

                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);

                link.download = `FRM_MIS_Report_${startDate}_to_${endDate}.xls`;

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
            } else if (err) {
                console.error("Error fetching report: ", err);
            }

        } catch (error) {
            console.error("An unexpected error occurred: ", error);
        } finally {
            setIsFileDownloading(false);
        }
    };


    return (
        <Paper className="my-12 p-6">

            <div className="flex pb-6">
                <EdgeSvgIcon className="icon-size-28 cursor-pointer text-red-600" color="error">
                    feather:file-text
                </EdgeSvgIcon>
                <div className="text-red-600 font-bold flex-col pl-6">
                    <div>FRM MIS Report</div>
                    <div className="text-[12px] text-gray">
                        This report provides FRM MIS information
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(handleExcelGenerate)}>
                <div
                    className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${mobileOpen && isMobile
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

                    <div className="justify-end p-2">
                        <Button
                            aria-label="Save"
                            type="submit"
                        >
                            {isFileDownloading ? (
                                <CircularProgress size={20} className="mr-3 text-white" />
                            ) : (
                                <EdgeSvgIcon
                                    className="icon-size-12 cursor-pointer text-white mr-3"
                                    color="error"
                                >
                                    feather:download-cloud
                                </EdgeSvgIcon>
                            )}
                            Download Excel
                        </Button>
                    </div>
                </div>
            </form>
        </Paper>
    );
};

export default FrmMisReportFilter;
