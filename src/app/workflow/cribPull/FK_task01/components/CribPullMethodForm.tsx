import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Button, Card, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../@helpers/Logger";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { Api } from "../../../../../api/Api";
import {
  DropDownItem,
  DropDownItemCribPull,
} from "../../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { toast } from "react-toastify";
import { DocumentInfo } from "../../../../core/types/DocumentInfo";
import { CribFileUploadRequest } from "../../@types/CribPullRequest";
import {
  CribPullProcess,
  CribPullTableRequest,
} from "../../@types/CribPullTable";

export interface CribPullMethodFormProps {
  task: TaskDetailInfo;
  selectedUploadMethod: DropDownItemCribPull | null;
  setSelectedUploadMethod: (method: DropDownItemCribPull | null) => void;
  selectedInitiatingUnit: DropDownItemCribPull | null;
  initiatingUnit: DropDownItemCribPull | null;
  setSelectedInitiatingUnit: (method: DropDownItemCribPull | null) => void;
  isSubmitted: boolean;
  setIsSubmitted: (val: boolean) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  refreshTable: boolean;
  setRefreshTable: (val: boolean) => void;
  selectedItemForEdit: CribPullProcess | null;
  tableData: CribPullTableRequest | null;
}

type FormType = {
  entryMethod: DropDownItemCribPull | null;
  initiatingUnit: DropDownItem | null;
  leadType: DropDownItemCribPull | null;
  fileUpload: string;
  selectedItemForEdit: CribPullProcess | null;
};

const defaultValues: FormType = {
  entryMethod: null,
  initiatingUnit: null,
  leadType: null,
  fileUpload: "",
  selectedItemForEdit: null,
};

export interface InitiatingUnitType {
  id: number;
  itemValue: string;
  itemLabel: string;
}

const schema = z.object({
  entryMethod: z
    .object({
      name: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Upload method is required",
    }),
  initiatingUnit: z
    .object({
      name: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Unit Initiating CRIB Pull is required",
    }),
  leadType: z
    .object({
      name: z.string(),
    })
    .nullable()
    .optional(),
  fileUpload: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "File upload is required",
    })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be 2 MB or less",
    }),
});

