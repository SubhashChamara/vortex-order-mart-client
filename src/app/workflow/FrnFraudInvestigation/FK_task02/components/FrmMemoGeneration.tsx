import React, { FC, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
} from "@mui/material";

type FemFraudInvestForm = {
  background:string;
  scopeOfWork:string;
  investigation:string;
  modusOperandi:string;
  conclution:string;
  prepared_by:string;
  approved_by:string;
  memoGenDate:Date;
  appRef_CardNo:string;
  investigationConcludeDate:string;
  bundledRef:string;
  businessKey:string;
};

type MemoGenerationProps = {
  memoData: FemFraudInvestForm | null;
};

const MemoGeneration: FC<MemoGenerationProps> = ({ memoData }) => {
  // Create a ref for the printable content
  const printRef = useRef<HTMLDivElement>(null);

  // Print function
  const onPrint = () => {
    console.log("ss")
    if (printRef.current) {
      // Save the current HTML of the page
      const originalContent = document.body.innerHTML;

      // Set the content to be printed
      document.body.innerHTML = printRef.current.outerHTML;

      // Trigger the print
      window.print();

      // Restore the original content after printing
      document.body.innerHTML = originalContent;

      // Reload the page to reinitialize React
      window.location.reload();
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
      {/* Printable Content */}
      <div ref={printRef}>
        {/* Header Section */}
        <Box display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          mb={2}>
          <img
            src="public\assets\logo\logo.png"
            alt="Logo"
            style={{ width: "100px", marginBottom: "10px" }}
          />
          <Typography variant="h6" fontWeight="bold">
            FRAUD RISK MANAGEMENT
          </Typography>
          <Typography variant="subtitle1">RETAIL BANKING</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            LEGALLY PRIVILEGED & STRICTLY CONFIDENTIAL
          </Typography>
          <Typography variant="body1" mt={1}>
            Application Fraud Case
          </Typography>
        </Box>

        {/* Details Section */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight="bold">
              Investigation Reference:
            </Typography>
            <TextField
              fullWidth
              value={memoData?.businessKey}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight="bold">
              Bundled Reference:
            </Typography>
            <TextField
              fullWidth
              value={memoData?.bundledRef}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight="bold">
              Date:
            </Typography>
            <TextField
              fullWidth
              value={memoData?.memoGenDate}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
        </Grid>

        {/* Content Sections */}
        <Box mb={3}>
          <Typography fontWeight="bold" gutterBottom>
            BACKGROUND
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={memoData?.background}
            variant="outlined"
            disabled
          />
        </Box>

        <Box mb={3}>
          <Typography fontWeight="bold" gutterBottom>
            SCOPE OF WORK
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={memoData?.scopeOfWork}
            variant="outlined"
            disabled
          />
        </Box>

        <Box mb={3}>
          <Typography fontWeight="bold" gutterBottom>
            INVESTIGATION
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={memoData?.investigation}
            variant="outlined"
            disabled
          />
        </Box>

        <Box mb={3}>
          <Typography fontWeight="bold" gutterBottom>
            MODUS OPERANDI
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={memoData?.modusOperandi}
            variant="outlined"
            disabled
          />
        </Box>

        <Box mb={3}>
          <Typography fontWeight="bold" gutterBottom>
            CONCLUSION
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={memoData?.conclution}
            variant="outlined"
            disabled
          />
        </Box>

        {/* Footer Section */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight="bold">
              App Reference:
            </Typography>
            <TextField
              fullWidth
              value={memoData?.appRef_CardNo}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight="bold">
              Concluded Date:
            </Typography>
            <TextField
              fullWidth
              value={memoData?.investigationConcludeDate}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight="bold">
              Prepared by:
            </Typography>
            <TextField
              fullWidth
              value={memoData?.prepared_by}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight="bold">
              Review and Approved by:
            </Typography>
            <TextField
              fullWidth
              value={memoData?.approved_by}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
        </Grid>
      </div>

      {/* Action Section */}
      <Box textAlign="right">
        <Button
          variant="contained"
          color="primary"
          onClick={onPrint}
          sx={{ marginTop: 2 }}
        >
          Print Memo
        </Button>
      </Box>
    </Paper>
  );
};

export default MemoGeneration;
