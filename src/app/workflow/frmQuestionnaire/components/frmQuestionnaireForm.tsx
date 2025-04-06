import { FC, useEffect, useState } from "react";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../@hooks/useThemeMediaQuery";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, CardContent, Checkbox, Divider, FormControlLabel, FormHelperText, Paper, TextField, Typography } from "@mui/material";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { FrmQuestionnaireResponse } from "../@types/FrmQuestionnaireResponse";
import { FrmQuestionnaireRequest } from "../@types/frmQuestionnaireRequest";
import { Api } from "../../../../api/Api";
import { toast } from "react-toastify";
import Logger from "../../../../@helpers/Logger";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { Pageable } from "../../../../api/types/Pageable";
import { DocumentInfo } from "../../../core/types/DocumentInfo";
import { DocumentListParams } from "../../../../api/types/params/DocumentListParams";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FrmquestionnaireProps = {
    frmCompletedQuestionnaire: FrmQuestionnaireResponse[] | null;
    frmQuestionnaire: FrmQuestionnaireResponse | null;
    questionnaire: Boolean;
    task: TaskDetailInfo;
};

type FormType = {
    [key: string]: boolean | string;
};

const FrmQuestionnaireForm: FC<FrmquestionnaireProps> = (props) => {
    const { frmCompletedQuestionnaire, questionnaire, task, frmQuestionnaire } = props;
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
    const [documentList, setDocumentList] = useState<Pageable<DocumentInfo> | null>(null);
    const [page, setPage] = useState<number>(0);


    const schema = z.object({
        questionnaireAttached: questionnaire
            ? z.boolean().refine((value) => value === true, {
                message: "Questionnaire must be attached.",
            })
            : z.boolean().optional(),
    });


    const { control, formState, setValue, handleSubmit } =
        useForm<FormType>({
            mode: "onChange",
            resolver: zodResolver(schema),
        });

    const handleFetchDocumentList = async () => {
        if (task === null) {
            return null;
        }

        const params: DocumentListParams = {
            processInstance: task?.processInstanceId,
            page: page,
            size: 3,
            sort: "createdDate,desc",
            endDate: null,
            startDate: null,
            idProcess: null,
            workflowLabel: null,
            processName: null,
        };

        const { data, err } = await Api.performRequest((r) => r.document.list(params));
        Logger.debug(
            "(Document List) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (data !== null) {
            setDocumentList(data);
            return data;
        }

        return null;
    };

    useEffect(() => {
        if (frmQuestionnaire) {
            setValue("questionnaireAttached", frmQuestionnaire.questionnaireAttached || false);

        }
    }, [frmQuestionnaire, setValue]);

    const { errors } = formState;


    const handleOnSubmit = async (formData: FormType) => {


        const documentData = await handleFetchDocumentList();

        if (!documentData || !documentData?.content || documentData?.content.length === 0) {
            toast.error("Please attach documents before saving.");
            return;
        }

        const { questionnaireAttached } = formData;
        const isQuestionnaireAttached =
            typeof questionnaireAttached === "boolean" ? questionnaireAttached : false;

        const request: FrmQuestionnaireRequest = {
            questionnaireAttached: isQuestionnaireAttached,
            processInstance: task.processInstanceId,
            taskInstance: task.taskInstance
        };

        const { data, err } = await Api.performRequest((r) => r.creditCard.saveQuestionnaire(request));

        if (err === null) {
            toast.success("Your Request Was Saved Successfully");

        } else {
            toast.error(err.msg);
            setTimeout(() => 3000);
        }
    };



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
                    <div>Questionnaire</div>
                </h1>
            </div>
            {questionnaire && (
                <>
                    <form noValidate onSubmit={handleSubmit(handleOnSubmit)}>
                        <div
                            className={`grid gap-9 ${mobileOpen && isMobile
                                ? "sm:grid-cols-1 md:grid-cols-1"
                                : "sm:grid-cols-2 md:grid-cols-1"
                                } lg:grid-cols-1`}
                        >
                            <div className="flex flex-row items-center">
                                <p className="flex-shrink-0 mr-3">Questionnaire Attached</p>
                                <Controller
                                    name={`questionnaireAttached`}
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={<Checkbox {...field} checked={!!field.value} />}
                                            label=""

                                        />

                                    )}

                                />
                                {errors.questionnaireAttached && (
                                    <FormHelperText error>{errors.questionnaireAttached?.message}</FormHelperText>
                                )}
                            </div>

                            <div className="flex justify-left my-6">
                                <Button
                                    aria-label="Save"
                                    type="submit"
                                >
                                    <EdgeSvgIcon
                                        className="icon-size-12 cursor-pointer text-white mr-3"
                                        color="error"
                                    >
                                        feather:save
                                    </EdgeSvgIcon>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </>
            )}

            {questionnaire && <Divider />}

            <div
                className={`grid gap-9 ${mobileOpen && isMobile
                    ? "sm:grid-cols-1 md:grid-cols-1"
                    : "sm:grid-cols-1 md:grid-cols-3"
                    } lg:grid-cols-3`}
                style={{ maxHeight: '550px', overflowY: 'auto', padding: '10px' }}
            >

                {frmCompletedQuestionnaire?.map((completedData, index) => {
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



        </Paper>

    );
};



export default FrmQuestionnaireForm;