import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../@hooks/useThemeMediaQuery";
import { FrmQuestionnaire } from "../@types/FrmQuestionnaire";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";

type FrmquestionnaireProps = {
    questionnaire: FrmQuestionnaire[] | []
};

type FormType = {
    [key: string]: boolean | string;
};

const FrmQuestionnaireForm: FC<FrmquestionnaireProps> = (props) => {
    const { questionnaire } = props;
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));


    const { control } =
        useForm<FormType>({
            mode: "onChange"
        });

    return (
        <Paper className="px-12">
            <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
                <h1 className="text-md font-600 text-left flex text-blue-gray-800">
                    <EdgeSvgIcon className="icon-size-18 cursor-pointer mr-3" color="error">
                        feather:user-plus
                    </EdgeSvgIcon>
                    QUESTIONNAIRE
                </h1>
            </div>
            <form noValidate>
                <div
                    className={`grid gap-9 ${mobileOpen && isMobile
                            ? "sm:grid-cols-1 md:grid-cols-1"
                            : "sm:grid-cols-1 md:grid-cols-3"
                        } lg:grid-cols-3`}
                    style={{ maxHeight: '550px', overflowY: 'auto', padding: '10px'}}
                >
                    {questionnaire?.map((completedData, index) => {
                        const formIndex = `${index}`;
                        return (
                            <div key={formIndex} className="flex flex-col space-y-4">
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            REF: {completedData?.businessKey}
                                        </Typography>
                                        <br />

                                        <div className="flex flex-row items-center mb-4">
                                            <p className="flex-shrink-0 mr-3">Questionnaire Attached</p>
                                            <Controller
                                                name={`questionnairelist-${formIndex}`}
                                                control={control}
                                                disabled={true}
                                                defaultValue={completedData?.questionnaireAttached ?? false}
                                                render={({ field }) => (
                                                    <FormControlLabel
                                                        control={<Checkbox {...field} checked={!!field.value} />}
                                                        label=""
                                                    />
                                                )}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>

            </form>
        </Paper>

    );
};



export default FrmQuestionnaireForm;