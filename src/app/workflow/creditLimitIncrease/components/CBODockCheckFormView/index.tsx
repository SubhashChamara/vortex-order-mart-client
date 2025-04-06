import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { DropDownItem } from "../../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { CliInfo } from "../../types/CliInfo";

type CBODocCheckFormProps = {
  task: TaskDetailInfo;
  cliProcessData: CliInfo | null;
  editable?: boolean;
};

const CBODocCheckForm: FC<CBODocCheckFormProps> = (props) => {
  const { task, cliProcessData, editable } = props;

  //masters
  // const [titleList, setTitleList] = useState<DropDownItem[]>([]);
  // const [cardTypeList, setCardTypeList] = useState<DropDownItem[]>([]);
  // const [upgradeCardTypeList, setupgradeCardTypeList] = useState<
  //   DropDownItem[]
  // >([]);
  // const [enhancementTypeList, setEnhancementTypeList] = useState<
  //   DropDownItem[]
  // >([]);
  // const [requestModesList, setRequestModesList] = useState<DropDownItem[]>([]);

  // const [categoryTypes, setCategoryTypes] = useState<DropDownItem[]>([]);
  // const [evaluatedOnTypes, setEvaluatedOnTypes] = useState<DropDownItem[]>([]);
  // const [approvedLevelList, setApprovedLevelList] = useState<DropDownItem[]>(
  //   []
  // );

  // const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const methods = useFormContext();
  const {
    control,
    handleSubmit,
    formState,
    setError,
    setValue,
    watch,
    getValues,
  } = methods;

  const { errors } = formState;

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
                    <Checkbox {...field} checked={field.value} disabled={!editable} />
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
                    <Checkbox {...field} checked={field.value} disabled={!editable} />
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
                    <Checkbox {...field} checked={field.value} disabled={!editable} />
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
