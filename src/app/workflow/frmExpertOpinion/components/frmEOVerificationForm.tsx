import { Card, CardContent, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../@hooks/useThemeMediaQuery";
import { FrmExpertOpinionVerificationResponse } from "../@types/frmExpertOpinionRequest";


type FrmVerificationProps = {
  frmVerification: FrmExpertOpinionVerificationResponse[] | null;
};

type FormType = {
  [key: string]: boolean | string;
};


const FrmEOVerificationForm: FC<FrmVerificationProps> = (props) => {
  const { frmVerification } = props;
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));


  const { control, formState, setValue } =
    useForm<FormType>({
      mode: "onChange"
    });

  return (
    <Paper className="px-12 pb-10">
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex text-blue-gray-800">
          <EdgeSvgIcon className="icon-size-18 cursor-pointer mr-3" color="error">
            feather:user-plus
          </EdgeSvgIcon>
          FRM VERIFICATION
        </h1>
      </div>
      <form noValidate>
        <div
          className={`grid gap-9 ${mobileOpen && isMobile
            ? "sm:grid-cols-1 md:grid-cols-1"
            : "sm:grid-cols-2 md:grid-cols-1"
            } lg:grid-cols-1`}
        >
          <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
            {frmVerification?.map((verification, index) => {
              const formIndex = `${index}`;
              return (
                <Grid item xs={12} md={6} key={formIndex} style={{ marginBottom: '16px' }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        REF: {verification.businessKey}
                      </Typography>

                      <div className="flex flex-wrap gap-4 items-start">
                        <div className="flex flex-row justify-between items-center">
                          <p>Do RSD Verification</p>
                          <Controller
                            name={`rsdVerification-${formIndex}`}
                            control={control}
                            defaultValue={verification.rsdVerification}
                            disabled={true}
                            render={({ field }) => (
                              <FormControlLabel
                                control={<Checkbox {...field} checked={!!field.value} />}
                                label=""
                              />
                            )}
                          />
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <p>Do EMP Verification</p>
                          <Controller
                            name={`empVerification-${formIndex}`}
                            control={control}
                            defaultValue={verification.empVerification}
                            disabled={true}
                            render={({ field }) => (
                              <FormControlLabel
                                control={<Checkbox {...field} checked={!!field.value} />}
                                label=""
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 items-start">
                        <Controller
                          name={`reason-${formIndex}`}
                          control={control}
                          defaultValue={verification.reason}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Reason"
                              type="text"
                              multiline
                              minRows={3}
                              maxRows={5}
                              disabled={true}
                              className="flex-1"
                              margin="normal"
                            />
                          )}
                        />

                        <Controller
                          name={`checkerComment-${formIndex}`}
                          control={control}
                          defaultValue={verification.checkerComment}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Comment"
                              type="text"
                              multiline
                              minRows={3}
                              maxRows={5}
                              disabled={true}
                              className="flex-1"
                              margin="normal"
                            />
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </div>
        </div>
      </form>
    </Paper>
  );
};



export default FrmEOVerificationForm;
