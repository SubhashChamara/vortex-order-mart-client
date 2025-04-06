import React, { useEffect, useState } from "react";
import { UserProcessInfo } from "../../workflow/modifyUser/types/UserProcessInfo";
import { ScoreBoardProcess } from "../../core/types/ScoreBoardProcess";
import { Api } from "../../../api/Api";
import Logger from "../../../@helpers/Logger";
import UserDetailsForm from "./components/UserDetailsForm";
import Ve3LoadingScreen from "../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Alert from "@mui/material/Alert";
import Ve3NoDataScreen from "../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";

type ExternalFormProps = {
  process: ScoreBoardProcess | null;
};

const ModifyUserForm: React.FC<ExternalFormProps> = ({ process }) => {
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
    <>
      {loading ? (
        <Ve3LoadingScreen />
      ) : user ? (
        <UserDetailsForm user={user} />
      ) : (
        <Ve3NoDataScreen />
      )}
    </>
  );
};

export default ModifyUserForm;
