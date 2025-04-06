import { Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { Api } from "../../../../../api/Api";
import { DocumentInfo } from "../../../../core/types/DocumentInfo";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { CribPullFileInfo } from "../../@types/CribPullInfo";
import { CribPullProcess } from "../../@types/CribPullTable";
import PDFCard from "./PDFCard";

export interface CribPaneUploadProps {
  task: TaskDetailInfo;
  currentCribProcessItem: CribPullProcess | null;
  setSelectedCribPanePDF: (val: CribPullFileInfo | null) => void;
}

const CribPaneUpload: React.FC<CribPaneUploadProps> = ({
  task,
  currentCribProcessItem,
  setSelectedCribPanePDF,
}) => {
  const [nicFile, setNICFile] = useState<File | null>(null);
  const [eicFile, setEICFile] = useState<File | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [isUploadDisabled, setIsUploadDisabled] = useState<boolean>(false);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(true);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

  const [uploadData, setUploadData] = useState<DocumentInfo | null>(null);

  const [cribPaneNICPDF, setCribPaneNICPDFs] =
    useState<CribPullFileInfo | null>(null);
  const [cribPaneEICPDF, setCribPaneEICPDFs] =
    useState<CribPullFileInfo | null>(null);
  const [cribPanePPPDF, setCribPanePPPDFs] = useState<CribPullFileInfo | null>(
    null
  );

  const getCribPanePdf = async () => {
    if (!currentCribProcessItem) {
      return;
    }
    try {
      const params = ["NIC", "EIC", "PASSPORT"];
      const results = await Promise.all(
        params.map(async (param) => {
          const { data, err } = await Api.performRequest((r) =>
            r.cribPull.getCribPanePDF(currentCribProcessItem.id, param)
          );

          if (err) {
            console.error(`Error fetching PDF for ${param}:`, err);
            return null;
          }

          return data;
        })
      );

      setCribPaneNICPDFs(results[0]);
      setCribPaneEICPDFs(results[1]);
      setCribPanePPPDFs(results[2]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFileLoading(false);
    }
  };

  // useEffect to call the function when the component mounts
  useEffect(() => {
    getCribPanePdf();
  }, [currentCribProcessItem]);

  const nicInputRef = useRef<HTMLInputElement>(null);
  const eicInputRef = useRef<HTMLInputElement>(null);
  const passportRef = useRef<HTMLInputElement>(null);

  const methods = useForm();
  const { control, reset } = methods;

  const determineMultipleFilesAdded = () => {
    const uploadCount = [nicFile, eicFile, passportFile].filter(
      (file) => file !== null
    ).length;

    if (uploadCount === 1) {
      setIsUploadDisabled(false);
    } else {
      setIsUploadDisabled(true);
    }
  };

  useEffect(() => {
    determineMultipleFilesAdded();
  }, [nicFile, eicFile, passportFile]);

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
            <p>CRIB PANE (UPLOAD)</p>
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1">
          <div className="flex flex-col p-6 gap-4">
            <p className="text-10 font-bold">NIC CRIB Pane</p>

            {isFileLoading ? (
              <></>
            ) : cribPaneNICPDF ? (
              <div
                onClick={() => setSelectedCribPanePDF(cribPaneNICPDF)}
                className="mt-6 w-full p-3 px-6 flex flex-row justify-between border border-primary rounded-sm text-primary hover:bg-grey-50 hover:cursor-pointer"
              >
                <div className="flex flex-row gap-3">
                  <EdgeSvgIcon>material-outline:picture_as_pdf</EdgeSvgIcon>
                  <p>
                    {cribPaneNICPDF.name.length > 40
                      ? `${cribPaneNICPDF.name.substring(0, 40)}...`
                      : cribPaneNICPDF.name}
                  </p>
                </div>
              </div>
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

          {/* EIC Upload */}

          <div className="flex flex-col p-6 gap-4">
            <p className="text-10 font-bold">Select EIC CRIB Pane</p>

            {isFileLoading ? (
              // <Ve3LoadingScreen className="h-10" />
              <></>
            ) : cribPaneEICPDF ? (
              <div
                onClick={() => setSelectedCribPanePDF(cribPaneEICPDF)}
                className="mt-6 w-full p-3 px-6 flex flex-row justify-between border border-primary rounded-sm text-primary hover:bg-grey-50 hover:cursor-pointer"
              >
                <div className="flex flex-row gap-3">
                  <EdgeSvgIcon>material-outline:picture_as_pdf</EdgeSvgIcon>
                  <p>
                    {cribPaneEICPDF.name.length > 40
                      ? `${cribPaneEICPDF.name.substring(0, 40)}...`
                      : cribPaneEICPDF.name}
                  </p>
                </div>
              </div>
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

          {/* Passport Upload */}
          <div className="flex flex-col p-6 gap-4">
            <p className="text-10 font-bold">Select Passport CRIB Pane</p>

            {isFileLoading ? (
              // <Ve3LoadingScreen className="h-10" />
              <></>
            ) : cribPanePPPDF ? (
              <div
                onClick={() => setSelectedCribPanePDF(cribPanePPPDF)}
                className="mt-6 w-full p-3 px-6 flex flex-row justify-between border border-primary rounded-sm text-primary hover:bg-grey-50 hover:cursor-pointer"
              >
                <div className="flex flex-row gap-3">
                  <EdgeSvgIcon>material-outline:picture_as_pdf</EdgeSvgIcon>
                  <p>
                    {cribPanePPPDF.name.length > 40
                      ? `${cribPanePPPDF.name.substring(0, 40)}...`
                      : cribPanePPPDF.name}
                  </p>
                </div>
              </div>
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

export default CribPaneUpload;
