import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { CribPullProcess } from "../../@types/CribPullTable";
import { CribPullFileInfo } from "../../@types/CribPullInfo";
import { Api } from "../../../../../api/Api";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import PDFCard from "./PDFCard";

export interface CribFileViewProps {
  task: TaskDetailInfo;
  currentCribProcessItem: CribPullProcess | null;
  setSelectedCribPanePDF: (val: CribPullFileInfo | null) => void;
}

const CribFileView: React.FC<CribFileViewProps> = ({
  task,
  currentCribProcessItem,
  setSelectedCribPanePDF,
}) => {
  const [cribNICPDF, setCribNICPDFs] = useState<CribPullFileInfo | null>(null);
  const [cribEICPDF, setCribEICPDFs] = useState<CribPullFileInfo | null>(null);
  const [cribPPPDF, setCribPPPDFs] = useState<CribPullFileInfo | null>(null);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(true);

  const fetchCribPDFs = async () => {
    if (!currentCribProcessItem) {
      return;
    }
    try {
      setIsFileLoading(true);
      const params = ["NIC", "EIC", "PASSPORT"];
      const results = await Promise.all(
        params.map(async (param) => {
          const { data, err } = await Api.performRequest((r) =>
            r.cribPull.getCribPDF(currentCribProcessItem.id, param)
          );

          if (err) {
            console.error(`Error fetching PDF for ${param}:`, err);
            return null;
          }

          return data;
        })
      );

      setCribNICPDFs(results[0]);
      setCribEICPDFs(results[1]);
      setCribPPPDFs(results[2]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFileLoading(false);
    }
  };

  useEffect(() => {
    fetchCribPDFs();
  }, [currentCribProcessItem]);

  return (
    <div>
      <Paper className="px-12 pb-12 flex flex-col">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-md font-600 text-left flex items-center text-blue-gray-800">
            <div>
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                material-outline:picture_as_pdf
              </EdgeSvgIcon>
            </div>
            <div>CRIB File View</div>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1">
          <div className="flex flex-col p-6 gap-4">
            <p className="text-10 font-bold">NIC CRIB PDF</p>
            {isFileLoading ? (
              <Ve3LoadingScreen className="h-10" />
            ) : cribNICPDF ? (
              <PDFCard
                name={cribNICPDF.name}
                onDelete={() => {}}
                onClick={() => {
                  setSelectedCribPanePDF(cribNICPDF);
                }}
              />
            ) : (
              <PDFCard
                name={""}
                onDelete={() => {}}
                isDeletable={false}
                onClick={() => {}}
                isEmpty={true}
              />
            )}
          </div>

          <div className="flex flex-col p-6 gap-4">
            <p className="text-10 font-bold">EIC Crib PDF</p>
            {isFileLoading ? (
              <Ve3LoadingScreen className="h-10" />
            ) : cribEICPDF ? (
              <PDFCard
                name={cribEICPDF.name}
                onDelete={() => {}}
                isDeletable={false}
                onClick={() => {
                  setSelectedCribPanePDF(cribEICPDF);
                }}
              />
            ) : (
              <PDFCard
                name={""}
                onDelete={() => {}}
                onClick={() => {}}
                isDeletable={false}
                isEmpty={true}
              />
            )}
          </div>
          <div className="flex flex-col p-6 gap-4">
            <p className="text-10 font-bold">EIC Crib PDF</p>
            {isFileLoading ? (
              <Ve3LoadingScreen className="h-10" />
            ) : cribPPPDF ? (
              <PDFCard
                name={cribPPPDF.name}
                onDelete={() => {}}
                isDeletable={false}
                onClick={() => {
                  setSelectedCribPanePDF(cribPPPDF);
                }}
              />
            ) : (
              <PDFCard
                name={""}
                onDelete={() => {}}
                onClick={() => {}}
                isDeletable={false}
                isEmpty={true}
              />
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default CribFileView;
