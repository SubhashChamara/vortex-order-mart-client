import { lazy } from "react";

import { ExternalFormConfigType } from "../../core/types/ExternalFormConfigType";

const OverDraftConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "overDraft",
};

export default OverDraftConfig;
