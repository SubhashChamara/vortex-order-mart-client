import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Paper, Button, CircularProgress } from "@mui/material";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";

export type AlertStatusFilters = {
    startDate: Date | null;
    endDate: Date | null;
};

type AlertStatusFilterProps = {
    handleApplyFilters: (filters: AlertStatusFilters) => void;
    handleGenerate: (filters: AlertStatusFilters) => void;
};

const defaultValues: AlertStatusFilters = {
    startDate: dayjs().startOf("month").toDate(),
    endDate: dayjs().toDate(),
};

const schema = z.object({
    startDate: z
        .instanceof(Date, { message: "Invalid date" })
        .refine((date) => !isNaN(date.getTime()), {
            message: "Start Date is required",
        }),
    endDate: z
        .instanceof(Date, { message: "Invalid date" })
        .refine((date) => !isNaN(date.getTime()), {
            message: "End Date is required",
        }),
});

const AlertStatusFilter: FC<AlertStatusFilterProps> = ({ handleApplyFilters, handleGenerate }) => {
    const { control, handleSubmit, formState } = useForm<AlertStatusFilters>({
        defaultValues,
        resolver: zodResolver(schema),
        mode: "onSubmit",
    });

    const { errors } = formState;
    const [isGenerating, setIsGenerating] = useState(false);
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const onSubmit = (data: AlertStatusFilters) => {
        handleApplyFilters(data);
    };

    const handleGenerateClick = async (data: AlertStatusFilters) => {
        setIsGenerating(true);
        await handleGenerate(data);
        setIsGenerating(false);
    };

    return (
        <Paper className="my-12 p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex pb-6">
                    <EdgeSvgIcon className="icon-size-28 cursor-pointer text-red-600" color="error">
                        feather:file-text
                    </EdgeSvgIcon>
                    <div className="text-red-600 font-bold flex-col pl-6">
                        <div>FRM Alert Report</div>
                        <div className="text-[12px] text-gray">
                        This report provides a summary of the alert status for the selected date range
                        </div>
                    </div>
                </div>
                <div
                    className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${mobileOpen && isMobile
                        ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6"
                        : "sm:grid-cols-3 md:grid-cols-1 sm:p-6"
                        } lg:grid-cols-5`}
                >          <Controller
                        name="startDate"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                    value={value ? dayjs(value) : null}
                                    onChange={(newValue) => onChange(newValue?.toDate() || null)}
                                    format="DD-MM-YYYY"
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: !!errors.startDate,
                                            helperText: errors?.startDate?.message,
                                        },
                                    }}
                                    maxDate={dayjs()}
                                />
                            </LocalizationProvider>
                        )}
                    />

                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="End Date"
                                    value={value ? dayjs(value) : null}
                                    onChange={(newValue) => onChange(newValue?.toDate() || null)}
                                    format="DD-MM-YYYY"
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            error: !!errors.endDate,
                                            helperText: errors?.endDate?.message,
                                        },
                                    }}
                                    maxDate={dayjs()}
                                />
                            </LocalizationProvider>
                        )}
                    />

                    <div className="flex justify-end p-2 space-x-4">
                        <Button aria-label="Search" type="submit">
                            <EdgeSvgIcon className="icon-size-12 cursor-pointer text-white mr-3" color="error">
                                feather:search
                            </EdgeSvgIcon>
                            Search
                        </Button>
                        <Button
                            aria-label="Generate"
                            onClick={handleSubmit(handleGenerateClick)}
                        >
                            {isGenerating ? (
                                <CircularProgress size={20} className="mr-3 text-white" />
                            ) : (
                                <EdgeSvgIcon className="icon-size-12 cursor-pointer text-white mr-3" color="error">
                                    feather:download-cloud
                                </EdgeSvgIcon>
                            )}
                            Generate
                        </Button>
                    </div>
                </div>
            </form>
        </Paper>
    );
};

export default AlertStatusFilter;
