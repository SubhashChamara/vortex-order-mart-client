import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { Controller, useForm } from "react-hook-form";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Api } from "../../../../../api/Api";
import {
  DropDownItem,
  DropDownItemCribPull,
} from "../../../../core/types/DropDown";
import Logger from "../../../../../@helpers/Logger";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { CribPullHeader } from "../../@types/CribPullHeader";
import { CribPullRequest } from "../../@types/CribPullRequest";
import { CribPullManualEntry } from "../../@types/CribPullManualEntry";
import { toast } from "react-toastify";
import { CribPullProcess } from "../../@types/CribPullTable";
import { NicDetails } from "../../../../core/types/NicDetails";

export interface DataEntryMethod {
  id: string;
  name: string;
}

export interface LeadType {
  id: string;
  name: string;
}

export interface CribPullUserDetailsFormProps {
  selectedUploadMethod: DropDownItemCribPull | null;
  setSelectedUploadMethod: (method: DropDownItemCribPull | null) => void;
  selectedInitiatingUnit: DropDownItemCribPull | null;
  setSelectedInitiatingUnit: (method: DropDownItemCribPull | null) => void;
  isSubmitted: boolean;
  setIsSubmitted: (val: boolean) => void;
  task: TaskDetailInfo;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  setSelectedItemForEdit: (item: CribPullProcess | null) => void;
  selectedItemForEdit: CribPullProcess | null;
  refreshTable: boolean;
  setRefreshTable: (val: boolean) => void;
}

const schema = z
  .object({
    clientName: z.string().min(1, "Customer name is mandatory."),
    clientEmail: z
      .string()
      .optional()
      .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Invalid email address",
      }),
    citizenship: z
      .object({
        name: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, {
        message: "Citizenship is Required",
      }),
    nic: z
      .string()
      .refine(
        (value) => {
          return (
            value.trim() === "" ||
            /^[0-9]{9}[vVxX]$/.test(value) ||
            /^[0-9]{9}[XxVv]$/.test(value)
          );
        },
        {
          message: "Old NIC must be Valid",
        }
      )
      .optional(),
    passport: z.string().optional(),
    eic: z
      .string()
      .refine(
        (value) => {
          return value.trim() === "" || /^[0-9]{12}$/.test(value);
        },
        {
          message: "New NIC must be Valid",
        }
      )
      .optional(),
    gender: z
      .object({
        name: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, {
        message: "Gender is Required",
      }),
    dateOfBirth: z
      .instanceof(Date, {
        message: "Invalid Date",
      })
      .refine((date) => !isNaN(date.getTime()), {
        message: "Date of Birth is required",
      })
      .refine((date) => date <= new Date(), {
        message: "Date of Birth must be in the past",
      }),
    cribExtractPurpose: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, {
        message: "CRIB Extract Purpose is required",
      }),
    creditFacilityType: z
      .object({
        name: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, {
        message: "Gender is Required",
      }),
    creditFacilityAmount: z.string().refine(
      (value) => {
        const cleanedValue = value.replace(/[^0-9.]/g, ""); // Remove commas and validate as a number
        return !isNaN(Number(cleanedValue)) && Number(cleanedValue) > 0;
      },
      {
        message: "Credit Facility Amount is Mandatory",
      }
    ),
    employerName: z.string().optional(),
  })
  .refine(
    (data) => {
      const { nic, eic, passport } = data;
      return (
        (nic && nic.length > 0) ||
        (eic && eic.length > 0) ||
        (passport && passport.length > 0)
      );
    },
    {
      message: "Please enter at least one of old nic, new nic, or passport.",
      path: ["oldNicNumber"],
    }
  );

type FormType = {
  clientName: string;
  clientEmail: string;
  citizenship: DropDownItemCribPull | null;
  passport: string;
  nic: string;
  eic: string;
  gender: DropDownItemCribPull | null;
  dateOfBirth: Dayjs | null;
  cribExtractPurpose: DropDownItem | null;
  creditFacilityType: DropDownItemCribPull | null;
  creditFacilityAmount: string;
  employerName: string;
};

const defaultValues: FormType = {
  clientName: "",
  clientEmail: "",
  citizenship: null,
  passport: "",
  nic: "",
  eic: "",
  gender: null,
  dateOfBirth: null,
  cribExtractPurpose: null,
  creditFacilityType: null,
  creditFacilityAmount: "",
  employerName: "",
};

