import React, { useState } from "react";
import CribPullMethodForm from "./components/CribPullMethodForm";
import CribPullUserDetailsForm from "./components/CribPullUserDetailsForm";
import CribPullTable from "./components/CribPullTable";
import { DropDownItemCribPull } from "../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { CribPullProcess, CribPullTableRequest } from "../@types/CribPullTable";

type CribPullFormProps = {
  task: TaskDetailInfo;
};

const CribPullForm: React.FC<CribPullFormProps> = ({ task }) => {
  const [selectedUploadMethod, setSelectedUploadMethod] =
    useState<DropDownItemCribPull | null>(null);
  const [selectedInitiatingUnit, setSelectedInitiatingUnit] =
    useState<DropDownItemCribPull | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItemForEdit, setSelectedItemForEdit] =
    useState<CribPullProcess | null>(null);
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<CribPullTableRequest | null>(null);

  console.log("set item for edit", selectedItemForEdit);
  return (
    <div className="flex flex-col gap-9">
      <div
        className={`grid ${
          selectedUploadMethod?.name !== "Data Entry" && selectedItemForEdit==null
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2"
        } gap-9`}
      >
        <CribPullMethodForm
          selectedUploadMethod={selectedUploadMethod}
          setSelectedUploadMethod={setSelectedUploadMethod}
          initiatingUnit={selectedInitiatingUnit}
          selectedInitiatingUnit={selectedInitiatingUnit}
          setSelectedInitiatingUnit={setSelectedInitiatingUnit}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
          task={task}
          selectedItemForEdit={selectedItemForEdit}
          tableData={tableData}
        />
        {(selectedUploadMethod?.name === "Data Entry"||selectedItemForEdit) && (
          <CribPullUserDetailsForm
            selectedUploadMethod={selectedUploadMethod}
            setSelectedUploadMethod={setSelectedUploadMethod}
            selectedInitiatingUnit={selectedInitiatingUnit}
            setSelectedInitiatingUnit={setSelectedInitiatingUnit}
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selectedItemForEdit={selectedItemForEdit}
            setSelectedItemForEdit={setSelectedItemForEdit}
            refreshTable={refreshTable}
            setRefreshTable={setRefreshTable}
            task={task}
          />
        )}
      </div>
      <CribPullTable
        task={task}
        tableData={tableData}
        setTableData={setTableData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSelectedItemForEdit={setSelectedItemForEdit}
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
      />
    </div>
  );
};

export default CribPullForm;
