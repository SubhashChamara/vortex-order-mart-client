import { lazy } from "react";
import { ExternalFormConfigType } from "../../core/types/ExternalFormConfigType";

const UserRoleAllocationConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "userRoleAllocationFlow",
};

export default UserRoleAllocationConfig;
