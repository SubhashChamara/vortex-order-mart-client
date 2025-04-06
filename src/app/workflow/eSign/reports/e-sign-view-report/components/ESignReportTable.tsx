import { ChangeEvent, FC, useEffect, useState } from "react";
import { Pageable } from "../../../../../../api/types/Pageable";
import { ESignReportInfo } from "../models/ESignReportInfo";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Pagination, Paper, Tooltip } from "@mui/material";
import { EncodeUrlPath } from "../../../../../../@helpers/RetriveFiles";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import CloseIcon from '@mui/icons-material/Close';

interface ESignReportTableProps {
  eSignReportList: Pageable<ESignReportInfo> | null;
  setPage: (page: number) => void;
  page: number;
  branchList: { id: number; name: string }[];
}

const ESignReportTable: FC<ESignReportTableProps> = ({ eSignReportList, setPage, page,branchList }) => {
  const handlePageChange = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<string | null>(null);
  const [blobObj, setBlobObj] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  if (!eSignReportList) {
    return null;
  }

  const fetchFile = async (filePath: string, type: string | undefined) => {
    const fileUrl = EncodeUrlPath(filePath);
    console.log("fileUrl", fileUrl);
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
      setBlobUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  useEffect(() => {
    if (currentDocument) {
      fetchFile(currentDocument, "pdf");
    }
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [currentDocument]);

  const handleViewDocument = (doc: string) => {
    setCurrentDocument(doc);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentDocument(null);
    setBlobObj(null);
    setBlobUrl(null);
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  

  return (
    <Paper className="w-full overflow-hidden p-12">
      {eSignReportList.content.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-red-600 text-14 font-bold">No records found for the selected date range</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-red-600 font-600">Search Results</p>
              <p className="text-xs text-gray-600">E-Sign Report for the selected date range</p>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="whitespace-nowrap divide-x">
                  <th className="p-6 text-left">Wf REF</th>
                  <th className="p-6 text-left">DATE</th>
                  <th className="p-6 text-left">DOC NAME</th>
                  <th className="p-6 text-left">TYPE</th>
                  <th className="p-6 text-left">BRANCH</th>
                  <th className="p-6 text-left">CUSTOMER NAME</th>
                  <th className="p-6 text-left">NIC</th>
                  <th className="p-6 text-left">ACCOUNT NO.</th>
                  <th className="p-6 text-left">CARD NO.</th>
                  <th className="p-6 text-left">INVOKER</th>
                  <th className="p-6 text-left">VIEW DOC</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {eSignReportList.content.map((report, index) => (
                  <tr key={index} className="text-black">
                    <td className="p-6 text-[12px] align-middle text-left">
                      <p className="text-[12px] text-gray font-bold"> {report.wfr} </p>
                    </td>
                    <td className="p-6 text-[12px] align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">{formatDate(report.date)} </p>
                    </td>
                    <td className="p-6 text-[12px] align-middle text-left">
                      <p className="text-[12px] text-gray font-bold"> {report.docName} </p>
                    </td>
                    <td className="p-6 text-[12px] align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">   {report.type} </p>
                    </td>
                    <td className="p-6 align-middle text-left">
                  <p className="text-[12px] text-gray font-bold">
                    {branchList.find(branch => branch.id === report?.branch)?.name || "N/A"}
                  </p>
                </td>
                    <td className="p-6 text-[12px] align-middle text-left">
                      <p className="text-[12px] text-gray font-bold"> {report.customerName} </p>
                    </td>
                    <td className="p-6 text-[12px] align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">{report.nic} </p>
                    </td>
                    <td className="p-6 text-[12px] align-middle text-left">
                      <p className="text-[12px] text-gray font-bold"> {report.accNumber} </p>
                    </td>
                    <td className="p-6 text-[12px] align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">{report.cardNumber} </p>
                    </td>
                    <td className="p-6 text-[12px] align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">{report.invoker} </p>
                    </td>
                    <td className="p-6 text-[12px] align-middle text-left">
                      <Button
                        variant="outlined"
                        className="px-14 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                        onClick={() => report.viewDoc && handleViewDocument(report.viewDoc)}
                      >
                        <Tooltip title="View Document">
                          <div className="flex items-center justify-center space-x-2">
                            <EdgeSvgIcon className="text-blue-500">heroicons-outline:document-text</EdgeSvgIcon>
                            <p className="text-[12px] text-gray font-bold">View Doc</p>
                          </div>
                        </Tooltip>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mt-4">
            <Pagination
              count={eSignReportList.totalPages}
              page={page + 1}
              onChange={handlePageChange}
              siblingCount={0}
            />
          </div>
        </>
      )}
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

export default ESignReportTable;
