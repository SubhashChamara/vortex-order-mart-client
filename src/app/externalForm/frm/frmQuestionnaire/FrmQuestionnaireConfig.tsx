import { lazy } from "react";
import { ExternalFormConfigType } from "../../../core/types/ExternalFormConfigType";


const FrmQuestionnaireConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "fRMQuestionnaire",
};

export default FrmQuestionnaireConfig;
