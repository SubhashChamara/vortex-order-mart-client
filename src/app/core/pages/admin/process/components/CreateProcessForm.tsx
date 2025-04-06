import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeButton from "../../../../../../@edgevantage/core/EdgeButton/EdgeButton";
import EdgeTextInput from "../../../../../../@edgevantage/core/EdgeTextInput/EdgeTextInput";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";
import Logger from "../../../../../../@helpers/Logger";
import { Api } from "../../../../../../api/Api";
import { ProcessCreateRequest } from "../../../../types/ProcessCreateRequest";
import { ProcessInfo } from "../../../../types/ProcessInfo";
import ProcessLogoForm from "./ProcessLogoForm";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";

const processTypeList: string[] = ["ADMIN", "STANDARD"];

type FormType = {
  name: string;
  description: string;
  serviceUrl: string;
  defKey: string;
  processType: string;
  validationClassName: string;
  labelGenerationClassName: string;
};

const defaultValues: FormType = {
  name: "",
  description: "",
  serviceUrl: "",
  defKey: "",
  processType: "",
  validationClassName: "",
  labelGenerationClassName: "",
};

const schema = z.object({
  name: z.string().min(1, "Process name is mandatory."),
  serviceUrl: z.string().min(1, "Service URL is mandatory."),
  processType: z.string(),
});

interface ProcessCreationFormProps {
  formTitle: string;
  actionName: string;
  processForUpdate: ProcessInfo | null;
  formReset: () => void;
  fetchProcessList: () => void;
}

const CreateGroupForm: FC<ProcessCreationFormProps> = (props) => {
  const {
    formTitle,
    actionName,
    processForUpdate,
    formReset,
    fetchProcessList,
  } = props;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [file, setFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    formState,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;
  console.log(watch());
  // const fetchProcessList = async () => {
  //   const { data, err } = await Api.performRequest((r) =>
  //     r.admin.ProcessInfoList()
  //   );

  //   Logger.debug(
  //     "(Process List) => { DATA: " +
  //       JSON.stringify(data) +
  //       " , ERROR: " +
  //       JSON.stringify(err)
  //   );

  //   if (data !== null) {
  //     setProcessList(data);
  //   }
  // };

  const handleOnSubmit = async (formData: FormType) => {
    console.log(getValues("labelGenerationClassName"));
    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }

    /**
     * set submit true to identify form submitted already
     * help to prevent multiple submissions
     */
    setIsSubmitted(true);

    const {
      name,
      description,
      serviceUrl,
      defKey,
      processType,
      validationClassName,
      labelGenerationClassName,
    } = formData;
    Logger.debug("Form Submitted : " + JSON.stringify(formData));

    let doc = null;
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("taskInstance", task.taskInstance);
      // formData.append("processInstance", task.processInstanceId);

      const { data, err } = await Api.performRequest((r) =>
        r.document.upload(formData)
      );

      Logger.debug(
        "(Icon Upload) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        doc = data;
        toast.success("Successfully Uploaded Icon");
      } else {
        toast.error(err?.msg);
      }
    }
    console.log(doc);
    const request: ProcessCreateRequest = {
      name: name,
      description: getValues("description"),
      serviceUrl: serviceUrl,
      defKey: getValues("defKey"),
      processType: processType,
      validationClassName: getValues("validationClassName"),
      labelGenerationClassName: getValues("labelGenerationClassName"),
      logo: doc?.id,
    };
    console.log(validationClassName);

    const { data, err } =
      actionName == "CREATE"
        ? await Api.performRequest((r) => r.admin.createProcess(request))
        : await Api.performRequest((r) =>
            r.admin.updateProcess(processForUpdate?.id, request)
          );

    Logger.debug(
      "(Process Creation) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (err == null) {
      let successMsg: string;
      actionName == "CREATE"
        ? (successMsg = "Process created Successfully")
        : (successMsg = "Process Updated Successfully");
      fetchProcessList();
      toast.success(successMsg);
      reset();
    } else {
      toast.error(err?.msg);
    }
    /**
     * set submit false to identify form submitted but failed
     * help to resubmit
     * and timeout prevent double clicks
     */
    setTimeout(() => setIsSubmitted(false), 3000);
    formReset();
  };

  useEffect(() => {
    console.log(processForUpdate);
    setValue("name", processForUpdate ? processForUpdate.name : "");
    setValue(
      "description",
      processForUpdate ? processForUpdate.description : ""
    );
    setValue("serviceUrl", processForUpdate ? processForUpdate.serviceUrl : "");
    setValue("defKey", processForUpdate ? processForUpdate.defKey : "");
    setValue(
      "processType",
      processForUpdate ? processForUpdate.processType : ""
    );
    setValue(
      "validationClassName",
      processForUpdate ? processForUpdate.validationClassName : ""
    );
    setValue(
      "labelGenerationClassName",
      processForUpdate ? processForUpdate.labelGenerationClassName : ""
    );
  }, [processForUpdate]);

  return (
    <div>
      <div className="mb-12 border-b-1 border-b-gray-200 pb-6 flex items-end">
        <EdgeSvgIcon
          className="icon-size-24 cursor-pointer mr-6 text-primary"
          color="error"
        >
          feather:link-2
        </EdgeSvgIcon>
        <h1 className="text-md font-bold text-secondary">{formTitle}</h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-1"
          } lg:grid-cols-1`}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                required
                label="Process Name"
                size="small"
                type="text"
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
            )}
          />
          <Controller
            name="defKey"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                required
                label="Process ID"
                size="small"
                type="text"
                error={!!errors.defKey}
                helperText={errors?.defKey?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                label="Description"
                size="small"
                type="text"
                error={!!errors.description}
                helperText={errors?.description?.message}
              />
            )}
          />
          <Controller
            name="serviceUrl"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                required
                label="Service URL"
                size="small"
                type="text"
                error={!!errors.serviceUrl}
                helperText={errors?.serviceUrl?.message}
              />
            )}
          />
          <Controller
            name="processType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={processTypeList}
                getOptionLabel={(option) => (option ? option : "")}
                isOptionEqualToValue={(option, val) => option === val}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                defaultValue={""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Process Type"
                    variant="outlined"
                    required
                    size="small"
                    error={!!errors.processType}
                    helperText={errors?.processType?.message}
                    InputLabelProps={{
                      sx: {
                        "&.Mui-focused": {
                          color: "#FF181B",
                          fontWeight: 600,
                        },
                      },
                      shrink: true,
                    }}
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF181B",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF181B",
                        },
                      },
                    }}
                  />
                )}
              />
            )}
          />
          <Controller
            name="validationClassName"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                label="Validation Class Name"
                size="small"
                type="text"
              />
            )}
          />

          <Controller
            name="labelGenerationClassName"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                label="Label Generation Class Name"
                size="small"
                type="text"
              />
            )}
          />
          <ProcessLogoForm file={file} setFile={setFile} />
        </div>

        <div className="flex justify-center my-6">
          <EdgeButton label={actionName} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateGroupForm;
