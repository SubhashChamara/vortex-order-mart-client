
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import DocumentUpload from "./components/documentUpload";
import { FC, memo, useEffect, useState } from "react";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";
import { FormRequest } from "./components/FormRequest";
import { EncodeUrlPath } from "../../../../@helpers/RetriveFiles";

type FK_Task01Props = {
    task: TaskDetailInfo;
  };

const UploadDocuments: FC<FK_Task01Props> = (props) => {
    const { task } = props;

    const [form, steForm] = useState<FormRequest | null>(null);
    const [branchList,setBranchList] =useState([
        { id: 0, name: "" }
      ]);
      const [userList, setUserList] =useState([
        { id: "", name: "" }
      ]);
      const [docType, setDocType] =useState([
        { id: "", name: "" }
      ]);
      const [file, setFile] = useState<File | null>(null);
      const[getFilePath,setFilePath]= useState("");
      const [blobObj, setBlobObj] = useState<Blob | null>(null);

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

      const handleFetchApprovedUserList = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getApprovedUserList()
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
    
        if (data !== null) {
          setUserList(data);
        }
      };

      const handleFetchDocTypes = async () => {
        const { data, err } = await Api.performRequest((r) =>
          r.creditCard.getDocTypes()
        );
    
        Logger.debug(
          "(User Process) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
    
        if (data !== null) {
          setDocType(data);
        }
      };

      // const handleFetchFormData = async () => {
      //   const { data, err } = await Api.performRequest((r) =>
      //     r.creditCard.getFormDetails(task.processInstanceId)
      //   );
    
      //   Logger.debug(
      //     "(User Process) => { DATA: " +
      //       JSON.stringify(data) +
      //       " , ERROR: " +
      //       JSON.stringify(err)
      //   );
    
      //   if (data !== null) {
      //       steForm(data);
      //   }
      // };

    //   const handleFetchDocument = async (path:string) => {
    //     const { data, err } = await Api.performRequest((r) =>
    //       r.creditCard.getDocument(path)
    //     );
    // console.log("CALLED")
    //     Logger.debug(
    //       "(User Process) => { DATA: " +
    //         JSON.stringify(data) +
    //         " , ERROR: " +
    //         JSON.stringify(err)
    //     );
    
    //     if (data !== null) {
    //       setFile(data);
    //     }
    //   };
      
    let blobs: Blob | null = null;
      const handleFetchDocument = async (FileUrl: string) => {
    
        try {
          const response = await fetch(FileUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/pdf",
            },
          });
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          blobs = await response.blob();
          setBlobObj(blobs);
          // console.log("blobObj=",blobs)
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        } finally {
        }
      };
      console.log("blobObj=",blobObj)
      useEffect(() => {

        const handleFetchFormData = async () => {
    
          const { data, err } = await Api.performRequest((r) =>
            r.creditCard.getFormDetails(task.processInstanceId)
          );
          // console.log(form?.pdfFilePath)
          if (err === null) {
            steForm(data);
            setFilePath(data.filePa)
            await Promise.all([
        handleFetchBranchList(),
        handleFetchApprovedUserList(),
        handleFetchDocTypes(),
        handleFetchDocument(EncodeUrlPath(data.docPath)),
            ]);
          }
        };

        // handleFetchBranchList();
        // handleFetchApprovedUserList();
        // handleFetchDocTypes();
        // handleFetchDocument();
        handleFetchFormData();
      }, [task]);

    return(
        <div>
        <DocumentUpload branchList={branchList} task={task} form={form} userList={userList} docType={docType} files={blobObj}/>
      </div>
    );
};

export default UploadDocuments;