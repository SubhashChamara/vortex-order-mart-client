import { Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { EncodeUrlPath } from "../../../../../@helpers/RetriveFiles";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Ve3NoDataScreen from "../../../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

interface CribDocumentViewProps {
  nicPath?: string | null;
  eicPath?: string | null;
  ppPath?: string | null;
  onButtonClick?: () => void;
}

const CribDocumentView: React.FC<CribDocumentViewProps> = ({
  nicPath,
  eicPath,
  ppPath,
  onButtonClick,
}) => {
  const [blobObj, setBlobObj] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  console.log("paths, ", nicPath, eicPath, ppPath);

  const fetchFile = async (fileUrl: string) => {
    if (!fileUrl) return;

    setLoading(true);

    try {
      const response = await fetch(fileUrl, {
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

  const handleButtonClick = (path: string | null) => {
    if (path) {
      const encodedUrl = EncodeUrlPath(path);
      if (!encodedUrl) return;
      setCurrentPath(encodedUrl);
      fetchFile(encodedUrl);
    }
  };

  useEffect(() => {
    if (currentPath) {
      fetchFile(currentPath);
    }
  }, [currentPath]);

  return (
    <div className="h-full">
      <Paper className="px-12 h-full flex flex-col pb-10">
        <Ve3FormHeader
          icon="material-outline:description"
          title={
            <div className="flex flex-row justify-between">
              <p>CRIB Information</p>
              {/* <Button
                onClick={onButtonClick}
                disabled={
                  (nicPath !== null && nicPath !== undefined) ||
                  (eicPath !== null && eicPath !== undefined) ||
                  (ppPath !== null && ppPath !== undefined)
                }
              >
                <EdgeSvgIcon>material-outline:request_quote</EdgeSvgIcon>
                CRIB Pull
              </Button> */}
            </div>
          }
        />

        <div className="flex gap-4 mb-6">
          {nicPath && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black !important",
                color: "white !important",
                "&:hover": {
                  backgroundColor: "#333 !important",
                },
                "&:focus, &:active": {
                  backgroundColor: "black !important",
                  color: "white !important",
                  borderColor: "black",
                  boxShadow: "none",
                },
                "& .MuiTouchRipple-root": {
                  color: "white",
                },
              }}
              onClick={() => handleButtonClick(nicPath)}
              disabled={!nicPath}
            >
              View NIC Crib File
            </Button>
          )}
          {eicPath && (
            <Button
              variant="contained"
              onClick={() => handleButtonClick(eicPath)}
              disabled={!eicPath}
              sx={{
                backgroundColor: "black !important",
                color: "white !important",
                "&:hover": {
                  backgroundColor: "#333 !important",
                },
                "&:focus, &:active": {
                  backgroundColor: "black !important",
                  color: "white !important",
                  borderColor: "black",
                  boxShadow: "none",
                },
                "& .MuiTouchRipple-root": {
                  color: "white",
                },
              }}
            >
              View EIC Crib File
            </Button>
          )}
          {ppPath && (
            <Button
              variant="contained"
              onClick={() => handleButtonClick(ppPath)}
              disabled={!ppPath}
              sx={{
                backgroundColor: "black !important",
                color: "white !important",
                "&:hover": {
                  backgroundColor: "#333 !important",
                },
                "&:focus, &:active": {
                  backgroundColor: "black !important",
                  color: "white !important",
                  borderColor: "black",
                  boxShadow: "none",
                },
                "& .MuiTouchRipple-root": {
                  color: "white",
                },
              }}
            >
              View PP Crib File
            </Button>
          )}
        </div>
        {loading ? (
          <Ve3LoadingScreen />
        ) : (
          blobObj && (
            <div className="w-full flex items-center justify-center h-full">
              <iframe
                src={window.URL.createObjectURL(blobObj)}
                className="w-md min-f-xs h-full border-none"
                title="Document Viewer"
              />
            </div>
          )
        )}

        {!blobObj && !loading && (
          <div>
            <Ve3NoDataScreen message="No file selected or available." />
          </div>
        )}
      </Paper>
    </div>
  );
};

export default CribDocumentView;
