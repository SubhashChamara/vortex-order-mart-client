import dayjs from "dayjs";
import { z } from "zod";

export const getFormSchema = (currentStep: number, applicationType?: string) => {
    if (currentStep === 0) {
        return primaryCustomerSchema;
    } if (currentStep === 1) {
        return jointCustomerSchema;
    } if (currentStep === 2) {
        return facilityAndCollateralSchema(applicationType)
    } if (currentStep === 3) {
        return newCollateralSchema;
    } if (currentStep === 4) {
        return eFormSchema;
    } if (currentStep === 6) {
        return underwriterFormSchema
    } if (currentStep === 7) {
        return dataEntryFormSchema
    }
    return z.object({});
};

// DropdownItem Schema
const dropDownItemSchema = z.object({
    id: z.number(),
    name: z.string(),
});

// DropdownItem Schema
const dropDownItemSchema2 = z.object({
    id: z.string(),
    name: z.string(),
});

const uwUserSchema = z.object({
    userId: z.string(),
    groupId: z.string(),
    groupName: z.string(),
    userName: z.string(),
    underWriterLevel: z.string(),
})

const primaryCustomerSchema = z.object({
    title: dropDownItemSchema2.nullable().refine(
        (data) => data !== null,
        { message: "Title is required" }
    ),
    customerName: z.string().nonempty("Name is required"),
    customerDob: z
        .preprocess((arg) => dayjs(arg), z.instanceof(dayjs))
        .refine((date) => date.isValid(), { message: "Invalid date format" })
        .refine((date) => date != null, { message: "Primary Date of Birth is required" })
        .refine((date) => dayjs().isAfter(date), { message: "Date of Birth cannot be a future date" }),
    customerMobile: z.string().nonempty("Mobile No. is required").length(10, "Mobile No. must be 10 digits"),
    customerResTel: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{10}$/.test(val), { message: "Residential Telephone No. must be 10 digits" }),
    customerNicPP: z.string().refine(
        (value) => value.trim() === "" || /^[0-9]{9}[vVxX]$/.test(value) || /^[0-9]{9}[XxVv]$/.test(value),
        { message: "NIC number must be valid" }
    ),
    primaryNationality: z.string().optional(),
    customerOccupation: z.string().optional(),
    customerEmail: z
        .string()
        .nonempty("Email is required")
        .email("Email must be valid"),

    // residential 
    customerResAdd1: z.string().optional(),
    customerResAdd2: z.string().optional(),
    customerResAdd3: z.string().optional(),
    residentStatus: z.string().optional(),
    masterNumber: z.string().optional(),
    customerNationality: z.string().optional()
});

const jointCustomerSchema = z.object({

    JointCustomerTitle: dropDownItemSchema2.nullable().refine(
        (data) => data !== null,
        { message: "Title is required" }
    ),
    jointCustomerName: z.string().nonempty("Name is required"),
    jointCustomerDob: z
        .preprocess((arg) => dayjs(arg), z.instanceof(dayjs))
        .refine((date) => date.isValid(), { message: "Invalid date format" })
        .refine((date) => date != null, { message: "Primary Date of Birth is required" })
        .refine((date) => dayjs().isAfter(date), { message: "Date of Birth cannot be a future date" }),
    jointCustomerMobile: z.string().nonempty("Mobile No. is required").length(10, "Mobile No. must be 10 digits"),
    jointCustomerResTel: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{10}$/.test(val), { message: "Residential Telephone No. must be 10 digits" }),
    jointCustomerNicPP: z.string().refine(
        (value) => value.trim() === "" || /^[0-9]{9}[vVxX]$/.test(value) || /^[0-9]{9}[XxVv]$/.test(value),
        { message: "NIC number must be valid" }
    ),
    jointCustomerNationality: z.string().optional(),
    jointCustomerOccupation: z.string().optional(),
    jointCustomerEmail: z
        .string()
        .nonempty("Email is required")
        .email("Email must be valid"),

    // residential 
    jointCustomerResAdd1: z.string().optional(),
    jointCustomerResAdd2: z.string().optional(),
    jointCustomerResAdd3: z.string().optional(),
    jointResidentStatus: z.string().optional(),
    jointMasterNumber: z.string().optional(),
    jointRelationshipWithPrimary: z.string().nonempty("Relationship is required")
})

