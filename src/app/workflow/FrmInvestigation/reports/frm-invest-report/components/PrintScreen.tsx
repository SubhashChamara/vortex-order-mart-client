import React, { FC, useEffect, useRef } from "react";
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
    status:boolean;
};

const PrintScreen: FC<FrmEventSummaryReportProps> = ({status}) => {

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        handlePrint();
      }, [status]);
    
  return (
    <div>
      <Paper
        sx={{
          padding: 3,
          "@media print": {
            padding: 0,
            width: "198mm", // A4 page width
            height: "277mm", // A4 page height
            margin: 0,
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
                <TextField fullWidth variant="outlined" size="small" disabled />
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
                  value="Credit Card"
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
                <TextField fullWidth variant="outlined" size="small" disabled />
              </Grid>
              <Grid item xs={5.7}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Expected Recovery (USD):
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled />
              </Grid>
              <Grid item xs={5.7}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Expected Net Loss (USD):
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled />
              </Grid>
              <Grid item xs={5.7}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Actual Recovery (USD):
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled />
              </Grid>
              <Grid item xs={5.7}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ fontSize: "0.8rem" }}
                >
                  Final Loss Taken (USD):
                </Typography>
                <TextField fullWidth variant="outlined" size="small" disabled />
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
                  value="Open"
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
                  value="02-12-2024"
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
                <TextField fullWidth variant="outlined" size="small" disabled />
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
            <TextField fullWidth variant="outlined" size="small" disabled />
          </Grid>

          <Grid item xs={12} sm={11.7}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: "0.8rem" }}
            >
              Root Cause:
            </Typography>
            <TextField fullWidth variant="outlined" size="small" disabled />
          </Grid>

          <Grid item xs={12} sm={11.7}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: "0.8rem" }}
            >
              Scope of Work:
            </Typography>
            <TextField fullWidth variant="outlined" size="small" disabled />
          </Grid>

          <Grid item xs={12} sm={11.7}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: "0.8rem" }}
            >
              Recommendations: Mitigation Actions
            </Typography>
            <TextField fullWidth variant="outlined" size="small" disabled />
          </Grid>

          <Grid item xs={12} sm={11.7}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: "0.8rem" }}
            >
              Next Actions:
            </Typography>
            <TextField fullWidth variant="outlined" size="small" disabled />
          </Grid>

          <Grid item xs={12} sm={5.8}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: "0.8rem" }}
            >
              Accountability:
            </Typography>
            <TextField fullWidth variant="outlined" size="small" disabled />
          </Grid>

          <Grid item xs={12} sm={5.9}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ fontSize: "0.8rem" }}
            >
              Conclusion:
            </Typography>
            <TextField fullWidth variant="outlined" size="small" disabled />
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
              value="Yes"
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
              value="02-12-2024"
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PrintScreen;
