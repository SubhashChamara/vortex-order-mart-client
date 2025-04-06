import { ExternalComponentConfigType } from "../app/core/types/ExternalComponentConfigType";
import ExternalComponentConfig from "../app/externalComponents/ExternalComponentConfig";

const filterExternalComponent = (idPath: string): ExternalComponentConfigType | null => {
    const conf = ExternalComponentConfig.find(
        (config) => config.idPath === idPath
    );

    if (conf) return conf;
    return null;
}

export default filterExternalComponent;
