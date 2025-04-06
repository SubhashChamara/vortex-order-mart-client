import React from "react";
import moment from "moment";
import { Paper, Tooltip } from "@mui/material"; // Assuming you are using Material-UI for Tooltip
import GetDocumentImage from "../../../@helpers/GetDocumentImage";
import EdgeSvgIcon from "../EdgeSvgIcon";
import { DocumentInfo } from "../../../app/core/types/DocumentInfo";

interface DocumentCardProps {
  document: DocumentInfo;
  handleDocumentClick: (document: DocumentInfo) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  handleDocumentClick,
}) => {
  return (
    <Paper
      className="mt-6 p-0 rounded shadow hover:cursor-pointer"
      onClick={() => handleDocumentClick(document)}
    >
      <div className="flex">
        <div className="bg-[#476496] p-6 w-64">
          <img
            className="w-40 h-40 p-1 rounded object-cover hover:bg-blue-100 cursor-pointer"
            src={GetDocumentImage(document.type)}
            alt="doc"
          />
        </div>
        <div className="flex bg-grey-100 font-600 w-full">
          <div className="flex flex-col justify-evenly p-9">
            <Tooltip title={document.name}>
              <span className="text-black text-[14px]">
                {document.name.length > 25
                  ? document.name.substring(0, 25) + "..."
                  : document.name}
              </span>
            </Tooltip>
            <span className="text-grey text-[14px] font-bold flex items-center">
              <EdgeSvgIcon
                className="icon-size-10 cursor-pointer mr-3 text-primary"
                color="error"
              >
                feather:clock
              </EdgeSvgIcon>
              {moment(document.createdDate).format("DD/MM/YYYY HH:mm")}
            </span>
            <span className="text-grey text-[14px] flex items-center">
              <EdgeSvgIcon
                className="icon-size-10 cursor-pointer mr-3 text-primary"
                color="error"
              >
                feather:user
              </EdgeSvgIcon>
              {document.createdBy}
            </span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default DocumentCard;
