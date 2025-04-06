import { Checkbox, FormControlLabel, Paper, TextField } from "@mui/material";
import { FC, memo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { useNavbarState } from "../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { CliInfo } from "../../../../workflow/creditLimitIncrease/types/CliInfo";

type UserFormProps = {
  cliProcessData: CliInfo | null;
  editable: boolean;
};

const UserForm: FC<UserFormProps> = (props) => {
  const { cliProcessData, editable } = props;

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s+/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
  };

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

  useEffect(() => {
    const loadData = async () => {
      if (cliProcessData !== null) {
        try {
          setValue(
            "oldNicNumber",
            cliProcessData.oldNicNumber ? cliProcessData.oldNicNumber : ""
          );
          setValue(
            "newNicNumber",
            cliProcessData.newNicNumber ? cliProcessData.newNicNumber : ""
          );
          setValue(
            "passport",
            cliProcessData.passport ? cliProcessData.passport : ""
          );
          setValue("title", cliProcessData.title ? cliProcessData.title : "");
          setValue("firstName", cliProcessData.firstName);
          setValue("lastName", cliProcessData.lastName);
          setValue(
            "addressLine1",
            cliProcessData.addressLine1 ? cliProcessData.addressLine1 : ""
          );
          setValue(
            "addressLine2",
            cliProcessData.addressLine2 ? cliProcessData.addressLine2 : ""
          );
          setValue(
            "addressLine3",
            cliProcessData.addressLine3 ? cliProcessData.addressLine3 : ""
          );
          setValue("city", cliProcessData.city ? cliProcessData.city : "");
          setValue(
            "country",
            cliProcessData.country ? cliProcessData.country : ""
          );
          setValue(
            "accountNumber",
            cliProcessData.accountNumber ? cliProcessData.accountNumber : ""
          );
          setValue("cardNumber", formatCardNumber(cliProcessData.cardNumber));
          setValue(
            "presentLimit",
            formatCurrency(String(cliProcessData.presentLimit))
          );
          setValue(
            "requestedLimit",
            formatCurrency(String(cliProcessData.newLimit))
          );
          setValue("reason", cliProcessData.reasonForEnhancement);
          setValue("cardType", cliProcessData.cardType);
          setValue("enhancementType", cliProcessData.enhancementType);
          setValue("upgradeTo", cliProcessData.upgradeTo);
          setValue("requestedMode", cliProcessData.modeType);
          setValue("upgradeRequire", cliProcessData.isUpgradeRequired);
          setValue("cribAttached", cliProcessData.isCribJustificationAttached);
        } catch (error) {
          console.error("Error setting form values:", error);
        }
      }
    };

    loadData();
  }, [cliProcessData, setValue]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Paper className="px-12 pb-10">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-md font-600 text-left flex text-blue-gray-800">
            <div>
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                feather:user
              </EdgeSvgIcon>
            </div>
            <div>Customer Details</div>
          </h1>
        </div>
        <div
          className={`grid grid-cols-1 gap-9 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-1"
          } lg:grid-cols-2`}
        >
          <TextField
            {...register("oldNicNumber")}
            required
            disabled={!editable}
            label="Old NIC"
            size="small"
            type="text"
          />

          <TextField
            {...register("newNicNumber")}
            required
            disabled={!editable}
            label="New NIC"
            size="small"
            type="text"
            error={!!errors.newNicNumber}
          />

          <TextField
            {...register("passport")}
            required
            disabled={!editable}
            label="Passport"
            size="small"
            type="email"
            error={!!errors.passport}
          />

          <TextField
            {...register("title")}
            label="Title"
            required
            disabled={!editable}
            size="small"
            error={!!errors.title}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            {...register("firstName")}
            required
            disabled={!editable}
            label="First Name"
            size="small"
            type="text"
            error={!!errors.firstName}
          />

          <TextField
            {...register("lastName")}
            required
            disabled={!editable}
            label="Last Name"
            size="small"
            type="text"
            error={!!errors.lastName}
          />

          <TextField
            {...register("addressLine1")}
            disabled={!editable}
            label="Address Line 1"
            size="small"
            type="text"
            error={!!errors.addressLine1}
          />

          <TextField
            {...register("addressLine2")}
            disabled={!editable}
            label="Address Line 2"
            size="small"
            type="text"
            error={!!errors.addressLine2}
          />

          <TextField
            {...register("addressLine3")}
            disabled={!editable}
            label="Address Line 3"
            size="small"
            type="text"
            error={!!errors.city}
          />

          <TextField
            {...register("city")}
            disabled={!editable}
            label="City"
            size="small"
            type="text"
            error={!!errors.city}
          />

          <TextField
            {...register("country")}
            label="Country"
            disabled={!editable}
            size="small"
            type="text"
            error={!!errors.country}
          />
        </div>
      </Paper>
      <Paper className="px-12">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-md font-600 text-left flex text-blue-gray-800">
            <div className="flex items-center ">
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                feather:credit-card
              </EdgeSvgIcon>
            </div>
            <div>Card Details</div>
          </h1>
        </div>
        <div
          className={`grid grid-cols-1 gap-9 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-1"
          } lg:grid-cols-2`}
        >
          <TextField
            {...register("accountNumber")}
            disabled={!editable}
            label="Account Number"
            size="small"
            type="text"
            error={!!errors.accountNumber}
          />

          <TextField
            {...register("cardNumber")}
            label="Card Number"
            required
            disabled={!editable}
            size="small"
            type="text"
            error={!!errors.cardNumber}
          />

          <TextField
            {...register("presentLimit")}
            label="Present Limit"
            required
            disabled={!editable}
            size="small"
            type="text"
            error={!!errors.presentLimit}
            InputProps={{
              inputProps: { style: { textAlign: "right" } },
            }}
          />

          <TextField
            {...register("requestedLimit")}
            label="Requested Limit"
            required
            disabled={!editable}
            size="small"
            type="text"
            error={!!errors.requestedLimit}
            InputProps={{
              inputProps: { style: { textAlign: "right" } },
            }}
          />

          <TextField
            {...register("reason")}
            label="Reason for Enhancement"
            required
            disabled={!editable}
            size="small"
            type="text"
            error={!!errors.reason}
          />

          <TextField
            {...register("cardType")}
            label="Card Type"
            required
            disabled={!editable}
            size="small"
            error={!!errors.cardType}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            {...register("enhancementType")}
            label="Enhancement Type"
            required
            disabled={!editable}
            size="small"
            error={!!errors.enhancementType}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Controller
            name="upgradeRequire"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox {...field} checked={!!field.value} disabled />
                }
                label="Upgrade Required"
              />
            )}
          />

          <TextField
            {...register("upgradeTo")}
            label="Upgrade To"
            required
            disabled={!editable}
            size="small"
            error={!!errors.upgradeTo}
            // helperText={errors?.upgradeTo?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            {...register("requestedMode")}
            label="Requested Mode"
            required
            disabled={!editable}
            size="small"
            error={!!errors.requestedMode}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Controller
            name="cribAttached"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox {...field} checked={!!field.value} disabled />
                }
                label="Crib Justification Attached"
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default memo(UserForm);
