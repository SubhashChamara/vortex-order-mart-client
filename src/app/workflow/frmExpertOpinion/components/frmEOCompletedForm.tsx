import { Autocomplete, Card, CardContent, Grid, Paper, TextField, Typography } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../@hooks/useThemeMediaQuery";
import { DropDownItem, FrmExpertOpinionResponse } from "../@types/frmExpertOpinionRequest";
import { record } from "zod";


type FrmExpertOpinionCompletedProps = {
    frmCompletedExpertOpinion: FrmExpertOpinionResponse[] | null;
    frmexpertUsers: DropDownItem[] | null;
};


const FrmExpertOpinionCompletedForm: FC<FrmExpertOpinionCompletedProps> = (props) => {
    const { frmCompletedExpertOpinion, frmexpertUsers } = props;
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
    const [frmCompletedExpertOpinionData, setfrmCompletedExpertOpinion] =
        useState<FrmExpertOpinionResponse[] | null>(null);

    useEffect(() => {
        if (
            frmCompletedExpertOpinion
        ) {
            setfrmCompletedExpertOpinion(
                frmCompletedExpertOpinion
            );
        }
    }, [frmCompletedExpertOpinion]);

    type FormType = {
        [key: string]: boolean | string;
    };


    const { control, formState, setValue } =
        useForm<FormType>({
            mode: "onChange"
        });

    return (
        <Paper className="px-12">
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
                    <div>EXPERT OPINION FLOW</div>
                </h1>
            </div>
            <form noValidate>
                <div
                    className={`grid gap-9 ${mobileOpen && isMobile
                        ? "sm:grid-cols-1 md:grid-cols-1"
                        : "sm:grid-cols-2 md:grid-cols-1"
                        } lg:grid-cols-1`}
                >
                    <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
                        {frmCompletedExpertOpinionData?.map((record, index) => (
                            <Grid item xs={12} md={6} key={index} style={{ marginBottom: '16px' }}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            REF: {record.businessKey}
                                        </Typography>

                                        <div className="flex flex-wrap gap-4 items-start">
                                            <Controller
                                                name={`provideOpinionOn-${index}`}
                                                control={control}
                                                defaultValue={record.opinionProvide || ""}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Provide Opinion On"
                                                        size="small"
                                                        type="text"
                                                        multiline
                                                        fullWidth
                                                        minRows={3}
                                                        maxRows={5}
                                                        disabled={true}
                                                        className="flex-1"
                                                        margin="normal"
                                                    />
                                                )}
                                            />

                                            <Controller
                                                name={`expertOpinion-${index}`}
                                                control={control}
                                                defaultValue={record.opinionRequest || ""}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Expert Opinion"
                                                        size="small"
                                                        type="text"
                                                        minRows={3}
                                                        maxRows={5}
                                                        multiline
                                                        fullWidth
                                                        disabled={true}
                                                        className="flex-1"
                                                        margin="normal"
                                                    />
                                                )}
                                            />
                                        </div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6.05}>
                                                <Controller
                                                    name="expertOpinionUser"
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <Autocomplete
                                                            disabled={true}
                                                            options={frmexpertUsers || []}
                                                            getOptionLabel={(option) => option.name || ""}
                                                            isOptionEqualToValue={(option, val) => option.id === val.id}
                                                            onChange={(event, newValue) => {
                                                                onChange(newValue ? newValue.id : "");
                                                            }}
                                                            value={frmexpertUsers?.find(
                                                                (option) =>
                                                                    option.id === record?.expertOpinionUser
                                                            )}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="Expert Opinion User"
                                                                    size="small"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    type="text"
                                                                    margin="normal"
                                                                    fullWidth
                                                                    disabled={true}
                                                                />
                                                            )}
                                                        />
                                                    )}
                                                />

                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </div>
                </div>
            </form>

        </Paper>

    );
};



export default memo(FrmExpertOpinionCompletedForm);
