import { FC, useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { Controller, useForm } from "react-hook-form";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormRequest } from "./FormRequest";
import Logger from "../../../../../@helpers/Logger";
import { toast } from "react-toastify";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { Api } from "../../../../../api/Api";
import { DocumentInfo } from "../../../../core/types/DocumentInfo";
import ESignViewDetails from "./ESignViewDetails";
import RetriveFile, {
  EncodeUrlPath,
} from "../../../../../@helpers/RetriveFiles";

export interface DocumentUploadFormProps {
  branchList: { id: number; name: string }[];
  task: TaskDetailInfo;
  form: FormRequest | null;
  userList: { id: string; name: string }[];
  docType: { id: string; name: string }[];
  files: Blob | null;
}

type FormType = {
  fileDataRequest: FormRequest | null;
  fileUpload: string;
};

const defaultValues: FormType = {
  fileDataRequest: null,
  fileUpload: "",
};

const monthList = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

const documentUpload: FC<DocumentUploadFormProps> = (props) => {
  const { branchList, task, form, userList, docType, files } = props;
  console.log("filessssssssss", files);
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState<DocumentInfo | null>(null);
  const [getFilePath, setFilePath] = useState("");
  const [openViewModel, setOpenViewModel] = useState(false);

  const schema = z.object({
    fileDataRequest: z.object({
      approverId: z.string().min(1, "Approver is mandatory."),
      documentName: z.string().optional(),
      documentType: z.string().nullable().optional(),
      customerName: z.string().nullable().optional(),
      cardNumber: z.string().nullable().optional().refine((val) => !val || /^[0-9]+$/.test(val), {
        message: "Card Number must contain only numbers",
      }),
      acNumber: z.string().nullable().optional().refine((val) => !val || /^[0-9]+$/.test(val), {
        message: "Account Number must contain only numbers",
      }),
      branch: z.number().optional(),
      addLetterHead: z.boolean().optional(),
      nic: z
        .string()
        .refine(
          (val) =>
            !val ||
            (val.length === 10 && /^[0-9]{9}[VvXx]$/.test(val)) ||
            (val.length === 12 && /^[0-9]{12}$/.test(val)),
          {
            message:
              "If 9 characters, NIC must end with V/v/X/x. If 12 characters, it must be numeric only.",
          }
        ),
    }),
  });

  const { control, handleSubmit, formState, setError, setValue } =
    useForm<FormType>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });
  const { errors } = formState;

  const handleOnSubmit = async (formData: FormType) => {
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }
    setIsSubmitted(true);

    const {
      documentName,
      documentType,
      active,
      customerName,
      acNumber,
      docRef,
      cardNumber,
      nic,
      branch,
      wfLabel,
      initiator,
      createUser,
      createDate,
      businessKey,
      processInstance,
      signatureImage,
      pdfFilePath,
      oldEdgeDocRef,
      newEdgeDocRef,
      approverId,
      wfIsCompleted,
      addLetterHead,
      docPath,
    } = formData.fileDataRequest;

    let uploadedFileId = uploadData?.id || "";

    console.log(uploadedFileId);

    let fileURL = null;

    try {
      if (file !== null) {

        if (file.type !== "application/pdf") {
          toast.error("Please Upload a Valid PDF File");
          setIsSubmitted(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("taskInstance", task.taskInstance);
        formData.append("processInstance", task.processInstanceId);

        try {
          const { data: fileUploadData, err: fileUploadErr } =
            await Api.performRequest((r) => r.document.upload(formData));

          if (fileUploadData) {
            fileURL = fileUploadData.id;
            setFilePath(fileUploadData.path);
            toast.success("Successfully Uploaded File");
            setFile(null);
            uploadedFileId = fileUploadData.id;
            setUploadData(fileUploadData);

            // Save metadata locally or send it to the backend
            localStorage.setItem(
              "uploadedFile",
              JSON.stringify({ name: file.name, path: fileURL })
            );
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
      if (fileURL !== "") {
        console.log("path url ---> ", EncodeUrlPath(fileURL));
      }
      let finalPathUrl = EncodeUrlPath(fileURL);

      if(fileURL !== null){
        const eSignData: FormRequest = {
          documentName,
          documentType,
          active,
          customerName,
          acNumber,
          docRef,
          cardNumber,
          nic,
          branch,
          wfLabel,
          initiator,
          createUser,
          createDate,
          businessKey,
          processInstance: task.processInstanceId,
          signatureImage,
          docReferenceID: fileURL || "",
          oldEdgeDocRef,
          newEdgeDocRef,
          approverId,
          wfIsCompleted,
          addLetterHead,
          docPath,
        };
        console.log("eSignData", eSignData);
        const { data: saveData, err: saveErr } = await Api.performRequest((r) =>
          r.creditCard.saveESignUploadForm(eSignData)
        );
  
        if (saveData !== null) {
          toast.success("File entry saved successfully");
          Logger.debug("File entry saved successfully");
        } else {
          Logger.error("Error saving file entry: " + saveErr?.msg);
          toast.error("Failed to save file entry");
        }
      }else{
        toast.error("Please Upload PDF File");
          setIsSubmitted(false);
      }
    } catch (error) {
      Logger.error("Exception during file entry submission: " + error);
      toast.error("An error occurred during submission");
    } finally {
      setIsSubmitted(false);
    }
  };

  const viewModel = () => {
    console.log("file", file);
    setOpenViewModel(true);
  };

  const closeViewModel = () => {
    setOpenViewModel(false);
  };

  useEffect(() => {
    if (form !== null) {
      setValue("fileDataRequest.documentName", form.documentName);
      setValue("fileDataRequest.documentType", form.documentType);
      setValue("fileDataRequest.customerName", form.customerName);
      setValue("fileDataRequest.cardNumber", form.cardNumber);
      setValue("fileDataRequest.acNumber", form.acNumber);
      setValue("fileDataRequest.branch", form.branch);
      setValue("fileDataRequest.approverId", form.approverId);
      setValue("fileDataRequest.nic", form.nic);
      setValue("fileDataRequest.addLetterHead", form.addLetterHead);
      setValue("fileUpload", files || null);
    }
    if (files) {
      const fileName = files.name || "Uploaded File";
      setFile(new File([files], fileName, { type: files.type })); // Set the file object
    }
  }, [form, files]);

  return (
    <Paper className="px-12">
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
          <div>ADD DOCUMENT DETAILS</div>
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div className="grid md:grid-cols-2 gap-9">
          {/* Left Column: Form Fields */}
          <div className="flex flex-col gap-9">
            <Controller
              name="fileDataRequest.documentName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Document Name"
                  size="small"
                  type="email"
                  error={!!errors.fileDataRequest?.documentName}
                  helperText={errors?.fileDataRequest?.documentName?.message}
                />
              )}
            />
            <Controller
              name="fileDataRequest.documentType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={docType}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  value={docType.find((option) => option.id === value) || null}
                  onChange={(event, newValue) => {
                    onChange(newValue ? newValue.id : "");
                    console.log("value", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Document Type"
                      size="small"
                      error={!!errors.fileDataRequest?.documentType}
                      helperText={
                        errors?.fileDataRequest?.documentType?.message
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="fileDataRequest.customerName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Customer Name"
                  size="small"
                  type="email"
                  error={!!errors.fileDataRequest?.customerName}
                  helperText={errors?.fileDataRequest?.customerName?.message}
                />
              )}
            />
            <Controller
              name="fileDataRequest.cardNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Card Number"
                  size="small"
                  type="email"
                  error={!!errors.fileDataRequest?.cardNumber}
                  helperText={errors?.fileDataRequest?.cardNumber?.message}
                />
              )}
            />
            <Controller
              name="fileDataRequest.acNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="A/C Number"
                  size="small"
                  type="email"
                  error={!!errors.fileDataRequest?.acNumber}
                  helperText={errors?.fileDataRequest?.acNumber?.message}
                />
              )}
            />
            <Controller
              name="fileDataRequest.branch"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={branchList}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  value={
                    branchList.find((option) => option.id === value) || null
                  }
                  onChange={(event, newValue) => {
                    onChange(newValue ? newValue.id : "");
                    console.log("value", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Branch Name"
                      size="small"
                      error={!!errors.fileDataRequest?.branch}
                      helperText={errors?.fileDataRequest?.branch?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="fileDataRequest.approverId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={userList}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  value={userList.find((option) => option.id === value) || null}
                  onChange={(event, newValue) => {
                    onChange(newValue ? newValue.id : "");
                    console.log("value", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Approver"
                      size="small"
                      error={!!errors.fileDataRequest?.approverId}
                      helperText={errors?.fileDataRequest?.approverId?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="fileDataRequest.nic"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="NIC"
                  size="small"
                  type="email"
                  error={!!errors.fileDataRequest?.nic}
                  helperText={errors?.fileDataRequest?.nic?.message}
                />
              )}
            />
            <div className="flex flex-row items-center">
                          <p className="mx-4">Add Letter Head :</p>
                          <Controller
                            name="fileDataRequest.addLetterHead"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <FormControlLabel
                                control={<Checkbox {...field} checked={!!field.value} />}
                                label=""
                              />
                            )}
                          />
                        </div>
          </div>

          <div>
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
                      setFile(selectedFile);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-gray-300 p-6 bg-gray-50 rounded-4 text-center cursor-pointer hover:bg-grey-100"
                  style={{ height: "330px" }}
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <input
                    id="fileInput"
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={(e) => {
                      const selectedFile = e.target.files
                        ? e.target.files[0]
                        : null;
                      field.onChange(selectedFile);
                      setFile(selectedFile);
                    }}
                  />
                  {file ? (
                    <div className="flex flex-col gap-6">
                      <Card className="py-6 px-12 text-start flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-6 items-center">
                          <EdgeSvgIcon size={32} className="text-primary">
                            feather:file-text
                          </EdgeSvgIcon>
                          <span className="font-semibold flex flex-col">
                            <p className="font-normal">{file.name}</p>
                            <p className="font-light text-[14px] text-gray-600">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
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
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <p className="mb-3 text-sm text-gray-500">
                        <span className="font-semibold">
                          Click or Drag and Drop a File Here to Upload
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        XLSX, XLS (MAX. 2 MB)
                      </p>
                    </div>
                  )}
                </div>
              )}
            />

            <Button
              variant="contained"
              color="primary"
              className="my-10"
              onClick={() => viewModel()}
            >
              <p className="mx-6">VIEW</p>
            </Button>
          </div>
        </div>
        <div className="flex justify-start my-6 h-full">
          <Button aria-label="Save" type="submit">
            <EdgeSvgIcon
              className="icon-size-12 cursor-pointer text-white mr-3"
              color="error"
            >
              feather:upload-cloud
            </EdgeSvgIcon>
            Submit
          </Button>
        </div>
      </form>
      <ESignViewDetails
        open={openViewModel}
        handleClose={closeViewModel}
        filePassing={file}
      />
    </Paper>
  );
};

export default documentUpload;
