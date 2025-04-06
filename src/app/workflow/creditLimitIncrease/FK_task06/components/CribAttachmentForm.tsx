import { Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import moment from "moment";
import { ChangeEvent, FC, useState } from "react";

import { toast } from "react-toastify";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import GetDocumentImage from "../../../../../@helpers/GetDocumentImage";
import Logger from "../../../../../@helpers/Logger";
import RetriveFile from "../../../../../@helpers/RetriveFiles";
import { Api } from "../../../../../api/Api";
import { DocumentInfo } from "../../../../core/types/DocumentInfo";
import { ScoreBoardProcess } from "../../../../core/types/ScoreBoardProcess";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { DocumentListParams } from "../../../../../api/types/params/DocumentListParams";

type DocumentViewProps = {
  documentList: DocumentInfo[] | null;
  process: ScoreBoardProcess | null;
  task: TaskDetailInfo | null;
  // page: number;
  // setPage: (v: number) => void;
  // handleFetchDocumentList: () => void;
};

const CribAttachmentForm: FC<DocumentViewProps> = (props) => {
  const {
    documentList,
    process,
    // page,
    // setPage,
    task,
    // handleFetchDocumentList,
  } = props;




  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
  //   setPage(page - 1);
  // };

  const handleDocumentClick = (document: DocumentInfo) => {
    setSelectedDocument(document);
  };

  // if (documentList === null || process === null) {
  //   return;
  // }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>,fileName:string) => {
    Logger.debug("FILE CHANGED");
    if (e.target.files) {
      if(fileName=="file"){
        setFile(e.target.files[0]);
      }
      if(fileName=="file2"){
        setFile2(e.target.files[0]);
      }
    }
  };

  const handleUpload = async () => {
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }

    if (task === null) {
      Logger.debug("Form Already Submitted");
      return;
    }

    /**
     * set submit true to identify form submitted already
     * help to prevent multiple submissions
     */
    setIsSubmitted(true);

    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("processInstance", process?.processInstance!);
      formData.append("taskInstance", task?.taskInstance);

      const { data, err } = await Api.performRequest((r) =>
        r.document.upload(formData)
      );

      Logger.debug(
        "(Doc Upload) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        toast.success("Successfully Uploaded File");
        setFile(null);
        setIsSubmitted(false);
        // handleFetchDocumentList();
      } else {
        toast.error(err?.msg);
        setIsSubmitted(false);
      }
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="bg-white p-0 px-3">
      {/* <Typography className="text-12 text-red-700 font-semibold tracking-tight leading-none flex items-center">
        <img
          src={
            process?.processLogo
              ? RetriveFile(process.processLogo)
              : "assets/icons/workflow/PF (20).png"
          }
          className="h-32 pr-6"
          alt="workflow-logo"
        />
        {process?.processName}w
      </Typography> */}

      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex text-blue-gray-800items-center">
          <div className="flex items-center">
            <EdgeSvgIcon
              className="icon-size-18 cursor-pointer mr-3"
              color="error"
            >
              feather:file
            </EdgeSvgIcon>
          </div>
          <div>Crib File Upload</div>
        </h1>
      </div>

      <div className="my-12">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="attach-file"
            className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center py-6">
              <svg
                className="w-24 h-24 my-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-3 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload the Crib File</span>
              </p>
              <p className="text-xs text-gray-500 ">
                {file !== null ? file.name : "PDF (MAX. 2 MB)"}
              </p>
            </div>
            <input
              id="attach-file"
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e,"file")}
            />
          </label>
        </div>

        <div>
          <Button size="small" className="mt-6" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>

      <div className="w-full flex gap-12 m-w-0 h-max-full	p-0	">
        <Box className="flex flex-col w-1/3">
          <Typography className="my-6 text-14 text-orange-900 whitespace-nowrap">
            Crib Attachments ({(documentList?.length)})
          </Typography>
          <Typography className="text-[14px] font-semibold text-grey-700">
            {moment().format("dddd")}{" "}
          </Typography>
          <Typography className="text-[14px] text-gray-400">
            {moment().format("MMMM DD, YYYY")}{" "}
          </Typography>
          <div className="">
            {documentList?.map((item, index) => (
              <Paper
                className="mt-6 p-0 rounded shadow"
                key={index}
                onClick={() => handleDocumentClick(item)}
              >
                <div className="flex">
                  <div className="bg-[#476496] p-6 w-64">
                    <img
                      className="w-40 h-40 p-1 rounded object-cover hover:bg-blue-100 cursor-pointer"
                      src={GetDocumentImage(item.type)}
                      alt="doc"
                    />
                  </div>
                  <div className="flex bg-grey-100 font-600 w-full">
                    <div className=" flex flex-col justify-evenly p-9">
                      <span className="text-black text-[14px]">
                        {item.name}
                      </span>
                      <span className="text-grey text-[14px] font-bold flex items-center">
                        <EdgeSvgIcon
                          className="icon-size-10 cursor-pointer mr-3 text-primary"
                          color="error"
                        >
                          feather:clock
                        </EdgeSvgIcon>
                        {moment(item.createdDate).format("DD/MM/YYYY HH:mm")}
                      </span>
                      <span className="text-grey text-[14px] flex items-center">
                        <EdgeSvgIcon
                          className="icon-size-10 cursor-pointer  mr-3 text-primary"
                          color="error"
                        >
                          feather:user
                        </EdgeSvgIcon>
                        {item.createdBy}
                      </span>
                    </div>
                  </div>
                </div>
              </Paper>
            ))}
            {/* <div className="flex justify-start items-center my-6">
              <Pagination
                count={documentList?.totalPages}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div> */}
          </div>
        </Box>
        <Box className="flex flex-col w-2/3">
          {selectedDocument ? (
            <div className="p-4">
              <Typography className="text-lg font-semibold mb-4">
                {selectedDocument.name}
              </Typography>
              {selectedDocument.type === "png" ||
              // selectedDocument.type === "pdf" ||
              selectedDocument.type === "jpg" ||
              selectedDocument.type === "jpeg" ? (
                // <iframe
                //   src={RetriveFile(selectedDocument.path)}
                //   width="100%"
                //   height="500px"
                //   title={selectedDocument.name}
                // ></iframe>
                <img
                  src={RetriveFile(selectedDocument.path)}
                  alt={selectedDocument.name}
                  className="w-full h-auto"
                  style={{ maxHeight: "500px" }}
                />
              ) : (
                <iframe
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                    RetriveFile(selectedDocument.path)
                  )}`}
                  width="100%"
                  height="500px"
                  title={selectedDocument.name}
                ></iframe>
              )}
            </div>
          ) : (
            <textarea
              className="w-full border-2 border-gray-300 rounded p-16 resize-none"
              rows={18}
              cols={70}
              placeholder="No Document Selected"
            />
          )}
        </Box>
      </div>
    </div>
  );
};

export default CribAttachmentForm;
