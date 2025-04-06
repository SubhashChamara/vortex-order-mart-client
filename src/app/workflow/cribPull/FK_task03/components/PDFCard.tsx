import React from "react";
import { Card, Button } from "@mui/material"; // Assuming you're using Material-UI
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

interface PDFCardProps {
  name: string;
  onDelete: () => void;
  onClick: () => void;
  isEmpty?: boolean;
  isDeletable?: boolean;
}

const PDFCard: React.FC<PDFCardProps> = ({
  name,
  onDelete,
  onClick,
  isEmpty = false,
  isDeletable = true,
}) => {
  return (
    <div
      onClick={onClick}
      className="mt-6 w-full p-3 px-6 flex flex-row justify-between border border-primary rounded-sm text-primary hover:bg-grey-50 hover:cursor-pointer"
    >
      <div className="flex flex-row gap-3">
        <EdgeSvgIcon>
          {isEmpty ? "feather:x-circle" : "material-outline:picture_as_pdf"}
        </EdgeSvgIcon>
        <p>
          {isEmpty
            ? "No Uploaded Files"
            : name.length > 40
            ? `${name.substring(0, 40)}...`
            : name}
        </p>
      </div>
      {/* 
      {!isEmpty && !isDeletable && (
        <EdgeSvgIcon
          className="hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          feather:trash-2
        </EdgeSvgIcon>
      )} */}
    </div>
  );
};

export default PDFCard;
