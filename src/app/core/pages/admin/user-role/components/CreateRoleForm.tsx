import { zodResolver } from "@hookform/resolvers/zod";
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
import { UserRoleCreateRequest } from "../../../../types/UserRoleCreateRequest";
import { UserRoleInfo } from "../../../../types/UserRoleInfo";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";

type FormType = {
  name: string;
};

const defaultValues: FormType = {
  name: "",
};

const schema = z.object({
  name: z.string().min(1, "Role name is mandatory."),
});

interface RoleCreationFormProps {
  formTitle:string;
  actionName:string
  roleForUpdate:UserRoleInfo|null;
  formReset:()=>void;
  fetchRoleList:()=>void;
}

const CreateUserForm: FC<RoleCreationFormProps> = (props) => {
  const {formTitle ,actionName,roleForUpdate,formReset,fetchRoleList} = props;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState,setValue,watch } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const handleOnSubmit = async (formData: FormType) => {
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

    const { name } = formData;
    Logger.debug("Form Submitted : " + JSON.stringify(formData));

    const request: UserRoleCreateRequest = {
      name
    };
    const { data, err } = actionName =="SAVE" ? await Api.performRequest((r) =>
       r.admin.createUserRole(request))
    : await Api.performRequest((r)=> r.admin.updateUserRole(roleForUpdate.id,request)) ;

    Logger.debug(
      "(User Role Creation) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (err == null) {
      let successMsg:string;
      actionName == "SAVE" ? successMsg="Role saved Successfully":successMsg="Role Updated Successfully";
      fetchRoleList();
      toast.success(successMsg);
    } else {
      toast.error(err?.msg);
      /**
       * set submit false to identify form submitted but failed
       * help to resubmit
       * and timeout prevent double clicks
       */
      
    }
    setTimeout(() => setIsSubmitted(false), 3000);
    clearField();
    formReset();
  };

  const clearField=()=>{
    setValue("name",roleForUpdate? roleForUpdate.name:"");
  }
  useEffect(()=>{
    clearField();
  },[roleForUpdate])

  return (
    <div>
      <div className="mb-12 border-b-1 border-b-gray-200 pb-6 flex items-end">
        <EdgeSvgIcon
          className="icon-size-24 cursor-pointer mr-6 text-primary"
          color="error"
        >
          feather:user-plus
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
                label="Role Name"
                size="small"
                type="text"
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
            )}
          />
        </div>

        <div className="flex my-6">
          <EdgeButton label={actionName} icon="feather:save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
