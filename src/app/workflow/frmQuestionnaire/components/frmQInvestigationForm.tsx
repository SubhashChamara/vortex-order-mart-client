import { Autocomplete, MenuItem, Paper, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../@hooks/useThemeMediaQuery";
import { FrmQInvestigationResponse } from "../@types/FrmQuestionnaireResponse";

type FrmQuestionnaireOpinionProps = {
  frmInvestigation: FrmQInvestigationResponse | null;
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
};

const FrmQInvestigationForm: FC<FrmQuestionnaireOpinionProps> = (props) => {
  const { frmInvestigation, monthList } = props;
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [frmInvestigationProcess, setFrmInvestigationProcess] =
    useState<FrmQInvestigationResponse | null>(null);
  const { control, setValue } = useForm<FormType>({
    mode: "onChange",
  });

  useEffect(() => {
    if (frmInvestigation) {
      setFrmInvestigationProcess(frmInvestigation);
    }
  }, [frmInvestigation]);

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
    }
  }, [frmInvestigationProcess, setValue]);

  return (
    <Paper className="px-12 pb-8">
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
          <div>FRM INVESTGATION DETAILS</div>
        </h1>
      </div>
      <form noValidate>
        <div
          className={`grid grid-cols-1 gap-9 ${
            mobileOpen && isMobile
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
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={monthList}
                disabled={true}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={monthList.find((option) => option.id === value) || null}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue.id : "");
                  console.log("value", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Month"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
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
        </div>
      </form>
    </Paper>
  );
};

export default FrmQInvestigationForm;
