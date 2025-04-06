import { LazyExoticComponent, ComponentType } from "react";

export interface ReportConfigType {
    name?: string;
    description?: string;
    component: LazyExoticComponent<ComponentType<any>>;
    idPath: string;
    keyForm: string;
}
