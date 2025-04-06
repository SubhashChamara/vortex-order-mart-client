import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { FC, memo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { CliInfo } from "../../../../workflow/creditLimitIncrease/types/CliInfo";

type UnderWriterFormProps = {
  cliProcessData: CliInfo | null;
  editable?: boolean;
};

const UnderWriterForm: FC<UnderWriterFormProps> = (props) => {
  const { cliProcessData, editable = true } = props;

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const methods = useForm();
  const { control, formState, setValue, watch } = methods;

  const { errors } = formState;

  const formatCurrency = (value: string) => {
    if (!value) return value;
    let cleanedValue = value.replace(/[^0-9.]/g, "");
    if (cleanedValue.includes(".")) {
      const [integer, decimal] = cleanedValue.split(".");
      cleanedValue = `${integer}.${decimal.slice(0, 2)}`;
    }
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedValue}`;
  };

  console.log(watch("enhancementTypeUW"));
  useEffect(() => {
    if (cliProcessData != null) {
      setValue("enhancementTypeUW", cliProcessData.enhancementTypeUW);
      setValue("category", cliProcessData.category);
      setValue("evaluatedOn", cliProcessData.evaluatedOn);
      setValue(
        "enhancementFee",
        formatCurrency(String(cliProcessData.enhancementFee))
      );
      setValue(
        "grossIncome",
        formatCurrency(String(cliProcessData.grossIncome))
      );
      setValue(
        "approvedLimit",
        formatCurrency(String(cliProcessData.approvedLimit))
      );
      setValue("cardType", cliProcessData.cardType);
      setValue("newCardTypeUW", cliProcessData.newCardTypeUW);

      setValue("dbr", formatCurrency(String(cliProcessData.dbr)));
      setValue("mueOnUs", formatCurrency(String(cliProcessData.mueOnUs)));
      setValue(
        "mueOffUs",
        cliProcessData.mueOffUs
          ? formatCurrency(String(cliProcessData.mueOffUs))
          : ""
      );
      setValue(
        "tmpStartDate",
        cliProcessData.tmpStartDate ? dayjs(cliProcessData.tmpStartDate) : null
      );
      setValue(
        "tmpEndDate",
        cliProcessData.tmpEndDate ? dayjs(cliProcessData.tmpEndDate) : null
      );
      setValue(
        "approvedLevel",
        cliProcessData.approvedLevel ? cliProcessData.approvedLevel : null
      );
      setValue("cap", formatCurrency(String(cliProcessData.cap)));
      setValue(
        "isGenerateLetter",
        cliProcessData.isGenerateLetter
          ? cliProcessData.isGenerateLetter
          : false
      );
    }
  }, [cliProcessData]);

  return (
    <div>
      <div className="px-4 pb-10">
        <div className="text-center mb-16 border-b-1 border-b-gray-400 py-6">
          <h1 className="text-xsm font-600 text-left flex text-blue-gray-800">
            <div>
              <EdgeSvgIcon
                className="icon-size-14 cursor-pointer mr-3"
                color="error"
              >
                feather:check-circle
              </EdgeSvgIcon>
            </div>
            <div>Underwriter</div>
          </h1>
        </div>
        <div
          className={`grid grid-cols-1 gap-9 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-3"
              : "sm:grid-cols-2 md:grid-cols-3"
          } lg:grid-cols-4`}
        >
          <Controller
            name="enhancementTypeUW"
            control={control}
            disabled
            render={({ field }) => (
              <TextField
                {...field}
                label="Enhancement Type"
                required
                size="small"
                error={!!errors.enhancementTypeUW}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            disabled
            render={({ field }) => (
              <TextField
                {...field}
                label="Category"
                required
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          <Controller
            name="grossIncome"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Gross Income"
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.grossIncome}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          <Controller
            name="evaluatedOn"
            control={control}
            disabled
            render={({ field }) => (
              <TextField
                {...field}
                label="Evalutated On"
                required
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          <Controller
            name="approvedLimit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Approved Limit"
                required
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.approvedLimit}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          <Controller
            name="cardType"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Existing Card Type"
                required
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.approvedLimit}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          <Controller
            name="newCardTypeUW"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="New Card Type"
                required
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.approvedLimit}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          <Controller
            name="dbr"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="DBR"
                required
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.dbr}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />
          <Controller
            name="mueOnUs"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="MUE-ON US"
                required
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.mueOnUs}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />
          <Controller
            name="mueOffUs"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="MUE-OFF US"
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.mueOffUs}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />
          <Controller
            name="tmpStartDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={value}
                  label="Temp Start Date"
                  disabled={!editable}
                  onChange={(newValue) => {
                    const dateOnly = dayjs(newValue).endOf("day");
                    onChange(dateOnly);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.tmpStartDate,
                      helperText: <>{errors?.tmpStartDate?.message}</>,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="tmpEndDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={value}
                  label="Temp End Date"
                  disabled={!editable}
                  onChange={(newValue) => {
                    const dateOnly = dayjs(newValue).endOf("day");
                    onChange(dateOnly);
                    // onChange(newValue);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.tmpEndDate,
                      helperText: <>{errors?.tmpEndDate?.message}</>,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="approvedLevel"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Approved Level"
                required
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.approvedLimit}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          <Controller
            name="cap"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="CAP"
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.cap}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          <Controller
            name="isGenerateLetter"
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
                label="Generate Letter"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(UnderWriterForm);
