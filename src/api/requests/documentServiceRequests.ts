import { DocumentInfo } from "../../app/core/types/DocumentInfo";
import { Request } from "../api/Request";
import { Pageable } from "../types/Pageable";
import { DocumentListParams } from "../types/params/DocumentListParams";

export const documentServiceRequests = () => {
  const prefix = "document";

  return {
    /**
     * Upload Documents
     *
     * @param formData Form data containing file / taskInsatnce / processInstance
     * @returns DocumentInfo
     */
    upload: (formData: FormData) =>
      Request.POST<DocumentInfo>(`${prefix}/archive`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    list: (params: DocumentListParams) =>
      Request.GET<Pageable<DocumentInfo>>(`${prefix}/archive/list`, {
        params: params,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    download: (path: string) =>
      Request.GET<Blob>(`${prefix}/archive/${path}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          responseType: "blob",
        },
      }),
  };
};
