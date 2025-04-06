import React, { useEffect, useRef, useState } from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { Button, Card, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { toast } from "react-toastify";
import Logger from "../../../../../@helpers/Logger";
import { DocumentInfo } from "../../../../core/types/DocumentInfo";
import { Api } from "../../../../../api/Api";
import fs from "fs";
import {
  CribPullExcelFileGenerateRequest,
  XMLFileUploadRequest,
} from "../../@types/CribPullRequest";

export interface BulkXMLUploadProps {
  task: TaskDetailInfo;
}

const BulkXMLUpload: React.FC<BulkXMLUploadProps> = ({ task }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [isFileDownloading, setIsFileDownloading] = useState<boolean>(false);

  const [uploadData, setUploadData] = useState<DocumentInfo | null>(null);

  const fileInputRef = useRef(null);

  const methods = useForm();
  const { control } = methods;

  console.log("file status", file);

  const handleXMLFileUpload = async () => {
    try {
      let uploadedFileId = uploadData?.id || "";
      setIsFileUploading(true);

      if (file !== null) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("processInstance", task.processInstanceId);
        formData.append("taskInstance", task?.taskInstance);

        try {
          const { data: fileUploadData, err: fileUploadErr } =
            await Api.performRequest((r) => r.document.upload(formData));

          Logger.debug(
            "(Doc Upload) => { DATA: " +
              JSON.stringify(fileUploadData) +
              " , ERROR: " +
              JSON.stringify(fileUploadErr) +
              " }"
          );

          if (fileUploadData) {
            toast.success("Successfully Uploaded File");
            uploadedFileId = fileUploadData.id;
            setUploadData(fileUploadData);
          } else {
            toast.error(fileUploadErr?.msg);
            return;
          }
        } catch (err) {
          console.error("Error uploading file: ", err);
          toast.error("Failed to upload file");
          return;
        }
      }

      const fileData: XMLFileUploadRequest = {
        processInstance: task.processInstanceId,
        taskInstance: task.taskInstance,
        fileId: uploadedFileId,
      };

      const { data: xmlUploadData, err: xmlUploadError } =
        await Api.performRequest((r) => r.cribPull.bulkXMLFileUpload(fileData));

      if (xmlUploadData !== null) {
        toast.success("XML File Uploaded Successfully");
      } else {
        toast.error("Failed to save file entry", <p>{xmlUploadError?.msg}</p>);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFileUploading(false);
    }
  };

  const handleExcelGenerate = async () => {
    const request: CribPullExcelFileGenerateRequest = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
    };

    try {
      setIsFileDownloading(true);

      // Get the auth token from localStorage
      const token = localStorage.getItem("token");

      //   Use fetch directly to send the request with Authorization header
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/credit-card/crib-pull/excel-file`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate Excel file");
      }

      // Response should be treated as a binary blob
      const blob = await response.blob();

      // Create a URL for the Blob and download it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Set the filename for the downloaded file
      link.setAttribute("download", "crib_pull_report.xls");

      // Append the link to the document body
      document.body.appendChild(link);

      // Trigger the download by clicking the link
      link.click();

      // Clean up by revoking the object URL and removing the link
      window.URL.revokeObjectURL(url);
      link.remove();

      setIsFileDownloading(false);
      toast.success("Excel file downloaded successfully");
    } catch (error) {
      console.error("Error during file download:", error);
      setIsFileDownloading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col p-6 gap-4">
        <p className="text-10 font-bold">Select XML File</p>

        <Controller
          name="xmlUpload"
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
                className="border-2 border-dashed border-gray-300 p-6 bg-gray-50 rounded-4 text-center cursor-pointer hover:bg-grey-100 h-92"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  id="fileInput"
                  type="file"
                  accept=".xml"
                  hidden
                  ref={fileInputRef}
                  onChange={(e) => {
                    const selectedFile = e.target.files
                      ? e.target.files[0]
                      : null; // Only accept one file
                    field.onChange(selectedFile);
                    console.log(selectedFile);
                    setFile(selectedFile);
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
                    <p className="text-xs text-gray-500">XML (MAX. 2 MB)</p>
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
                            <p className="font-normal">{field.value.name}</p>
                            <p className="font-light text-[14px] text-gray-600">
                              {(field.value.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </span>
                        </div>
                        <Button
                          variant="contained"
                          disabled={isFileUploading}
                          sx={{
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            color: "#000",
                            "&:hover": {
                              backgroundColor: "transparent",
                              boxShadow: "none",
                            },
                            "&.Mui-disabled": {
                              backgroundColor: "transparent", // Transparent when disabled
                              boxShadow: "none",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            field.onChange(null);
                            setFile(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = null; // Reset input value
                            }
                          }}
                        >
                          <EdgeSvgIcon
                            size={24}
                            className={`${
                              isFileUploading ? "text-gray-400" : "text-primary"
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

        <div className="flex justify-end my-6 h-full items-end gap-6">
          <Button
            aria-label="Save"
            type="button"
            disabled={(file === null ? true : false) || isFileUploading}
            onClick={handleXMLFileUpload}
          >
            {isFileUploading && (
              <CircularProgress
                className="mx-auto mr-3"
                sx={{ color: "white" }}
                size={18}
              />
            )}
            {!isFileUploading && (
              <EdgeSvgIcon
                className="icon-size-12 cursor-pointer text-white mr-3"
                color="error"
              >
                feather:upload-cloud
              </EdgeSvgIcon>
            )}
            Upload Bulk XML
          </Button>
          <Button
            aria-label="Save"
            type="button"
            onClick={handleExcelGenerate}
            disabled
          >
            <EdgeSvgIcon
              className="icon-size-12 cursor-pointer text-white mr-3"
              color="error"
            >
              feather:download-cloud
            </EdgeSvgIcon>
            Download Excel (Generated)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkXMLUpload;
