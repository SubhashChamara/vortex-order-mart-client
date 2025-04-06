import { ComponentType, LazyExoticComponent } from "react";

export interface ExternalFormConfigType {
    name?: string;
    description?: string;
    component: LazyExoticComponent<ComponentType<any>>;
    idProcess: string;
}
