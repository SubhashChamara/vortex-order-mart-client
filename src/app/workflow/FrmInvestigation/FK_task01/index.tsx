import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { FemInvsProcessInfi } from "../@types/FemInvsProcessInfi";
import FrmInvstForm from "./components/UserForm";
import { FC, memo, useEffect, useState } from "react";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";

type FK_Task01Props = {
    task: TaskDetailInfo;
  };

  const FK_Task01: FC<FK_Task01Props> = (props) => {
    const { task } = props;

    const [file, setFile] = useState<File | null>(null);
    const [form, steForm] = useState<FemInvsProcessInfi | null>(null);
    const [monthList,setMonthList] =useState([
      { id: 0, name: "" }
    ]);

    const handleFetchFrmProcessInfo = async () => {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getFrmData(task.processInstanceId)
      );
  
      Logger.debug(
        "(User Process) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );
  
      if (data !== null) {
        steForm(data);
      }
    };

    const getMonths = async () => {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getMonthList("MONTH")
      );
  
      Logger.debug(
        "(User Process) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );
  
      if (data !== null) {
        setMonthList(data);
        console.log('monthList=',monthList)
      }
    };

    useEffect(() => {
      handleFetchFrmProcessInfo();
      getMonths();
    }, [task]);

  
    return (
      <div className="md:grid grid-cols-2 gap-9">
        <FrmInvstForm task={task} file={file} form={form} commentStatus={true} monthList={monthList} taskName={"TASK_01"}/>
      </div>
    );
  };
  
  export default memo(FK_Task01);