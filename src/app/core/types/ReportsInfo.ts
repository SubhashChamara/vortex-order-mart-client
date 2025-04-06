import { Report } from "./Report";

export interface ReportsInfo {
    name: any;
    process: {
        id: string;
        name: string;
        processDefinitionKey: string;
        logo?: string;
    };
    reports: Report[];
}