import dayjs from "dayjs";
import { z } from "zod";

export const getFormSchema = (currentStep: number, applicationType?: string) => {
    if (currentStep === 0) {
        return primaryCustomerSchema;
    } else if (currentStep === 1) {
        return jointCustomerSchema;
    } else if (currentStep === 2) {
        return facilityCollateralSchema(applicationType);
    } else if (currentStep === 3) {
        return lienDetailsSchema;
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

const primaryCustomerSchema = z.object({
    applicationType: dropDownItemSchema2.nullable().refine(
        (data) => data !== null,
        { message: "Application type is required" }
    ),
    termLoanType: dropDownItemSchema2.nullable(),
    overDraftType: dropDownItemSchema2.nullable(),

    // primary
    primaryTitle: dropDownItemSchema2.nullable().refine(
        (data) => data !== null,
        { message: "Title is required" }
    ),
    primaryName: z.string().nonempty("Name is required"),
    primaryDob: z
        .preprocess((arg) => dayjs(arg), z.instanceof(dayjs))
        .refine((date) => date.isValid(), { message: "Invalid date format" })
        .refine((date) => date != null, { message: "Primary Date of Birth is required" })
        .refine((date) => dayjs().isAfter(date), { message: "Date of Birth cannot be a future date" }),
    primaryMobile: z.string().nonempty("Mobile No. is required").length(10, "Mobile No. must be 10 digits"),
    primaryResTelNo: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{10}$/.test(val), { message: "Residential Telephone No. must be 10 digits" }),
    primaryNicPP: z.string().refine(
        (value) => {
            return (
                value.trim() === "" ||
                /^[0-9]{9}[vVxX]$/.test(value) || // Old NIC format
                /^[0-9]{12}$/.test(value) ||      // New NIC format
                /^[A-Z]{1,2}[0-9]{7}$/.test(value) // Sri Lankan passport format
            );
        },
        { message: "NIC or passport number must be valid (old NIC, new NIC, or Sri Lankan passport format)" }
    ),
    primaryNationality: z.string().optional(),
    primaryOccupation: z.string().optional(),
    primaryEmail: z
        .string()
        .nonempty("Email is required")
        .email("Email must be valid"),

    // residential 
    primaryResAddress1: z.string().optional(),
    primaryResAddress2: z.string().optional(),
    primaryResAddress3: z.string().optional(),
    primaryResStatus: z.string().optional(),
    primaryMasterNumber: z.string().optional(),
    primaryMonthlyIncome: z
        .string()
        .optional()
        .refine((val) => !val || parseFloat(val) !== 0, { message: "Monthly fixed income cannot be 0" })
}).superRefine((data, ctx) => {
    const { applicationType, overDraftType, termLoanType } = data;

    if (applicationType?.id === "OVER_DRAFT" && !overDraftType) {
        ctx.addIssue({
            code: "custom",
            path: ["overDraftType"],
            message: "OverDraft type is required"
        });
    }

    if (applicationType?.id === "TERM_LOAN" && !termLoanType) {
        ctx.addIssue({
            code: "custom",
            path: ["termLoanType"],
            message: "TermLoan type is required"
        });
    }
});



const jointCustomerSchema = z.object({
    jointTitle: dropDownItemSchema2.nullable().refine(
        (data) => data !== null,
        { message: "Title is required" }
    ),
    jointName: z.string().nonempty("Name is required"),
    jointDob: z
        .preprocess((arg) => dayjs(arg), z.instanceof(dayjs))
        .refine((date) => date.isValid(), { message: "Invalid date format" })
        .refine((date) => date != null, { message: "Primary Date of Birth is required" })
        .refine((date) => dayjs().isAfter(date), { message: "Date of Birth cannot be a future date" }),
    jointMobile: z.string().nonempty("Mobile No. is required").length(10, "Mobile No. must be 10 digits"),
    jointResTelNo: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{10}$/.test(val), { message: "Residential Telephone No. must be 10 digits" }),
    jointNicPP: z.string().refine(
        (value) => {
            return (
                value.trim() === "" ||
                /^[0-9]{9}[vVxX]$/.test(value) || // Old NIC format
                /^[0-9]{12}$/.test(value) ||      // New NIC format
                /^[A-Z]{1,2}[0-9]{7}$/.test(value) // Sri Lankan passport format
            );
        },
        { message: "NIC or passport number must be valid (old NIC, new NIC, or Sri Lankan passport format)" }
    ),
    jointNationality: z.string().optional(),
    jointOccupation: z.string().optional(),
    jointEmail: z
        .string()
        .nonempty("Email is required")
        .email("Email must be valid"),

    // residential 
    jointResAddress1: z.string().optional(),
    jointResAddress2: z.string().optional(),
    jointResAddress3: z.string().optional(),
    jointResStatus: z.string().optional(),
    jointMasterNumber: z.string().optional(),
    jointMonthlyIncome: z.string().optional(),
    jointRelationshipWithPrimary: z.string().nonempty("Relationship is required")
});

