import { FC } from "react";
import { ExpertOpinion } from "./ExpertOpinion";
import { Autocomplete, Button, Card, CardContent, Grid, Paper, TextField, Typography } from "@mui/material";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../@hooks/useThemeMediaQuery";
import { Controller, useForm } from "react-hook-form";
import { DropDownItem } from "./ExpertOpinion copy";

type FrmExpertOpinionProps = {
    form: ExpertOpinion[] | null;
    editable: Boolean;
    frmexpertUsers: DropDownItem[] | null;
  };

  type FormType = {
    opinionProvide: string;
    expertOpinionUser: string;
    date: string;
  };
  

const FrmExpertOpinionForm: FC<FrmExpertOpinionProps> = (props) => {
    const {form, editable,frmexpertUsers } = props;
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const { control, formState, setError, setValue, handleSubmit } = useForm<FormType>({
        mode: "onChange",
      });


    return (
        
       <Paper className="px-12">
       <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
         <h1 className="text-md font-600 text-left flex text-blue-gray-800">
           <EdgeSvgIcon className="icon-size-18 cursor-pointer mr-3" color="error">
             feather:user-plus
           </EdgeSvgIcon>
           EXPERT OPINION
         </h1>
       </div>
       <form noValidate>
        {/* {form?.map((item, index) => (
      <div key={item.id} className="w-full flex flex-col space-y-4">
        
        <Controller
          name={`form[${index}].opinionProvide`}
          control={control}
          defaultValue={item.opinionProvide || ""}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Provide Opinion"
              type="text"
              multiline
              minRows={3}
              maxRows={5}
              className="mb-20"
              disabled={true}
            />
          )}
        />

        <Controller
          name={`form[${index}].expertOpinionUser`}
          control={control}
          defaultValue={item.expertOpinionUser || ""}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Expert Opinion"
              type="text"
              multiline
              minRows={3}
              maxRows={5}
              className="mb-20"
              disabled={true}
            />
          )}
        />

        <Controller
          name={`form[${index}].opinionRequest`}
          control={control}
          defaultValue={item.opinionRequest || ""}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Opinion Request"
              type="text"
              multiline
              minRows={3}
              maxRows={5}
              className="mb-20"
              disabled={true}
            />
          )}
        />

      </div>
    ))} */}
        <div
          className={`grid gap-9 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-1"
          } lg:grid-cols-1`}
        >
          <div
            style={{ maxHeight: "400px", overflowY: "auto", padding: "10px" }}
          >
            {form?.map((record, index) => (
              <Grid
                item
                xs={12}
                md={6}
                key={index}
                style={{ marginBottom: "16px" }}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Ref: {record.businessKey}
                    </Typography>

                    <div className="flex flex-wrap gap-4 items-start">
                      <Controller
                        name={`provideOpinionOn-${index}`}
                        control={control}
                        defaultValue={record.opinionProvide || ""}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Provide Opinion On"
                            size="small"
                            type="text"
                            multiline
                            fullWidth
                            minRows={3}
                            maxRows={5}
                            disabled={true}
                            className="flex-1"
                            margin="normal"
                          />
                        )}
                      />

                      <Controller
                        name={`expertOpinion-${index}`}
                        control={control}
                        defaultValue={record.opinionRequest || ""}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Expert Opinion"
                            size="small"
                            type="text"
                            minRows={3}
                            maxRows={5}
                            multiline
                            fullWidth
                            disabled={true}
                            className="flex-1"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6.05}>
                        <Controller
                          name="expertOpinionUser"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Autocomplete
                              disabled={true}
                              options={frmexpertUsers || []}
                              getOptionLabel={(option) => option.name || ""}
                              isOptionEqualToValue={(option, val) =>
                                option.id === val.id
                              }
                              onChange={(event, newValue) => {
                                onChange(newValue ? newValue.id : "");
                              }}
                              value={frmexpertUsers?.find(
                                (option) =>
                                  option.id === record?.expertOpinionUser
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Expert Opinion User"
                                  size="small"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  type="text"
                                  margin="normal"
                                  fullWidth
                                  disabled={true}
                                />
                              )}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </div>
        </div>
      </form>
     </Paper>
    );

};

export default FrmExpertOpinionForm;