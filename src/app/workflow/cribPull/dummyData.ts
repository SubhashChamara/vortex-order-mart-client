import { InitiatingUnitType } from "./FK_task01/components/CribPullMethodForm";
import { DataEntryMethod, LeadType } from "./FK_task01/components/CribPullUserDetailsForm";

export const methodList: DataEntryMethod[] = [
    { id: "1", name: "Data Entry" },
    { id: "2", name: "CLI File Upload" },
    { id: "3", name: "Simple File Upload" },
    { id: "4", name: "EForm Upload" },
    { id: "5", name: "Lead Generation Upload" },
];

export const leadTypeList: LeadType[] = [
    { id: "1", name: "Loan" },
    { id: "2", name: "Credit Card" },
]

export const initiatingUnitList: InitiatingUnitType[] = [
    {
        id: 1,
        itemValue: "Employee Banking",
        itemLabel: "Employee Banking"
    },
    {
        id: 2,
        itemValue: "Tele Sales",
        itemLabel: "Tele Sales"
    },
    {
        id: 3,
        itemValue: "Branch",
        itemLabel: "Branch"
    },
    {
        id: 4,
        itemValue: "Credit",
        itemLabel: "Credit"
    },
    {
        id: 5,
        itemValue: "Collections",
        itemLabel: "Collections"
    },
    {
        id: 6,
        itemValue: "Branch - PRBC",
        itemLabel: "Branch - PRBC"
    },
    {
        id: 7,
        itemValue: "Other",
        itemLabel: "Other"
    }
]
