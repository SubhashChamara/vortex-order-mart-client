import React, { ReactNode } from "react";
import EdgeSvgIcon from "../EdgeSvgIcon";

interface Ve3FormHeaderProps {
  icon: string;
  title: string | ReactNode;
}

const Ve3FormHeader: React.FC<Ve3FormHeaderProps> = ({ icon, title }) => {
  return (
    <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6 w-full">
      <h1 className="text-md font-600 text-left flex text-blue-gray-800 w-full">
        <div className="flex flex-row gap-5 items-center w-full">
          <EdgeSvgIcon
            className="icon-size-18 cursor-pointer mr-3"
            color="error"
          >
            {icon}
          </EdgeSvgIcon>
          <div className="w-full">{title}</div>
        </div>
      </h1>
    </div>
  );
};

export default Ve3FormHeader;
