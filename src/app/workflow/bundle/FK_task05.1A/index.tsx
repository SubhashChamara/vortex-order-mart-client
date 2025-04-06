import React, { useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import EyeBallingNIC from "../components/EyeBalling/EyeBallingNIC";
import EyeballingFinalForm from "../components/EyeBalling/EyeballingFinalForm";
import EyeBallingName from "../components/EyeBalling/EyeBallingName";
import EyeBallingAddress from "../components/EyeBalling/EyeBallingAddress";
import { FormProvider, set, useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { DropDownItem } from "../../../core/types/DropDown";
import EyeBallingTP from "../components/EyeBalling/EyeBallingTP";
import EyeBallingEmploymentDetails from "../components/EyeBalling/EyeBallingEmploymentDetails";
import { Api } from "../../../../api/Api";
import { EyeballingDataEntryDataInfo } from "../@types/EyeballingDataEntryDataInfo";
import { Button } from "@mui/material";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { EyeballingRequest } from "../@types/EyeballingRequest";
import { toast } from "react-toastify";
import { EyeballingInfo } from "../@types/EyeballingInfo";
import { formatCurrency } from "../@helpers/Common";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NicDetails } from "../../../core/types/NicDetails";

interface EyeballingFormProps {
  task: TaskDetailInfo;
}

type FormType = {
  nicPP: string;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  zipCode: string;
  dateOfBirth: Dayjs | null;
  CustomerCategory: DropDownItem | null;
  industry: DropDownItem | null;
  resTelephone: string;
  officeTelephone: string;
  mobTelephone: string;
  city: DropDownItem | null;
  companyStatus: DropDownItem | null;
  salary: string;
  disbursalAccount: string;
  employmentDetail: DropDownItem | null;
  company: string;
  officeAddress1: string;
  officeAddress2: string;
  officeAddress3: string;
  officeZipCode: string;
  officeAddress: string;
  profession: DropDownItem | null;
  newNic: string | null;
};

const defaultValues: FormType = {
  nicPP: "",
  name: "",
  address1: "",
  address2: "",
  address3: "",
  zipCode: "",
  dateOfBirth: null,
  CustomerCategory: null,
  industry: null,
  resTelephone: "",
  officeTelephone: "",
  mobTelephone: "",
  city: null,
  companyStatus: null,
  salary: "",
  disbursalAccount: "",
  employmentDetail: null,
  company: "",
  officeAddress1: "",
  officeAddress2: "",
  officeAddress3: "",
  officeAddress: "",
  officeZipCode: "",
  profession: null,
  newNic: "",
};

// DropdownItem Schema
const dropDownItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  // code: z.string().nullable(),
});

// DropdownItem Schema
const dropDownItemSchema2 = z.object({
  id: z.string(),
  name: z.string(),
});

// DropdownItem Schema
const dropDownItemSchema3 = z.object({
  id: z.string(),
  name: z.string(),
  // code: z.string().nullable(),
});

