import React, { FC, useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Api } from "../../../../../api/Api";

type FemFraudInvestForm = {
  background: string;
  scopeOfWork: string;
  investigation: string;
  modusOperandi: string;
  conclution: string;
  prepared_by: string;
  approved_by: string;
  memoGenDate: Date;
  appRef_CardNo: string;
  investigationConcludeDate: string;
  bundledRef: string;
  businessKey: string;
  processInstance: string;
};

type MemoGenerationProps = {
  memoData: FemFraudInvestForm | null;
  procId: string; // Include process ID for submission
};

const MemoGeneration: FC<MemoGenerationProps> = ({ memoData, procId }) => {
  const { register, handleSubmit, control, reset } = useForm<FemFraudInvestForm>({
    defaultValues: memoData || {},
  });
  const printRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Print function
  const onPrint = () => {
    if (printRef.current) {
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printRef.current.outerHTML;
      window.print();
      document.body.innerHTML = originalContent;
    }
  };

  // Submit function
  const onSubmit = async (formData: FemFraudInvestForm) => {
    if (isSubmitted) {
      toast.warn("Form already submitted");
      return;
    }

    const updatedFormData: Partial<FemFraudInvestForm> = {
      background: formData.background,
      scopeOfWork: formData.scopeOfWork,
      investigation: formData.investigation,
      modusOperandi: formData.modusOperandi,
      conclution: formData.conclution,
      prepared_by: formData.prepared_by,
      approved_by: formData.approved_by,
      memoGenDate: formData.memoGenDate,
      processInstance: procId,
    };

    setIsSubmitted(true);

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.saveFraudInvestForm(updatedFormData)
    );

    if (err === null) {
      toast.success("Your Request Was Saved Successfully");
      setIsSubmitted(false);
      reset(); // Optionally reset the form after submission
    } else {
      toast.error(err.msg);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };


  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("businessKey")}
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
                {...register("bundledRef")}
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
                {...register("memoGenDate")}
                variant="outlined"
                size="small"
                disabled
              />
            </Grid>
          </Grid>

          {/* Sections */}
          {["background", "scopeOfWork", "investigation", "modusOperandi", "conclution"].map((field) => (
            <Box key={field} mb={3}>
              <Typography fontWeight="bold" gutterBottom>
                {field.toUpperCase()}
              </Typography>
              <Controller
                name={field as keyof FemFraudInvestForm}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    minRows={6}
                    variant="outlined"
                  />
                )}
              />
            </Box>
          ))}

          {/* Footer Section */}
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" fontWeight="bold">
                App Reference:
              </Typography>
              <TextField
                fullWidth
                {...register("appRef_CardNo")}
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
                {...register("investigationConcludeDate")}
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
                {...register("prepared_by")}
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
                {...register("approved_by")}
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
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onPrint}
            sx={{ marginTop: 2, marginLeft: 2 }}
          >
            Print Memo
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default MemoGeneration;
