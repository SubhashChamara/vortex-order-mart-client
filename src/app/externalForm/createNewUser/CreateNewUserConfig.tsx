import { lazy } from "react";

import { ExternalFormConfigType } from "../../core/types/ExternalFormConfigType";

const CreateNewUserConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "createNewUser",
};

export default CreateNewUserConfig;
