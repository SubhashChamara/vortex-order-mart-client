import { lazy } from "react";

import { ExternalFormConfigType } from "../../core/types/ExternalFormConfigType";

const ModifyUserConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "modifyUser",
};

export default ModifyUserConfig;