const schema = z.object({
  newNic: z.string().nullable(),

  nicPP: z
    .string()
    .nonempty("NIC/PP is required")
    .refine(
      (value) => {
        return (
          value.trim() === "" ||
          /^[0-9]{9}[vVxX]$/.test(value) ||
          /^[0-9]{9}[XxVv]$/.test(value)
        );
      },
      {
        message: "NIC must be valid",
      }
    ),
  name: z.string().nonempty("Name is required"),
  dateOfBirth: z
    .preprocess((arg) => dayjs(arg), z.instanceof(dayjs))
    .refine((date) => date.isValid(), { message: "Invalid date format" })
    .refine((date) => date != null, {
      message: "Primary Date of Birth is required",
    })
    .refine((date) => dayjs().isAfter(date), {
      message: "Date of Birth cannot be a future date",
    }),
  CustomerCategory: dropDownItemSchema3
    .nullable()
    .refine((data) => data !== null, {
      message: "Customer category is required",
    }),
  industry: dropDownItemSchema.nullable().refine((data) => data !== null, {
    message: "Industry is required",
  }),
  resTelephone: z
    .string()
    .nonempty("Telephone is required")
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: "Mobile No. must be 10 digits",
    }),
  officeTelephone: z
    .string()
    .nonempty("Telephone is required")
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: "Mobile No. must be 10 digits",
    }),
  mobTelephone: z
    .string()
    .nonempty("Telephone is required")
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: "Mobile No. must be 10 digits",
    }),
  city: dropDownItemSchema.nullable(),
  companyStatus: dropDownItemSchema3.nullable(),
  salary: z.string().nonempty("Salary is required"),
  disbursalAccount: z.string().optional(),
  company: z.string().nonempty("Company is required"),
  profession: dropDownItemSchema.nullable().refine((data) => data !== null, {
    message: "Profession is required",
  }),
  officeAddress1: z.string().optional(),
  officeAddress2: z.string().optional(),
  officeAddress3: z.string().optional(),
  officeZipCode: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  address3: z.string().optional(),
  zipCode: z.string().optional(),
});

