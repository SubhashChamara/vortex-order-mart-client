import { ComponentType, LazyExoticComponent } from "react";

export interface ExternalComponentConfigType {
    name?: string;
    description?: string;
    component: LazyExoticComponent<ComponentType<any>>;
    idPath: string;
}
