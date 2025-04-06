import { FC, memo, useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import CreditLimitIncreaseForm from "./components/CreditLimitIncreaseForm";
import { Api } from "../../../../../api/Api";
import Logger from "../../../../../@helpers/Logger";
import { CliInfo } from "../../types/CliInfo";

type FK_Task01Props = {
  task: TaskDetailInfo;
};

const FK_Task01: FC<FK_Task01Props> = (props) => {
  const { task } = props;

  const [cliProcessData, setCliProcessData] = useState<CliInfo | null>(null);
  // const [file, setFile] = useState<File | null>(null);

  // const handleFetchUserProcessInfo = async () => {
  //   const { data, err } = await Api.performRequest((r) =>
  //     r.admin.getUserByProcess(task.processInstanceId)
  //   );

  //   Logger.debug(
  //     "(User Process) => { DATA: " +
  //       JSON.stringify(data) +
  //       " , ERROR: " +
  //       JSON.stringify(err)
  //   );

  //   if (data !== null) {
  //     setUser(data);
  //   }
  // };

  const handleFetchCliProcessInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCliByProcess(task.processInstanceId)
    );

    Logger.debug(
      "(CLI Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setCliProcessData(data);
    }
  };


  useEffect(() => {
    handleFetchCliProcessInfo();
  }, [task]);

  return (
    <div>
      <CreditLimitIncreaseForm task={task} cliProcessData={cliProcessData} />
      {/* <ProfilePictureForm file={file} setFile={setFile} user={user} /> */}
    </div>
  );
};

export default memo(FK_Task01);
