import { ExternalFormConfigType } from "../app/core/types/ExternalFormConfigType";
import ExternalFormConfig from "../app/externalForm/ExternalFormConfig";

const filterComponent = (
    idProcess: string,
): ExternalFormConfigType | null => {
    const conf = ExternalFormConfig.find(
        (config) => config.idProcess === idProcess
    );

    if (conf) return conf;
    return null;
};

export default filterComponent;
