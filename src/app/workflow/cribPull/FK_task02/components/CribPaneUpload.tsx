import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { Controller, useForm } from "react-hook-form";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { Api } from "../../../../../api/Api";
import { CribPaneRequest } from "../../@types/CribPullRequest";
import { toast } from "react-toastify";
import { DocumentInfo } from "../../../../core/types/DocumentInfo";
import Logger from "../../../../../@helpers/Logger";
import { CribPullProcess } from "../../@types/CribPullTable";
import { CribPullFileInfo } from "../../@types/CribPullInfo";
import PDFCard from "./PDFCard";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";

export interface CribPaneUploadProps {
  task: TaskDetailInfo;
  currentCribProcessItem: CribPullProcess | null;
  setSelectedCribPanePDF: (val: CribPullFileInfo | null) => void;
}

const CribPaneUpload: React.FC<CribPaneUploadProps> = ({
  task,
  currentCribProcessItem,
  setSelectedCribPanePDF,
}) => {
  const [nicFile, setNICFile] = useState<File | null>(null);
  const [eicFile, setEICFile] = useState<File | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [isUploadDisabled, setIsUploadDisabled] = useState<boolean>(false);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(true);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

  const [uploadData, setUploadData] = useState<DocumentInfo | null>(null);

  const [cribPaneNICPDF, setCribPaneNICPDFs] =
    useState<CribPullFileInfo | null>(null);
  const [cribPaneEICPDF, setCribPaneEICPDFs] =
    useState<CribPullFileInfo | null>(null);
  const [cribPanePPPDF, setCribPanePPPDFs] = useState<CribPullFileInfo | null>(
    null
  );

  const getCribPanePdf = async () => {
    if (!currentCribProcessItem) {
      return;
    }
    try {
      const params = ["NIC", "EIC", "PASSPORT"];
      const results = await Promise.all(
        params.map(async (param) => {
          const { data, err } = await Api.performRequest((r) =>
            r.cribPull.getCribPanePDF(currentCribProcessItem.id, param)
          );

          if (err) {
            console.error(`Error fetching PDF for ${param}:`, err);
            return null;
          }

          return data;
        })
      );

      setCribPaneNICPDFs(results[0]);
      setCribPaneEICPDFs(results[1]);
      setCribPanePPPDFs(results[2]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFileLoading(false);
    }
  };

  // useEffect to call the function when the component mounts
  useEffect(() => {
    getCribPanePdf();
  }, [currentCribProcessItem]);

  const nicInputRef = useRef<HTMLInputElement>(null);
  const eicInputRef = useRef<HTMLInputElement>(null);
  const passportRef = useRef<HTMLInputElement>(null);

  const methods = useForm();
  const { control, reset } = methods;

  const determineMultipleFilesAdded = () => {
    const uploadCount = [nicFile, eicFile, passportFile].filter(
      (file) => file !== null
    ).length;

    if (uploadCount === 1) {
      setIsUploadDisabled(false);
    } else {
      setIsUploadDisabled(true);
    }
  };

  // const handleCommonUpload = () => {
  //   if (nicFile !== null) {
  //     handleCRIBPaneUpload(nicFile, "NIC");
  //   } else if (eicFile !== null) {
  //     handleCRIBPaneUpload(eicFile, "EIC");
  //   } else if (passportFile !== null) {
  //     handleCRIBPaneUpload(passportFile, "PASSPORT");
  //   } else {
  //     toast.error("No file selected for upload");
  //   }
  // };

  const handleCRIBPaneUpload = async (file: File | null, idType: string) => {
    let uploadedFileId = uploadData?.id || "";
    setIsFileUploading(true);

    if (!currentCribProcessItem) {
      return;
    }

    try {
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

      const request: CribPaneRequest = {
        processInstance: task.processInstanceId,
        taskInstance: task.taskInstance,
        fileId: uploadedFileId,
        cribPullProcessId: currentCribProcessItem.id,
        idType: idType,
      };

      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.cribPaneUpload(request)
      );

      if (data !== null) {
        toast.success(`${idType} Crib pane uploaded successfully`);
        getCribPanePdf();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFileUploading(false);
      setNICFile(null);
      setEICFile(null);
      setPassportFile(null);
      reset({
        eicUpload: null,
        nicUpload: null,
        passportUpload: null,
      });
    }
  };

  const handleCribPaneDelete = async (fileId: string, idType: string) => {
    if (!currentCribProcessItem) {
      return;
    }
    const request: CribPaneRequest = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
      fileId: fileId,
      cribPullProcessId: currentCribProcessItem.id,
      idType: idType,
    };

    try {
      const { err } = await Api.performRequest((r) =>
        r.cribPull.cribPaneDelete(request)
      );
      if (!err) {
        toast.success("File deleted successfully");
      }
    } catch (err) {
      console.log(err);
    } finally {
      getCribPanePdf();
      setSelectedCribPanePDF(null);
    }
  };

  useEffect(() => {
    determineMultipleFilesAdded();
  }, [nicFile, eicFile, passportFile]);

  return (
    <div>
      <Paper className="px-12 pb-12 flex flex-col">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-md font-600 text-left flex items-center text-blue-gray-800">
            <div>
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                material-outline:picture_as_pdf
              </EdgeSvgIcon>
            </div>
            <p>CRIB PANE (UPLOAD)</p>
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1">
          <div className="flex flex-col p-6 gap-4">
            <p className="text-10 font-bold">NIC CRIB Pane</p>

            {isFileLoading ? (
              // <Ve3LoadingScreen className="h-10" />
              <></>
            ) : cribPaneNICPDF ? (
              <div
                onClick={() => setSelectedCribPanePDF(cribPaneNICPDF)}
                className="mt-6 w-full p-3 px-6 flex flex-row justify-between border border-primary rounded-sm text-primary hover:bg-grey-50 hover:cursor-pointer"
              >
                <div className="flex flex-row gap-3">
                  <EdgeSvgIcon>material-outline:picture_as_pdf</EdgeSvgIcon>
                  <p>
                    {cribPaneNICPDF.name.length > 40
                      ? `${cribPaneNICPDF.name.substring(0, 40)}...`
                      : cribPaneNICPDF.name}
                  </p>
                </div>

                <EdgeSvgIcon
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCribPanePDF(null);
                    handleCribPaneDelete(cribPaneNICPDF.id, "NIC");
                  }}
                >
                  feather:trash-2
                </EdgeSvgIcon>
              </div>
            ) : (
              <Controller
                name="nicUpload"
                control={control}
                render={({ field }) => (
                  <div>
                    <div className="flex flex-row gap-3">
                      <Button
                        variant="outlined"
                        onClick={() => nicInputRef.current?.click()}
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
                        <EdgeSvgIcon className="mr-3">
                          feather:upload
                        </EdgeSvgIcon>
                        Select File
                      </Button>

                      <input
                        type="file"
                        accept=".pdf"
                        ref={nicInputRef}
                        hidden
                        onChange={(e) => {
                          const selectedFile = e.target.files
                            ? e.target.files[0]
                            : null;
                          field.onChange(selectedFile);
                          console.log(selectedFile);
                          setNICFile(selectedFile);
                        }}
                      />
                      <Button
                        onClick={() => handleCRIBPaneUpload(nicFile, "NIC")}
                        disabled={isFileUploading}
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
                            setNICFile(null);
                            if (nicInputRef.current) {
                              nicInputRef.current.value = "";
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
            )}
          </div>

          {/* EIC Upload */}

          <div className="flex flex-col p-6 gap-4">
            <p className="text-10 font-bold">Select EIC CRIB Pane</p>

            {isFileLoading ? (
              // <Ve3LoadingScreen className="h-10" />
              <></>
            ) : cribPaneEICPDF ? (
              <div
                onClick={() => setSelectedCribPanePDF(cribPaneEICPDF)}
                className="mt-6 w-full p-3 px-6 flex flex-row justify-between border border-primary rounded-sm text-primary hover:bg-grey-50 hover:cursor-pointer"
              >
                <div className="flex flex-row gap-3">
                  <EdgeSvgIcon>material-outline:picture_as_pdf</EdgeSvgIcon>
                  <p>
                    {cribPaneEICPDF.name.length > 40
                      ? `${cribPaneEICPDF.name.substring(0, 40)}...`
                      : cribPaneEICPDF.name}
                  </p>
                </div>

                <EdgeSvgIcon
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCribPanePDF(null);
                    handleCribPaneDelete(cribPaneEICPDF.id, "EIC");
                  }}
                >
                  feather:trash-2
                </EdgeSvgIcon>
              </div>
            ) : (
              <Controller
                name="eicUpload"
                control={control}
                render={({ field }) => (
                  <div>
                    <div className="flex flex-row gap-3">
                      <Button
                        variant="outlined"
                        onClick={() => eicInputRef.current?.click()}
                        className="w-full"
                        sx={{
                          backgroundColor: "white",
                          color: "black",
                          borderColor: "black",
                          justifyContent: "flex-start",
                          gap: 1,
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
                        <EdgeSvgIcon className="mr-3">
                          feather:upload
                        </EdgeSvgIcon>
                        Select File
                      </Button>

                      <input
                        type="file"
                        accept=".pdf"
                        ref={eicInputRef}
                        hidden
                        onChange={(e) => {
                          const selectedFile = e.target.files
                            ? e.target.files[0]
                            : null;
                          field.onChange(selectedFile);
                          console.log(selectedFile);
                          setEICFile(selectedFile);
                        }}
                      />
                      <Button
                        onClick={() => handleCRIBPaneUpload(eicFile, "EIC")}
                        disabled={isFileUploading}
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
                            setEICFile(null);
                            if (eicInputRef.current) {
                              eicInputRef.current.value = "";
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
            )}
          </div>

          {/* Passport Upload */}
          <div className="flex flex-col p-6 gap-4">
            <p className="text-10 font-bold">Select Passport CRIB Pane</p>

            {isFileLoading ? (
              // <Ve3LoadingScreen className="h-10" />
              <></>
            ) : cribPanePPPDF ? (
              <div
                onClick={() => setSelectedCribPanePDF(cribPanePPPDF)}
                className="mt-6 w-full p-3 px-6 flex flex-row justify-between border border-primary rounded-sm text-primary hover:bg-grey-50 hover:cursor-pointer"
              >
                <div className="flex flex-row gap-3">
                  <EdgeSvgIcon>material-outline:picture_as_pdf</EdgeSvgIcon>
                  <p>
                    {cribPanePPPDF.name.length > 40
                      ? `${cribPanePPPDF.name.substring(0, 40)}...`
                      : cribPanePPPDF.name}
                  </p>
                </div>

                <EdgeSvgIcon
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCribPanePDF(null);
                    handleCribPaneDelete(cribPanePPPDF.id, "PASSPORT");
                  }}
                >
                  feather:trash-2
                </EdgeSvgIcon>
              </div>
            ) : (
              <Controller
                name="passportUpload"
                control={control}
                render={({ field }) => (
                  <div>
                    <div className="flex flex-row gap-3">
                      <Button
                        variant="outlined"
                        onClick={() => passportRef.current?.click()}
                        className="w-full"
                        sx={{
                          backgroundColor: "white",
                          color: "black",
                          borderColor: "black",
                          justifyContent: "flex-start",
                          gap: 1,
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
                        <EdgeSvgIcon className="mr-3">
                          feather:upload
                        </EdgeSvgIcon>
                        Select File
                      </Button>

                      <input
                        type="file"
                        accept=".pdf"
                        ref={passportRef}
                        hidden
                        onChange={(e) => {
                          const selectedFile = e.target.files
                            ? e.target.files[0]
                            : null;
                          field.onChange(selectedFile);
                          console.log(selectedFile);
                          setPassportFile(selectedFile);
                        }}
                      />

                      <Button
                        onClick={() =>
                          handleCRIBPaneUpload(passportFile, "PASSPORT")
                        }
                        disabled={isFileUploading}
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
                            setPassportFile(null);
                            if (passportRef.current) {
                              passportRef.current.value = "";
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
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default CribPaneUpload;
