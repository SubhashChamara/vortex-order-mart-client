import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Button, Checkbox, FormControlLabel, Paper, TextField } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "react-toastify";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../../@helpers/Logger";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import { Api } from "../../../../../../api/Api";
import { CardType } from "../../../../../core/types/CardType";
import { DropDownItem } from "../../../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../../../core/types/TaskDetailInfo";
import { EnhancementType } from "../../../../../core/types/creditlimitIincreaseProcess/EnhancementType";
import { CliInfo } from "../../../types/CliInfo";
import { CliRequest } from "../../../types/CliRequest";

type FormType = {
  oldNicNumber: string;
  newNicNumber: string;
  passport: string;
  title: DropDownItem|null;
  firstName:string;
  lastName:string;
  addressLine1:string;
  addressLine2:string;
  addressLine3:string;
  city:string;
  country:string;
  accountNumber:string;
  cardNumber:string;
  presentLimit: string;
  requestedLimit:string;
  reason:string;
  cardType:DropDownItem|null;
  upgradeRequire:boolean;
  enhancementType:DropDownItem|null;
  upgradeTo:DropDownItem|null;
  requestedMode:DropDownItem|null;
  cribAttached:boolean;
};

const defaultValues: FormType = {
  oldNicNumber: "",
  newNicNumber: "",
  passport: "",
  title: null,
  firstName:"",
  lastName:"",
  addressLine1:"",
  addressLine2:"",
  addressLine3:"",
  city:"",
  country:"",
  accountNumber:"",
  presentLimit: "",
  requestedLimit:"",
  cardNumber:"",
  reason:"",
  cardType:null,
  upgradeRequire:false,
  upgradeTo:null,
  enhancementType:null,
  requestedMode:null,
  cribAttached:false,
};

const schema = z.object({
  oldNicNumber: z.string().refine(value => {
    return value.trim() === "" || /^[0-9]{9}[vVxX]$/.test(value) || /^[0-9]{9}[XxVv]$/.test(value);
  }, {
    message: "Old NIC must Invalid",
  }).optional(),

  newNicNumber: z.string().refine(value => {
    return value.trim() === "" || /^[0-9]{12}$/.test(value);
  }, {
    message: "New NIC must Invalid",
  }).optional(),
  passport: z.string().optional(),
  firstName: z.string().min(1, "Please enter first name."),
  lastName: z.string().min(1, "Please ente last name."),
  addressLine1: z.string(),
  addressLine2: z.string(),
  addressLine3: z.string(),
  city: z.string(),
  country: z.string(),
  accountNumber: z.string().refine(value => {
    return value.trim() === "" || /^\d{11}$/.test(value);
  }, {
    message: "Account number must be 11 digits.",
  }).optional(),
  reason: z.string().min(1, "Please enter reason for enhancement."),
  cardNumber: z.string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits.")
    .min(1, "Please enter card number."),
  presentLimit: z
    .string()
    .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add present limit.")
    .nonempty("Currency iPlease add present limit."),
  requestedLimit: z
    .string()
    .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, "Please add requested limit.")
    .nonempty("Please add requested limit."),
  cribAttached: z.boolean().refine(value => value === true || value === false, {
      message: "Crib is required",
    }),
  title: z
    .object({ id: z.number(), name: z.string() })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select title",
    }),
  cardType: z
    .object({ id: z.number(), name: z.string() })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select card type",
    }),
  upgradeRequire: z.boolean().refine(value => value === true || value ===false, {
      message: "Upgrade is required",
  }),
  upgradeTo: z
    .nullable(z.object({
      id: z.number(),
      name: z.string(),
    }))
    .optional(),
  enhancementType: z
    .object({ id: z.number(), name: z.string() })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select enhancement type",
    }),
  requestedMode: z
    .object({ id: z.number(), name: z.string() })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select requested mode",
    }),
}).refine(data => {
  const { oldNicNumber, newNicNumber, passport } = data;
  return (oldNicNumber && oldNicNumber.length > 0) ||
         (newNicNumber && newNicNumber.length > 0) ||
         (passport && passport.length > 0);
}, {
  message: "Please enter at least one of old nic, new nic, or passport.",
  path: ["oldNicNumber"],
}).refine((value) => {
  return value.upgradeRequire === true ? Boolean(value.upgradeTo) : true
}, {
  message: 'Please select upgrade type if upgrade required.',
  path: ["upgradeTo"],
})
.refine((value) => {
  return parseFloat((value.requestedLimit).replace(/[^0-9.]/g, '')) > parseFloat((value.presentLimit).replace(/[^0-9.]/g, ''))
}, {
  message: 'Requested Limit must be higher than present limit',
  path: ["requestedLimit"],
});