const facilityCollateralSchema = (applicationType?: string) => z.object({
    applicationType: dropDownItemSchema2.nullable().refine(
        (data) => data !== null,
        { message: "Application type is required" }
    ),
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
        odFacilityAccount: z.string().nonempty("Facility account is required")
            .min(11, "Account number must be 11 characters")
            .max(11, "Account number must be 11 characters"),
        odFacilityCurrency: dropDownItemSchema.nullable().refine(
            (data) => data !== null,
            { message: "Currency is required" }
        ),
        odFacilityExpDate: z
            .preprocess((arg) => dayjs(arg), z.instanceof(dayjs)).optional()
            .refine((date) => date.isValid(), { message: "Invalid date format" })
            .refine((date) => date != null, { message: "Date is required" })
            .refine((date) => dayjs().isBefore(date), { message: "Cannot be a past date" }),
        odFacilityInterestRate: z.string().optional(),
        odFacilityExcessRate: z.string().optional(),
        odFacilityRequiredAmountFigs: z
            .string()
            .optional()
            .refine((val) => !val || parseFloat(val) !== 0, { message: "Monthly fixed income cannot be 0" }),
        odFacilityRequiredAmountWords: z.string().optional(),
        odFacilityPurpose: z.string().optional(),
    }
    ),

    //tl fields
    ...(applicationType === "TERM_LOAN" && {
        tlFacilityAccount: z.string().nonempty("Facility account is required")
            .min(11, "Account number must be 11 characters")
            .max(11, "Account number must be 11 characters"),
        tlFacilityCurrency: dropDownItemSchema.nullable().refine(
            (data) => data !== null,
            { message: "Currency is required" }
        ),
        tlFacilityInterestRate: z.string().optional(),
        tlFacilityRepayPeriod: dropDownItemSchema2.nullable(),
        tlFacilityRepayPeriodOther: z.string().optional(),
        tlFacilityRepayAccount: z.string().nonempty("Facility account is required"),
        tlFacilityRepayCurrency: dropDownItemSchema.nullable().refine(
            (data) => data !== null,
            { message: "Currency is required" }
        ),
        tlFacilityRequiredAmountFigs: z.string().optional(),
        tlFacilityRequiredAmountWords: z.string().optional(),
        tlFacilityExpDate: z
            .preprocess((arg) => dayjs(arg), z.instanceof(dayjs)).nullable().optional()
            .refine((date) => date.isValid(), { message: "Invalid date format" })
            .refine((date) => date != null, { message: "Date is required" })
            .refine((date) => dayjs().isBefore(date), { message: "Cannot be a past date" }),
        tlFacilityCreditAccount: z.string().nonempty("Facility account is required"),
        tlFacilityCreditingCurrency: dropDownItemSchema.nullable().refine(
            (data) => data !== null,
            { message: "Currency is required" }
        ),
        tlFacilityPurpose: z.string().optional()
    })
});

const lienDetailsSchema = z.object({
    lienAccountNumber: z
        .string()
        .nonempty("Account number is required")
        .min(11, "Account number must be 11 characters")
        .max(11, "Account number must be 11 characters"),
    lienAccountCurrency: dropDownItemSchema.nullable().refine(
        (data) => data !== null,
        { message: "Currency is required" }
    ),
    lienAccountName: z.string().nullable().optional(),
    lienAccountInterest: z.string().nullable().optional(),
    lienAccountMatureDate: z
        .preprocess((arg) => (arg ? dayjs(arg) : null), z.instanceof(dayjs).nullable())
        .optional()
        .refine((date) => date === null || date.isValid(), { message: "Invalid date format" })
        .refine((date) => date === null || dayjs().isBefore(date), { message: "Cannot be a past date" }),
    lienAccountBalance: z.string().nullable().optional(),
    lienAccountAmount: z.string().nonempty("Amount is required"),
    lienAccountApplicableLtv: z.string().nonempty("Applicable ltv is required")
})