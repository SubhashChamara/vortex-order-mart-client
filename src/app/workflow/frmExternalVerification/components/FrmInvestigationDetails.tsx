import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { Controller, useForm } from "react-hook-form";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../@hooks/useThemeMediaQuery";
import { FC, useEffect } from "react";
import { FemInvsProcessInfi } from "./FemInvsProcessInfi";

export interface FrmInvestigationDetailsProps {
  form: FemInvsProcessInfi | null;
  editable?: boolean;
  monthList: { id: number; name: string }[];
}

type FormType = {
  workFlowLabel: string;
  source: string;
  bundledRef: string;
  nicOld: string;
  nicNew: string;
  monthVal: number;
  accOpenYearVal: number;
  groupAccountNo: string;
  ecapsRef: string;
  bucket: number;
  delinquency: number;
  comment: string;
  commentMaker: string;
  processInstanceId: string;
};

const FrmInvestigationDetails: FC<FrmInvestigationDetailsProps> = (props) => {
  const { form, editable, monthList } = props;

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, setError, setValue } =
    useForm<FormType>({
      mode: "onChange",
    });

  useEffect(() => {
    if (form !== null) {
      setValue("workFlowLabel", form.workFlowLabel);
      setValue("source", form.source);
      setValue("bundledRef", form.bundledRef);
      setValue("nicOld", form.nicOld);
      setValue("nicNew", form.nicNew);
      setValue("monthVal", form.monthVal);
      setValue("accOpenYearVal", form.accOpenYearVal);
      setValue("groupAccountNo", form.groupAccountNo);
      setValue("ecapsRef", form.ecapsRef);
      setValue("bucket", form.bucket);
      setValue("comment", form.comment);
      setValue("commentMaker", form.commentMaker);
      setValue("delinquency", form.delinquency);
    }
  }, [form]);

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
          <div>FRM INVESTIGATION FLOW</div>
        </h1>
      </div>
      <form>
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
                label="Source"
                size="small"
                type="email"
                disabled={editable}
              />
            )}
          />

          <Controller
            name="bundledRef"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Bundled Ref"
                size="small"
                type="text"
                disabled={editable}
              />
            )}
          />

          <Controller
            name="nicOld"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Old NIC"
                size="small"
                type="text"
                disabled={editable}
              />
            )}
          />

          <Controller
            name="nicNew"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="New NIC"
                size="small"
                type="text"
                disabled={editable}
              />
            )}
          />

          <Controller
            name="monthVal"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={monthList}
                disabled={editable}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={monthList.find((option) => option.id === value) || null}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue.id : ""); // Use the `name` or empty string
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
            name="accOpenYearVal"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Year"
                size="small"
                type="number"
                disabled={editable}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />

          <Controller
            name="groupAccountNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Group Account No"
                size="small"
                type="text"
                disabled={editable}
              />
            )}
          />

          <Controller
            name="ecapsRef"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="ECAPS Ref"
                size="small"
                type="text"
                disabled={editable}
              />
            )}
          />

          <Controller
            name="bucket"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Bucket"
                size="small"
                type="number"
                disabled={editable}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />

          <Controller
            name="delinquency"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Delinquency"
                size="small"
                type="number"
                disabled={editable}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />

          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="FRM Invoker Comment"
                size="small"
                type="text"
                multiline
                minRows={3}
                maxRows={5}
                disabled={editable}
              />
            )}
          />

          <Controller
            name="commentMaker"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="FRM Maker Comment"
                size="small"
                type="text"
                multiline
                minRows={3}
                maxRows={5}
                disabled={editable}
                className="mb-20"
              />
            )}
          />
        </div>
      </form>
    </Paper>
  );
};

export default FrmInvestigationDetails;
