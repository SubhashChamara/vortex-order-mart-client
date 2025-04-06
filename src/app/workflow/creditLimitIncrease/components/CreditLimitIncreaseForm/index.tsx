import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { useNavbarState } from "../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../@helpers/Logger";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { Api } from "../../../../../api/Api";
import { DropDownItem } from "../../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { CliInfo } from "../../types/CliInfo";
// import { getValue } from "@mui/system";
// import { title } from "process";
// import { Title } from "@mui/icons-material";

// type FormType = {
//   oldNicNumber: string;
//   newNicNumber: string;
//   passport: string;
//   title: DropDownItem |null;
//   firstName:string;
//   lastName:string;
//   addressLine1:string;
//   addressLine2:string;
//   addressLine3:string;
//   city:string;
//   country:string;
//   accountNumber:string;
//   cardNumber:string;
//   presentLimit: string;
//   requestedLimit:string;
//   reason:string;
//   cardType:DropDownItem|null;
//   upgradeRequire:boolean;
//   enhancementType:DropDownItem|null;
//   upgradeTo:DropDownItem|null;
//   requestedMode:DropDownItem|null;
//   cribAttached:boolean;
// };

// const defaultValues: FormType = {
//   oldNicNumber: "",
//   newNicNumber: "",
//   passport: "",
//   title: null,
//   firstName:"",
//   lastName:"",
//   addressLine1:"",
//   addressLine2:"",
//   addressLine3:"",
//   city:"",
//   country:"",
//   accountNumber:"",
//   presentLimit: "",
//   requestedLimit:"",
//   cardNumber:"",
//   reason:"",
//   cardType:null,
//   upgradeRequire:false,
//   upgradeTo:null,
//   enhancementType:null,
//   requestedMode:null,
//   cribAttached:false,
// };

// const schema = z.object({
//   oldNicNumber: z.string().refine(value => {
//     return value.trim() === "" || /^[0-9]{9}[vVxX]$/.test(value) || /^[0-9]{9}[XxVv]$/.test(value);
//   }, {
//     message: "Old NIC must Invalid",
//   }).optional(),

//   newNicNumber: z.string().refine(value => {
//     return value.trim() === "" || /^[0-9]{12}$/.test(value);
//   }, {
//     message: "New NIC must Invalid",
//   }).optional(),
//   passport: z.string().optional(),
//   firstName: z.string().min(1, "Please enter first name."),
//   lastName: z.string().min(1, "Please ente last name."),
//   addressLine1: z.string(),
//   addressLine2: z.string(),
//   addressLine3: z.string(),
//   city: z.string(),
//   country: z.string(),
//   accountNumber: z.string().refine(value => {
//     return value.trim() === "" || /^\d{11}$/.test(value);
//   }, {
//     message: "Account number must be 11 digits.",
//   }).optional(),
//   reason: z.string().min(1, "Please enter reason for enhancement."),
//   cardNumber: z.string()
//     .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits.")
//     .min(1, "Please enter card number."),
//   presentLimit: z
//     .string()
//     .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
//     .nonempty("Currency iPlease add present limit."),
//   requestedLimit: z
//     .string()
//     .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add requested limit.")
//     .nonempty("Please add requested limit."),
//   cribAttached: z.boolean().refine(value => value === true || value === false, {
//       message: "Crib is required",
//     }),
//   title: z
//     .object({ id: z.number(), name: z.string() })
//     .nullable()
//     .refine((val) => val !== null, {
//       message: "Please select title",
//     }),
//   cardType: z
//     .object({ id: z.number(), name: z.string() })
//     .nullable()
//     .refine((val) => val !== null, {
//       message: "Please select card type",
//     }),
//   upgradeRequire: z.boolean().refine(value => value === true || value ===false, {
//       message: "Upgrade is required",
//   }),
//   upgradeTo: z
//     .nullable(z.object({
//       id: z.number(),
//       name: z.string(),
//     }))
//     .optional(),
//   enhancementType: z
//     .object({ id: z.number(), name: z.string() })
//     .nullable()
//     .refine((val) => val !== null, {
//       message: "Please select enhancement type",
//     }),
//   requestedMode: z
//     .object({ id: z.number(), name: z.string() })
//     .nullable()
//     .refine((val) => val !== null, {
//       message: "Please select requested mode",
//     }),
// }).refine(data => {
//   const { oldNicNumber, newNicNumber, passport } = data;
//   return (oldNicNumber && oldNicNumber.length > 0) ||
//          (newNicNumber && newNicNumber.length > 0) ||
//          (passport && passport.length > 0);
// }, {
//   message: "Please enter at least one of old nic, new nic, or passport.",
//   path: ["oldNicNumber"],
// }).refine((value) => {
//   return value.upgradeRequire === true ? Boolean(value.upgradeTo) : true
// }, {
//   message: 'Please select upgrade type if upgrade required.',
//   path: ["upgradeTo"],
// })
// .refine((value) => {
//   return parseFloat((value.requestedLimit).replace(/[^0-9.]/g, '')) > parseFloat((value.presentLimit).replace(/[^0-9.]/g, ''))
// }, {
//   message: 'Requested Limit must be higher than present limit',
//   path: ["requestedLimit"],
// });

