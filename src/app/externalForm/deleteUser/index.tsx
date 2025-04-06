import React, { useEffect, useState } from "react";
import { Api } from "../../../api/Api";
import Logger from "../../../@helpers/Logger";
import DeleteUserForm from "./components/DeleteUserForm";
import { UserProcessInfo } from "../../workflow/createNewUser/@types/UserProcessInfo";
import { ScoreBoardProcess } from "../../core/types/ScoreBoardProcess";
import Ve3LoadingScreen from "../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Ve3NoDataScreen from "../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";

type ExternalFormProps = {
  process: ScoreBoardProcess | null;
};

const ExternalForm: React.FC<ExternalFormProps> = (props) => {
  const { process } = props;

  const [user, setUser] = useState<UserProcessInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFetchUserProcessInfo = async () => {
    if (!process) {
      return;
    }
    setLoading(true);
    try {
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
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchUserProcessInfo();
  }, []);

  return (
    <div>
      {loading ? (
        <Ve3LoadingScreen />
      ) : user ? (
        <DeleteUserForm user={user} />
      ) : (
        <Ve3NoDataScreen />
      )}
    </div>
  );
};

export default ExternalForm;
