import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { FC, memo, useEffect, useState } from "react";
import { ActionPointInfo } from "./@types/ActionPointInfo";
import ActionPointForm from "./components/ActionPointForm";
import FrmInvstForm from "../FK_task01/components/UserForm";
import { FemInvsProcessInfi } from "../@types/FemInvsProcessInfi";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";
import { ActionPointRequest } from "./@types/ActionPointRequest";

type FK_Task02Props = {
    task: TaskDetailInfo;
  };

  const FK_Task02: FC<FK_Task02Props> = (props) => {
    const { task } = props;

    const [file, setFile] = useState<File | null>(null);
    const [form, steForm] = useState<ActionPointRequest | null>(null);

    const [form1, steForm1] = useState<FemInvsProcessInfi | null>(null);
    const [monthList,setMonthList] =useState([
      { id: 0, name: "" }
    ]);

    const handleFetcFrmnProcessInfo = async () => {
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
            steForm1(data);
        }
      };

      const handleFetchActionProcessInfo = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getActionData(task.processInstanceId)
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
        handleFetcFrmnProcessInfo();
        handleFetchActionProcessInfo();
        getMonths();
      }, [task]);
  
  
    return (
      <div className="md:grid grid-cols-2 gap-9">
        <FrmInvstForm task={task} file={file} form={form1} commentStatus={false} monthList={monthList} taskName={"TASK_02"}/>
        <ActionPointForm task={task} file={file} form={form}/>
      </div>
    );
  };

  export default memo(FK_Task02);