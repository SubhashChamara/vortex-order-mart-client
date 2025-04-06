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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type UnderWriterFormProps = {
  task: TaskDetailInfo;
  cliProcessData: CliInfo | null;
  editable?: boolean;
};

const UnderWriterForm: FC<UnderWriterFormProps> = (props) => {
  const { task, cliProcessData, editable = true } = props;

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

  const [categoryTypes, setCategoryTypes] = useState<DropDownItem[]>([]);
  const [evaluatedOnTypes, setEvaluatedOnTypes] = useState<DropDownItem[]>([]);
  const [approvedLevelList, setApprovedLevelList] = useState<DropDownItem[]>(
    []
  );

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  // const titleList:Title[]=[
  //   {
  //     id:'Mr',
  //     name:'Mr'
  //   },
  //   {
  //     id:'Ms.',
  //     name:'Ms.'
  //   },
  //   {
  //     id:'Mrs.',
  //     name:'Mrs.'
  //   },
  // ]

  // const cardTypeList:CardType[]=[
  //   {
  //     id:'mastersilver',
  //     name:'Master Silver'
  //   },
  //   {
  //     id:'platinum',
  //     name:'Platinum'
  //   },
  //   {
  //     id:'gold',
  //     name:'Gold'
  //   },
  // ]

  // const enhancementTypeList:EnhancementType[]=[
  //   {
  //     id:'permanent',
  //     name:'Permananet'
  //   },
  //   {
  //     id:'temporaly',
  //     name:'Temporaly'
  //   },
  //   {
  //     id:'gold',
  //     name:'Gold'
  //   },
  // ]

  // const requestModesList:DropDownItem[]=[
  //   {
  //     id:'email',
  //     name:'Email'
  //   },
  //   {
  //     id:'call',
  //     name:'Call'
  //   },
  //   {
  //     id:'web',
  //     name:'Web Site'
  //   },
  // ]

  const fetchMasterData = () => {
    fetchPersonalTitleMasterData();
    fetchCardTypeMasterData();
    fetchUpgradeCardTypeMasterData();
    fetchEnhancementTypeMasterData();
    fetchCatedoryTypeData();
    fetchEvaluatedOnMasterData();
    fetchApprovedLevelMasterData();

    fetchRequestModeMasterData();
  };

  const fetchPersonalTitleMasterData = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getPersonalTitles()
      );

      Logger.debug(
        "(Personal Titles) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setTitleList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequestModeMasterData = async () => {
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

  const fetchCatedoryTypeData = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getCagegoryItems()
      );

      Logger.debug(
        "(Category Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setCategoryTypes(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEvaluatedOnMasterData = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getEvaluatedTypes()
      );

      Logger.debug(
        "(Evaluated On Items) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setEvaluatedOnTypes(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApprovedLevelMasterData = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getApprovedLevel()
      );

      Logger.debug(
        "(Approved Level Data) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setApprovedLevelList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCardTypeMasterData = async () => {
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

  const fetchUpgradeCardTypeMasterData = async () => {
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

  const fetchEnhancementTypeMasterData = async () => {
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

  // const fetchRequestModeMasterData = async () => {
  //   try {
  //     const { data, err } = await Api.performRequest((r) =>
  //       r.creditCard.getRequestMode()
  //     );

  //     Logger.debug(
  //       "(Card Types) => { DATA: " +
  //         JSON.stringify(data) +
  //         " , ERROR: " +
  //         JSON.stringify(err)
  //     );

  //     if (data !== null) {
  //       setRequestModesList(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
  // console.log(errors);
  // console.log(watch());
  // const { control, handleSubmit, formState, setError, setValue,watch,getValues} =
  //   useForm<FormType>({
  //     mode: "onChange",
  //     defaultValues,
  //     resolver: zodResolver(schema),
  //   });
  // const { errors } = formState;
  //     console.log(errors)
  //    console.log(watch())
  // const handleFetchUserRoles = async () => {
  //   try {
  //     const { data, err } = await Api.performRequest((r) =>
  //       r.admin.userRoleInfoList()
  //     );

  //     Logger.debug(
  //       "(User Role) => { DATA: " +
  //         JSON.stringify(data) +
  //         " , ERROR: " +
  //         JSON.stringify(err)
  //     );

  //     if (data !== null) {
  //       setRoleList(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleOnSubmit = async (formData: FormType) => {
  //   const {
  //     oldNicNumber,
  //     newNicNumber,
  //     passport,
  //     title,
  //     firstName,
  //     lastName,
  //     addressLine1,
  //     addressLine2,
  //     addressLine3,
  //     city,
  //     country,
  //     accountNumber,
  //     presentLimit,
  //     requestedLimit,
  //     cardNumber,
  //     reason,
  //     cardType,
  //     upgradeRequire,
  //     upgradeTo,
  //     enhancementType,
  //     requestedMode,
  //     cribJustificationAttached,
  //     cribAttached,
  //   } = formData;

  //   if (isSubmitted) {
  //     Logger.debug("Form Already Submitted");
  //     return;
  //   }

  //   /**
  //    * set submit true to identify form submitted already
  //    * help to prevent multiple submissions
  //    */
  //   setIsSubmitted(true);

  //   Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);

  //   if (title === null) {
  //     Logger.debug("Title cannot be null");
  //     setIsSubmitted(false);
  //     return;
  //   }
  //   if (cardType === null) {
  //     Logger.debug("Card Type cannot be null");
  //     setIsSubmitted(false);
  //     return;
  //   }
  //   if (upgradeRequire && upgradeTo === null) {
  //     Logger.debug("Upgrade To cannot be null");
  //     setIsSubmitted(false);
  //     return;
  //   }
  //   if (requestedMode === null) {
  //     Logger.debug("Request mode cannot be null");
  //     setIsSubmitted(false);
  //     return;
  //   }
  //   if (enhancementType === null) {
  //     Logger.debug("Enhancement Type cannot be null");
  //     setIsSubmitted(false);
  //     return;
  //   }
  //   console.log(requestedMode)
  //   const request: CliRequest = {
  //     processInstance:task.processInstanceId,
  //     oldNicNumber,
  //     newNicNumber,
  //     passport,
  //     firstName,
  //     lastName,
  //     title:title.name,
  //     addressLine1,
  //     addressLine2,
  //     addressLine3,
  //     city,
  //     country,
  //     accountNumber,
  //     cardNumber:cardNumber.replace(/\s+/g, ''),
  //     presentLimit:parseFloat(presentLimit.replace(/[^0-9.]/g, '')),
  //     newLimit:parseFloat(requestedLimit.replace(/[^0-9.]/g, '')),
  //     reasonForEnhancement:reason,
  //     cardType:cardType.name,
  //     isUpgradeRequired:upgradeRequire,
  //     upgradeTo:upgradeRequire && upgradeTo? upgradeTo.name:null,
  //     enhancementType:enhancementType.name,
  //     modeType:requestedMode.name,
  //     isCribJustificationAttached:cribJustificationAttached,
  //   };

  //   console.log(request)

  //   const { data, err } = await Api.performRequest((r) =>
  //     r.creditCard.saveCliRequest(request)
  //   );

  //   if (err === null) {
  //     toast.success("Successfully Saved CLI Details");
  //     setIsSubmitted(false);
  //   } else {
  //     toast.error(err.msg);
  //     /**
  //      * set submit false to identify form submitted but failed
  //      * help to resubmit
  //      * and timeout prevent double clicks
  //      */
  //     setTimeout(() => setIsSubmitted(false), 3000);
  //   }
  // };

  useEffect(() => {
    fetchMasterData();
  }, []);

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s+/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
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

  // const clearUpgradeType =()=>{
  //   setValue("upgradeTo",null);
  // }

  // useEffect(() => {
  //   if (user !== null) {
  //     setValue("firstName", user.firstName);
  //     setValue("lastName", user.lastName);
  //     setValue("username", user.username);
  //     setValue("email", user.email);
  //     setValue("userRole", user.userRole);
  //     setValue("contactNo", user.telephone);
  //     setValue("designation", user.designation);
  //   }
  // }, [user]);

  // const test =(formData: FormType)=>{
  //   alert('call2')
  // }
  // console.log(watch("enhancementTypeUW"));
  useEffect(() => {
    if (cliProcessData != null) {
      // setValue("enhancementTypeUW", enhancementTypeUW, {
      //   shouldValidate: true,
      //   shouldDirty: true,
      // });
      setValue(
        "enhancementFee",
        formatCurrency(String(cliProcessData.enhancementFee))
      );
      // setValue("category", category ? category : null);
      setValue(
        "grossIncome",
        formatCurrency(String(cliProcessData.grossIncome))
      );
      // setValue("evaluatedOn", evaluatedOn ? evaluatedOn : null);
      setValue(
        "approvedLimit",
        formatCurrency(String(cliProcessData.approvedLimit))
      );
      // setValue("newCardTypeUW", newCardTypeUW ? newCardTypeUW : null);
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
      // setValue("approvedLevel", approvedLevel ? approvedLevel : null);
      setValue("cap", formatCurrency(String(cliProcessData.cap)));
      setValue(
        "isGenerateLetter",
        cliProcessData.isGenerateLetter
          ? cliProcessData.isGenerateLetter
          : false
      );
    }
  }, [cliProcessData]);

  useEffect(() => {
    if (enhancementTypeList.length != 0 && cliProcessData != null) {
      const enhancementTypeUW: DropDownItem = enhancementTypeList.find(
        (item) => item.name === cliProcessData.enhancementTypeUW
      )!;
      setValue("enhancementTypeUW", enhancementTypeUW);
    }
  }, [enhancementTypeList, cliProcessData]);

  useEffect(() => {
    if (categoryTypes.length != 0 && cliProcessData != null) {
      const category: DropDownItem = categoryTypes.find(
        (item) => item.name === cliProcessData.category
      )!;
      setValue("category", category);
    }
  }, [categoryTypes, cliProcessData]);

  useEffect(() => {
    if (evaluatedOnTypes.length != 0 && cliProcessData != null) {
      const evaluatedOn: DropDownItem = evaluatedOnTypes.find(
        (item) => item.name === cliProcessData.evaluatedOn
      )!;
      setValue("evaluatedOn", evaluatedOn);
    }
  }, [evaluatedOnTypes, cliProcessData]);

  useEffect(() => {
    if (evaluatedOnTypes.length != 0 && cliProcessData != null) {
      const evaluatedOn: DropDownItem = evaluatedOnTypes.find(
        (item) => item.name === cliProcessData.evaluatedOn
      )!;
      setValue("evaluatedOn", evaluatedOn);
    }
  }, [evaluatedOnTypes, cliProcessData]);

  useEffect(() => {
    if (cardTypeList.length != 0 && cliProcessData != null) {
      const cardType: DropDownItem = cardTypeList.find(
        (item) => item.name === cliProcessData.cardType
      )!;
      setValue("cardType", cardType);
    }
  }, [cardTypeList, cliProcessData]);

  useEffect(() => {
    if (upgradeCardTypeList.length != 0 && cliProcessData != null) {
      const newCardTypeUW: DropDownItem = upgradeCardTypeList.find(
        (item) => item.name === cliProcessData.newCardTypeUW
      )!;
      setValue("newCardTypeUW", newCardTypeUW);
    }
  }, [upgradeCardTypeList, cliProcessData]);

  useEffect(() => {
    if (approvedLevelList.length != 0 && cliProcessData != null) {
      const approvedLevel: DropDownItem = approvedLevelList.find(
        (item) => item.name === cliProcessData.approvedLevel
      )!;
      setValue("approvedLevel", approvedLevel);
    }
  }, [approvedLevelList, cliProcessData]);

  return (
    <div>
      <Paper>
        <div className="px-12 pb-10 mt-16">
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
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={enhancementTypeList}
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
                      label="Enhancement Type"
                      required
                      size="small"
                      error={!!errors.enhancementTypeUW}
                      helperText={errors?.enhancementTypeUW?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              )}
            />

            <Controller
              name="enhancementFee"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Enhancement Fee"
                  required
                  disabled={!editable}
                  size="small"
                  type="text"
                  error={!!errors.enhancementFee}
                  helperText={errors?.enhancementFee?.message}
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
                  InputProps={{
                    inputProps: { style: { textAlign: "right" } },
                  }}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={categoryTypes}
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
                      label="Category"
                      size="small"
                      error={!!errors.category}
                      helperText={errors?.category?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
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
                  helperText={errors?.grossIncome?.message}
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
                  InputProps={{
                    inputProps: { style: { textAlign: "right" } },
                  }}
                />
              )}
            />

            <Controller
              name="evaluatedOn"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={evaluatedOnTypes}
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
                      label="Evalutated On"
                      size="small"
                      error={!!errors.evaluatedOn}
                      helperText={errors?.evaluatedOn?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
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
                  helperText={errors?.approvedLimit?.message}
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
                  InputProps={{
                    inputProps: { style: { textAlign: "right" } },
                  }}
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
                  disabled={true}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Exist Card Type"
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
              name="newCardTypeUW"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={upgradeCardTypeList}
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
                      label="New Card Type"
                      size="small"
                      error={!!errors.newCardTypeUW}
                      helperText={errors?.newCardTypeUW?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
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
                  helperText={errors?.dbr?.message}
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
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
                  helperText={errors?.mueOnUs?.message}
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
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
                  helperText={errors?.mueOffUs?.message}
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
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
                    // error={!!errors.tmpStartDate}
                    // helperText={errors?.tmpStartDate?.message}
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
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={approvedLevelList}
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
                      label="Approved Level"
                      size="small"
                      error={!!errors.approvedLevel}
                      helperText={errors?.approvedLevel?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
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
                  helperText={errors?.cap?.message}
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
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
                      checked={field.value}
                      disabled={!editable}
                    />
                  }
                  label="Generate Letter"
                />
              )}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default memo(UnderWriterForm);