const facilityAndCollateralSchema = (applicationType?: string) => z.object({
    date: z
        .preprocess((arg) => dayjs(arg), z.instanceof(dayjs))
        .refine((date) => date.isValid(), { message: "Invalid date format" })
        .refine((date) => date != null, { message: "Date is required" })
        .refine((date) => dayjs().isBefore(date), { message: "Cannot be a past date" }),
    customerMaster: z.string().optional(),
    branch: dropDownItemSchema.nullable().refine(
        (data) => data !== null,
        { message: "Branch is required" }
    ),
    armCode: z.string().optional(),
    segmentCode: z.string().optional(),



    ...(applicationType === "OVER_DRAFT" && {
        // od fields
        isRenewAnnually: z.string().nullable().optional(),
        odFacilityAccount: z.string().nonempty("Facility account is required"),
        odCurrency: dropDownItemSchema.nullable().refine(
            (data) => data !== null,
            { message: "Currency is required" }
        ),
        odFacilityExpDate: z
            .preprocess((arg) => dayjs(arg), z.instanceof(dayjs)).optional()
            .refine((date) => date.isValid(), { message: "Invalid date format" })
            .refine((date) => date != null, { message: "Date is required" })
            .refine((date) => dayjs().isBefore(date), { message: "Cannot be a past date" }),
        odRateOfInterest: z.string().optional(),
        odRateOfInterestStandard: z.string().optional(),
        odFacilityAmountInFigures: z.string().optional(),
        odFacilityAmountInWords: z.string().optional(),
        odPurposeOfFacility: z.string().optional(),
    }
    ),

    //tl fields
    ...(applicationType === "TERM_LOAN" && {
        tlFacilityAccount: z.string().nonempty("Facility account is required"),
        tlCurrency: dropDownItemSchema.nullable().refine(
            (data) => data !== null,
            { message: "Currency is required" }
        ),
        tlRateOfInterest: z.string().optional(),
        tlRepaymentPeriod: dropDownItemSchema2.nullable(),
        tlFacilityRepayPeriodOther: z.string().optional(),
        tlRepaymentAccount: z.string().nonempty("Facility account is required"),
        tlRepaymentCurrency: dropDownItemSchema.nullable().refine(
            (data) => data !== null,
            { message: "Currency is required" }
        ),
        tlFacilityAmountInFigures: z.string().optional(),
        tlFacilityAmountInWords: z.string().optional(),
        tlFacilityExpDate: z
            .preprocess((arg) => dayjs(arg), z.instanceof(dayjs)).nullable().optional()
            .refine((date) => date.isValid(), { message: "Invalid date format" })
            .refine((date) => date != null, { message: "Date is required" })
            .refine((date) => dayjs().isBefore(date), { message: "Cannot be a past date" }),
        tlFacilityCreditingAccount: z.string().nonempty("Facility account is required"),
        tlCurrency2: dropDownItemSchema.nullable().refine(
            (data) => data !== null,
            { message: "Currency is required" }
        ),
        tlFacilityPurpose: z.string().optional()
    })
})

const newCollateralSchema = z.object({
    lienAccountNum: z.string().nonempty("Account number is required"),
    ncCurrency: dropDownItemSchema.nullable().refine(
        (data) => data !== null,
        { message: "Currency is required" }
    ),
    ncName: z.string().nullable().optional(),
    ncInterest: z.string().nullable().optional(),
    ncMaturityDate: z
        .preprocess((arg) => (arg ? dayjs(arg) : null), z.instanceof(dayjs).nullable())
        .optional()
        .refine((date) => date === null || date.isValid(), { message: "Invalid date format" })
        .refine((date) => date === null || dayjs().isBefore(date), { message: "Cannot be a past date" }),
    ncCurrentBalance: z.string().nullable().optional(),
    ncLienAmount: z.string().nonempty("Amount is required"),
    ncApplicableLtv: z.string().nonempty("Applicable ltv is required"),
    ncApplicableAmountKeptAsCollateral: z.string().nullable().optional()
})

const eFormSchema = z.object({})

export const documentDetailSchema = z.object({
    isDocRetainedAtBranch: z.boolean()
})

export const documentCheckSchema = z.object({
    isNoCribHistory: z.boolean().nullable().optional(),
    isFCYBackedOD: z.boolean().nullable().optional(),
    isTBillBackedOD: z.boolean().nullable().optional(),
    isODforAverageCustomer: z.boolean().nullable().optional(),
})

export const customerVerificationSchema = z.object({
    contactPerson: z.string().optional().nullable(),
    isAddressVerified: z.boolean().optional().nullable(),
    isNicVerified: z.boolean().optional().nullable(),
    isDobVerified: z.boolean().optional().nullable(),
    specialVerificationComment: z.string().optional().nullable(),
})

export const fraudDetectionSchema = z.object({
    isFraudDetected: z.boolean().nullable().optional()
})

export const reprocessDateSchema = z.object({
    processDate: z
        .preprocess((arg) => (arg ? dayjs(arg) : null), z.instanceof(dayjs).nullable())
        .optional()
        .refine((date) => date === null || date.isValid(), { message: "Invalid date format" })
        .refine((date) => date === null || dayjs().isBefore(date), { message: "Cannot be a past date" }),
})

export const underwriterFormSchema = z.object({
})

export const dataEntryFormSchema = z.object({
    productLoanType: dropDownItemSchema.nullable().refine(
        (data) => data !== null,
        { message: "Product is required" }
    ),
    approvedLevelAndUser: uwUserSchema.nullable().refine(
        (data) => data !== null,
        { message: "Approved level and user is required" }
    ),
    approvedLevel: z.string().optional().nullable(),
    approvedLevelUser: z.string().optional().nullable(),
    approvedAmount: z.string().nonempty("Approved amount is required"),
    l2l3Cap: z.string().nonempty("L2L3 cap is required")
})