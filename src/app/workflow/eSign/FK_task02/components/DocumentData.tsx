import { DocumentInfo } from "../../../../core/types/DocumentInfo";

export interface DocumentData {
    id: string;
    fileName?: string;
    documentName?: string;
    documentType?: string;
    customerName?: string;
    createDate?: string;
    acNumber?: string;
    nic?: string;
    branchName?: string;
    oldDocument: DocumentInfo;
    newDocument: DocumentInfo;
  }