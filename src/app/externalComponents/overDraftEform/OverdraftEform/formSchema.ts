import { z } from 'zod';
import dayjs from 'dayjs';

// Define DropDownItem schema
const DropDownItemSchema = z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string(),
});

// Custom schema for Dayjs
const DayjsSchema = z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) {
        const date = dayjs(arg);
        return date.isValid() ? date.toDate() : arg;
    }
    return arg;
}, z.date());

// Step 0 Schema: Primary Customer Details
const step0Schema = z.object({
    // applicationType: DropDownItemSchema.nullable(),
    // termLoanType: DropDownItemSchema.nullable(),
    // overDraftType: DropDownItemSchema.nullable(),
    // primaryTitle: DropDownItemSchema.nullable(),
    primaryName: z.string().min(1, 'Primary name is required'),
    primaryEmail: z.string().email('Invalid email address'),
    primaryOccupation: z.string().min(1, 'Occupation is required'),
    primaryMobile: z
        .string()
        .min(10, 'Mobile number must be at least 10 digits'),
    primaryResTelNo: z.string().optional(),
    primaryNicPP: z.string().min(1, 'NIC/PP is required'),
    primaryDob: DayjsSchema.nullable(),
    primaryResAddress1: z.string().min(1, 'Address Line 1 is required'),
    primaryResAddress2: z.string().optional(),
    primaryResAddress3: z.string().optional(),
    primaryMonthlyIncome: z.string().min(1, 'Monthly income is required'),
    primaryResStatus: z.string().min(1, 'Residential status is required'),
    primaryMasterNumber: z.string().optional(),
    primaryNationality: z.string().min(1, 'Nationality is required'),
});

// Step 1 Schema: Joint Customer Details
const step1Schema = z.object({
    jointTitle: DropDownItemSchema.nullable(),
    jointName: z.string().min(1, 'Joint name is required'),
    // jointEmail: z.string().email('Invalid email address').optional(),
    jointOccupation: z.string().min(1, 'Occupation is required'),
    jointMobile: z
        .string()
        .min(10, 'Mobile number must be at least 10 digits'),
    jointResTelNo: z.string().optional(),
    jointNicPP: z.string().min(1, 'NIC/PP is required'),
    jointDob: DayjsSchema.nullable(),
    jointResAddress1: z.string().min(1, 'Address Line 1 is required'),
    jointResAddress2: z.string().optional(),
    jointResAddress3: z.string().optional(),
    jointMonthlyIncome: z.string().min(1, 'Monthly income is required'),
    jointResStatus: z.string().min(1, 'Residential status is required'),
    jointNationality: z.string().min(1, 'Nationality is required'),
    jointMasterNumber: z.string().optional(),
    jointRelationshipWithPrimary: z
        .string()
        .min(1, 'Relationship is required'),
});

// Step 2 Schema: Facility & Collateral Details
const step2Schema = z.object({
    date: DayjsSchema.nullable(),
    customerMaster: z.string().min(1, 'Customer Master is required'),
    branch: DropDownItemSchema.nullable(),
    armCode: z.string().min(1, 'ARM Code is required'),
    segmentCode: z.string().min(1, 'Segment Code is required'),
    // OD Facility Details
    isRenewAnnually: z.boolean().nullable(),
    odFacilityAccount: z.string().min(1, 'OD Facility Account is required'),
    odFacilityCurrency: DropDownItemSchema.nullable(),
    odFacilityExpDate: DayjsSchema.nullable(),
    odFacilityInterestRate: z.string().min(1, 'Interest Rate is required'),
    odFacilityExcessRate: z.string().optional(),
    odFacilityRequiredAmountFigs: z.number().nullable(),
    odFacilityRequiredAmountWords: z.string().min(
        1,
        'Amount in words is required'
    ),
    odFacilityPurpose: z.string().min(1, 'Purpose is required'),
    // TL Facility Details
    tlFacilityAccount: z.string().min(1, 'TL Facility Account is required'),
    tlFacilityCurrency: DropDownItemSchema.nullable(),
    tlFacilityInterestRate: z.string().min(1, 'Interest Rate is required'),
    tlFacilityRepayPeriod: DropDownItemSchema.nullable(),
    tlFacilityRepayPeriodOther: z.string().optional(),
    tlFacilityRepayAccount: z.string().optional(),
    tlFacilityRepayCurrency: DropDownItemSchema.nullable(),
    tlFacilityRequiredAmountFigs: z
        .string()
        .min(1, 'Required Amount (Figures) is required'),
    tlFacilityRequiredAmountWords: z
        .string()
        .min(1, 'Required Amount (Words) is required'),
    tlFacilityExpDate: DayjsSchema.nullable(),
    tlFacilityCreditAccount: z.string().optional(),
    tlFacilityCreditingCurrency: DropDownItemSchema.nullable(),
    tlFacilityPurpose: z.string().min(1, 'Purpose is required'),
});

// Step 3 Schema: Lien Details
const step3Schema = z.object({
    lienAccountNumber: z.string().min(1, 'Lien Account Number is required'),
    lienAccountCurrency: DropDownItemSchema.nullable(),
    lienAccountName: z.string().min(1, 'Lien Account Name is required'),
    lienAccountInterest: z.string().min(1, 'Lien Account Interest is required'),
    lienAccountMatureDate: DayjsSchema.nullable(),
    lienAccountBalance: z.string().min(1, 'Lien Account Balance is required'),
    lienAccountAmount: z.string().min(1, 'Lien Account Amount is required'),
    lienAccountApplicableLtv: z.string().min(
        1,
        'Applicable LTV is required'
    ),
});