type UserFormProps = {
  task: TaskDetailInfo;
  cliProcessData: CliInfo|null;
};

const UserForm: FC<UserFormProps> = (props) => {
  const {task,cliProcessData} = props;

//masters
  const [titleList, setTitleList] = useState<DropDownItem[]>([]);
  const [cardTypeList, setCardTypeList] = useState<DropDownItem[]>([]);
  const [upgradeCardTypeList, setupgradeCardTypeList] = useState<DropDownItem[]>([]);
  const [enhancementTypeList, setEnhancementTypeList] = useState<DropDownItem[]>([]);
  const [requestModesList, setRequestModesList] = useState<DropDownItem[]>([]);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, setError, setValue,watch,getValues} =
    useForm<FormType>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });
  const { errors } = formState;
      console.log(errors)
     console.log(watch())
     
  const fetchMasterData = () => {
    fetchPersonalTitleMasterData();
    fetchCardTypeMasterData();
    fetchUpgradeCardTypeMasterData();
    fetchEnhancementTypeMasterData();
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


  const handleOnSubmit = async (formData: FormType) => {
    console.log()
    const {
      oldNicNumber,
      newNicNumber,
      passport,
      title,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      country,
      accountNumber,
      presentLimit,
      requestedLimit,
      cardNumber,
      reason,
      cardType,
      upgradeRequire,
      upgradeTo,
      enhancementType,
      requestedMode,
      cribAttached,
    } = formData;
    
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }

    /**
     * set submit true to identify form submitted already
     * help to prevent multiple submissions
     */
    setIsSubmitted(true);

    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);

    if (title === null) {
      Logger.debug("Title cannot be null");
      setIsSubmitted(false);
      return;
    }
    if (cardType === null) {
      Logger.debug("Card Type cannot be null");
      setIsSubmitted(false);
      return;
    }
    if (upgradeRequire && upgradeTo === null) {
      Logger.debug("Upgrade To cannot be null");
      setIsSubmitted(false);
      return;
    }
    if (requestedMode === null) {
      Logger.debug("Request mode cannot be null");
      setIsSubmitted(false);
      return;
    }
    if (enhancementType === null) {
      Logger.debug("Enhancement Type cannot be null");
      setIsSubmitted(false);
      return;
    }
    console.log(requestedMode)
    const request: CliRequest = {
      processInstance:task.processInstanceId,
      oldNicNumber:oldNicNumber.trim()==""? null:oldNicNumber.trim() ,
      newNicNumber:newNicNumber.trim()==""? null:newNicNumber.trim(),
      passport:passport.trim()==""? null:passport.trim(),
      firstName,
      lastName,
      title:title.name,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      country,
      accountNumber,
      cardNumber:cardNumber.replace(/\s+/g, ''),
      presentLimit:parseFloat(presentLimit.replace(/[^0-9.]/g, '')),
      newLimit:parseFloat(requestedLimit.replace(/[^0-9.]/g, '')),
      reasonForEnhancement:reason,
      cardType:cardType.name,
      isUpgradeRequired:upgradeRequire,
      upgradeTo:upgradeRequire && upgradeTo? upgradeTo.name:null,
      enhancementType:enhancementType.name,
      modeType:requestedMode.name,
      isCribJustificationAttached:cribAttached,
    };

    console.log(request)

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.saveCliRequest(request)
    );

    if (err === null) {
      toast.success("Successfully Saved CLI Details");
      setIsSubmitted(false);
    } else {
      toast.error(err.msg);
      /**
       * set submit false to identify form submitted but failed
       * help to resubmit
       * and timeout prevent double clicks
       */
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };



  useEffect(() => {
    // handleFetchUserRoles();
    fetchMasterData();
  }, []);

  const formatCardNumber = (value:string) => {
    return value
      .replace(/\s+/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  };

  const formatCurrency = (value:string) => {
    if (!value) return value;
    let cleanedValue = value.replace(/[^0-9.]/g, '');
    if (cleanedValue.includes('.')) {
      const [integer, decimal] = cleanedValue.split('.');
      cleanedValue = `${integer}.${decimal.slice(0, 2)}`;
    }
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formattedValue}`;
  };

  const clearUpgradeType =()=>{
    setValue("upgradeTo",null);
  }

  const test =(formData: FormType)=>{
    alert('call2')
  }

  useEffect(() => {
    if (cliProcessData !== null) {
      const title:DropDownItem = titleList.find(title => title.name === cliProcessData.title)!;
      const cardType:DropDownItem = cardTypeList.find(card => card.name === cliProcessData.cardType)!;
      const enhancement:DropDownItem = enhancementTypeList.find(enhancement => enhancement.name === cliProcessData.enhancementType)!;
      const upgradeTo:DropDownItem|null = cliProcessData.isUpgradeRequired? cardTypeList.find(card => card.name === cliProcessData.upgradeTo)!:null;
      const modeType:DropDownItem = requestModesList.find(card => card.name === cliProcessData.modeType)!;
      setValue("oldNicNumber", cliProcessData.oldNicNumber?cliProcessData.oldNicNumber:"");
      setValue("newNicNumber", cliProcessData.newNicNumber?cliProcessData.newNicNumber:"");
      setValue("passport", cliProcessData.passport?cliProcessData.passport:"");
      // setValue("title", cliProcessData.title);
      setValue("title", title );
      setValue("firstName", cliProcessData.firstName);
      setValue("lastName", cliProcessData.lastName);
      setValue("addressLine1", cliProcessData.addressLine1);
      setValue("addressLine2", cliProcessData.addressLine2);
      setValue("addressLine3", cliProcessData.addressLine3);
      setValue("city", cliProcessData.city);
      setValue("country", cliProcessData.country);
      setValue("accountNumber", cliProcessData.accountNumber);
      setValue("cardNumber", formatCardNumber(cliProcessData.cardNumber));
      setValue("presentLimit", formatCurrency((String)(cliProcessData.presentLimit)));
      setValue("requestedLimit", formatCurrency((String)(cliProcessData.newLimit)));
      setValue("reason", cliProcessData.reasonForEnhancement);
      setValue("cardType", cardType);
      setValue("enhancementType", enhancement);
      setValue("upgradeRequire", cliProcessData.isUpgradeRequired);
      setValue("upgradeTo", upgradeTo);
      setValue("requestedMode", modeType);
      setValue("cribAttached", cliProcessData.isCribJustificationAttached);
    }
  }, [cliProcessData]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" >
      
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
          <div>Customer Deatails</div>
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
        <div className="flex items-center " >
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
                options={upgradeCardTypeList}
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
          />
        </div>
    </Paper>
    </div>
    <div className="flex justify-left my-6">
          <Button aria-label="Save" type="submit">
            <EdgeSvgIcon
              className="icon-size-12 cursor-pointer text-white mr-3"
              color="error"
            >
              feather:save
            </EdgeSvgIcon>
            Save
          </Button>
    </div>
    </form>
  );
};

export default memo(UserForm);
