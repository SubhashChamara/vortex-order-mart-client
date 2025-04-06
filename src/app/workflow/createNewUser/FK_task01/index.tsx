import { FC, memo, useEffect, useState } from "react";

import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import UserForm from "./components/UserForm";
import ProfilePictureForm from "./components/ProfilePictureForm";
import { UserProcessInfo } from "../@types/UserProcessInfo";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";

type FK_Task01Props = {
  task: TaskDetailInfo;
};

const FK_Task01: FC<FK_Task01Props> = (props) => {
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
      <UserForm task={task} file={file} user={user} />
      <ProfilePictureForm file={file} setFile={setFile} user={user} />
    </div>
  );
};

export default memo(FK_Task01);
