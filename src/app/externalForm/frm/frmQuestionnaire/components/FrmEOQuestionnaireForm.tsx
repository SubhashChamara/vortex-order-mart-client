import {
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { FrmExpertOpinionQuestionnaireResponse } from "../../CommonTypes";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { useThemeMediaQuery } from "../../../../../@edgevantage/hooks";


export interface FrmEOQuestionnaireFormProps {
    form: FrmExpertOpinionQuestionnaireResponse | null
}

type FormType = {
    questionnaireAttached?: boolean;
    businessKey?: string;
};

const FrmEOQuestionnaireForm: FC<FrmEOQuestionnaireFormProps> = (props) => {
    const { form } = props;
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));


    const { control, handleSubmit, formState, setError, setValue } =
        useForm<FormType>({
            mode: "onChange",
        });

    return (
        <Paper className="px-12">
            <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
                <h1 className="text-md font-600 text-left flex text-blue-gray-800">
                    <EdgeSvgIcon className="icon-size-18 cursor-pointer mr-3" color="error">
                        feather:user-plus
                    </EdgeSvgIcon>
                    Questionnaire
                </h1>
            </div>
            <form noValidate>
                <div
                    className={`grid gap-9 ${mobileOpen && isMobile
                        ? "sm:grid-cols-1 md:grid-cols-1"
                        : "sm:grid-cols-1 md:grid-cols-3"
                        } lg:grid-cols-3`}
                    style={{ maxHeight: '550px', overflowY: 'auto', padding: '10px' }}
                >

                    <div className="flex flex-col space-y-4">
                        <Card>
                            <CardContent>
                                <div className="flex flex-row items-center mb-4">
                                    <p className="flex-shrink-0 mr-3">Questionnaire Attached</p>
                                    <Controller
                                        name={`questionnaireAttached`}
                                        control={control}
                                        disabled={true}
                                        defaultValue={form?.questionnaireAttached ?? false}
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
                </div>

            </form>
        </Paper>

    );

};

export default FrmEOQuestionnaireForm;