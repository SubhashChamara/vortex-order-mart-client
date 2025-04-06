export interface EyeballingDataEntryDataInfo {
    nicCribFile1: string | null;
    nicDataEntry: string | null;
    nicCribFile2: string | null;
    reportedNames: string[];
    mailingAddresses: string[];
    permanentAddresses: string[];
    employeeNames: string[];
    customerType: CustomerType;
    resTelCrib1: string | null
    resTelCrib2: string | null
    mobTelCrib1: string | null
    mobTelCrib2: string | null
    offTelCrib1: string | null
    offTelCrib2: string | null
    salary: number | null;
    dob: string | null
}

export interface CustomerType {
    active: boolean;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
    id: number;
    name: string;
}

/**
 * 
 * {
    "nicCribFile1": "941622461v",
    "nicDataEntry": "941622461V",
    "nicCribFile2": null,
    "reportedNames": [
        "MOHAMED ILHAAM HARRIS"
    ],
    "mailingAddresses": [
        "C/E/5/22 RANPOKUNAGAMA, NITTAMBUWA, GAMPHA"
    ],
    "permanentAddresses": [
        "C/E/5/22 RANPOKUNAGAMA, NITTAMBUWA, GAMAPHA"
    ],
    "employeeNames": [
        "STANDARD CHARTERD",
        "EX HDPL STAFF",
        "STANDARD CHARTERD"
    ],
    "customerType": {
        "active": true,
        "createdBy": "SYSTEM",
        "createdDate": "2024-09-27T15:55:54",
        "updatedBy": null,
        "updatedDate": null,
        "id": 4,
        "name": "NON-RESIDENT"
    },
    "resTelCrib1": "941124800223",
    "resTelCrib2": null,
    "mobTelCrib1": "0773316222",
    "mobTelCrib2": null,
    "offTelCrib1": null,
    "offTelCrib2": null
}
 */