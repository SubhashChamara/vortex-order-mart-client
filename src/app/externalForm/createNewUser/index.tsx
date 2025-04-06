import React, { useEffect, useState } from "react";
import { UserProcessInfo } from "../../workflow/createNewUser/@types/UserProcessInfo";
import { Api } from "../../../api/Api";
import Logger from "../../../@helpers/Logger";
import UserForm from "./components/UserForm";
import { ScoreBoardProcess } from "../../core/types/ScoreBoardProcess";
import Ve3LoadingScreen from "../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Ve3NoDataScreen from "../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";

type ExternalCreateUserProps = {
  process: ScoreBoardProcess | null;
};

const ExternalForm: React.FC<ExternalCreateUserProps> = (props) => {
  const { process } = props;
  const [user, setUser] = useState<UserProcessInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFetchUserProcessInfo = async () => {
    if (!process) {
      return;
    }
    setLoading(true);
    const { data, err } = await Api.performRequest((r) =>
      r.admin.getUserByProcess(process.processInstance)
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
    setLoading(false);
  };

  useEffect(() => {
    handleFetchUserProcessInfo();
  }, []);

  return (
    <div>
      {loading ? (
        <Ve3LoadingScreen />
      ) : user ? (
        <UserForm user={user} />
      ) : (
        <div className="flex items-center justify-center h-xs">
          <Ve3NoDataScreen />
        </div>
      )}
    </div>
  );
};

export default ExternalForm;
