export interface ProcessCreateRequest {
    name: string;
    description: string;
    serviceUrl: string;
    defKey: string;
    processType: string;
    logo: string;
    validationClassName: string;
    labelGenerationClassName: string;
}