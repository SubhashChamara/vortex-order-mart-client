import { FC, memo, useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import CribCheckForm from "./components/CribCheckForm";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";
import {CliInfo} from "../../creditLimitIncrease/types/CliInfo";
import CribAttachmentForm from "./components/CribAttachmentForm";
import { DocumentInfo } from "../../../core/types/DocumentInfo";
import { Pageable } from "../../../../api/types/Pageable";
import { ScoreBoardProcess } from "../../../core/types/ScoreBoardProcess";
import { DocumentListParams } from "../../../../api/types/params/DocumentListParams";

type FK_Task06Props = {
  task: TaskDetailInfo;
};

const FK_Task06: FC<FK_Task06Props> = (props) => {
  const { task } = props;

  const [cliProcessData, setCliProcessData] = useState<CliInfo | null>(null);
  const [documentList, setDocumentList] =    useState<DocumentInfo[] | null>(null);
  // const [docPage, setDocPage] = useState<number>(0);
  // const [file, setFile] = useState<File | null>(null);

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

  const handleFetchDocumentList = async () => {
    alert('call')
    alert(task)
    if (task === null) {
      return;
    }
    const params: DocumentListParams = {
      processInstance: task?.processInstanceId,
      page: 0,
      size: 5,
      sort: "createdDate,desc",
      endDate: null,
      startDate: null,
      idProcess: null,
      workflowLabel: null,
      processName: null,
    };
    const { data, err } = await Api.performRequest((r) =>
      r.document.list(params)
    );
    alert('1')
    Logger.debug(
      "(Document List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );
   alert("======2")
    if (data !== null) {
      setDocumentList(data);
      // setDocumentViewOpen(true);
    }
  };

  useEffect(() => {
    handleFetchCliProcessInfo();
    // handleFetchDocumentList();
  }, [task]);

  return (
    <div className="grid grid-cols-1 gap-8">
      <CribCheckForm task={task} cliProcessData={cliProcessData}/>
      {/* <CribAttachmentForm */}
            {/* documentList={documentList} */}
            {/* task={task} */}
            {/* process={ */}
              {/* {
                processName: task?.processName,
                processInstance: task?.processInstanceId,
              } as ScoreBoardProcess
            }
            // page={docPage}
            // setPage={setDocPage}
            // handleFetchDocumentList={handleFetchDocumentList}
      /> */}
      {/* <ProfilePictureForm file={file} setFile={setFile} user={user} /> */}
    </div>
  );
};

export default memo(FK_Task06);