type UserFormProps = {
  task: TaskDetailInfo;
  cliProcessData: CliInfo | null;
  editable: boolean;
};

const UserForm: FC<UserFormProps> = (props) => {
  const { task, cliProcessData, editable } = props;

  //masters
  const [titleList, setTitleList] = useState<DropDownItem[]>([]);
  const [cardTypeList, setCardTypeList] = useState<DropDownItem[]>([]);
  const [upgradeCardTypeList, setupgradeCardTypeList] = useState<
    DropDownItem[]
  >([]);
  const [enhancementTypeList, setEnhancementTypeList] = useState<
    DropDownItem[]
  >([]);
  const [requestModesList, setRequestModesList] = useState<DropDownItem[]>([]);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
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

  const fetchMasterData = () => {
    fetchPersonalTitleMasterData();
    fetchCardTypeMasterData();
    fetchUpgradeCardTypeMasterData();
    fetchEnhancementTypeMasterData();
    fetchRequestModeMasterData();
  };

  const fetchPersonalTitleMasterData = async (): Promise<void> => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getPersonalTitles()
      );

      if (err) {
        throw new Error(
          `Error fetching personal titles: ${JSON.stringify(err)}`
        );
      }

      if (data !== null) {
        setTitleList(data);
        return Promise.resolve();
      }
    } catch (err) {
      console.error("Error fetching personal titles:", err);
    }
  };

  const fetchCardTypeMasterData = async (): Promise<void> => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCardTypes()
      );

      Logger.debug(
        "(Card Types) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setCardTypeList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUpgradeCardTypeMasterData = async (): Promise<void> => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getUpgradeCardTypes()
      );

      Logger.debug(
        "(Card Types) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setupgradeCardTypeList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEnhancementTypeMasterData = async (): Promise<void> => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getEnhancementTypes()
      );

      Logger.debug(
        "(Card Types) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setEnhancementTypeList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequestModeMasterData = async (): Promise<void> => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getRequestMode()
      );

      Logger.debug(
        "(Card Types) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setRequestModesList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMasterData();
  }, []);

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s+/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
  };

  const formatAccNumber = (value: string) => {
    return value.replace(/\s+/g, "").slice(0, 11).trim();
  };

  const formatCurrency = (value: String) => {
    if (!value) return value;
    let cleanedValue = value.replace(/[^0-9.]/g, "");
    if (cleanedValue.includes(".")) {
      const [integer, decimal] = cleanedValue.split(".");
      cleanedValue = `${integer}.${decimal.slice(0, 2)}`;
    }
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedValue}`;
  };

  const clearUpgradeType = () => {
    setValue("upgradeTo", null);
  };

  const test = (formData: FormType) => {
    alert("call2");
  };

  const findByList = (list: DropDownItem[], itemName: string) => {
    return list.find((item) => item.name == itemName);
  };

  const upgradeRequire = watch("upgradeRequire");

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
          setValue("upgradeRequire", cliProcessData.isUpgradeRequired);
          setValue("cribAttached", cliProcessData.isCribJustificationAttached);
        } catch (error) {
          console.error("Error setting form values:", error);
        }
      }
    };

    loadData();
  }, [cliProcessData]);

  useEffect(() => {
    if (titleList.length != 0 && cliProcessData != null) {
      const title = titleList.find(
        (item) => item.name === cliProcessData.title
      );
      setValue("title", title);
    }
  }, [titleList, cliProcessData]);

  useEffect(() => {
    if (cardTypeList.length != 0 && cliProcessData != null) {
      const cardType = cardTypeList.find(
        (item) => item.name === cliProcessData.cardType
      )!;
      setValue("cardType", cardType);

      const upgradeTo = cliProcessData.isUpgradeRequired
        ? cardTypeList.find((item) => item.name === cliProcessData.upgradeTo) ||
          null
        : null;
      setValue("upgradeTo", upgradeTo);
    }
  }, [cardTypeList, cliProcessData]);

  useEffect(() => {
    if (requestModesList.length != 0 && cliProcessData != null) {
      const requestedMode = requestModesList.find(
        (item) => item.name === cliProcessData.modeType
      )!;
      setValue("requestedMode", requestedMode);
    }
  }, [requestModesList, cliProcessData]);

  useEffect(() => {
    if (enhancementTypeList.length != 0 && cliProcessData != null) {
      const enhancementType = enhancementTypeList.find(
        (item) => item.name === cliProcessData.enhancementType
      )!;
      setValue("enhancementType", enhancementType);
    }
  }, [enhancementTypeList, cliProcessData]);

  return (
    // <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
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
          <Controller
            name="oldNicNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled={!editable}
                label="Old NIC"
                size="small"
                type="text"
                error={!!errors.oldNicNumber}
                helperText={errors?.oldNicNumber?.message}
              />
            )}
          />

          <Controller
            name="newNicNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled={!editable}
                label="New NIC"
                size="small"
                type="text"
                error={!!errors.newNicNumber}
                helperText={errors?.newNicNumber?.message}
              />
            )}
          />

          <Controller
            name="passport"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled={!editable}
                label="Passport"
                size="small"
                type="email"
                error={!!errors.passport}
                helperText={errors?.passport?.message}
              />
            )}
          />

          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={titleList}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                disabled={!editable}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Title"
                    required
                    disabled={!editable}
                    size="small"
                    error={!!errors.title}
                    helperText={errors?.title?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled={!editable}
                label="First Name"
                size="small"
                type="text"
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                disabled={!editable}
                label="Last Name"
                size="small"
                type="text"
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
              />
            )}
          />

          <Controller
            name="addressLine1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Address Line 1"
                size="small"
                type="text"
                error={!!errors.addressLine1}
                helperText={errors?.addressLine1?.message}
              />
            )}
          />

          <Controller
            name="addressLine2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Address Line 2"
                size="small"
                type="text"
                error={!!errors.addressLine2}
                helperText={errors?.addressLine2?.message}
              />
            )}
          />

          <Controller
            name="addressLine3"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Address Line 3"
                size="small"
                type="text"
                error={!!errors.city}
                helperText={errors?.city?.message}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="City"
                size="small"
                type="text"
                error={!!errors.city}
                helperText={errors?.city?.message}
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.country}
                helperText={errors?.country?.message}
              />
            )}
          />

          {/* <Controller
            name="accountNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Account Number"
                size="small"
                type="text"
                error={!!errors.accountNumber}
                helperText={errors?.accountNumber?.message}
              />
            )}
          />

          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Card Number"
                required
                size="small"
                type="text"
                error={!!errors.cardNumber}
                helperText={errors?.cardNumber?.message}
                onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
              />
            )}
          />

          <Controller
            name="presentLimit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Present Limit"
                required
                size="small"
                type="text"
                error={!!errors.presentLimit}
                helperText={errors?.presentLimit?.message}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: 'right' } },
                }}
              />
            )}
          />

          <Controller
            name="requestedLimit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Requested Limit"
                required
                size="small"
                type="text"
                error={!!errors.requestedLimit}
                helperText={errors?.requestedLimit?.message}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: 'right' } },
                }}
              />
            )}
          />

          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reason for Enhancement"
                required
                size="small"
                type="text"
                error={!!errors.reason}
                helperText={errors?.reason?.message}
              />
            )}
          />

          <Controller
            name="cardType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={cardTypeList}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Card Type"
                    required
                    size="small"
                    error={!!errors.cardType}
                    helperText={errors?.cardType?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />


          <Controller
            name="enhancementType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={enhancementTypeList}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enhancement Type"
                    required
                    size="small"
                    error={!!errors.enhancementType}
                    helperText={errors?.enhancementType?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          
          <Controller
            name="upgradeRequire"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                <Checkbox {...field} checked={field.value}
                onChange={(e) => {
                  if (!e.target.checked) {
                    setValue("upgradeTo", null);
                  }else{
                  }
                  field.onChange(e);
                }}
                />}
                label="Upgrade Required"
              />
            )}
          />

          <Controller
            name="upgradeTo"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={cardTypeList}
                disabled={!getValues("upgradeRequire")} 
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Upgrade To"
                    required
                    size="small"
                    error={!!errors.upgradeTo}
                    helperText={errors?.upgradeTo?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="requestedMode"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={requestModesList}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Requested Mode"
                    required
                    size="small"
                    error={!!errors.requestedMode}
                    helperText={errors?.requestedMode?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="cribAttached"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Crib Justification Attached"
              />
            )}
          /> */}
        </div>

        {/* <div className="flex justify-left my-6">
          <Button aria-label="Save" type="submit">
            <EdgeSvgIcon
              className="icon-size-12 cursor-pointer text-white mr-3"
              color="error"
            >
              feather:save
            </EdgeSvgIcon>
            Save
          </Button>
        </div> */}
        {/* </form> */}
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
        {/* <form onSubmit={handleSubmit(handleOnSubmit)} noValidate> */}
        <div
          className={`grid grid-cols-1 gap-9 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-1"
          } lg:grid-cols-2`}
        >
          {/* <Controller
            name="oldNicNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Old NIC"
                size="small"
                type="text"
                error={!!errors.oldNicNumber}
                helperText={errors?.oldNicNumber?.message}
              />
            )}
          />

          <Controller
            name="newNicNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="New NIC"
                size="small"
                type="text"
                error={!!errors.newNicNumber}
                helperText={errors?.newNicNumber?.message}
              />
            )}
          />

          <Controller
            name="passport"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Passport"
                size="small"
                type="email"
                error={!!errors.passport}
                helperText={errors?.passport?.message}
              />
            )}
          />

          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={titleList}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Title"
                    required
                    size="small"
                    error={!!errors.title}
                    helperText={errors?.title?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="First Name"
                size="small"
                type="text"
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Last Name"
                size="small"
                type="text"
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
              />
            )}
          />

          <Controller
            name="addressLine1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Line 1"
                size="small"
                type="text"
                error={!!errors.addressLine1}
                helperText={errors?.addressLine1?.message}
              />
            )}
          />

          <Controller
            name="addressLine2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Line 2"
                size="small"
                type="text"
                error={!!errors.addressLine2}
                helperText={errors?.addressLine2?.message}
              />
            )}
          />

          <Controller
            name="addressLine3"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Line 3"
                size="small"
                type="text"
                error={!!errors.city}
                helperText={errors?.city?.message}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                size="small"
                type="text"
                error={!!errors.city}
                helperText={errors?.city?.message}
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                size="small"
                type="text"
                error={!!errors.country}
                helperText={errors?.country?.message}
              />
            )}
          /> */}

          <Controller
            name="accountNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Account Number"
                size="small"
                type="text"
                // required
                error={!!errors.accountNumber}
                helperText={errors?.accountNumber?.message}
                onChange={(e) =>
                  field.onChange(formatAccNumber(e.target.value))
                }
              />
            )}
          />

          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Card Number"
                required
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.cardNumber}
                helperText={errors?.cardNumber?.message}
                onChange={(e) =>
                  field.onChange(formatCardNumber(e.target.value))
                }
              />
            )}
          />

          <Controller
            name="presentLimit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Present Limit"
                required
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.presentLimit}
                helperText={errors?.presentLimit?.message}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          <Controller
            name="requestedLimit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Requested Limit"
                required
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.requestedLimit}
                helperText={errors?.requestedLimit?.message}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reason for Enhancement"
                required
                disabled={!editable}
                size="small"
                type="text"
                error={!!errors.reason}
                helperText={errors?.reason?.message}
              />
            )}
          />

          <Controller
            name="cardType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={cardTypeList}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                disabled={!editable}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Card Type"
                    required
                    disabled={!editable}
                    size="small"
                    error={!!errors.cardType}
                    helperText={errors?.cardType?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="enhancementType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={enhancementTypeList}
                disabled={!editable}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enhancement Type"
                    required
                    disabled={!editable}
                    size="small"
                    error={!!errors.enhancementType}
                    helperText={errors?.enhancementType?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="upgradeRequire"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    disabled={!editable}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setValue("upgradeTo", null);
                      } else {
                      }
                      field.onChange(e);
                    }}
                  />
                }
                label="Upgrade Required"
              />
            )}
          />

          <Controller
            name="upgradeTo"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={upgradeCardTypeList}
                disabled={!editable || !upgradeRequire}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Upgrade To"
                    required
                    disabled={!editable}
                    size="small"
                    error={!!errors.upgradeTo}
                    helperText={errors?.upgradeTo?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="requestedMode"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={requestModesList}
                disabled={!editable}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Requested Mode"
                    required
                    disabled={!editable}
                    size="small"
                    error={!!errors.requestedMode}
                    helperText={errors?.requestedMode?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="cribAttached"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    disabled={!editable}
                  />
                }
                label="Crib Justification Attached"
              />
            )}
          />
        </div>
      </Paper>
    </div>
    // </form>
  );
};

export default memo(UserForm);
