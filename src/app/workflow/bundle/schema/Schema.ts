import dayjs from "dayjs";
import { z } from "zod";

export const getSchema = (step: number) => {
    if (step === 0) {
        return creditInformationSchema;
    } else if (step === 1) {
        return clientInformationSchema;
    } else if (step === 2) {
        return verificationStepSchema;
    } else if (step === 3) {
        return salesInfoSchema;
    }
    return z.object({});
}

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

const dropDownItemSchema3 = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string().optional().nullable()
});

export const creditInformationSchema = z.object({
    isCC: z.boolean(),
    isALPL: z.boolean(),
    isAccountOpening: z.boolean(),
    isCCReconsiled: z.boolean(),
    isALPLReconsiled: z.boolean(),
    isCASAReconsiled: z.boolean(),
    reqLoanAmount: z.string().optional(),
    reqType: z.string(),
    isCASADefinite: z.boolean(),
    isCASABBAccount: z.boolean(),
    etbNtb: z.string(),
    relationshipId: z.string().optional(),
    creditCardType: dropDownItemSchema.nullable()
}).superRefine((data, ctx) => {
    if (data.isCC && data.creditCardType === null) {
        ctx.addIssue({
            path: ["creditCardType"],
            message: "Card type is required",
            code: z.ZodIssueCode.custom,
        });
    }

    // Validate that relationshipId is required if etbNtb is "ETB"
    if (data.etbNtb === "ETB" && (!data.relationshipId || data.relationshipId.trim() === "")) {
        ctx.addIssue({
            path: ["relationshipId"],
            message: "Relationship id is required when ETB is selected",
            code: z.ZodIssueCode.custom,
        });
    }
});


export const clientInformationSchema = z.object({
    sourceType: dropDownItemSchema.nullable().refine(
        (data) => data !== null,
        { message: "Source type is required" }
    ),
    applicantTitle: dropDownItemSchema2.nullable().refine(
        (data) => data !== null,
        { message: "Title is required" }
    ),
    applicantFirstName: z.string().nonempty("First name is required"),
    applicantLastName: z.string().optional(),
    applicantNic: z
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
                message: "Old NIC must be valid",
            }
        )
        .optional(),
    isApplicantNicPrimary: z.boolean(),
    applicantEic: z
        .string()
        .refine(
            (value) => {
                return value.trim() === "" || /^[0-9]{12}$/.test(value);
            },
            {
                message: "New NIC must be valid",
            }
        )
        .optional(),
    isApplicantEicPrimary: z.boolean().optional(),
    applicantAdditionalNic: z.string().optional(),
    isApplicantAdditionalNicPrimary: z.boolean().optional(),
    applicantAdditionalEic: z.string().optional().optional(),
    isApplicantAdditionalEicPrimary: z.boolean().optional(),
    applicantPassportNumber: z.string().optional(),
    applicantDateOfBirth: z
        .preprocess((arg) => dayjs(arg), z.instanceof(dayjs))
        .refine((date) => date.isValid(), { message: "Invalid date format" })
        .refine((date) => date != null, { message: "Primary Date of Birth is required" })
        .refine((date) => dayjs().isAfter(date), { message: "Date of Birth cannot be a future date" }),
    applicantAge: z.string().nullable().optional(),
    applicantResAddress1: z.string().optional(),
    applicantResAddress2: z.string().optional(),
    applicantResAddress3: z.string().optional(),
    applicantResAddressCity: z.string().optional(),
    residentialTelephoneNumber: z.string().optional().refine((val) => !val || /^\d{10}$/.test(val), { message: "Residential Telephone No. must be 10 digits" }),
    mobileNumber: z.string().optional().refine((val) => !val || /^\d{10}$/.test(val), { message: "Mobile No. must be 10 digits" }),
    email: z
        .string()
        .nonempty("Email is required")
        .email("Email must be valid"),
    applicationDate: z
        .preprocess((arg) => dayjs(arg), z.instanceof(dayjs))
        .refine((date) => date.isValid(), { message: "Invalid date format" })
        .refine((date) => date != null, { message: "Date is required" })
        .refine((date) => dayjs().subtract(1, 'day').isBefore(date), { message: "Cannot be a past date" }),

    companyName: dropDownItemSchema2.nullable().optional(),
    companyAddressNo: z.string().optional(),
    companyAddressStreet1: z.string().optional(),
    companyAddressStreet2: z.string().optional(),
    companyAddressCity: z.string().optional(),
    companyTelephone: z.string().optional().refine((val) => !val || /^\d{10}$/.test(val), { message: "Company Telephone No. must be 10 digits" }),
    basicSalary: z.string().nonempty("Basic salary is required")
}).refine(
    (data) => {
        const { applicantNic, applicantEic } = data;
        return (
            (applicantNic && applicantNic.length > 0) ||
            (applicantEic && applicantEic.length > 0)
        );
    },
    {
        message: "Please enter at least one of nic or eic fields",
        path: ["applicantNic"],
    }
)

