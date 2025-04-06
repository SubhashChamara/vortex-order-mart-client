import React from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

interface CribSummaryComponent {
  title: string;
  count: number;
  icon: string;
}

const CribSummaryComponent: React.FC<CribSummaryComponent> = ({
  title,
  count = 0,
  icon,
}) => {
  return (
    <div className="p-4 px-9 border border-black bg-[#b3b3b3] rounded-sm flex flex-row justify-between w-200">
      <div className="flex flex-row items-center gap-12">
        <EdgeSvgIcon className="text-black">{icon}</EdgeSvgIcon>
        <p className="text-[14px] font-bold text-black">{title}</p>
      </div>
      <div>
        <p>{count}</p>
      </div>
    </div>
  );
};

export default CribSummaryComponent;
