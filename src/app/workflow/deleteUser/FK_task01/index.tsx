import { FC, memo, useEffect, useState } from "react";
import DeleteUserForm from "./components/DeleteUserForm";
import RemarkForm from "./components/RemarkForm";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { UserProcessInfo } from "../../createNewUser/@types/UserProcessInfo";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";
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
      <DeleteUserForm task={task} setUser={setUser} user={user} />
      {/* <ProfilePictureForm file={file} setFile={setFile} user={user} /> */}
    </div>
  );
};

export default memo(PleaseEnterUserDetails);