const verificationStepSchema = z.object({
    refereeName: z.string().optional(),
    refereeTelephone: z.string().optional().refine((val) => !val || /^\d{10}$/.test(val), { message: "Referee Telephone No. must be 10 digits" }),
    refereeMobile: z.string().optional().refine((val) => !val || /^\d{10}$/.test(val), { message: "Referee Mobile No. must be 10 digits" }),
    customerDueDiligence: z.string(),
    isExistingCustomer: z.boolean(),
    isAddressConfirmationDocProvided: z.boolean(),
    scbAccountNumber: z.string().optional(),
    existingCardNumber: z
        .string()
        .optional()
        .nullable()
        .transform((val) => val ? val.replace(/\s/g, "") : val)
        .refine((val) => !val || /^\d{16}$/.test(val), {
            message: "Card number must be 16 digits",
        }),
    isApplicantAddressSameAsIdentification: z.boolean(),
    isClearCopyOfNicDlPpProvided: z.boolean(),
    isMothersMaidenNameMentioned: z.boolean(),
    isCustomerAttestationAndOriginalSeenConfirmed: z.boolean(),
    isResidenceTelephoneMatchingAddress: z.boolean(),
    isSignatureOnAllFivePanels: z.boolean(),
    isAmendmentCounterSignedByApplicant: z.boolean(),
    isAnnualFeeWaived: z.boolean(),
    isJoiningFeeWaived: z.boolean(),

    isNonNational: z.boolean(),
    hasMinimumMonthlySalary: z.boolean(),
    hasDepartureLetter: z.boolean(),
    hasEmailConfirmationTop5CorporateExecutive: z.boolean(),
})

const salesInfoSchema = z.object({
    isGroupSale: z.boolean(),
    groupReference: z.string().optional(),
    salesAgentOrPfcName: z.string().optional(),
    staffCode: dropDownItemSchema2.nullable().refine(
        (data) => data !== null,
        { message: "DSR/Staff code is required" }
    ),
    bdmOrManagerName: dropDownItemSchema2.nullable().refine(
        (data) => data !== null,
        { message: "Name of BDM/Manager is required" }
    ),
    branch: dropDownItemSchema.nullable().refine(
        (data) => data !== null,
        { message: "Branch is required" }
    ),
    armCode: z.string().nonempty("ARM code is required"),
    salesComments: z.string().optional()
})

export const salesReworkSchema = z.object({
    cribRating: z.string().optional(),
    norcom: z.string().optional()
})

export const loanDataEntrySchema = z.object({
    loanApplicantNIC: z
        .string()
        .refine(
            (value) => value.trim() !== "", // Ensure the field is not empty
            {
                message: "NIC is required",
            }
        )
        .refine(
            (value) => /^[0-9]{9}[vVxX]$/.test(value) || /^[0-9]{12}$/.test(value),
            {
                message: "NIC must be valid",
            }
        ),
    loanApplicantName: z.string().optional(),
    loanApplicantDesignation: z.string().optional(),
    loanApplicantResAddress1: z.string().optional(),
    loanApplicantResAddress2: z.string().optional(),
    loanApplicantResAddress3: z.string().optional(),
    loanApplicantMobile: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{10}$/.test(val), { message: "Mobile No. must be 10 digits" }),
    loanApplicantResTel: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{10}$/.test(val), { message: "Res Tel No. must be 10 digits" }),
    loanApplicantCompany: z.string().optional(),
    loanApplicantNatureOfBusiness: z.string().optional(),
    loanApplicantSalesChannel: z.string().optional(),
    loanApplicationCount: z.string().optional(),
    loanApplicationDate: z
        .preprocess((arg) => dayjs(arg), z.instanceof(dayjs))
        .refine((date) => date.isValid(), { message: "Invalid date format" })
        .refine((date) => date != null, { message: "Date is required" })
        .refine((date) => dayjs().subtract(1, "day").isBefore(date), { message: "Cannot be a past date" }),
    loanApplicationMonth: z.string().optional(),
    loanApplicationReceivedDate: z
        .preprocess((arg) => dayjs(arg), z.instanceof(dayjs))
        .refine((date) => date.isValid(), { message: "Invalid date format" })
        .refine((date) => date != null, { message: "Date is required" })
        .refine((date) => dayjs().subtract(1, "day").isBefore(date), { message: "Cannot be a past date" }),
    loanApplicationTime: z.string().optional(),
    loanApplicationPWIDSC: z.string().optional(),
    loanApplicationType: dropDownItemSchema3.nullable().refine(
        (data) => data !== null,
        { message: "Loan type is required" }
    ),
    loanApplicationTotalValue: z.string().nonempty("Total loan value is required"),
    loanApplicationInterestRate: z.string().optional(),
    loanApplicationTenor: z.string().nonempty("Tenor is required"),
    loanApplicationMasterNo: z.string().optional(),
    loanApplicationRepaymentMode: z.string().optional(),
    loanApplicationGrossIncome: z.string().optional(),
    loanApplicationNetIncome: z.string().optional(),
    loanApplicationDBR: z.string().optional(),
});
