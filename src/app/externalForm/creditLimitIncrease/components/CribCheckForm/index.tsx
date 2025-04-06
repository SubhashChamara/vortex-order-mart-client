import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import { FC, memo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { CliInfo } from "../../../../workflow/creditLimitIncrease/types/CliInfo";

type CribCheckFormProps = {
  cliProcessData: CliInfo | null;
  editable?: boolean;
};

const CribCheckForm: FC<CribCheckFormProps> = (props) => {
  const { cliProcessData, editable } = props;

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { setValue, control } = useForm();

  useEffect(() => {
    if (cliProcessData != null) {
      setValue("cribAttached", cliProcessData.isCribAttached);
      setValue(
        "cribJustificationAttached",
        cliProcessData.isCribJustificationAttached
      );
    }
  }, [cliProcessData]);

  return (
    <>
      <Paper>
        <div className="px-12 pb-16 pt-16">
          <div
            className={`grid grid-cols-1 gap-2 ${
              mobileOpen && isMobile
                ? "sm:grid-cols-1 md:grid-cols-2"
                : "sm:grid-cols-2 md:grid-cols-2"
            } lg:grid-cols-5`}
          >
            <Controller
              name="cribAttached"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={!!field.value}
                      disabled={!editable}
                    />
                  }
                  label="Crib Attached"
                />
              )}
            />
            <Controller
              name="cribJustificationAttached"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={!!field.value}
                      disabled={!editable}
                    />
                  }
                  label="Crib Justification Attached"
                />
              )}
            />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default memo(CribCheckForm);
