import React, { useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { CribPullTableRequest } from "../@types/CribPullTable";
import CribPullTable from "./components/CribPullTable";

type CribPullFormProps = {
  task: TaskDetailInfo;
};

const CribPullForm: React.FC<CribPullFormProps> = ({ task }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<CribPullTableRequest | null>(null);
  const [isPDFVisible, setIsPDFVisible] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-9">
      <CribPullTable
        task={task}
        tableData={tableData}
        setTableData={setTableData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
        isPDFVisible={isPDFVisible}
        setIsPDFVisible={setIsPDFVisible}
      />
    </div>
  );
};

export default CribPullForm;
