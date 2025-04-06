import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { FrmExpertOpinionExternalVerificationResponse } from "../@types/frmExpertOpinionRequest";
import { Api } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { useThemeMediaQuery } from "../../../../@edgevantage/hooks";
import Logger from "../../../../@helpers/Logger";
import { FemExternVerifForm } from "../../frmExternalVerification/components/FemExternVerifForm";




export interface FrmEOVerificationFormProps {
  frmExternalVerification: FrmExpertOpinionExternalVerificationResponse[] | null
}

type FormType = {
  checkerComment: string;
  makerComment: string;
  attempt1: boolean;
  attempt2: boolean;
  attempt3: boolean;
  reason1: string;
  reason2: string;
  reason3: string;
  businessKey: string;
};

const FrmEOExternalVerificationForm: FC<FrmEOVerificationFormProps> = (props) => {
  const { frmExternalVerification } = props;
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));


  const { control} =
    useForm<FormType>({
      mode: "onChange",
    });

  return (
    <Paper className="px-12">
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex text-blue-gray-800">
          <EdgeSvgIcon className="icon-size-18 cursor-pointer mr-3" color="error">
            feather:user-plus
          </EdgeSvgIcon>
          EXTERNAL VERIFICATION
        </h1>
      </div>
      <form noValidate>
        <div
          className={`grid gap-9 ${mobileOpen && isMobile
            ? "sm:grid-cols-1 md:grid-cols-1"
            : "sm:grid-cols-1 md:grid-cols-1"
            } lg:grid-cols-1`}
        >
          <div style={{ maxHeight: '550px', overflowY: 'auto', padding: '10px' }}>
            {frmExternalVerification?.map((verification, index) => {
              const formIndex = `${index}`;
              return (
                <div key={formIndex} className="w-full flex flex-col space-y-4">
                  <Grid item xs={12} md={12} key={formIndex} style={{ marginBottom: '16px' }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          REF: {verification.buisnessKey}
                        </Typography>
                        <br />
                        <div className="flex gap-4 mb-4">

                          <div className="w-1/2">
                            <Controller
                              name={`makerComment-${formIndex}`}
                              control={control}
                              defaultValue={verification.makerComment || ""}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="External Verification Instruction"
                                  type="text"
                                  multiline
                                  minRows={3}
                                  maxRows={5}
                                  className="mb-20"
                                  disabled
                                />
                              )}
                            />
                          </div>
                          <div className="w-1/2">
                            <Controller
                              name={`checkerComment-${formIndex}`}
                              control={control}
                              defaultValue={verification.checkerComment || ""}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Comment"
                                  type="text"
                                  multiline
                                  minRows={3}
                                  maxRows={5}
                                  className="mb-20"
                                  disabled
                                />
                              )}
                            />
                          </div>
                        </div>


                        <div className="flex gap-4 mb-4">
                          <div className="w-1/2">
                            <Controller
                              name={`attempt1-${formIndex}`}
                              control={control}
                              defaultValue={verification.attempt1 || false}
                              render={({ field }) => (
                                <RadioGroup {...field} className="flex flex-col" disabled>
                                  <div className="flex flex-row">
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio />}
                                      label="Successful"
                                      disabled
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio />}
                                      label="Not Successful"
                                      disabled
                                    />
                                  </div>
                                </RadioGroup>
                              )}
                            />
                          </div>
                          <div className="w-1/2">
                            <Controller
                              name={`reason1-${formIndex}`}
                              control={control}
                              defaultValue={verification.reason1 || ""}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Reason"
                                  type="text"
                                  multiline
                                  minRows={3}
                                  maxRows={5}
                                  className="mb-20"
                                  disabled
                                />
                              )}
                            />
                          </div>
                        </div>


                        <div className="flex gap-4 mb-4">
                          <div className="w-1/2">
                            <Controller
                              name={`attempt2-${formIndex}`}
                              control={control}
                              defaultValue={verification.attempt2 || false}
                              render={({ field }) => (
                                <RadioGroup {...field} className="flex flex-col" disabled>
                                  <div className="flex flex-row">
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio />}
                                      label="Successful"
                                      disabled
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio />}
                                      label="Not Successful"
                                      disabled
                                    />
                                  </div>
                                </RadioGroup>
                              )}
                            />
                          </div>
                          <div className="w-1/2">
                            <Controller
                              name={`reason2-${formIndex}`}
                              control={control}
                              defaultValue={verification.reason2 || ""}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Reason"
                                  type="text"
                                  multiline
                                  minRows={3}
                                  maxRows={5}
                                  className="mb-20"
                                  disabled
                                />
                              )}
                            />
                          </div>
                        </div>


                        <div className="flex gap-4 mb-4">
                          <div className="w-1/2">
                            <Controller
                              name={`attempt3-${formIndex}`}
                              control={control}
                              defaultValue={verification.attempt3 || false}
                              render={({ field }) => (
                                <RadioGroup {...field} className="flex flex-col" disabled>
                                  <div className="flex flex-row">
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio />}
                                      label="Successful"
                                      disabled
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio />}
                                      label="Not Successful"
                                      disabled
                                    />
                                  </div>
                                </RadioGroup>
                              )}
                            />
                          </div>
                          <div className="w-1/2">
                            <Controller
                              name={`reason3-${formIndex}`}
                              control={control}
                              defaultValue={verification.reason3 || ""}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  label="Reason"
                                  type="text"
                                  multiline
                                  minRows={3}
                                  maxRows={5}
                                  className="mb-20"
                                  disabled
                                />
                              )}
                            />
                          </div>
                        </div>

                      </CardContent>
                    </Card>
                  </Grid>
                </div>
              );
            })}
          </div>
        </div>
      </form>

    </Paper>

  );

};

export default FrmEOExternalVerificationForm;