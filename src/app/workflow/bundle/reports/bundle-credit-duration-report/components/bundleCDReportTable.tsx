import { Pagination, Paper } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import { Pageable } from "../../../../../../api/types/Pageable";
import { BundleCD } from "../../../../../core/types/reports/BundleCD";



type ReportFiltersProps = {
    getBundledCDTableData: Pageable<BundleCD> | null;
    setPage: (v: number) => void;
    page: number;
};

const bundleCDReportTable: FC<ReportFiltersProps> = ({ getBundledCDTableData, setPage, page }) => {

    const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
        setPage(page - 1);
    };


    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    return (
        <Paper className="w-full overflow-hidden p-12">
            <div>
                {getBundledCDTableData?.content.length === 0 ? (
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
                                            Bundled
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full overflow-x-auto">
                            <table id="my-table" className="w-full whitespace-no-wrap">
                                <thead>
                                    <tr className="whitespace-nowrap divide-x-1">
                                        <th className="p-6 text-left">WF REF#</th>
                                        <th className="p-6 text-left">ECAPS REF</th>
                                        <th className="p-6 text-left">CUSTOMER SOURCE TYPE</th>
                                        <th className="p-6 text-left">APPLICANT NIC</th>
                                        <th className="p-6 text-left">APPLICANT NAME</th>
                                        <th className="p-6 text-left">INITIATOR NAME</th>
                                        <th className="p-6 text-left">INITIATED DATE</th>
                                        <th className="p-6 text-left">PEND USER</th>
                                        <th className="p-6 text-left">VERIFICATOR</th>
                                        <th className="p-6 text-left">EXT. VERIFICATOR</th>
                                        <th className="p-6 text-left">APPROVER L1/L2/L3</th>
                                        <th className="p-6 text-left">DURATION (DAYS)</th>
                                    </tr>

                                </thead>
                                <tbody className="bg-white whitespace-nowrap">
                                    {getBundledCDTableData?.content.map((process, index) => (
                                        <tr
                                            className="text-black h-full bg-white shadow-2"
                                            key={index}
                                            style={{ borderSpacing: "10px" }}
                                        >
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold">{process.workFlowId}</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">{process.eCapsRef}</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">{process.customerSourceType}</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">{process.applicantNIC}</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">{process.applicantName}</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">{process.createdBy}</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">{process.initDate}</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">-</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">{process.verificatorUsername}</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">-</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">{process.approvedSecondFullName}</p>
                                            </td>
                                            <td className="p-6 text-[12px] align-middle text-left">
                                                <p className="text-[12px] text-gray">{process.duration}</p>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <Pagination
                                count={getBundledCDTableData?.totalPages}
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

export default bundleCDReportTable;
