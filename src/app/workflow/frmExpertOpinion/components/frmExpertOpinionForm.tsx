import { FC, memo, useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { Autocomplete, Button, Divider, MenuItem, Paper, TextField } from "@mui/material";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../@hooks/useThemeMediaQuery";
import { z } from "zod";
import { DropDownItem, FrmExpertOpinionInvestigationProcessResponse, FrmExpertOpinionResponse } from "../@types/frmExpertOpinionRequest";
import { Api } from "../../../../api/Api";
import { toast } from "react-toastify";
import Logger from "../../../../@helpers/Logger";
import { FrmExpertOpinionRequest } from "../@types/frmExpertOpinionResponse";

type FrmExpertOpinionProps = {
  task: TaskDetailInfo;
  frmExpertOpinion: FrmExpertOpinionResponse | null;
  frmInvestigation: FrmExpertOpinionInvestigationProcessResponse | null;
  expertOpinionStatus: Boolean;
  frmexpertUsers: DropDownItem[] | null;
  monthList: { id: number; name: string }[];
};

type FormType = {
  workFlowLabel: string;
  source: string;
  bundledRef: string;
  oldNic: string;
  newNic: string;
  month: number;
  year: number;
  groupAccNo: string;
  ecapsRef: string;
  bucket: number;
  delinquency: number;
  invokerComment: string;
  makerComment: string;
  processInstanceId: string;
  expertOpinion: string;
  opinionRequest: string;
  expertOpinionUser: string;
};

const defaultValues: FormType = {
  workFlowLabel: "",
  source: "Manual",
  bundledRef: "",
  oldNic: "",
  newNic: "",
  month: 0,
  year: 0,
  groupAccNo: "",
  ecapsRef: "",
  bucket: 0,
  delinquency: 0,
  invokerComment: "",
  makerComment: "",
  processInstanceId: "",
  expertOpinion: "",
  opinionRequest: "",
  expertOpinionUser: ""
};


const FrmExpertOpinionForm: FC<FrmExpertOpinionProps> = (props) => {
  const { task, frmExpertOpinion, frmInvestigation, expertOpinionStatus, frmexpertUsers, monthList } = props;
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [frmInvestigationProcess, setFrmInvestigationProcess] = useState<FrmExpertOpinionInvestigationProcessResponse | null>(null);
  const [frmExpertOpinionVal, setFrmExpertOpinion] = useState<FrmExpertOpinionResponse | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  useEffect(() => {
    if (frmInvestigation) {
      setFrmInvestigationProcess(frmInvestigation);
      setFrmExpertOpinion(frmExpertOpinion);
    }
  }, [frmInvestigation]);

  const handleOnSubmit = async (formData: FormType) => {
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }
    setIsSubmitted(true);
    const {
      workFlowLabel,
      source,
      bundledRef,
      oldNic,
      newNic,
      month,
      year,
      groupAccNo,
      ecapsRef,
      bucket,
      delinquency,
      invokerComment,
      makerComment,
      expertOpinion,
      opinionRequest,
      expertOpinionUser
    } = formData;


    const request: FrmExpertOpinionRequest = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
      opinionRequest: opinionRequest,
      opinionRequestBy: '',
      opinionRequestDate: '',
      opinionProvide: expertOpinion,
      opinionProvideBy: '',
      expertOpinionUser: expertOpinionUser,
      opinionProvideDate: '',
      investigationFlowProcInst: frmInvestigationProcess?.processInstance || '',
    };


    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.saveExpertOpinionForm(request)
    );

    if (err === null) {
      toast.success("Your Request Was Saved Successfully");
      setIsSubmitted(false);
    } else {
      toast.error(err.msg);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const schema = z.object({
    expertOpinion: expertOpinionStatus
      ? z.string().refine(value => value !== "", {
        message: "Expert opinion is required.",
      })
      : z.string().optional(),
    opinionRequest: !expertOpinionStatus
      ? z.string().refine(value => value !== "", {
        message: "Provide opinion on is required.",
      })
      : z.string().optional(),
    expertOpinionUser: !expertOpinionStatus
      ? z.string().refine(value => value !== "", {
        message: "Expert opinion user is required.",
      })
      : z.string().optional(),
  });


  const { control, formState, setError, setValue, handleSubmit } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { errors } = formState;




  useEffect(() => {
    if (frmInvestigationProcess) {
      setValue("source", frmInvestigationProcess.source || "");
      setValue("bundledRef", frmInvestigationProcess.bundledRef || "");
      setValue("oldNic", frmInvestigationProcess.nicOld || "");
      setValue("newNic", frmInvestigationProcess.nicNew || "");
      setValue("month", frmInvestigationProcess.monthVal || 0);
      setValue("year", frmInvestigationProcess.accOpenYearVal || 0);
      setValue("groupAccNo", frmInvestigationProcess.groupAccountNo || "");
      setValue("ecapsRef", frmInvestigationProcess.ecapsRef || "");
      setValue("bucket", frmInvestigationProcess.bucket || 0);
      setValue("delinquency", frmInvestigationProcess.delinquency || 0);
      setValue("invokerComment", frmInvestigationProcess.comment || "");
      setValue("makerComment", frmInvestigationProcess.commentMaker || "");
      setValue("expertOpinion", frmExpertOpinionVal?.opinionProvide || "");
      setValue("expertOpinionUser", frmExpertOpinionVal?.expertOpinionUser || "");
      setValue("opinionRequest", frmExpertOpinionVal?.opinionRequest || "");
    }
  }, [frmInvestigationProcess, setValue]);

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
          <div>FRM INVESTGATION</div>
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div
          className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
            ? "sm:grid-cols-1 md:grid-cols-2"
            : "sm:grid-cols-2 md:grid-cols-1"
            } lg:grid-cols-2`}
        >

          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="Source"
                size="small"
                type="email"

              />
            )}
          />

          <Controller
            name="bundledRef"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="Bundled Ref"
                size="small"
                type="text"

              />
            )}
          />

          <Controller
            name="oldNic"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="Old NIC"
                size="small"
                type="text"

              />
            )}
          />

          <Controller
            name="newNic"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="New NIC"
                size="small"
                type="text"

              />
            )}
          />

          <Controller
            name="month"
            control={control}
            disabled={true}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Month"
                size="small"
                value={field.value}
                disabled
              >
                {monthList.map((month) => (
                  <MenuItem key={month.id} value={month.id}>
                    {month.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />


          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="Year"
                size="small"
                type="number"


              />
            )}
          />

          <Controller
            name="groupAccNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="Group Account No"
                size="small"
                type="text"

              />
            )}
          />

          <Controller
            name="ecapsRef"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="ECAPS Ref"
                size="small"
                type="text"

              />
            )}
          />

          <Controller
            name="bucket"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="Bucket"
                size="small"
                type="number"


              />
            )}
          />

          <Controller
            name="delinquency"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="Delinquency"
                size="small"
                type="number"


              />
            )}
          />

          <Controller
            name="invokerComment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="FRM Invoker Comment"
                size="small"
                type="text"
                multiline
                minRows={3}
                maxRows={5}

              />
            )}
          />


          <Controller
            name="makerComment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="FRM Maker Comment"
                size="small"
                type="text"
                multiline
                minRows={3}
                maxRows={5}

              />
            )}
          />
          <Divider className="col-span-2" />
          <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6 col-span-2">
            <h1 className="text-md font-600 text-left flex text-blue-gray-800">
              <div>
                <EdgeSvgIcon
                  className="icon-size-18 cursor-pointer mr-3"
                  color="error"
                >
                  feather:user-plus
                </EdgeSvgIcon>
              </div>
              <div>EXPERT OPINION</div>
            </h1>
          </div>
          <Controller
            name="opinionRequest"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!!expertOpinionStatus}
                label="Provide Opinion On"
                size="small"
                type="text"
                error={!!errors.opinionRequest}
                helperText={errors.opinionRequest?.message}
              />
            )}
          />

          {expertOpinionStatus && (
            <Controller
              name="expertOpinion"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Expert Opinion"
                  size="small"
                  type="text"
                  minRows={3}
                  maxRows={5}
                  error={!!errors.expertOpinion}
                  helperText={errors.expertOpinion?.message}
                />
              )}
            />
          )}



          <Controller
            name="expertOpinionUser"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={!!expertOpinionStatus}
                options={frmexpertUsers || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue.id : "");
                }}
                value={
                  !!expertOpinionStatus
                    ? frmexpertUsers?.find(
                      (option) =>
                        option.id === frmExpertOpinion?.expertOpinionUser
                    ) || null
                    : frmexpertUsers?.find((option) => option.id === value) || null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Expert Opinion User"
                    size="small"
                    error={!!errors.expertOpinionUser}
                    helperText={errors.expertOpinionUser?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />
        </div>
        <br/>
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
      </form>
    </Paper>
  )
}

export default memo(FrmExpertOpinionForm);
