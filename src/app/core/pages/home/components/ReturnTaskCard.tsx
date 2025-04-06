import React from "react";

export type ReturnTaskCardProps = {
  title: string;
  tasksCount: number;
  imagePath: string;
};

const ReturnTaskCard: React.FC<ReturnTaskCardProps> = ({
  title,
  tasksCount,
  imagePath,
}) => {
  return (
    <div className="min-w-64 md:min-w-175 rounded shadow-2 min-h-30 bg-grey-100 hover:bg-grey-200 cursor-pointer flex flex-col justify-center items-start p-6 lg:p-12">
      <div className="text-8 w-full font-bold text-gray-800 flex items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <img
            src={imagePath}
            className="w-24 rounded-4 bg-grey-200 p-6 shadow-3"
            alt=""
          />
          <span className="text-[10px] md:text-[10px] lg:text-10">{title}</span>
        </div>
        <span className="font-bold text-md lg:text-lg">{tasksCount}</span>
      </div>
    </div>
  );
};

export default ReturnTaskCard;
