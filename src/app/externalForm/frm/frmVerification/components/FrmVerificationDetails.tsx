import {
    Checkbox,
    FormControlLabel,
    Paper,
    TextField
} from "@mui/material";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { FemVerificForm } from "../../CommonTypes";

export interface FrmVerificationExternalFormProps {
    form: FemVerificForm | null;
    frmVerificationStatus: Boolean;
}

type FormType = {
    rsdVerification: boolean;
    empVerification: boolean;
    reason: string;
    checkerComment: string;
    procId: string;
};


const FrmVerificationExternalDetails: FC<FrmVerificationExternalFormProps> = (props) => {
    const { form, frmVerificationStatus } = props;
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));


    const { control, setValue } =
        useForm<FormType>({
            mode: "onChange",
        });

    useEffect(() => {
        if (form !== null) {
            setValue("rsdVerification", form.rsdVerification);
            setValue("empVerification", form.empVerification);
            setValue("reason", form.reason);
            setValue("checkerComment", form.checkerComment);
        }
    }, [form]);

    return (
        <Paper className="px-12" style={{ margin: '5px' }}>
            <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
                <h1 className="text-md font-600 text-left flex text-blue-gray-800">
                    <EdgeSvgIcon className="icon-size-18 cursor-pointer mr-3" color="error">
                        feather:user-plus
                    </EdgeSvgIcon>
                    VERIFICATION INSTRUCTION
                </h1>
            </div>
            <form noValidate>
                <div
                    className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
                            ? "sm:grid-cols-1 md:grid-cols-2"
                            : "sm:grid-cols-2 md:grid-cols-1"
                        } lg:grid-cols-2`}
                >
                    <div className="w-full flex flex-col space-y-4">
                        <div className="flex flex-row justify-between items-center">
                            <p>Do RSD Verification</p>
                            <Controller
                                name="rsdVerification"
                                control={control}
                                defaultValue={false}
                                disabled={true}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={field.value} />}
                                        label=""
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <p>Do EMP Verification</p>
                            <Controller
                                name="empVerification"
                                control={control}
                                defaultValue={false}
                                disabled={true}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={field.value} />}
                                        label=""
                                    />
                                )}
                            />
                        </div>
                        <Controller
                            name="reason"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Reason"
                                    type="text"
                                    multiline
                                    disabled={true}
                                    minRows={3}
                                    maxRows={5}
                                    className="mb-20"
                                />
                            )}
                        />
                        {frmVerificationStatus && (
                            <Controller
                                name="checkerComment"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Comment"
                                        type="text"
                                        multiline
                                        minRows={3}
                                        maxRows={5}
                                        disabled={true}
                                        className="mb-20"
                                    />
                                )}
                            />
                        )}
                    </div>
                </div>
                <br />
            </form>
        </Paper>
    );
};

export default FrmVerificationExternalDetails;
