import { FC } from "react";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { Checkbox, TextField, Paper, Typography } from "@mui/material";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";

export type FrmVerificationResponse = {
    rsdVerification: boolean;
    empVerification: boolean;
    refVerification: boolean;
    reason: string;
};

type FrmVerificationFlowProps = {
    verificationData: FrmVerificationResponse[];
};

const FrmVerificationFlow: FC<FrmVerificationFlowProps> = ({ verificationData }) => {
    const methods = useForm<{ verifications: FrmVerificationResponse[] }>({
        defaultValues: {
            verifications: verificationData,
        },
    });

    const { control } = methods;

    return (
        <FormProvider {...methods}>
            <Paper className="p-6">
                <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
                    <h1 className="text-md font-600 text-left flex text-blue-gray-800">
                        <div>
                            <EdgeSvgIcon
                                className="icon-size-18 cursor-pointer mr-3"
                                color="error"
                            >
                                feather:user-plus
                            </EdgeSvgIcon>
                        </div>
                        <div>FRM VERIFICATION FLOW</div>
                    </h1>
                </div>
                {verificationData.map((verification, index) => (
                    <div key={index} className="mb-6">
                        <Typography variant="h6" className="mb-4">
                            Verification Instructions
                        </Typography>

                        <div className="grid gap-4 mb-4">
                            <Controller
                                name={`verifications.${index}.rsdVerification`}
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <Checkbox {...field} checked={field.value} disabled />
                                        <label>Do RSD Verification</label>
                                    </div>
                                )}
                            />
                            <Controller
                                name={`verifications.${index}.empVerification`}
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <Checkbox {...field} checked={field.value} disabled />
                                        <label>Do EMP Verification</label>
                                    </div>
                                )}
                            />
                            <Controller
                                name={`verifications.${index}.refVerification`}
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <Checkbox {...field} checked={field.value} disabled />
                                        <label>Do REF Verification</label>
                                    </div>
                                )}
                            />
                        </div>

                        <Controller
                            name={`verifications.${index}.reason`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Reason"
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    disabled
                                />
                            )}
                        />
                    </div>
                ))}
            </Paper>
        </FormProvider>
    );
};

export default FrmVerificationFlow;
