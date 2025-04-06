import { ReportConfigType } from "../app/core/types/ReportConfigType";
import WorkflowReportsConfig from "../app/workflow/WorkflowReportsConfig";


const reportsFilterComponent = (
    idProcess: string,
    keyForm: string
): ReportConfigType | null => {

    const conf = WorkflowReportsConfig.find(
        (config) => config.idPath === idProcess && config.keyForm === keyForm
    );

    if (conf) return conf;
    return null;
};

export default reportsFilterComponent;