const CribPullUserDetailsForm: React.FC<CribPullUserDetailsFormProps> = ({
  selectedUploadMethod,
  selectedInitiatingUnit,
  isSubmitted,
  setIsSubmitted,
  setIsLoading,
  task,
  setSelectedItemForEdit,
  selectedItemForEdit,
  refreshTable,
  setRefreshTable,
}) => {
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [citizenshipTypes, setCitizenshipTypes] = useState<
    DropDownItemCribPull[]
  >([]);
  const [genders, setGenders] = useState<DropDownItemCribPull[]>([]);
  const [SelectedCitizenship, setSelectedCitizenship] =
    useState<DropDownItemCribPull | null>(null);
  const [cribExtractReasons, setCribExtractReasons] = useState<DropDownItem[]>(
    []
  );
  const [creditFacilityTypes, setCreditFacilityTypes] = useState<
    DropDownItemCribPull[]
  >([]);

  const [nicDetails, setNicDetails] = useState<NicDetails | null>(null);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { control, formState, setValue, handleSubmit, reset } = methods;

  const { errors } = formState;

  const formatCurrency = (value: string) => {
    if (!value) return value;
    let cleanedValue = value.replace(/[^0-9.]/g, "");

    if (cleanedValue.includes(".")) {
      const [integer, decimal] = cleanedValue.split(".");
      cleanedValue = `${integer}.${decimal.slice(0, 2)}`;
    }

    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue;
  };

  // OnSubmit Method
  const handleOnSubmit = async (formData: FormType) => {
    const {
      clientName,
      citizenship,
      nic,
      passport,
      eic,
      gender,
      dateOfBirth,
      cribExtractPurpose,
      creditFacilityType,
      creditFacilityAmount,
      clientEmail,
      employerName,
    } = formData;

    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }

    if (
      !selectedInitiatingUnit?.name ||
      selectedInitiatingUnit?.name.trim() === ""
    ) {
      toast.error("Unit Initiating is required.");
      return; // Prevent form submission if unitInitiating is empty
    }

    setIsSubmitted(true);

    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);

    const cribPullHeader: CribPullHeader = {
      processInstance: task.processInstanceId,
      cribPullMethod: selectedUploadMethod?.name || "Data Entry",
      unitInitiating: selectedInitiatingUnit?.name || "",
    };

    const cribPullRequest: CribPullRequest = {
      id: selectedItemForEdit ? selectedItemForEdit.id : null,
      clientName: clientName,
      citizenship: citizenship?.name || "",
      nic: nic.trim() == "" ? null : nic.trim(),
      eic: eic.trim() == "" ? null : eic.trim(),
      gender: gender?.name || "",
      dateOfBirth: dateOfBirth,
      creditFacilityType: creditFacilityType?.name || "",
      amount: parseFloat(creditFacilityAmount?.replace(/[^0-9.]/g, "")),
      clientEmail: clientEmail,
      employerName: employerName,
      passportNo: passport.trim() == "" ? null : passport.trim(),
      reason: "",
      purpose: cribExtractPurpose?.name || "",
    };

    const newObj: CribPullManualEntry = { cribPullHeader, cribPullRequest };

    if (selectedItemForEdit) {
      try {
        setIsLoading(true);
        const { data, err } = await Api.performRequest((r) =>
          r.cribPull.updateCribDataEntry(newObj)
        );
        if (err === null) {
          toast.success("Successfully Updated User Record");
          setIsSubmitted(false);
        } else {
          toast.error(err.msg);
          setTimeout(() => setIsSubmitted(false), 3000);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setSelectedItemForEdit(null);
        setRefreshTable(!refreshTable);
        reset();
      }
    } else {
      try {
        setIsLoading(true);
        const { data, err } = await Api.performRequest((r) =>
          r.cribPull.saveCribDataEntry(newObj)
        );

        if (err === null) {
          toast.success("Successfully Added User Record");
          setIsSubmitted(false);
        } else {
          toast.error(err.msg);
          setTimeout(() => setIsSubmitted(false), 3000);
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
        setIsSubmitted(false);
      } finally {
        setRefreshTable(!refreshTable);
        reset();
      }
    }
  };

  const fetchCitizenshipTypes = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullDropDownData("citizenship")
      );

      Logger.debug(
        "(Crib Pull Methods) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );

      if (data != null) {
        setCitizenshipTypes(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGenders = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullDropDownData("gender")
      );

      Logger.debug(
        "(Crib Pull Methods) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );

      if (data != null) {
        setGenders(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCribExtractReasons = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullDropDownData("extraction-purpose")
      );

      Logger.debug(
        "(Crib Pull Methods) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );

      if (data != null) {
        setCribExtractReasons(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCreditFacilityTypes = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullDropDownData("credit-facility-type")
      );

      Logger.debug(
        "(Crib Pull Methods) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );

      if (data != null) {
        setCreditFacilityTypes(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //fetch nic details for the given nic
  const fetchNicDetails = async (nic: string) => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getNicDetails(nic)
      );
      Logger.debug(
        "(Nic Details) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );
      if (data != null) {
        setNicDetails(data);
        setValue("eic", data?.eic ? data.eic : "");
        setValue(
          "dateOfBirth",
          dayjs(data?.birthDay?.toString().slice(0, 10)).toDate()
        );

        setValue("gender", data?.gender ? {
          name: data?.gender,
          value: data?.gender,
        } as DropDownItemCribPull : null);
      } else {
        setValue("dateOfBirth", null);
        setValue("gender", null);
        setValue("eic", "");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEicDetails = async (nic: string) => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getNicDetails(nic)
      );
      Logger.debug(
        "(Eic Details) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );
      if (data != null) {
        setNicDetails(data);
        setValue(
          "dateOfBirth",
          dayjs(data?.birthDay?.toString().slice(0, 10)).toDate()
        );
        setValue("gender", {
          name: data?.gender,
          value: data?.gender,
        } as DropDownItemCribPull);
      } else {
        setValue("dateOfBirth", null);
        setValue("gender", null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedItemForEdit) {
      setValue("clientName", selectedItemForEdit.clientName);
      setValue(
        "citizenship",
        citizenshipTypes.find(
          (item) => item.name === selectedItemForEdit.citizenship
        ) || null
      );
      setSelectedCitizenship(
        citizenshipTypes.find(
          (item) => item.name === selectedItemForEdit.citizenship
        ) || null
      );
      if (selectedItemForEdit.citizenship === "Non Citizen") {
        setValue("passport", selectedItemForEdit.passportNo || "");
      } else {
        {
          selectedItemForEdit.nic &&
            setValue("nic", selectedItemForEdit.nic || "");
        }
        {
          selectedItemForEdit.eic &&
            setValue("eic", selectedItemForEdit.eic || nicDetails?.eic || "");
        }
      }
      // setValue(
      //   "dateOfBirth",
      //   dayjs(selectedItemForEdit.dateOfBirth).endOf("day").toDate()
      // );
      setValue(
        "dateOfBirth",
        dayjs(selectedItemForEdit.dateOfBirth).endOf("day").toDate() ||
        nicDetails?.birthDay
      );
      setValue(
        "gender",
        genders.find((item) => item.name === selectedItemForEdit.gender) ||
        ({
          name: nicDetails?.gender,
          value: nicDetails?.gender,
        } as DropDownItemCribPull) ||
        null
      );
      setValue(
        "cribExtractPurpose",
        cribExtractReasons.find(
          (item) => item.name === selectedItemForEdit.purpose
        ) || null
      );
      setValue(
        "creditFacilityType",
        creditFacilityTypes.find(
          (item) => item.name === selectedItemForEdit.creditFacilityType
        ) || null
      );
      setValue(
        "creditFacilityAmount",
        formatCurrency(selectedItemForEdit.amount.toString())
      );
      setValue("clientEmail", selectedItemForEdit.clientEmail);
      setValue("employerName", selectedItemForEdit.employerName);
    }
  }, [selectedItemForEdit, citizenshipTypes]);

  useEffect(() => {
    fetchCitizenshipTypes();
    fetchGenders();
    fetchCreditFacilityTypes();
    fetchCribExtractReasons();
  }, []);

  useEffect(() => {
    console.log("Form errors:", errors);
  }, [errors]);

  return (
    <Paper className="px-12">
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex items-center text-blue-gray-800">
          <div>
            <EdgeSvgIcon
              className="icon-size-18 cursor-pointer mr-3"
              color="error"
            >
              feather:user-check
            </EdgeSvgIcon>
          </div>
          <div>User Details Form</div>
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div
          className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-1"
            } lg:grid-cols-2`}
        >
          <Controller
            name="clientName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Customer Name"
                size="small"
                type="text"
                error={!!errors.clientName}
                helperText={errors?.clientName?.message}
              />
            )}
          />

          <Controller
            name="citizenship"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={citizenshipTypes}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.name === val.name}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                  setSelectedCitizenship(newValue);
                  setValue("passport", "");
                  setValue("nic", "");
                  setValue("eic", "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Citizenship"
                    required
                    size="small"
                    error={!!errors.citizenship}
                    helperText={errors?.citizenship?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          {SelectedCitizenship?.name === "Sri Lankan" ? (
            <>
              <Controller
                name="nic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Old NIC Number"
                    size="small"
                    type="text"
                    error={!!errors.nic}
                    onBlur={(e) => {
                      fetchNicDetails(e.target.value);
                    }}
                    onFocus={(e) => {
                      fetchNicDetails(e.target.value);
                    }}
                    helperText={errors?.nic?.message}
                  />
                )}
              />
              <Controller
                name="eic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="New NIC Number"
                    size="small"
                    type="text"
                    onBlur={(e) => fetchEicDetails(e.target.value)}
                    onFocus={(e) => fetchEicDetails(e.target.value)}
                    error={!!errors.eic}
                    helperText={errors?.eic?.message}
                  />
                )}
              />
            </>
          ) : (
            <Controller
              name="passport"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  label="Passport"
                  size="small"
                  type="text"
                  error={!!errors.passport}
                  helperText={errors?.passport?.message}
                />
              )}
            />
          )}

          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={SelectedCitizenship?.name === "Sri Lankan"}
                options={genders}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.name === val.name}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Gender"
                    required
                    size="small"
                    error={!!errors.gender}
                    helperText={errors?.gender?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={SelectedCitizenship?.name === "Sri Lankan"}
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value) : null}
                  label="Date of Birth"
                  onChange={(newValue) => {
                    const dateOnly = newValue
                      ? dayjs(newValue).endOf("day").toDate()
                      : null;
                    onChange(dateOnly);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.dateOfBirth,
                      helperText: <>{errors?.dateOfBirth?.message}</>,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="cribExtractPurpose"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={cribExtractReasons}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.name === val.name}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Purpose of CRIB Extraction"
                    required
                    size="small"
                    error={!!errors.creditFacilityType}
                    helperText={errors?.creditFacilityType?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="creditFacilityType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={creditFacilityTypes}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.name === val.name}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Credit Facility Type"
                    required
                    size="small"
                    error={!!errors.creditFacilityType}
                    helperText={errors?.creditFacilityType?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />

          <Controller
            name="creditFacilityAmount"
            control={control}
            render={({ field: { onChange, value, ...restField } }) => (
              <TextField
                {...restField}
                value={formatCurrency(value)}
                required
                label="Credit Facility Amount"
                size="small"
                type="text"
                onChange={(e) => onChange(e.target.value)}
                error={!!errors.creditFacilityAmount}
                helperText={errors?.creditFacilityAmount?.message}
              />
            )}
          />

          <Controller
            name="clientEmail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Customer Email"
                size="small"
                type="email"
                error={!!errors.clientEmail}
                helperText={errors?.clientEmail?.message}
              />
            )}
          />

          <Controller
            name="employerName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Employer Name"
                size="small"
                type="text"
                error={!!errors.employerName}
                helperText={errors?.employerName?.message}
              />
            )}
          />
        </div>

        <div className="flex justify-end my-6">
          <Button aria-label="Save" type="submit">
            <EdgeSvgIcon
              className="icon-size-12 cursor-pointer text-white mr-3"
              color="error"
            >
              {selectedItemForEdit ? "feather:edit" : "feather:plus"}
            </EdgeSvgIcon>
            {selectedItemForEdit ? "Update Record" : "Add Record"}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default CribPullUserDetailsForm;
