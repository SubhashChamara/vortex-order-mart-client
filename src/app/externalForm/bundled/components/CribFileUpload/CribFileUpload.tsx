import { Button, Paper } from "@mui/material";
import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";

interface CribFileUploadProps {
  editable: boolean;
}

const CribFileUpload: React.FC<CribFileUploadProps> = ({ editable }) => {
  const methods = useFormContext();
  const { control, watch } = methods;
  const nicCribUploadRef = useRef<HTMLInputElement>(null);

  console.log(watch("nicUpload"));

  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="material-outline:stacked_line_chart"
          title="Upload the Crib File and Save"
        />

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <p className="text-10 font-bold">Select NIC (CRIB)</p>

            <Controller
              name="nicUpload"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex flex-row gap-3">
                    <Button
                      variant="outlined"
                      onClick={() => nicCribUploadRef.current?.click()}
                      className="w-full"
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderColor: "black",
                        justifyContent: "flex-start", // Align text and icon to the left
                        gap: 1, // Space between icon and text
                        "&:hover": {
                          backgroundColor: "#f2f2f2",
                          borderColor: "black",
                        },
                        "&:focus, &:active": {
                          backgroundColor: "white",
                          borderColor: "black",
                          boxShadow: "none",
                        },
                        "& .MuiTouchRipple-root": {
                          color: "black",
                        },
                      }}
                    >
                      <EdgeSvgIcon className="mr-3">feather:upload</EdgeSvgIcon>
                      Select File
                    </Button>

                    <input
                      type="file"
                      accept=".pdf"
                      ref={nicCribUploadRef}
                      hidden
                      onChange={(e) => {
                        const selectedFile = e.target.files
                          ? e.target.files[0]
                          : null;
                        field.onChange(selectedFile);
                        console.log(selectedFile);
                        //   setNICFile(selectedFile);
                      }}
                    />
                    <Button
                    // onClick={() => handleCRIBPaneUpload(nicFile, "NIC")}
                    // disabled={isFileUploading}
                    >
                      <EdgeSvgIcon
                        className="icon-size-10 cursor-pointer text-white mr-3"
                        color="error"
                      >
                        feather:upload-cloud
                      </EdgeSvgIcon>
                      Upload
                    </Button>
                  </div>
                  {field.value && (
                    <div className="mt-6 w-full p-3 px-6 flex flex-row justify-between border border-primary rounded-sm text-primary hover:bg-grey-50 hover:cursor-pointer">
                      <div className="flex flex-row gap-3">
                        <EdgeSvgIcon>
                          material-outline:picture_as_pdf
                        </EdgeSvgIcon>
                        <p>
                          {field.value.name.length > 40
                            ? `${field.value.name.substring(0, 40)}...`
                            : field.value.name}
                        </p>
                      </div>

                      <EdgeSvgIcon
                        className="hover:cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange(null);
                          // setNICFile(null);
                          if (nicCribUploadRef.current) {
                            nicCribUploadRef.current.value = "";
                          }
                        }}
                      >
                        feather:trash-2
                      </EdgeSvgIcon>
                    </div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-10 font-bold">Select EIC (CRIB)</p>

            <Controller
              name="eicUpload"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex flex-row gap-3">
                    <Button
                      variant="outlined"
                      onClick={() => nicCribUploadRef.current?.click()}
                      className="w-full"
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderColor: "black",
                        justifyContent: "flex-start", // Align text and icon to the left
                        gap: 1, // Space between icon and text
                        "&:hover": {
                          backgroundColor: "#f2f2f2",
                          borderColor: "black",
                        },
                        "&:focus, &:active": {
                          backgroundColor: "white",
                          borderColor: "black",
                          boxShadow: "none",
                        },
                        "& .MuiTouchRipple-root": {
                          color: "black",
                        },
                      }}
                    >
                      <EdgeSvgIcon className="mr-3">feather:upload</EdgeSvgIcon>
                      Select File
                    </Button>

                    <input
                      type="file"
                      accept=".pdf"
                      ref={nicCribUploadRef}
                      hidden
                      onChange={(e) => {
                        const selectedFile = e.target.files
                          ? e.target.files[0]
                          : null;
                        field.onChange(selectedFile);
                        console.log(selectedFile);
                        //   setNICFile(selectedFile);
                      }}
                    />
                    <Button
                    // onClick={() => handleCRIBPaneUpload(nicFile, "NIC")}
                    // disabled={isFileUploading}
                    >
                      <EdgeSvgIcon
                        className="icon-size-10 cursor-pointer text-white mr-3"
                        color="error"
                      >
                        feather:upload-cloud
                      </EdgeSvgIcon>
                      Upload
                    </Button>
                  </div>
                  {field.value && (
                    <div className="mt-6 w-full p-3 px-6 flex flex-row justify-between border border-primary rounded-sm text-primary hover:bg-grey-50 hover:cursor-pointer">
                      <div className="flex flex-row gap-3">
                        <EdgeSvgIcon>
                          material-outline:picture_as_pdf
                        </EdgeSvgIcon>
                        <p>
                          {field.value.name.length > 40
                            ? `${field.value.name.substring(0, 40)}...`
                            : field.value.name}
                        </p>
                      </div>

                      <EdgeSvgIcon
                        className="hover:cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange(null);
                          // setNICFile(null);
                          if (nicCribUploadRef.current) {
                            nicCribUploadRef.current.value = "";
                          }
                        }}
                      >
                        feather:trash-2
                      </EdgeSvgIcon>
                    </div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-10 font-bold">Select CRIB Report File</p>

            <Controller
              name="cribReportUpload"
              control={control}
              render={({ field }) => (
                <div>
                  <div className="flex flex-row gap-3">
                    <Button
                      variant="outlined"
                      onClick={() => nicCribUploadRef.current?.click()}
                      className="w-full"
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderColor: "black",
                        justifyContent: "flex-start", // Align text and icon to the left
                        gap: 1, // Space between icon and text
                        "&:hover": {
                          backgroundColor: "#f2f2f2",
                          borderColor: "black",
                        },
                        "&:focus, &:active": {
                          backgroundColor: "white",
                          borderColor: "black",
                          boxShadow: "none",
                        },
                        "& .MuiTouchRipple-root": {
                          color: "black",
                        },
                      }}
                    >
                      <EdgeSvgIcon className="mr-3">feather:upload</EdgeSvgIcon>
                      Select File
                    </Button>

                    <input
                      type="file"
                      accept=".pdf"
                      ref={nicCribUploadRef}
                      hidden
                      onChange={(e) => {
                        const selectedFile = e.target.files
                          ? e.target.files[0]
                          : null;
                        field.onChange(selectedFile);
                        console.log(selectedFile);
                        //   setNICFile(selectedFile);
                      }}
                    />
                    <Button
                    // onClick={() => handleCRIBPaneUpload(nicFile, "NIC")}
                    // disabled={isFileUploading}
                    >
                      <EdgeSvgIcon
                        className="icon-size-10 cursor-pointer text-white mr-3"
                        color="error"
                      >
                        feather:upload-cloud
                      </EdgeSvgIcon>
                      Upload
                    </Button>
                  </div>
                  {field.value && (
                    <div className="mt-6 w-full p-3 px-6 flex flex-row justify-between border border-primary rounded-sm text-primary hover:bg-grey-50 hover:cursor-pointer">
                      <div className="flex flex-row gap-3">
                        <EdgeSvgIcon>
                          material-outline:picture_as_pdf
                        </EdgeSvgIcon>
                        <p>
                          {field.value.name.length > 40
                            ? `${field.value.name.substring(0, 40)}...`
                            : field.value.name}
                        </p>
                      </div>

                      <EdgeSvgIcon
                        className="hover:cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange(null);
                          // setNICFile(null);
                          if (nicCribUploadRef.current) {
                            nicCribUploadRef.current.value = "";
                          }
                        }}
                      >
                        feather:trash-2
                      </EdgeSvgIcon>
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default CribFileUpload;
