import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import { FC, memo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { CliInfo } from "../../../../workflow/creditLimitIncrease/types/CliInfo";

type CBODocCheckFormProps = {
  cliProcessData: CliInfo | null;
  editable?: boolean;
};

const CBODocCheckForm: FC<CBODocCheckFormProps> = (props) => {
  const { cliProcessData, editable } = props;

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const methods = useForm();
  const { control, setValue } = methods;

  useEffect(() => {
    if (cliProcessData != null) {
      setValue("customerCategory", cliProcessData.customerCategory);
      setValue("daHoldersApproval", cliProcessData.daHoldersApproval);
      setValue("isCustomersRequested", cliProcessData.isCustomersRequested);
    }
  }, [cliProcessData]);

  return (
    <>
      <Paper>
        <div className="px-12 pb-16 pt-16">
          <div
            className={`grid grid-cols-1 gap-9 ${
              mobileOpen && isMobile
                ? "sm:grid-cols-1 md:grid-cols-3"
                : "sm:grid-cols-2 md:grid-cols-3"
            } lg:grid-cols-4`}
          >
            <Controller
              name="customerCategory"
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
                  label="Customer Category"
                />
              )}
            />
            <Controller
              name="daHoldersApproval"
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
                  label="DA Holders Approval"
                />
              )}
            />
            <Controller
              name="isCustomersRequested"
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
                  label="Is Customers Requested"
                />
              )}
            />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default memo(CBODocCheckForm);
