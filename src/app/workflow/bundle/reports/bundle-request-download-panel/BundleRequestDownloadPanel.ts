import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const BundleRequestDownloadPanel: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "bundle-request-download-panel",
    keyForm: "bundled"
};

export default BundleRequestDownloadPanel;