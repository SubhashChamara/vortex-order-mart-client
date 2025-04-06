import { Chip } from "@mui/material";
import React from "react";

export interface Ve3SelectCardProps {
  label: string;
  source?: string;
  isSelected: boolean;
  onClick: () => void;
}

const Ve3SelectCard: React.FC<Ve3SelectCardProps> = ({
  label,
  source = "",
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-md cursor-pointer text-left hover:cursor-pointer border border-gray-300 flex justify-between ${isSelected
        ? "bg-primary text-white font-bold"
        : "bg-gray-100 text-gray-800"
        }`}
    >
      {label}
      {source !== "" && (
        <Chip label={source} className="bg-white text-black" size="small" />
      )}
    </div>
  );
};

export default Ve3SelectCard;