const CribPullMethodForm: React.FC<CribPullMethodFormProps> = ({
  task,
  selectedUploadMethod,
  setSelectedUploadMethod,
  setSelectedInitiatingUnit,
  isSubmitted,
  setIsSubmitted,
  setIsLoading,
  refreshTable,
  setRefreshTable,
  tableData,
  selectedItemForEdit,
}) => {
  // const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [uploadMethods, setUploadMethods] = useState<DropDownItemCribPull[]>(
    []
  );
  const [unitiInitiatingMethods, setUnitInitiatingMethods] = useState<
    DropDownItem[]
  >([]);
  const [leadTypes, setLeadTypes] = useState<DropDownItemCribPull[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState<DocumentInfo | null>(null);

  const { control, formState, setError, setValue, handleSubmit } =
    useForm<FormType>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });

  const { errors } = formState;

  console.log(errors);

  const fetchCribPullMethods = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullDropDownData("crib-pull-methods")
      );

      Logger.debug(
        "(Crib Pull Methods) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data != null) {
        setUploadMethods(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUnitInitiatingMethod = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullDropDownData("unit-initiating")
      );

      Logger.debug(
        "(Crib Pull Methods) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data != null) {
        setUnitInitiatingMethods(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLeadTypes = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullDropDownData("lead-types")
      );

      Logger.debug(
        "(Crib Pull Methods) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data != null) {
        setLeadTypes(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCribPullMethods();
    fetchUnitInitiatingMethod();
    fetchLeadTypes();
  }, []);

  useEffect(() => {
    if (tableData) {
      const valueMap: {
        [key: string]: string;
      } = {
        DATA_ENTRY: "Data Entry",
        CLI_INFO_FILE: "CLI File Upload",
        SIMPLE_FILE: "Simple File Upload",
        EFORM: "EForm Upload",
        LEAD_GENERATION_FILE: "Lead Generation Upload",
      };

      const val = valueMap[tableData?.cribPullMethod] || null;

      const currUploadMethod = uploadMethods.find((item) => item.name === val);
      const currUnitInitiating = unitiInitiatingMethods.find(
        (item) => item.name === tableData.unitInitiating
      );
      setValue("entryMethod", currUploadMethod || null);
      setSelectedUploadMethod(currUploadMethod || null);
      setValue("initiatingUnit", currUnitInitiating || null);
      setSelectedInitiatingUnit(currUnitInitiating || null);
    }
  }, [tableData]);

  const handleOnSubmit = async (data: FormType) => {
    const { entryMethod, initiatingUnit, leadType } = data;

    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }

    if (!task) {
      Logger.debug("Task data is missing");
      return;
    }

    setIsSubmitted(true);
    setIsLoading(true);

    let uploadedFileId = uploadData?.id || "";

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
            toast.success("Successfully Uploaded File");
            setFile(null);
            uploadedFileId = fileUploadData.id;
            setUploadData(fileUploadData);
          } else {
            toast.error(fileUploadErr?.msg);
            setIsSubmitted(false);
            return;
          }
        } catch (err) {
          console.error("Error uploading file: ", err);
          toast.error("Failed to upload file");
          setIsSubmitted(false);
          return;
        }
      }

      const fileData: CribFileUploadRequest = {
        processInstance: task.processInstanceId,
        cribPullMethod: entryMethod?.name || "",
        unitInitiating: initiatingUnit?.name || "",
        fileId: uploadedFileId,
        leadType:
          selectedUploadMethod?.name === "Lead Generation Upload"
            ? leadType?.name || null
            : null,
      };

      const { data: saveData, err: saveErr } = await Api.performRequest((r) =>
        r.cribPull.saveCribFileEntry(fileData)
      );

      if (saveData !== null) {
        toast.success("File entry saved successfully");
        Logger.debug("File entry saved successfully");
      } else {
        Logger.error("Error saving file entry: " + saveErr?.msg);
        toast.error("Failed to save file entry");
      }
    } catch (error) {
      Logger.error("Exception during file entry submission: " + error);
      toast.error("An error occurred during submission");
    } finally {
      setIsSubmitted(false);
      setRefreshTable(!refreshTable);
    }
  };

  return (
    <Paper className="px-12">
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex items-center text-blue-gray-800">
          <div>
            <EdgeSvgIcon
              className="icon-size-18 cursor-pointer mr-3"
              color="error"
            >
              feather:settings
            </EdgeSvgIcon>
          </div>
          <div>Crib Pull Method</div>
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div
          className={`grid ${
            selectedUploadMethod?.name === "Data Entry" ||
            isMobile ||
            selectedItemForEdit != null
              ? "grid-cols-1"
              : "grid-cols-2"
          } gap-9`}
        >
          <div className="flex flex-col gap-9">
            <Controller
              name="entryMethod"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={uploadMethods}
                  disabled={tableData ? true : false}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  isOptionEqualToValue={(option, val) =>
                    option.name === val.name
                  }
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);

                    const selectedMethod =
                      newValue?.name === "Data Entry"
                        ? uploadMethods[0]
                        : uploadMethods.find(
                            (method) => method.name === newValue?.name
                          ) || null;

                    setSelectedUploadMethod(selectedMethod);

                    if (newValue?.name !== "Lead Generation Upload") {
                      setValue("leadType", null);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Upload Method"
                      required
                      size="small"
                      error={!!errors.entryMethod}
                      helperText={errors?.entryMethod?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="initiatingUnit"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={unitiInitiatingMethods}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  value={value}
                  disabled={tableData ? true : false}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                    setSelectedInitiatingUnit(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Unit Initiating CRIB Pull"
                      required
                      size="small"
                      error={!!errors.initiatingUnit}
                      helperText={errors?.initiatingUnit?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              )}
            />
            {selectedUploadMethod?.name === "Lead Generation Upload" && (
              <Controller
                name="leadType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={leadTypes}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    isOptionEqualToValue={(option, val) =>
                      option.name === val.name
                    }
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Lead Type"
                        required
                        size="small"
                        error={!!errors.leadType}
                        helperText={errors?.leadType?.message}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                )}
              />
            )}
          </div>
          {selectedUploadMethod?.name !== "Data Entry" &&
            selectedItemForEdit == null && (
              <Controller
                name="fileUpload"
                control={control}
                render={({ field }) => (
                  <div
                    onDrop={(e) => {
                      e.preventDefault();
                      const droppedFiles = e.dataTransfer.files
                        ? Array.from(e.dataTransfer.files)
                        : [];
                      if (droppedFiles.length > 0) {
                        const selectedFile = droppedFiles[0];
                        field.onChange(selectedFile);
                        console.log(selectedFile);
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-gray-300 p-6 bg-gray-50 rounded-4 text-center cursor-pointer hover:bg-grey-100"
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    <input
                      id="fileInput"
                      type="file"
                      accept={
                        selectedUploadMethod?.name ===
                          "Lead Generation Upload" ||
                        selectedUploadMethod?.name === "EForm Upload"
                          ? ".xls"
                          : ".xlsx"
                      }
                      hidden
                      onChange={(e) => {
                        const selectedFile = e.target.files
                          ? e.target.files[0]
                          : null;
                        field.onChange(selectedFile);
                        console.log(selectedFile);
                        setFile(selectedFile);
                      }}
                    />
                    {!field.value ? (
                      <div className="flex flex-col items-center justify-center py-6">
                        {(selectedUploadMethod?.name ===
                          "Lead Generation Upload" ||
                          isMobile) && (
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
                        )}
                        <p className="mb-3 text-sm text-gray-500">
                          <span className="font-semibold">
                            Click or Drag and Drop a File Here to Upload
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          XLSX, XLS (MAX. 2 MB)
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
                                  {field.value.name}
                                </p>
                                <p className="font-light text-[14px] text-gray-600">
                                  {(field.value.size / (1024 * 1024)).toFixed(
                                    2
                                  )}{" "}
                                  MB
                                </p>
                              </span>
                            </div>
                            <EdgeSvgIcon
                              size={24}
                              className="text-primary cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                field.onChange(null);
                                setFile(null);
                                const input = document.getElementById(
                                  "fileInput"
                                ) as HTMLInputElement;
                                if (input) {
                                  input.value = "";
                                }
                              }}
                            >
                              feather:trash-2
                            </EdgeSvgIcon>
                          </Card>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              />
            )}
        </div>
        {selectedUploadMethod?.name !== "Data Entry" &&
          selectedItemForEdit == null && (
            <div className="flex justify-end my-6 h-full items-end">
              <Button aria-label="Save" type="submit">
                <EdgeSvgIcon
                  className="icon-size-12 cursor-pointer text-white mr-3"
                  color="error"
                >
                  feather:upload-cloud
                </EdgeSvgIcon>
                Upload
              </Button>
            </div>
          )}
      </form>
    </Paper>
  );
};

export default CribPullMethodForm;
