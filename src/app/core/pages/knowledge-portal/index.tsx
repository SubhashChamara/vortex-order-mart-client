import { Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { useNavbarState } from "../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../@helpers/Logger";
import RetriveFile from "../../../../@helpers/RetriveFiles";
import { Api } from "../../../../api/Api";
import { ProcessInfo } from "../../types/ProcessInfo";
import CategoryCard from "../admin/admin-tools/components/CategoryCard";

const KnowledgePortal: FC = () => {
  const { mobileOpen } = useNavbarState();
  const [processList, setProcessList] = useState<ProcessInfo[]>([]);

  const handleFetchProcessList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.processInfoList()
    );
    Logger.debug(
      "(Proc List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setProcessList(data);
    }
  };

  useEffect(() => {
    handleFetchProcessList();
  }, []);

  return (
    <div className="px-24 pb-12">
      <Paper className="mt-16 w-full bg-white p-9 flex justify-between">
        <div className="flex">
          <EdgeSvgIcon
            className="icon-size-28 cursor-pointer text-red-600"
            color="error"
          >
            material-twotone:library_books
          </EdgeSvgIcon>
          <div className="text-red-600 font-bold flex-col pl-6">
            <div>Document Portal</div>
            <div className="text-[12px] text-gray">
              Document monitoring panel.
            </div>
          </div>
        </div>
      </Paper>
      <div className="flex items-center gap-12 my-20">
        <img src="assets/icons/home/3.png" className="w-20" alt="" />
        <div className="text-12 font-bold text-gray-800">
          Process flows ({processList.length})
        </div>
      </div>
      <div
        className={`grid grid-cols-1  md:grid-cols-5 gap-12 p-12 md:p-0 pt-8 py-24 ${
          mobileOpen
            ? "sm:grid-cols-1 md:grid-cols-3"
            : "sm:grid-cols-2 md:grid-cols-2"
        }`}
      >
        {processList.map((process, index) => (
          <CategoryCard
            title={process.name}
            icon={
              process.logo
                ? RetriveFile(process.logo)
                : "/assets/icons/workflow/PF (20).png"
            }
            link={`/knowledge-portal/documents/${process.name}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default KnowledgePortal;
