import { FC, useEffect, useState } from "react";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { UserProcessInfo } from "../../modifyUser/types/UserProcessInfo";
import UserDetailsForm from "./components/UserDetailsForm";

type PleaseApproveUserCreationProps = {
  task: any;
};



const PleaseApproveUserCreation: FC<PleaseApproveUserCreationProps> = (props) => {
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
    <div className="md:grid grid-cols-2">
      <UserDetailsForm user={user} />
    </div>
  );
};

export default PleaseApproveUserCreation;
