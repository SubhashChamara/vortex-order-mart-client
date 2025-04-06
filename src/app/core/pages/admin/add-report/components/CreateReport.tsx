import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeButton from "../../../../../../@edgevantage/core/EdgeButton/EdgeButton";
import EdgeTextInput from "../../../../../../@edgevantage/core/EdgeTextInput/EdgeTextInput";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";
import Logger from "../../../../../../@helpers/Logger";
import { Api } from "../../../../../../api/Api";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import { Report } from "../../../../types/Report";
import { ProcessInfo } from "../../../../types/ProcessInfo";
import { ReportCreateRequestIf } from "../../../../types/ReportCreateRequest";


type FormType = {
    name: string;
    path: string;
    type: string;
    idProcess: string;
};

const defaultValues: FormType = {
    name: "",
    path: "",
    type: "REPORT",
    idProcess: "",
};

const schema = z.object({
    name: z.string().min(1, "Report name is mandatory."),
    path: z.string().min(1, "Report path is mandatory."),
    idProcess: z.string().min(1, "Process is mandatory."),
});

interface ProcessCreationFormProps {
    formTitle: string;
    actionName: string;
    reportForUpdate: Report | null;
    formReset: () => void;
    fetchReportList: () => void;
    processInfo: ProcessInfo[];
}

const CreateReport: FC<ProcessCreationFormProps> = (props) => {
    const {
        formTitle,
        actionName,
        reportForUpdate,
        formReset,
        fetchReportList,
        processInfo
    } = props;
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const {
        control,
        handleSubmit,
        formState,
        setValue,
        reset,
    } = useForm<FormType>({
        mode: "onChange",
        defaultValues,
        resolver: zodResolver(schema),
    });
    const { errors } = formState;

    const handleOnSubmit = async (formData: FormType) => {
        Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
        if (isSubmitted) {
            Logger.debug("Form Already Submitted");
            return;
        }

        setIsSubmitted(true);

        const {
            name,
            path,
            idProcess,
            type,
        } = formData;
        Logger.debug("Form Submitted : " + JSON.stringify(formData));

        const request: ReportCreateRequestIf = {
            name: name,
            path: path,
            idProcess: idProcess,
            type: 'REPORT',
        };

        const { data, err } =
            actionName == "CREATE"
                ? await Api.performRequest((r) =>
                    r.admin.createReport(request))
                : await Api.performRequest((r) =>
                    r.admin.updateReport(reportForUpdate?.id || null, request)
                );

        Logger.debug(
            "(Process Creation) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (err == null) {
            let successMsg: string;
            actionName == "CREATE"
                ? (successMsg = "Report created Successfully")
                : (successMsg = "Report Updated Successfully");
            fetchReportList();
            toast.success(successMsg);
            reset();
        } else {
            toast.error(err?.msg);
        }

        setTimeout(() => setIsSubmitted(false), 3000);
        formReset();
    };

    useEffect(() => {
        console.log("reportForUpdate", reportForUpdate);
        setValue("name", reportForUpdate?.name ?? "");
        setValue("path", reportForUpdate?.path ?? "");
        const processId = processInfo.find((process) => process.defKey === reportForUpdate?.processDefKey);
        setValue("idProcess", processId?.id ?? "");
    }, [reportForUpdate]);

    return (
        <div>
            <div className="mb-12 border-b-1 border-b-gray-200 pb-6 flex items-end">
                <EdgeSvgIcon
                    className="icon-size-24 cursor-pointer mr-6 text-primary"
                    color="error"
                >
                    feather:link-2
                </EdgeSvgIcon>
                <h1 className="text-md font-bold text-secondary">{formTitle}</h1>
            </div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div
                    className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
                        ? "sm:grid-cols-1 md:grid-cols-2"
                        : "sm:grid-cols-2 md:grid-cols-1"
                        } lg:grid-cols-1`}
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <EdgeTextInput
                                {...field}
                                required
                                label="Report Name"
                                size="small"
                                type="text"
                                error={!!errors.name}
                                helperText={errors?.name?.message}
                            />
                        )}
                    />

                    <Controller
                        name="idProcess"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                options={processInfo}
                                getOptionLabel={(option) => option.name || ""}
                                isOptionEqualToValue={(option, val) => option.id === val.id}
                                value={processInfo.find((item) => item.id === value) || null}
                                disabled={actionName !== 'CREATE'}
                                onChange={(event, newValue) => {
                                    onChange(newValue ? newValue.id : "");
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Process"
                                        variant="outlined"
                                        required
                                        size="small"
                                        error={!!errors.idProcess}
                                        helperText={errors?.idProcess?.message}
                                        InputLabelProps={{
                                            sx: {
                                                "&.Mui-focused": {
                                                    color: "#FF181B",
                                                    fontWeight: 600,
                                                },
                                            },
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            ...params.InputProps,
                                            sx: {
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderRadius: 2,
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#FF181B",
                                                },
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#FF181B",
                                                },
                                            },
                                        }}
                                    />
                                )}
                            />
                        )}
                    />

                    <Controller
                        name="path"
                        control={control}
                        render={({ field }) => (
                            <EdgeTextInput
                                required
                                {...field}
                                label="Path"
                                size="small"
                                type="text"
                            />
                        )}
                    />

                    <Controller
                        name="type"
                        control={control}
                        defaultValue="REPORT"
                        disabled={true}
                        render={({ field }) => (
                            <EdgeTextInput
                                required
                                {...field}
                                label="Type"
                                size="small"
                                type="text"
                            />
                        )}
                    />
                </div>
                <div className="flex justify-center my-6">
                    <EdgeButton label={actionName} type="submit" />
                </div>
            </form>
        </div>
    );
};

export default CreateReport;
