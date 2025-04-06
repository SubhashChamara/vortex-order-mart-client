import { Divider, Pagination, Paper } from "@mui/material";
import { ChangeEvent, FC, useEffect } from "react";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../@edgevantage/hooks";
import { Pageable } from "../../../../../api/types/Pageable";
import ReworkDetailsDto from "../@types/ReworkDetailsDto";


type ReportFiltersProps = {
    reworkData: Pageable<ReworkDetailsDto> | null;
    setPage: (v: number) => void;
    page: number;
};

const ReworkWorkflowDataTable: FC<ReportFiltersProps> = ({ reworkData, setPage, page }) => {
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
        setPage(page - 1);
    };

    useEffect(() => {

    }, []);

    return (
        <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
            <div className="text-xs font-semibold tracking-wide text-left">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-red-600 font-bold flex-col pl-6">
                        <div>Rework</div>
                        <div className="text-[12px] text-gray">
                            This provides rework workflow information
                        </div>
                    </div>
                </div>
            </div>
            <Divider/>
            <div className="w-full overflow-x-auto">
                <div>
                    {reworkData && reworkData.content.length > 0 ? (
                        <>
                            <div className="w-full overflow-x-auto">
                                <table id="my-table" className="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr className="whitespace-nowrap divide-x-1">
                                            <th className="p-6 text-left">Workflow</th>
                                            <th className="p-6 text-left">Workflow Ref</th>
                                            <th className="p-6 text-left">Username</th>
                                            <th className="p-6 text-left">Date of Return</th>
                                            <th className="p-6 text-left">Returned By</th>
                                            <th className="p-6 text-left">Return Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white whitespace-nowrap">
                                        {reworkData.content.map((item, index) => (
                                            <tr key={index} className="text-black h-full bg-white shadow-2">
                                                <td className="p-6 text-[12px] align-middle text-left">
                                                    <p className="text-[12px] text-gray font-bold">
                                                        {item.workflowName}
                                                    </p>
                                                </td>
                                                <td className="p-6 text-[12px] align-middle text-left">
                                                    <p className="text-[12px] text-gray font-bold">
                                                        {item.businessKey}
                                                    </p>
                                                </td>
                                                <td className="p-6 text-[12px] align-middle text-left">
                                                    <p className="text-[12px] text-gray font-bold">
                                                        {item.returnedUser}
                                                    </p>
                                                </td>
                                                <td className="p-6 text-[12px] align-middle text-left">
                                                    <p className="text-[12px] text-gray font-bold">
                                                        {item.returnedDate}
                                                    </p>
                                                </td>
                                                <td className="p-6 text-[12px] align-middle text-left">
                                                    <p className="text-[12px] text-gray font-bold">
                                                        {item.returnedUser}
                                                    </p>
                                                </td>
                                                <td className="p-6 text-[12px] align-middle text-left">
                                                    <p className="text-[12px] text-gray font-bold">
                                                        {item.returnedReason}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-center mt-4">
                                <Pagination
                                    count={reworkData.totalPages}
                                    siblingCount={0}
                                    page={page + 1}
                                    onChange={handlePageChange}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="mt-4 flex items-center justify-center">
                            <p className="text-14 font-bold">
                                No records found for the selected date range
                            </p>
                        </div>

                    )}
                </div>
            </div>
        </Paper>
    );


};

export default ReworkWorkflowDataTable;
