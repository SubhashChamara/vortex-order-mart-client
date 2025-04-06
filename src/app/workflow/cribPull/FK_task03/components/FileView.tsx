import { Paper } from "@mui/material";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import React, { useEffect, useState } from "react";
import { CribPullProcess } from "../../@types/CribPullTable";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { CribPullFileInfo } from "../../@types/CribPullInfo";
import { EncodeUrlPath } from "../../../../../@helpers/RetriveFiles";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";

export interface FileViewProps {
  task: TaskDetailInfo;
  currentCribProcessItem: CribPullProcess | null;
  selectedCribPanePDF: CribPullFileInfo | null;
}

const FileView: React.FC<FileViewProps> = ({ selectedCribPanePDF }) => {
  const [blobObj, setBlobObj] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const FileUrl = EncodeUrlPath(selectedCribPanePDF?.path);

  const fetchFile = async () => {
    if (!FileUrl) return;

    setLoading(true);

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

      const blob = await response.blob();
      setBlobObj(blob);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCribPanePDF) {
      fetchFile();
    }
  }, [selectedCribPanePDF]);

  return (
    <div>
      <Paper className="px-12 pb-12">
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
            <div>CRIB File Information (View)</div>
          </h1>
        </div>

        {loading ? (
          <Ve3LoadingScreen />
        ) : (
          blobObj && (
            <div className="w-full flex items-center justify-center">
              <iframe
                src={window.URL.createObjectURL(blobObj)}
                className="h-sm w-md border-none"
                title="Document Viewer"
              />
            </div>
          )
        )}

        {!blobObj && !loading && (
          <div>
            <p>No file selected or available.</p>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default FileView;
