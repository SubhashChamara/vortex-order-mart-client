import { Paper, Typography, Grid, Box, Card, CardContent, Collapse, Button, IconButton, Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { TVReportDTO } from "../@types/CCPLProcessing";

type ReportFiltersProps = {
    processingData: TVReportDTO | null;
};

const BundleCCPLProcessing: FC<ReportFiltersProps> = ({ processingData }) => {
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const [getProcessingData, setProcessingData] = useState<TVReportDTO | null>(null);
   
     useEffect(() => {
            if (processingData) {
                setProcessingData(processingData);
            }
    
        }, [processingData]);
    

    return (
        <Paper elevation={3} style={{ padding: '16px', margin: '16px 0' }}>
            <div className="text-xs font-semibold tracking-wide text-left">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-red-600 font-bold flex-col pl-6">
                        <div>Processing Status</div>
                        <div className="text-[12px] text-gray">
                            This provides Processing status information
                        </div>
                    </div>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </div>
            </div>
            <Collapse in={isCollapsed}>
                <br />
                <Divider></Divider>
                <div className="w-full overflow-x-auto">
                    {getProcessingData != null ? (
                        <table id="my-table" className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="whitespace-nowrap divide-x-1">
                                    <th className="p-6 text-left">Department</th>
                                    <th className="p-6 text-left">CC</th>
                                    <th className="p-6 text-left">PL</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white whitespace-nowrap">

                                <tr className="text-black h-full bg-white shadow-2">
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            SALES
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.ccCountSales}
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.alCountSales}
                                        </p>
                                    </td>
                                </tr>

                                <tr className="text-black h-full bg-white shadow-2">
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            CRIB
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.ccCountCrib}
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.alCountCrib}
                                        </p>
                                    </td>

                                </tr>

                                <tr className="text-black h-full bg-white shadow-2">
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            DOC CHECK
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.ccCountDoc}
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.alCountDoc}
                                        </p>
                                    </td>

                                </tr>

                                <tr className="text-black h-full bg-white shadow-2">
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            DATA ENTRY
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.ccCountDataEntry}
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.alCountDataEntry}
                                        </p>
                                    </td>

                                </tr>

                                <tr className="text-black h-full bg-white shadow-2">
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            CREDIT
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.ccCountCredit}
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.alCountCredit}
                                        </p>
                                    </td>

                                </tr>

                                <tr className="text-black h-full bg-white shadow-2">
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            Total
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.ccFullTotal}
                                        </p>
                                    </td>
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {getProcessingData.alFullTotal}
                                        </p>
                                    </td>

                                </tr>



                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center">Sorry, no data found.</div>
                    )}
                </div>

            </Collapse>
        </Paper>

    );

};

export default BundleCCPLProcessing;