const EyeballingForm: React.FC<EyeballingFormProps> = ({ task }) => {
  const [eyeBallingDataEntryData, setEyeBallingDataEntryData] =
    useState<EyeballingDataEntryDataInfo | null>(null);

  const [customerCategoryDropdown, setCustomerCategoryDropdown] = useState<
    DropDownItem[]
  >([]);
  const [industryDropdown, setIndustryDropdown] = useState<DropDownItem[]>([]);
  const [cityDropdown, setCityDropdown] = useState<DropDownItem[]>([]);
  const [companyTypeDropdown, setCompanyTypeDropdown] = useState<
    DropDownItem[]
  >([]);
  const [professionTypeDropdown, setProfessionTypeDropdown] = useState<
    DropDownItem[]
  >([]);

  const [newNic, setNewNic] = useState<NicDetails | null>(null);

  const [eyeballingSavedData, setEyeballingSavedData] =
    useState<EyeballingInfo | null>(null);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { watch, handleSubmit, setValue, formState } = methods;

  const { errors } = formState;

  console.log(errors);

  const nic = watch("nicPP");

  const getCovertedNicData = async () => {
    const validNicRegex1 = /^[0-9]{9}[vVxX]$/;
    const validNicRegex2 = /^[0-9]{9}[XxVv]$/;

    if (validNicRegex1.test(nic) || validNicRegex2.test(nic)) {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getNicDetails(nic)
      );
      if (data !== null) {
        setNewNic(data.eic);
        setValue("newNic", data.eic);
        setValue(
          "dateOfBirth",
          dayjs(data?.birthDay?.toString().slice(0, 10)).toDate()
        );
      } else {
        setValue("newNic", "");
        setValue("dateOfBirth", null);
        console.log(err);
      }
    } else {
      setValue("newNic", "");
      setValue("dateOfBirth", null);
    }
  };

  useEffect(() => {
    getCovertedNicData();
  }, [nic]);

  const getDataEntryData = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getDataEntryData(task.processInstanceId)
    );

    if (data !== null) {
      setEyeBallingDataEntryData(data);
    } else {
      console.log(err);
    }
  };

  // Common method for fetching dropdown data
  const getDropdownData = async (
    dropdownType: string,
    setState: React.Dispatch<React.SetStateAction<DropDownItem[]>>
  ) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundledDropdownData(dropdownType)
    );

    if (data !== null) {
      setState(data);
    } else {
      console.log(err);
    }
  };

  // get saved data
  const getEyeballingSavedData = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getEyeBallingSavedData(task.processInstanceId)
    );
    if (data !== null) {
      setEyeballingSavedData(data);
    } else {
      console.log(err);
    }
  };

  // handle form submit
  const handleEyeballingFormSubmit = async (formData: FormType) => {
    const request: EyeballingRequest = {
      // id?: number | null;
      // reportOk?: boolean | null;
      employerId: eyeballingSavedData?.employerId || null,
      company: formData.companyStatus
        ? formData.companyStatus.id.toString()
        : null,
      disbursalAccount: formData.disbursalAccount || null,
      nicNumber: formData.nicPP, // Required
      convertedNic: formData.newNic || null,
      dob: formData.dateOfBirth
        ? dayjs(formData.dateOfBirth).format("YYYY-MM-DD")
        : null,
      customerCategory: formData.CustomerCategory
        ? formData.CustomerCategory?.id.toString()
        : "", // Required
      reportName: formData.name, // Required
      // address:
      //   formData.officeAddress1 === ""
      //     ? null
      //     : `${formData.officeAddress1},${formData.officeAddress2},${formData.officeAddress3},${formData.officeZipCode}`,
      resTp: formData.resTelephone, // Required
      mobTp: formData.mobTelephone, // Required
      offTp: formData.officeTelephone, // Required
      employeeName: formData.company, // Required
      masterIndustryId: formData.industry ? formData.industry.id : 0, // Required
      masterProfessionId: formData.profession ? formData.profession.id : null,
      masterCityRiskRatingId: formData.city ? formData.city.id : null,
      // employerId: ,
      // age:  || null,
      salaryScale: parseFloat((formData.salary || "").replace(/[^0-9.]/g, "")), // Required
      resAddress1: formData.address1 || null,
      resAddress2: formData.address2 || null,
      resAddress3: formData.address3 || null,
      resAddress4: formData.zipCode || null,
      empAddress1: formData.officeAddress1 || null,
      empAddress2: formData.officeAddress2 || null,
      empAddress3: formData.officeAddress3 || null,
      empAddress4: formData.officeZipCode || null,
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveEyeballingDataEntry(
        task.processInstanceId,
        task.taskInstance,
        request
      )
    );

    if (!err) {
      toast.success("Eye balling data saved successfully");
    } else {
      toast.error(err.msg);
    }
  };

  // page load side effects
  useEffect(() => {
    getDropdownData("customer-category", setCustomerCategoryDropdown);
    getDropdownData("industry", setIndustryDropdown);
    getDropdownData("city", setCityDropdown);
    getDropdownData("company-type", setCompanyTypeDropdown);
    getDropdownData("profession", setProfessionTypeDropdown);

    getDataEntryData();
    getEyeballingSavedData();
  }, []);

  useEffect(() => {
    const matchingCustomerCategory = customerCategoryDropdown.find(
      (item) =>
        item.id.toString() === eyeBallingDataEntryData?.customerType.name
    );

    const matchingSavedCustomerCategory = customerCategoryDropdown.find(
      (item) => item.id.toString() === eyeballingSavedData?.customerCategory
    );

    const matchingIndustry = industryDropdown.find(
      (item) => item.id === eyeballingSavedData?.masterIndustryId
    );
    const matchingCity = cityDropdown.find(
      (item) => item.id === eyeballingSavedData?.masterCityRiskRatingId
    );
    const matchingCompanyStatus = companyTypeDropdown.find(
      (item) => item.id.toString() === eyeballingSavedData?.company
    );
    const matchingProfession = professionTypeDropdown.find(
      (item) => item.id === eyeballingSavedData?.masterProfessionId
    );

    setValue("name", eyeballingSavedData?.reportName || "");
    setValue("address1", eyeballingSavedData?.resAddress1 || "");
    setValue("address2", eyeballingSavedData?.resAddress2 || "");
    setValue("address3", eyeballingSavedData?.resAddress3 || "");
    setValue("zipCode", eyeballingSavedData?.resAddress4 || "");
    setValue("officeAddress1", eyeballingSavedData?.empAddress1 || "");
    setValue("officeAddress2", eyeballingSavedData?.empAddress2 || "");
    setValue("officeAddress3", eyeballingSavedData?.empAddress3 || "");
    setValue("officeZipCode", eyeballingSavedData?.empAddress4 || "");
    setValue("resTelephone", eyeballingSavedData?.resTp || "");
    setValue("mobTelephone", eyeballingSavedData?.mobTp || "");
    setValue("officeTelephone", eyeballingSavedData?.offTp || "");
    setValue("officeAddress", eyeballingSavedData?.address || "");
    setValue("company", eyeballingSavedData?.employeeName || "");
    setValue("disbursalAccount", eyeballingSavedData?.disbursalAccount || "");
    setValue("nicPP", eyeballingSavedData?.nicNumber || "");

    console.log("saved dob", eyeballingSavedData?.dob);
    console.log("original dob", eyeBallingDataEntryData?.dob);

    setValue(
      "dateOfBirth",
      eyeballingSavedData?.dob
        ? dayjs(eyeballingSavedData?.dob)
        : dayjs(eyeBallingDataEntryData?.dob)
    );

    setValue(
      "CustomerCategory",
      eyeballingSavedData?.customerCategory
        ? matchingSavedCustomerCategory || null
        : matchingCustomerCategory || null
    );

    setValue("industry", matchingIndustry || null);
    setValue("city", matchingCity || null);
    setValue("companyStatus", matchingCompanyStatus || null);
    setValue(
      "salary",
      eyeballingSavedData?.salaryScale
        ? formatCurrency(eyeballingSavedData?.salaryScale.toString())
        : eyeBallingDataEntryData?.salary
        ? formatCurrency(eyeBallingDataEntryData?.salary.toString())
        : ""
    );
    setValue("profession", matchingProfession || null);
  }, [eyeballingSavedData, eyeBallingDataEntryData]);

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-5 gap-12">
        <div className="col-span-2 grid grid-cols-1 gap-12">
          <EyeBallingNIC
            nicCribFile1={eyeBallingDataEntryData?.nicCribFile1 || null}
            nicCribFile2={eyeBallingDataEntryData?.nicCribFile2 || null}
            nicDataEntry={eyeBallingDataEntryData?.nicDataEntry || null}
            setNewNic={() => setNewNic}
          />
          <EyeBallingName
            reportedNames={eyeBallingDataEntryData?.reportedNames || []}
          />
          <EyeBallingAddress
            mailingAddresses={eyeBallingDataEntryData?.mailingAddresses || []}
            permanentAddresses={
              eyeBallingDataEntryData?.permanentAddresses || []
            }
          />
          <EyeBallingEmploymentDetails
            employeeNames={eyeBallingDataEntryData?.employeeNames || []}
          />
        </div>
        <form
          className="flex flex-col col-span-3 gap-12"
          onSubmit={handleSubmit(handleEyeballingFormSubmit)}
          noValidate
        >
          <EyeballingFinalForm
            editable={true}
            cityDropdown={cityDropdown}
            companyTypeDropdown={companyTypeDropdown}
            customerCategoryDropdown={customerCategoryDropdown}
            industryDropdown={industryDropdown}
            professionTypeDropdown={professionTypeDropdown}
          />
          <div className="grid grid-cols-3 gap-12">
            <EyeBallingTP
              title="Res. TP"
              name="resTelephone"
              resTelCrib1={eyeBallingDataEntryData?.resTelCrib1}
              resTelCrib2={eyeBallingDataEntryData?.resTelCrib2}
            />
            <EyeBallingTP
              title="Mobile TP"
              name="mobTelephone"
              mobTelCrib1={eyeBallingDataEntryData?.mobTelCrib1}
              mobTelCrib2={eyeBallingDataEntryData?.mobTelCrib2}
            />
            <EyeBallingTP
              title="Office TP"
              name="officeTelephone"
              offTelCrib1={eyeBallingDataEntryData?.mobTelCrib1}
              offTelCrib2={eyeBallingDataEntryData?.mobTelCrib2}
            />
          </div>

          <div className="w-full h-full flex justify-end items-end">
            <Button type="submit">
              <EdgeSvgIcon className="mr-6">feather:save</EdgeSvgIcon>Save
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default EyeballingForm;
