import { BundleCribCriteriaInfo } from "./BundleCribCriteriaInfo";

export interface BundleCribpullInfo {
    criteriaAnalysisSummary: BundleCribCriteriaInfo[];
    ignoredFacilities: BundleCribCriteriaInfo[];
    nicPDFCribDocPath: string | null;
    eicPDFCribDocIdPath: string | null;
    passportPDFCribDocIdPath: string | null;
    isCribPassed: boolean | null;
}