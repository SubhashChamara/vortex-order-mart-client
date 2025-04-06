import { lazy } from "react";

import { ExternalFormConfigType } from "../../core/types/ExternalFormConfigType";

const DeleteUserConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "deleteUser",
};

export default DeleteUserConfig;
