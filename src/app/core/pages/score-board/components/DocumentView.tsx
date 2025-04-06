import { ChangeEvent, FC, useEffect, useState } from "react";
import { Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";

import { DocumentInfo } from "../../../types/DocumentInfo";
import { ScoreBoardProcess } from "../../../types/ScoreBoardProcess";
import { Pageable } from "../../../../../api/types/Pageable";
import RetriveFile, {
  EncodeUrlPath,
} from "../../../../../@helpers/RetriveFiles";
import DocumentCard from "../../../../../@core/ui/Ve3DocumentCard";

type DocumentViewProps = {
  documentList: Pageable<DocumentInfo> | null;
  process: ScoreBoardProcess | null;
  page: number;
  setPage: (v: number) => void;
};

const DocumentView: FC<DocumentViewProps> = (props) => {
  const { documentList, process, page, setPage } = props;

  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null
  );
  const [blobObj, setBlobObj] = useState<Blob | null>(null);

  const FileUrl = EncodeUrlPath(selectedDocument?.path);

  const fetchFile = async () => {
    if (!FileUrl) return;

    // setLoading(true);

    try {
      const response = await fetch(FileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      setBlobObj(blob);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchFile();
  }, [selectedDocument]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  const handleDocumentClick = (document: DocumentInfo) => {
    setSelectedDocument(document);
  };

  if (documentList === null || process === null) {
    return;
  }

  return (
    <div className="bg-white p-0  px-3">
      <Typography className="text-12 text-red-700 font-semibold tracking-tight leading-none flex items-center">
        <img
          src={
            process?.processLogo
              ? RetriveFile(process.processLogo)
              : "assets/icons/workflow/PF (20).png"
          }
          className="h-32 pr-6"
          alt="workflow-logo"
        />
        {process.processName}
      </Typography>

      <div className="w-full flex gap-12 m-w-0 h-max-full	p-0 flex-col sm:flex-row">
        <Box className="flex flex-col w-full sm:w-1/3">
          <Typography className="my-6 text-14 text-orange-900 whitespace-nowrap">
            Documents ({documentList.totalElements})
          </Typography>
          <Typography className="text-[14px] font-semibold text-grey-700">
            {moment().format("dddd")}{" "}
          </Typography>
          <Typography className="text-[14px] text-gray-400">
            {moment().format("MMMM DD, YYYY")}{" "}
          </Typography>
          <div className="">
            {documentList.content.map((item, index) => (
              <DocumentCard
                key={index}
                document={item}
                handleDocumentClick={handleDocumentClick}
              />
            ))}
            <div className="flex justify-center sm:justify-start items-center my-6 ">
              <Pagination
                count={documentList.totalPages}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </Box>
        <Box className="flex flex-col w-full sm:w-2/3">
          {selectedDocument ? (
            <div className="p-4">
              <Typography className="text-xs font-semibold mb-4 text-wrap">
                {selectedDocument.name}
              </Typography>
              {selectedDocument.type === "png" ||
                selectedDocument.type === "jpg" ||
                // selectedDocument.type === "pdf" ||
                selectedDocument.type === "jpeg" ? (
                // <iframe
                //   src={RetriveFile(selectedDocument.path)}
                //   width="100%"
                //   height="500px"
                //   title={selectedDocument.name}
                // ></iframe>
                <img
                  src={RetriveFile(selectedDocument.path)}
                  alt={selectedDocument.name}
                  className="w-full h-auto"
                  style={{ maxHeight: "500px" }}
                />
              ) : (
                blobObj && (
                  <div className="w-full flex items-center justify-center">
                    <iframe
                      src={window.URL.createObjectURL(blobObj)}
                      className="border-none"
                      width="100%"
                      height="500px"
                      title="Document Viewer"
                    />
                  </div>
                )
              )}
            </div>
          ) : (
            <textarea
              className="w-full border-2 border-gray-300 rounded p-16 resize-none"
              rows={18}
              cols={70}
              placeholder="No Document Selected"
            />
          )}
        </Box>
      </div>
    </div>
  );
};

export default DocumentView;
