import { lazy } from "react";

import { ExternalFormConfigType } from "../../core/types/ExternalFormConfigType";

const UserRoleGroupAllocationConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "roleAllocationFlow",
};

export default UserRoleGroupAllocationConfig;
