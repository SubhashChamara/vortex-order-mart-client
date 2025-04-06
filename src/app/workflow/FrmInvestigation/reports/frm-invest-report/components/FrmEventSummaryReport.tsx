import React, { FC, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FrmSummeryReportInfos } from "./FrmSummeryReportInfo";

type MemoData = {
  investigationReference: string;
  bundledReference: string;
  memoGenDate: string;
  background: string;
  scopeOfWork: string;
  investigation: string;
  modusOperandi: string;
  conclusion: string;
  appReference: string;
  concludedDate: string;
  preparedBy: string;
  approvedBy: string;
};

type FrmEventSummaryReportProps = {
  open: boolean;
  handleClose: () => void;
  getReportData:FrmSummeryReportInfos | null;
};

const FrmEventSummaryReport: FC<FrmEventSummaryReportProps> = ({
  open,
  handleClose,
  getReportData
}) => {

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handlePrint = () => {
    const content = `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fraud Event Summary Report</title>
  <style>
    @page {
      size: A4;
      margin: 10mm; /* Set margins to fit everything on A4 */
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      width: 210mm;
      height: 297mm;
    }
    .container {
      width: 100%;
      margin: 0 auto;
      padding: 10px;
      box-sizing: border-box;
    }
    .header {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 5px;
    }
    td {
      padding: 6px;
      border: 1px solid black;
      vertical-align: top;
    }
    input[type="text"], input[type="number"], input[type="date"], select, textarea {
      width: 100%;
      border: none;
      box-sizing: border-box;
    }
    textarea {
      height: 50px; /* Increase height of textarea for better space utilization */
    }
    select {
      padding: 5px;
    }
    /* Adjust size of tables for fitting content on a single page */
    table, td, input, select, textarea {
      font-size: 12px;
    }
    /* Ensuring tables fill more space */
    .full-width-table td {
      padding: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      Fraud Event Summary Report
    </div>

    <!-- Main Table -->
    <table class="full-width-table">
      <tr>
        <td rowspan="11" style="width: 50%; text-align: left; padding-top: 12px;">
          Investigation statement/ Case Details:
          <input type="text" value=${getReportData?.problemStatement || "N/A"}>
        </td>
        <td style="width: 24%;">Country:</td>
        <td style="width: 35%;">
          <input type="text" value="Sri Lanka">
        </td>
      </tr>
      <tr>
        <td>Type:</td>
        <td>
          <input type="text" value=${getReportData?.escalationType || "N/A"}>
        </td>
      </tr>
      <tr>
        <td>Product:</td>
        <td>
          <input type="text" value=${getReportData?.product || "N/A"}>
        </td>
      </tr>
      <tr>
        <td>Gross Exposure (USD):</td>
        <td>
          <input type="number" value=${getReportData?.grossExposureUSD || "N/A"}>
        </td>
      </tr>
      <tr>
        <td>Expected Recovery (USD):</td>
        <td>
          <input type="number" value=${getReportData?.expectedRecovery_USD || "N/A"}>
        </td>
      </tr>
      <tr>
        <td>Expected Net Loss (USD):</td>
        <td>
          <input type="number" value=${getReportData?.expectedNetLoss_USD || "N/A"}>
        </td>
      </tr>
      <tr>
        <td>Actual Recovery (USD):</td>
        <td>
          <input type="number" value=${getReportData?.actualRecovery_USD || "N/A"}>
        </td>
      </tr>
      <tr>
        <td>Final Loss Taken (USD):</td>
        <td>
          <input type="number" value=${getReportData?.finalLossTaken_USD || "N/A"}>
        </td>
      </tr>
      <tr>
        <td>Status (Open/Closed):</td>
        <td>
          <select>
            <option value=${getReportData?.status_Open_Closed || "N/A"} selected>Open</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>As of Date:</td>
        <td>
          <input type="date" value=${getReportData?.today || "N/A"}>
        </td>
      </tr>
      <tr>
        <td>App Ref No:</td>
        <td>
          <input type="text" value=${getReportData?.appRef_CardNo || "N/A"}>
        </td>
      </tr>
    </table>

    <!-- Additional Sections -->
    <table class="full-width-table">
      <tr>
        <td  style="width: 30%; text-align: left; padding-top: 12px;">Modus Operandi:</td>
        <td>
          <textarea>${getReportData?.observeModulusOpr || "N/A"}</textarea>
        </td>
      </tr>
      <tr>
        <td>Root Cause:</td>
        <td>
          <textarea>${getReportData?.reasonToSubmitBg || "N/A"}</textarea>
        </td>
      </tr>
      <tr>
        <td>Scope of Work:</td>
        <td>
          <textarea>${getReportData?.scopeOfWork || "N/A"}</textarea>
        </td>
      </tr>
      <tr>
        <td>Recommendations: Mitigation Actions</td>
        <td>
          <textarea>${getReportData?.recomendInBrief || "N/A"}</textarea>
        </td>
      </tr>
      <tr>
        <td>Next Actions:</td>
        <td>
          <textarea>${getReportData?.nextActions || "N/A"}</textarea>
        </td>
      </tr>
      <tr>
        <td>Accountability:</td>
        <td>
          <textarea>${getReportData?.accountability || "N/A"}</textarea>
        </td>
      </tr>
      <tr>
        <td>Conclusion:</td>
        <td>
          <textarea>${getReportData?.conclusionStatus || "N/A"}</textarea>
        </td>
      </tr>
    </table>

    <!-- Final Section -->
    <table class="full-width-table">
      <tr>
        <td  style="width: 50%; text-align: left; padding-top: 12px;">Loss Recognition (Y/N):</td>
        <td>
          <select>
            <option value=${getReportData?.lossRecognition || "N/A"} selected>Yes</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>Date:</td>
        <td>
          <input type="date" value=${getReportData?.wfCompletedDate || "N/A"}>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>

    `;

    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentWindow?.document;

      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(content);
        iframeDoc.close();

        // Delay the print call to ensure content is loaded
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        }, 500); // Delay in milliseconds
      }
    }
  };

  return (
    <div>
      <iframe ref={iframeRef} style={{ display: "none" }} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent
          sx={{
            "@media print": {
              margin: 0,
              padding: 0,
              overflow: "hidden", // Hide scrollbars in print view
              height: "100%%",
            },
            backgroundColor: "white", // Added this line to make the background white
          }}
        >
          <Paper
            sx={{
              padding: 2,
              "@media print": {
                padding: 0,
                width: "198mm", // A4 page width
                height: "277mm", // A4 page height

                overflow: "hidden", // Hide overflow to avoid additional pages
              },
            }}
          >
            <Box textAlign="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Fraud Event Summary Report
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ fontSize: "0.8rem" }}
                  >
                    Investigation Statement / Case Details:
                  </Typography>
                  <TextField
                  value={getReportData?.problemStatement || ""}
                    fullWidth
                    multiline
                    minRows={15.5}
                    maxRows={15.5}
                    variant="outlined"
                    disabled
                    sx={{
                      resize: "none",
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Country:
                    </Typography>
                    <TextField
                      fullWidth
                      value="Sri Lanka"
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Type:
                    </Typography>
                    <TextField
                    value={getReportData?.escalationType || ""}
                      fullWidth
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Product:
                    </Typography>
                    <TextField
                      fullWidth
                      value={getReportData?.product || ""}
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Gross Exposure (USD):
                    </Typography>
                    <TextField
                    value={getReportData?.grossExposureUSD || ""}
                      fullWidth
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Expected Recovery (USD):
                    </Typography>
                    <TextField
                    value={getReportData?.expectedRecovery_USD || ""}
                      fullWidth
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Expected Net Loss (USD):
                    </Typography>
                    <TextField
                    value={getReportData?.expectedNetLoss_USD || ""}
                      fullWidth
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Actual Recovery (USD):
                    </Typography>
                    <TextField
                    value={getReportData?.actualRecovery_USD || ""}
                      fullWidth
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Final Loss Taken (USD):
                    </Typography>
                    <TextField
                    value={getReportData?.finalLossTaken_USD || ""}
                      fullWidth
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      Status (Open/Closed):
                    </Typography>
                    <TextField
                      fullWidth
                      value={getReportData?.status_Open_Closed || ""}
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      As of Date:
                    </Typography>
                    <TextField
                      fullWidth
                      value={getReportData?.today || ""}
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={5.7}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      App Ref No:
                    </Typography>
                    <TextField
                    value={getReportData?.appRef_CardNo || ""}
                      fullWidth
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={11.7}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Modus Operandi:
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled 
                value={getReportData?.observeModulusOpr || ""}/>
              </Grid>

              <Grid item xs={12} sm={11.7}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Root Cause:
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled 
                value={getReportData?.reasonToSubmitBg || ""}/>
              </Grid>

              <Grid item xs={12} sm={11.7}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Scope of Work:
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled 
                value={getReportData?.scopeOfWork || ""}/>
              </Grid>

              <Grid item xs={12} sm={11.7}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Recommendations: Mitigation Actions
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled 
                value={getReportData?.recomendInBrief || ""}/>
              </Grid>

              <Grid item xs={12} sm={11.7}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Next Actions:
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled 
                value={getReportData?.nextActions || ""}/>
              </Grid>

              <Grid item xs={12} sm={5.8}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Accountability:
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled 
                value={getReportData?.accountability || ""}/>
              </Grid>

              <Grid item xs={12} sm={5.9}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Conclusion:
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled 
                value={getReportData?.conclusionStatus || ""}/>
              </Grid>

              <Grid item xs={12} sm={5.8}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Loss Recognition (Y/N):
                </Typography>
                <TextField
                  fullWidth
                  value={getReportData?.lossRecognition || ""}
                  variant="outlined"
                  size="small"
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={5.9}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Date:
                </Typography>
                <TextField
                  fullWidth
                  value={getReportData?.wfCompletedDate || ""}
                  variant="outlined"
                  size="small"
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              "@media print": {
                display: "none",
              },
            }}
            color="secondary"
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            sx={{
              "@media print": {
                display: "none",
              },
            }}
          >
            Print Report
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FrmEventSummaryReport;
