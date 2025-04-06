import { FC, memo, useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { UserProcessInfo } from "../@types/UserProcessInfo";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";
import UserForm from "./components/UserForm";

type FK_Task02Props = {
  task: TaskDetailInfo;
};

const FK_Task02: FC<FK_Task02Props> = (props) => {
  const { task } = props;

  const [user, setUser] = useState<UserProcessInfo | null>(null);

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
      <UserForm user={user} />
    </div>
  );
};

export default memo(FK_Task02);