// Main Schema with Conditional Validation Based on currentStep
const mainSchema = z
    .object({
        currentStep: z.number().min(0).max(3),
        // Include all fields, but they are optional in the main schema
        // Step 0 Fields
        applicationType: DropDownItemSchema.nullable().optional(),
        termLoanType: DropDownItemSchema.nullable().optional(),
        overDraftType: DropDownItemSchema.nullable().optional(),
        primaryTitle: DropDownItemSchema.nullable().optional(),
        primaryName: z.string().optional(),
        primaryEmail: z.string().email().optional(),
        primaryOccupation: z.string().optional(),
        primaryMobile: z.string().optional(),
        primaryResTelNo: z.string().optional(),
        primaryNicPP: z.string().optional(),
        primaryDob: DayjsSchema.nullable().optional(),
        primaryResAddress1: z.string().optional(),
        primaryResAddress2: z.string().optional(),
        primaryResAddress3: z.string().optional(),
        primaryMonthlyIncome: z.string().optional(),
        primaryResStatus: z.string().optional(),
        primaryMasterNumber: z.string().optional(),
        primaryNationality: z.string().optional(),
        // Step 1 Fields
        jointTitle: DropDownItemSchema.nullable().optional(),
        jointName: z.string().optional(),
        // jointEmail: z.string().email().optional(),
        jointOccupation: z.string().optional(),
        jointMobile: z.string().optional(),
        jointResTelNo: z.string().optional(),
        jointNicPP: z.string().optional(),
        jointDob: DayjsSchema.nullable().optional(),
        jointResAddress1: z.string().optional(),
        jointResAddress2: z.string().optional(),
        jointResAddress3: z.string().optional(),
        jointMonthlyIncome: z.string().optional(),
        jointResStatus: z.string().optional(),
        jointNationality: z.string().optional(),
        jointMasterNumber: z.string().optional(),
        jointRelationshipWithPrimary: z.string().optional(),
        // Step 2 Fields
        date: DayjsSchema.nullable().optional(),
        customerMaster: z.string().optional(),
        branch: DropDownItemSchema.nullable().optional(),
        armCode: z.string().optional(),
        segmentCode: z.string().optional(),
        isRenewAnnually: z.boolean().nullable().optional(),
        odFacilityAccount: z.string().optional(),
        odFacilityCurrency: DropDownItemSchema.nullable().optional(),
        odFacilityExpDate: DayjsSchema.nullable().optional(),
        odFacilityInterestRate: z.string().optional(),
        odFacilityExcessRate: z.string().optional(),
        odFacilityRequiredAmountFigs: z.number().nullable().optional(),
        odFacilityRequiredAmountWords: z.string().optional(),
        odFacilityPurpose: z.string().optional(),
        tlFacilityAccount: z.string().optional(),
        tlFacilityCurrency: DropDownItemSchema.nullable().optional(),
        tlFacilityInterestRate: z.string().optional(),
        tlFacilityRepayPeriod: DropDownItemSchema.nullable().optional(),
        tlFacilityRepayPeriodOther: z.string().optional(),
        tlFacilityRepayAccount: z.string().optional(),
        tlFacilityRepayCurrency: DropDownItemSchema.nullable().optional(),
        tlFacilityRequiredAmountFigs: z.string().optional(),
        tlFacilityRequiredAmountWords: z.string().optional(),
        tlFacilityExpDate: DayjsSchema.nullable().optional(),
        tlFacilityCreditAccount: z.string().optional(),
        tlFacilityCreditingCurrency: DropDownItemSchema.nullable().optional(),
        tlFacilityPurpose: z.string().optional(),
        // Step 3 Fields
        lienAccountNumber: z.string().optional(),
        lienAccountCurrency: DropDownItemSchema.nullable().optional(),
        lienAccountName: z.string().optional(),
        lienAccountInterest: z.string().optional(),
        lienAccountMatureDate: DayjsSchema.nullable().optional(),
        lienAccountBalance: z.string().optional(),
        lienAccountAmount: z.string().optional(),
        lienAccountApplicableLtv: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        switch (data.currentStep) {
            case 0: {
                const step0Validation = step0Schema.safeParse(data);
                if (!step0Validation.success) {
                    step0Validation.error.errors.forEach((err) => {
                        ctx.addIssue({
                            path: err.path,
                            message: err.message,
                            code: 'custom',
                        });
                    });
                }
                break;
            }
            case 1: {
                const step1Validation = step1Schema.safeParse(data);
                if (!step1Validation.success) {
                    step1Validation.error.errors.forEach((err) => {
                        ctx.addIssue({
                            path: err.path,
                            message: err.message,
                            code: 'custom',
                        });
                    });
                }
                break;
            }
            case 2: {
                const step2Validation = step2Schema.safeParse(data);
                if (!step2Validation.success) {
                    step2Validation.error.errors.forEach((err) => {
                        ctx.addIssue({
                            path: err.path,
                            message: err.message,
                            code: 'custom',
                        });
                    });
                }
                break;
            }
            case 3: {
                const step3Validation = step3Schema.safeParse(data);
                if (!step3Validation.success) {
                    step3Validation.error.errors.forEach((err) => {
                        ctx.addIssue({
                            path: err.path,
                            message: err.message,
                            code: 'custom',
                        });
                    });
                }
                break;
            }
            default:
                ctx.addIssue({
                    path: ['currentStep'],
                    message: 'Invalid step',
                    code: 'custom',
                });
        }
    });

export { mainSchema, step0Schema, step1Schema, step2Schema, step3Schema };
