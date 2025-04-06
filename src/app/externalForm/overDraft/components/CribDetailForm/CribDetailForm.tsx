import { Paper, Card, Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";

interface CribDetailFormProps {
  editable: boolean;
  onUploadButtonClick: () => void;
}

const CribDetailForm: React.FC<CribDetailFormProps> = ({
  editable,
  onUploadButtonClick,
}) => {
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

  const eFormUploadRef = useRef();

  const { control, watch } = useFormContext();

  const isNoCribHistory = watch("isNoCribHistory");

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:file-text" title="Crib History Detail" />
        <div className="flex flex-col gap-14">
          {/* no crib history controller */}
          <div className="w-full flex flex-row justify-between items-center">
            <p>No Crib History</p>
            <Controller
              name="isNoCribHistory"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={!!field.value}
                      disabled={!editable}
                    />
                  }
                  label=""
                />
              )}
            />
          </div>
          {!isNoCribHistory && (
            <div className="flex flex-col gap-9">
              <Controller
                name="cribUpload"
                control={control}
                render={({ field }) => {
                  return (
                    <div
                      onDrop={(e) => {
                        e.preventDefault();
                        const droppedFiles = e.dataTransfer.files
                          ? Array.from(e.dataTransfer.files)
                          : [];
                        if (droppedFiles.length > 0) {
                          const selectedFile = droppedFiles[0]; // Only accept the first file
                          field.onChange(selectedFile);
                          console.log(selectedFile);
                        }
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      className={`border-2 border-dashed border-gray-300 p-6 bg-gray-50 rounded-4 text-center ${
                        editable ? "cursor-pointer" : "cursor-not-allowed"
                      } hover:bg-grey-100 h-112`}
                      onClick={() => eFormUploadRef.current?.click()}
                    >
                      <input
                        id="cribFileInput"
                        type="file"
                        accept=".pdf"
                        disabled={!editable}
                        hidden
                        ref={eFormUploadRef}
                        onChange={(e) => {
                          const selectedFile = e.target.files
                            ? e.target.files[0]
                            : null; // Only accept one file
                          field.onChange(selectedFile);
                          console.log(selectedFile);
                          // setNICFile(selectedFile);
                        }}
                      />
                      {!field.value ? (
                        <div className="flex flex-col items-center justify-center py-6">
                          <svg
                            className="w-24 h-24 my-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>

                          <p className="mb-3 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click or Drag and Drop a File Here to Upload
                            </span>
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF (MAX. 2 MB)
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-6">
                          <div
                            className="flex flex-col gap-6"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Card className="py-6 px-12 text-start flex flex-row justify-between items-center">
                              <div className="flex flex-row gap-6 items-center">
                                <EdgeSvgIcon size={32} className="text-primary">
                                  feather:file-text
                                </EdgeSvgIcon>
                                <span className="font-semibold flex flex-col">
                                  <p className="font-normal">
                                    {field.value.name.length > 20
                                      ? field.value.name.substring(0, 20) +
                                        "..."
                                      : field.value.name}
                                  </p>
                                  <p className="font-light text-[14px] text-gray-600">
                                    {(field.value.size / (1024 * 1024)).toFixed(
                                      2
                                    )}{" "}
                                    MB
                                  </p>
                                </span>
                              </div>
                              <Button
                                variant="contained"
                                //   disabled={isFileUploading}
                                sx={{
                                  backgroundColor: "transparent",
                                  boxShadow: "none",
                                  color: "#000",
                                  "&:hover": {
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                  },
                                  "&.Mui-disabled": {
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  field.onChange(null);
                                  // setNICFile(null);
                                  if (eFormUploadRef.current) {
                                    eFormUploadRef.current.value = null; // Reset input value
                                  }
                                }}
                              >
                                <EdgeSvgIcon
                                  size={24}
                                  className={`${
                                    isFileUploading
                                      ? "text-gray-400"
                                      : "text-primary"
                                  }`}
                                >
                                  feather:trash-2
                                </EdgeSvgIcon>
                              </Button>
                            </Card>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              <div className="flex gap-9 justify-end">
                <Button
                  aria-label="Save"
                  type="button"
                  onClick={onUploadButtonClick}
                  disabled={!editable}
                >
                  <EdgeSvgIcon
                    className="icon-size-12 cursor-pointer text-white mr-3"
                    color="error"
                  >
                    feather:upload-cloud
                  </EdgeSvgIcon>
                  Upload
                </Button>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default CribDetailForm;
