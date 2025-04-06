import React, { useEffect, useState } from "react";
import { DocumentInfo } from "../../../../types/DocumentInfo";
import { EncodeUrlPath } from "../../../../../../@helpers/RetriveFiles";
import { Button } from "@mui/material";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";

interface DocumentViewProps {
  document: DocumentInfo | null;
}

const DocumentView: React.FC<DocumentViewProps> = ({ document }) => {
  const [blobObj, setBlobObj] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);

  // fetch selected file
  const fetchFile = async () => {
    const fileUrl = EncodeUrlPath(document?.path);
    if (!fileUrl) return;

    try {
      const response = await fetch(fileUrl, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      setBlobObj(blob);
      const blobType = document?.type;

      // For text-based files, we read the text content
      if (blobType === "txt" || blobType === "xml") {
        const text = await blob.text();
        setTextContent(text);
      } else {
        setBlobUrl(URL.createObjectURL(blob)); // Create URL for other file types
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchFile();

    // Cleanup the blob URL when the component is unmounted or updated
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [document]);

  return (
    <div>
      <div className="text-left mb-5 border-b-1 border-b-gray-200 ml-4">
        <h1 className="text-sm font-600 text-blue-900 ">
          Document - {document?.name}
        </h1>
      </div>
      {blobObj && (
        <div className="w-full flex items-center justify-center">
          {document?.type === "pdf" && (
            <iframe
              src={blobUrl || ""}
              className="border-none h-xs"
              width="100%"
              title="PDF Document Viewer"
            />
          )}
          {(document?.type === "jpeg" || document?.type === "png") && (
            <img
              src={blobUrl || ""}
              alt={document?.name || "Document"}
              className="max-w-full h-auto"
            />
          )}
          {(document?.type === "txt" || document?.type === "xml") && (
            <pre className="text-left p-4 bg-gray-100 overflow-auto w-full">
              {textContent}
            </pre>
          )}
          {(document?.type === "xls" ||
            document?.type === "xlsx" ||
            document?.type === "doc" ||
            document?.type === "docx") && (
            <div className="flex flex-col gap-12 items-center">
              <div className="w-xs h-xs flex flex-col items-center justify-center text-md gap-12">
                <EdgeSvgIcon size={40}>feather:eye-off</EdgeSvgIcon>
                The preview is not available for this type of file.
                <a
                  href={blobUrl || ""}
                  download={document?.name}
                  className=" flex flex-row gap-9 items-center"
                >
                  <Button>
                    Download <EdgeSvgIcon>feather:download</EdgeSvgIcon>
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentView;
