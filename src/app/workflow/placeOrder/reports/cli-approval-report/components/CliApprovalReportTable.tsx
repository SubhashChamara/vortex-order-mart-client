import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Pagination,
  Paper,
} from "@mui/material";
import { Pageable } from "../../../../../../api/types/Pageable";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import { CliApprovalReportIf } from "../../../../../core/types/reports/CliApprovalReport";
import { Api } from "../../../../../../api/Api";
import dayjs from "dayjs";
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

interface ProcessTableProps {
  cliReportList: Pageable<CliApprovalReportIf> | null;
  startDate: String | null;
  endDate: String | null;
  setPage: (v: number) => void;
  page: number;
}

const CliReportTable: FC<ProcessTableProps> = (props) => {
  const { cliReportList, startDate, endDate, setPage, page } = props;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [openPreview, setOpenPreview] = useState(false);

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("md"));

  const formatCardNumber = (value: string) => {
    if (value) {
      return value
        .replace(/\s+/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim();
    } else {
      return value;
    }
  };

  const formatCurrency = (value: string) => {
    if (!value) return value;

    let cleanedValue = value.replace(/[^0-9.]/g, "");

    if (cleanedValue.includes(".")) {
      const [integer, decimal] = cleanedValue.split(".");
      cleanedValue = `${integer}.${(decimal + "00").slice(0, 2)}`;
    } else {
      cleanedValue = `${cleanedValue}.00`;
    }

    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // const generatePDF = async (preview: boolean = false): Promise<void> => {

  //   // const { data, err } = await Api.performRequest((r) =>
  //   //   r.reports.getAllCliReport(
  //   //     startDate,
  //   //     endDate,
  //   //   )
  //   // );

  //   // Create PDF in landscape orientation
  //   const doc = new jsPDF({
  //     orientation: 'landscape',
  //     unit: 'pt'
  //   });

  //   // Configure table columns and styling
  //   const tableConfig = {
  //     head: [[
  //       'Ref#', 'Card Number', 'Branch', 'Previous Limit', 'New Limit',
  //       'Enhancement Fee', 'New Card Type', 'CLI Type', 'Category',
  //       'Evaluated On', 'DBR', 'MUE[ON US]', 'MUE[OFF US]',
  //       'Verified By', 'Approved By', 'Approved Level', 'Status'
  //     ]],
  //     body: cliReportList?.content.map(process => [
  //       process.id,
  //       formatCardNumber(process.cardNumber),
  //       process.branch,
  //       formatCurrency(process.presentLimit?.toString()),
  //       formatCurrency(process.newLimit?.toString()),
  //       formatCurrency(process.enhancementFee?.toString()),
  //       process.newCardTypeUW,
  //       process.cardType,
  //       process.category,
  //       moment(process.evaluatedOn).format("YYYY-MM-DD"),
  //       formatCurrency(process.dbr?.toString()),
  //       formatCurrency(process.mueOnUs?.toString()),
  //       formatCurrency(process.mueOffUs?.toString()),
  //       process.verificationCompletedUser,
  //       process.approvedUser,
  //       process.approvedLevel,
  //       process.processStatus
  //     ]),
  //     styles: {
  //       fontSize: 8,
  //       cellPadding: 1
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 20 },  // Ref#
  //       1: { cellWidth: 40 },  // Card Number
  //       2: { cellWidth: 40 },  // Branch
  //       3: { cellWidth: 40 },  // Previous Limit
  //       4: { cellWidth: 40 },  // New Limit
  //       5: { cellWidth: 40 },  // Enhancement Fee
  //       6: { cellWidth: 50 },  // New Card Type
  //       7: { cellWidth: 50 },  // CLI Type
  //       8: { cellWidth: 40 },  // Category
  //       9: { cellWidth: 45 },  // Evaluated On
  //       10: { cellWidth: 40 }, // DBR
  //       11: { cellWidth: 40 }, // MUE[ON US]
  //       12: { cellWidth: 40 }, // MUE[OFF US]
  //       13: { cellWidth: 45 }, // Verified By
  //       14: { cellWidth: 45 }, // Approved By
  //       15: { cellWidth: 45 }, // Approved Level
  //       16: { cellWidth: 45 }  // Status
  //     },
  //     headStyles: {
  //       fillColor: [200, 200, 200],
  //       textColor: 20,
  //       fontSize: 8,
  //       halign: 'left',
  //       fontStyle: 'bold',
  //       cellPadding: 2
  //     },
  //   };

  //   const title = 'Credit Limit Increase Report';

  //   // Add the table
  //   autoTable(doc, {
  //     ...tableConfig,
  //     startY: 60,
  //     margin: { top: 60, right: 20, bottom: 40, left: 20 },
  //     didDrawPage: (data) => {
  //       doc.setFontSize(12);
  //       doc.text(title, 20, 30);
  //       // Add page numbers
  //       doc.setFontSize(8);
  //       doc.text(
  //         `Page ${data.pageNumber} of ${data.pageCount}`,
  //         doc.internal.pageSize.width - 100,
  //         doc.internal.pageSize.height - 30
  //       );

  //       // Add timestamp to each page
  //       const timestamp = `Generated: ${moment().format('YYYY-MM-DD HH:mm:ss')}`;
  //       doc.text(timestamp, 40, doc.internal.pageSize.height - 30);

  //     },
  //     willDrawCell: (data) => {
  //       // Align numerical values to right
  //       const col = data.column.index;
  //       if ([3, 4, 5, 10, 11, 12].includes(col)) {
  //         data.cell.styles.halign = 'right';
  //       }
  //     },

  //     body: tableConfig.body?.map((row) =>
  //       row.map((cell) => (typeof cell === 'string' ? cell : String(cell)))
  //     ),
  //     headStyles: {
  //       fillColor: [200, 200, 200],
  //       textColor: 20,
  //       fontSize: 8,
  //       fontStyle: 'bold'
  //     },
  //   });

  //   if (preview) {
  //     // Generate preview URL
  //     const pdfBlob = doc.output('blob');
  //     const url = URL.createObjectURL(pdfBlob);
  //     setPreviewUrl(url);
  //     setOpenPreview(true);
  //   } else {
  //     // Download PDF
  //     doc.save('credit-limit-increase-report.pdf');
  //   }
  // };

  // const handleClosePreview = () => {
  //   setOpenPreview(false);
  //   if (previewUrl) {
  //     URL.revokeObjectURL(previewUrl);
  //     setPreviewUrl(null);
  //   }
  // };

  if (cliReportList === null) {
    return null;
  }

  return (
    <Paper className="w-full overflow-hidden p-12">
      <div>
        {cliReportList.content.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-red-600 text-14 font-bold">
              No records found for the selected date range
            </p>
          </div>
        ) : (
          <div>
            <div className="text-xs font-semibold tracking-wide text-left border-b">
              <div className="pb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm text-red-600 font-600">
                      Search Results
                    </div>
                    <div className="text-[12px] font-600 text-gray">
                      Credit Limit Increase Approval Report for the selected
                      date range
                    </div>
                  </div>
                </div>
                {/* <div className="flex gap-2 mt-4">
                  <Button variant="outlined" onClick={() => generatePDF(true)}>
                    Preview PDF
                  </Button>
                  <Button variant="contained" onClick={() => generatePDF(false)}>
                    Download PDF
                  </Button>
                </div> */}
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table id="my-table" className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="whitespace-nowrap divide-x-1">
                    <th className="p-6 text-left">Ref#</th>
                    <th className="p-6 text-left">Card Number</th>
                    <th className="p-6 text-left">Invoker Branch</th>
                    <th className="p-6 text-left">Previous Limit</th>
                    <th className="p-6 text-left">New Limit</th>
                    <th className="p-6 text-left">Enhancement Fee</th>
                    <th className="p-6 text-left">New Card Type</th>
                    <th className="p-6 text-left">CLI Type</th>
                    <th className="p-6 text-left">Category</th>
                    <th className="p-6 text-left">Evaluated On</th>
                    <th className="p-6 text-left">DBR</th>
                    <th className="p-6 text-left">MUE[ON US]</th>
                    <th className="p-6 text-left">MUE[OFF US]</th>
                    <th className="p-6 text-left">Verified By</th>
                    <th className="p-6 text-left">Approved By</th>
                    <th className="p-6 text-left">Approved Level</th>
                    <th className="p-6 text-left">Process Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white whitespace-nowrap">
                  {cliReportList?.content.map((process, index) => (
                    <tr
                      className="text-black h-full bg-white shadow-2"
                      key={index}
                      style={{ borderSpacing: "10px" }}
                    >
                      <td className="p-6 text-[12px] align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.refNum}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCardNumber(process.cardNumber)}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.branch}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.presentLimit?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.newLimit?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.enhancementFee?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.newCardTypeUW}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.cardType}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.category}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.evaluatedOn}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.dbr?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.mueOnUs?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.mueOffUs?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.verificationCompletedUser}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.approvedUser}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.approvedLevel}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p
                          className={`text-[12px] font-bold ${
                            process.status === "Completed"
                              ? "text-green-700"
                              : process.status === "Pending"
                              ? "text-yellow-800"
                              : "text-red-600"
                          }`}
                        >
                          {process.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <Dialog
                  open={openPreview}
                  onClose={handleClosePreview}
                  maxWidth="lg"
                  fullWidth
                >
                  <DialogContent>
                    {previewUrl && (
                      <iframe
                        src={previewUrl}
                        style={{ width: '100%', height: '70vh' }}
                        title="PDF Preview"
                      />
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClosePreview}>Close</Button>
                    <Button
                      variant="contained"
                      onClick={() => generatePDF(false)}
                    >
                      Download
                    </Button>
                  </DialogActions>
                </Dialog> */}
            </div>
            <div className="flex items-center justify-center mt-4">
              <Pagination
                count={cliReportList.totalPages}
                siblingCount={0}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </Paper>
  );
};

export default CliReportTable;
