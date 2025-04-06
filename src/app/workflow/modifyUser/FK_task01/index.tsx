import { FC, memo, useEffect, useState } from "react";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { UserProcessInfo } from "../../modifyUser/types/UserProcessInfo";
import ModifyUserForm from "./components/ModifyUserForm";
import ProfilePictureForm from "./components/ProfilePictureForm";

type PleaseEnterUserDetailsProps = {
  task: TaskDetailInfo;
};

const PleaseEnterUserDetails: FC<PleaseEnterUserDetailsProps> = (props) => {
  const { task } = props;

  const [user, setUser] = useState<UserProcessInfo | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFetchUserProcessInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.getUserByProcess(task.processInstanceId)
    );

    Logger.debug(
      "(User Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setUser(data);
    }
  };

  useEffect(() => {
    handleFetchUserProcessInfo();
  }, [task]);
  return (
    <div className="md:grid grid-cols-2 gap-9">
      <ModifyUserForm task={task} user={user} file={file} setUser={setUser} />
      <ProfilePictureForm file={file} setFile={setFile} user={user} />
    </div>
  );
};

export default memo(PleaseEnterUserDetails);
