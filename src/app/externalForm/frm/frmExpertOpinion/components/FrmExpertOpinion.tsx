import { Autocomplete, Paper, TextField } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { DropDownItem, ExpertOpinion } from "../../CommonTypes";

type FrmExpertOpinionProps = {
  frmExpertOpinion: ExpertOpinion | null;
  frmexpertUsers: DropDownItem[] | null;
  expertOpinionStatus: Boolean
};

type FormType = {
  expertOpinion: string;
  opinionRequest: string;
  expertOpinionUser: string;
};

const defaultValues: FormType = {
  expertOpinion: "",
  opinionRequest: "",
  expertOpinionUser: ""
};


const FrmExpertOpinionExternalDetails: FC<FrmExpertOpinionProps> = (props) => {
  const { frmExpertOpinion, frmexpertUsers, expertOpinionStatus } = props;
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const methods = useForm();
  const { control, setValue } = methods;
  useEffect(() => {

  }, []);


  useEffect(() => {
    if (frmExpertOpinion) {
      setValue("expertOpinion", frmExpertOpinion?.opinionProvide || '');
      setValue("expertOpinionUser", frmExpertOpinion?.expertOpinionUser || "");
      setValue("opinionRequest", frmExpertOpinion?.opinionRequest || "");
    }
  }, [frmExpertOpinion, setValue]);

  return (
    <Paper className="px-12" style={{ margin: '5px' }}>
      <form noValidate>
        <div
          className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
            ? "sm:grid-cols-1 md:grid-cols-2"
            : "sm:grid-cols-2 md:grid-cols-1"
            } lg:grid-cols-2`}
        >
          <div className="text-center py-6 col-span-2" />

          <Controller
            name="opinionRequest"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={true}
                label="Provide Opinion On"
                size="small"
                type="text"
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
                  disabled={true}
                />
              )}
            />
          )}

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
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />
        </div>
        <br />
      </form>
    </Paper>
  )
}
export default memo(FrmExpertOpinionExternalDetails);
