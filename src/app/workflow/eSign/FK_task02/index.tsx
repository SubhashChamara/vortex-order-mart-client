import { FC, memo, useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { Api } from "../../../../api/Api";
import { DocumentData } from "./components/DocumentData";
import DocumentViewerList from "./components/DocumentViewerList";
import Logger from "../../../../@helpers/Logger";
import { toast } from "react-toastify";

interface DocumentViewerIndexProps {
  task: TaskDetailInfo;
}

const DocumentViewerIndex: FC<DocumentViewerIndexProps> = ({ task }) => {
  const [documents, setDocuments] = useState<DocumentData | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [branchList,setBranchList] =useState([
    { id: 0, name: "" }
  ]);

  const handleFetchBranchList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBranchList("BRANCH")
    );

    Logger.debug(
      "(User Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
        setBranchList(data);
    }
  };


  const fetchEsignatureDoc = async () => {
    const requestPayload = {
      processInstance: task.processInstanceId,
      newTaskName: task.taskName,
      oldTaskName: "Please Upload Document",
    };
  
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getEsignatureDoc(requestPayload)
      );
      Logger.debug(
        "(User Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );

      setDocuments(data);
    } catch (err) {
      console.error("Error fetching e-signature doc:", err);
      toast.error(err.message);
    }
  };



  const handleGeneratePDF = async () => {
    const requestPayload = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
    };
  
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.generateEsignaturPDF(requestPayload)
      );
  
      if (err) {
        // Show error toast if there is an error
        toast.error(`Failed to generate PDF: ${err.msg || "Unknown error"}`);
        Logger.error("(User Process) => Error generating PDF: ", err.msg);
      } else {
        // Success case
        toast.success("Successfully Generated PDF");
        Logger.debug(
          "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
  
        // Reload only if no error occurred
        window.location.reload();
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error generating PDF:", error);
      toast.error(`Unexpected error: ${error.message}`);
    }
  };
  


  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchEsignatureDoc();
    handleFetchBranchList();
  }, [page]);

  return (
    <div className="p-6">
      <DocumentViewerList
        documents={documents}
        branchList={branchList}
        page={page}
        totalPages={totalPages}
        onGeneratePDF={handleGeneratePDF}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default memo(DocumentViewerIndex);
