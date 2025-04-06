import { FC, useEffect, useState } from "react";
import {
    Autocomplete,
    Checkbox,
    Button,
    Paper,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
  } from "@mui/material";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { Controller, useForm } from "react-hook-form";
import { ActionPointRequest } from "./ActionPointRequest";
import { ActionPointInfoList } from "./ActionPointInfoList";

export interface FrmActioPointDetialsProps {
    form: ActionPointRequest | null;
    editable?: boolean;
  };

  type FormType = {
    actionPointemail: string;
    actionPoint: string;
  };


  const FrmActioPointDetials: FC<FrmActioPointDetialsProps> = (props)=>{
    const {form, editable } = props;

    const [actionPoints, setActionPoints] = useState<ActionPointInfoList[]>([]);

    const { control, handleSubmit, formState, setError, setValue, watch } =useForm<FormType>({
        mode: "onChange",
      });
    
      useEffect(() => {
        if (form?.actionPoints) {
          setActionPoints((prevActionPoints) => [
            ...prevActionPoints,
            ...form.actionPoints.map((actionPoint) => ({
              email: actionPoint.email,
              actionPoint: actionPoint.actionPoint,
            })),
          ]);
        }
      }, [form]);

    return (
        <Paper className="px-12 h-full flex flex-col">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-md font-600 text-left flex text-blue-gray-800">
            <div>
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                feather:user-plus
              </EdgeSvgIcon>
            </div>
            <div>ACTION POINTS</div>
          </h1>
        </div>

        <form>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
          {!editable && (
            <div className="col-span-2">
              <Controller
                name="actionPointemail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Action Point Email"
                    disabled={editable}
                    fullWidth
                    size="small"
                    type="email"
                  />
                )}
              />
            </div>
          )}
          {!editable && (
            <div className="col-span-2">
              <Controller
                name="actionPoint"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Action Point"
                    fullWidth
                    size="small"
                    type="text"
                    multiline
                    minRows={3}
                    maxRows={3}
                    disabled={editable}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "calc(1.5em + 70px)",
                      },
                    }}
                  />
                )}
              />
            </div>
   )}
            <div className="col-span-2 mb-20">
              <TableContainer component={Paper} className="max-w-screen-md">
                <Table className="max-w-screen-md">
                  <TableHead>
                    <TableRow>
                      <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6 w-1/2">
                        Email
                      </TableCell>
                      <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6 w-1/2">
                        Action Point
                      </TableCell>
                      <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6 w-1/2"></TableCell>
                    </TableRow>
                  </TableHead>
                  {form &&
                  form.map((row, index) => (
                    <TableRow key={row.email + index}>
                      <TableCell className="border border-gray-300 w-1/2">
                        {row.email}
                      </TableCell>
                      <TableCell className="border border-gray-300 pb-0 pt-0 w-1/2">
                        {row.actionPoint}
                      </TableCell>
                      {/* <TableCell className="border border-gray-300 pb-0 pt-0 w-1/2">
    <button onClick={() => handleRemove(index)}>Remove</button></TableCell> */}
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </div>
          </div>
        </form>
      </Paper>
    );
  };

  export default FrmActioPointDetials;