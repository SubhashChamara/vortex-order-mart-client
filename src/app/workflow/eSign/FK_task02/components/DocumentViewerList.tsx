import { FC, memo, useEffect, useState } from "react";
import { Paper, Pagination, Button, Tooltip, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import CloseIcon from '@mui/icons-material/Close';
import { EncodeUrlPath } from "../../../../../@helpers/RetriveFiles";
import { DocumentData } from "./DocumentData";
import { DocumentInfo } from "../../../../core/types/DocumentInfo";
import { toast } from "react-toastify";

interface DocumentViewerListProps {
  documents: DocumentData | null;
  page: number;
  totalPages: number;
  onGeneratePDF: () => void;
  onPageChange: (newPage: number) => void;
  branchList: { id: number; name: string }[];
}

const DocumentViewerList: FC<DocumentViewerListProps> = ({
  documents,
  page,
  totalPages,
  onGeneratePDF,
  onPageChange,
  branchList,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<DocumentInfo | null>(null);
  const [blobObj, setBlobObj] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);

  const fetchFile = async (filePath: string, type: string | undefined) => {
    const fileUrl = EncodeUrlPath(filePath);
    if (!fileUrl) return;

    try {
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error("File could not be fetched.");
      }
      const blob = await response.blob();
      console.log("blob", blob);
      setBlobObj(blob);

      if (type === "txt" || type === "xml") {
        const text = await blob.text();
        setTextContent(text);
      } else {
        setBlobUrl(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  const handleGeneratePDF = async () => {
    await onGeneratePDF();
  };


  useEffect(() => {
    if (currentDocument?.path) {
      fetchFile(currentDocument.path, currentDocument.type);
    }
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [currentDocument]);

  const handleViewDocument = (doc: DocumentInfo, isNew: boolean) => {
    setCurrentDocument({ ...doc, type: isNew ? "new" : "old" });
    setOpenDialog(true);
  };

  const handlePageChange = (_event: any, newPage: number) => {
    onPageChange(newPage - 1);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentDocument(null);
    setBlobObj(null);
    setTextContent(null);
    setBlobUrl(null);
  };

  return (
    <Paper className="w-full overflow-hidden p-12">

      <div>
        <div className="text-xs font-semibold tracking-wide text-left border-b">
          <div className="pb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-red-600 font-600">Document List</div>
                <div className="text-[12px] font-600 text-gray">Manage your documents</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table id="document-table" className="w-full whitespace-no-wrap">
            <thead>
              <tr className="whitespace-nowrap divide-x-1">
                <th className="p-6 text-left">File Name</th>
                <th className="p-6 text-left">Document Name</th>
                <th className="p-6 text-left">Document Type</th>
                <th className="p-6 text-left">Customer</th>
                <th className="p-6 text-left">Created Date</th>
                <th className="p-6 text-left">Account Number</th>
                <th className="p-6 text-left">NIC</th>
                <th className="p-6 text-left">Branch Name</th>
                <th className="p-6 text-left">Generate PDF</th>
                <th className="p-6 text-left">Preview Documents</th>
              </tr>
            </thead>
            <tbody className="bg-white whitespace-nowrap">
              <tr
                className="text-black h-full bg-white shadow-2"
                key={documents?.id}
                style={{ borderSpacing: "10px" }}
              >
                <td className="p-6 text-[12px] align-middle text-left">
                  <p className="text-[12px] text-gray font-bold">{documents?.oldDocument.name || "N/A"}</p>
                </td>
                <td className="p-6 align-middle text-left">
                  <p className="text-[12px] text-gray font-bold">{documents?.documentName || "N/A"}</p>
                </td>
                <td className="p-6 align-middle text-left">
                  <p className="text-[12px] text-gray font-bold">{documents?.documentType || "N/A"}</p>
                </td>
                <td className="p-6 align-middle text-left">
                  <p className="text-[12px] text-gray font-bold">{documents?.customerName || "N/A"}</p>
                </td>
                <td className="p-6 align-middle text-left">
                  <p className="text-[12px] text-gray font-bold">{documents?.createDate || "N/A"}</p>
                </td>
                <td className="p-6 align-middle text-left">
                  <p className="text-[12px] text-gray font-bold">{documents?.acNumber || "N/A"}</p>
                </td>
                <td className="p-6 align-middle text-left">
                  <p className="text-[12px] text-gray font-bold">{documents?.nic || "N/A"}</p>
                </td>
                <td className="p-6 align-middle text-left">
                  <p className="text-[12px] text-gray font-bold">
                    {branchList.find(branch => branch.id === documents?.branch)?.name || "N/A"}
                  </p>
                </td>
                <td className="p-6 align-middle text-center">
                  <Button
                    variant="outlined"
                    className="px-14 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                    onClick={() => handleGeneratePDF()}
                    disabled={!!documents?.newDocument}
                  >
                    <Tooltip title="Generate PDF">
                      <div className="flex items-center justify-center space-x-2">
                        <EdgeSvgIcon className="text-green-500">heroicons-outline:document-download</EdgeSvgIcon>
                        <p className="text-[12px] text-gray font-bold">Generate</p>
                      </div>
                    </Tooltip>
                  </Button>
                </td>
                <td className="p-6 align-middle text-center">
                  <Button
                    variant="outlined"
                    className="px-14 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                    onClick={() => documents?.oldDocument && handleViewDocument(documents.oldDocument, false)}
                  >
                    <Tooltip title="View Old Document">
                      <div className="flex items-center justify-center space-x-2">
                        <EdgeSvgIcon className="text-blue-500">heroicons-outline:document-text</EdgeSvgIcon>
                        <p className="text-[12px] text-gray font-bold">Old Doc</p>
                      </div>
                    </Tooltip>
                  </Button>
                  <Button
                    variant="outlined"
                    className="ml-2 px-14 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                    onClick={() => documents?.newDocument && handleViewDocument(documents.newDocument, true)}
                  >
                    <Tooltip title="View New Document">
                      <div className="flex items-center justify-center space-x-2">
                        <EdgeSvgIcon className="text-red-500">heroicons-outline:document-report</EdgeSvgIcon>
                        <p className="text-[12px] text-gray font-bold">New Doc</p>
                      </div>
                    </Tooltip>
                  </Button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Pagination
            count={totalPages}
            siblingCount={0}
            page={page + 1}
            onChange={handlePageChange}
          />
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          Document Viewer
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {blobObj && (
            <div className="w-full flex items-center justify-center">

              <iframe
                src={blobUrl || ""}
                className="border-none h-xs"
                width="100%"
                title="PDF Document Viewer"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default DocumentViewerList;
