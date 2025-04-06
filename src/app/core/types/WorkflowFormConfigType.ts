import { ComponentType, LazyExoticComponent } from "react";

export interface WorkflowFormConfigType {
  name?: string;
  description?: string;
  component: LazyExoticComponent<ComponentType<any>>;
  idProcess: string;
  keyForm: string;
}
