import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
    Assessment as AssessmentIcon,
    Description as DescriptionIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    PendingActions,
    AccountBalance,
    Reviews,
    Verified,
    DomainVerification,
    Pending,
    KeyboardReturn
} from '@mui/icons-material';
import { BundledEODStats } from '../../../../../core/types/reports/BundledEODStats';

interface BundleStatsCardProps {
    reportStats: BundledEODStats | null;
}

const BundleStatsCard: React.FC<BundleStatsCardProps> = ({ reportStats }) => {

    const statCards = [
        {
            title: 'Total Applications at Branch',
            value: reportStats?.totalApplicationAtBranch || 0,
            icon: <AccountBalance sx={{ fontSize: 30, color: '#6802c2' }} />,

        },
        {
            title: 'Total Applications at Documents Checker',
            value: reportStats?.totalApplicationDocChecked || 0,
            icon: <DescriptionIcon sx={{ fontSize: 30, color: 'blue' }} />,
        },
        {
            title: 'Total CDD Review Check Applications',
            value: reportStats?.totalApplicationCDDReviewCheck || 0,
            icon: <Reviews sx={{ fontSize: 30, color: '#f9a825' }} />,

        },
        {
            title: 'Total Review Authorize Applications',
            value: reportStats?.totalApplicationCDDReviewAuthorise || 0,
            icon: <DomainVerification sx={{ fontSize: 30, color: '#f9a825' }} />,
        },
        {
            title: 'Total Verificator Applications',
            value: reportStats?.totalApplicationVerificator || 0,
            icon: <Verified sx={{ fontSize: 30, color: 'orange' }} />,
        },
        {
            title: 'Total In progress Applications',
            value: reportStats?.totalApplicationInProgress || 0,
            icon: <PendingActions sx={{ fontSize: 30, color: 'green' }} />,
        },
        {
            title: 'Total Discarded Applications',
            value: reportStats?.totalApplicationRejected || 0,
            icon: <CancelIcon sx={{ fontSize: 30, color: 'red' }} />,

        },
        {
            title: 'Total Pending Applications',
            value: reportStats?.totalApplicationPending || 0,
            icon: <Pending sx={{ fontSize: 30, color: '#f9a825' }} />,
        },
        {
            title: 'Total Returned  to Branch Applications',
            value: reportStats?.totalApplicationReturnToBranch || 0,
            icon: <KeyboardReturn sx={{ fontSize: 30, color: '#f9a825' }} />,
        },
        {
            title: 'Total Finished Applications',
            value: reportStats?.totalApplicationFinished || 0,
            icon: <CheckCircleIcon sx={{ fontSize: 30, color: 'red' }} />,
        },
    ];

    return (
        <Box sx={{ flexGrow: 1, mb: 4 }}>
            <Grid
                container
                spacing={2}
                sx={{
                    '& > .MuiGrid-item': {
                        // Custom width for different breakpoints
                        width: {
                            xs: '100%',     // Full width on mobile
                            sm: '50%',      // 2 cards per row on tablet
                            md: '20%'       // 4 cards per row on desktop
                        },
                        flexBasis: 'auto' // Override MUI's default flexBasis
                    }
                }}
            >

                {statCards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                borderRadius: 1.5,
                                boxShadow: 1,
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s'
                                }
                            }}
                        >

                            {/* <div className="p-4 border shadow-1 bg-[#ffffff] rounded-sm flex flex-row justify-between w-200">
                                <div className="flex flex-row items-center gap-3"> */}

                            <div className="flex gap-2 align-top">
                                <div className="w-30 h-fit rounded-4 bg-grey-200 p-6 shadow-3 align-top ml-4">
                                    {card.icon}
                                </div>
                                <div className="font-bold text-gray-800 align-top ml-4">
                                    {card.title}
                                </div>
                            </div>
                            <div className='align-bottom mt-auto'>
                                <p className="font-bold text-gray-800 justify-end flex mr-12">
                                    {card.value?.toLocaleString()}
                                </p>
                            </div>
                            {/* </div>
                            </div> */}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
};

export default BundleStatsCard;