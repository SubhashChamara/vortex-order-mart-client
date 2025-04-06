import { lazy } from "react";

import { ExternalFormConfigType } from "../../core/types/ExternalFormConfigType";

const CreditLimitIncreaseConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "creditLimitIncrease",
};

export default CreditLimitIncreaseConfig;
