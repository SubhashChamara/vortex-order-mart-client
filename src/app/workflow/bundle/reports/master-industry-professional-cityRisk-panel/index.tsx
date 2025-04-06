import { Card, Paper } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import CityRiskPanelTable from "./components/CityRiskPanelTable";

const MasterIndustryPanel: React.FC = () => {
  const methods = useForm();
  const { control } = methods;
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="grid grid-cols-2 gap-12 p-12">
      <Paper className="p-12">
        <div className="flex pb-6">
          <EdgeSvgIcon
            className="icon-size-28 cursor-pointer text-red-600"
            color="error"
          >
            feather:file-text
          </EdgeSvgIcon>
          <div className="text-red-600 font-bold flex-col pl-6">
            <div> Master Industry Risk Rating/salary Scale </div>
            <div className="text-[12px] text-gray">
              This report provides information about Master Industry Risk
              Rating/salary Scale
            </div>
          </div>
        </div>
        <Controller
          name="fileUpload"
          control={control}
          render={({ field }) => (
            <div
              onDrop={(e) => {
                e.preventDefault();
                const droppedFiles = e.dataTransfer.files
                  ? Array.from(e.dataTransfer.files)
                  : [];
                if (droppedFiles.length > 0) {
                  const selectedFile = droppedFiles[0];
                  field.onChange(selectedFile);
                  console.log(selectedFile);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 p-6 bg-gray-50 rounded-4 text-center cursor-pointer hover:bg-grey-100"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <input
                id="fileInput"
                type="file"
                accept={".xlsx, .xls"}
                hidden
                onChange={(e) => {
                  const selectedFile = e.target.files
                    ? e.target.files[0]
                    : null;
                  field.onChange(selectedFile);
                  console.log(selectedFile);
                  setFile(selectedFile);
                }}
              />
              {!field.value ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <p className="mb-3 text-sm text-gray-500">
                    <span className="font-semibold">
                      Click or Drag and Drop a File Here to Upload
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    XLSX, XLS (MAX. 10 MB)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div
                    className="flex flex-col gap-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Card className="py-6 px-12 text-start flex flex-row justify-between items-center">
                      <div className="flex flex-row gap-6 items-center">
                        <EdgeSvgIcon size={32} className="text-primary">
                          feather:file-text
                        </EdgeSvgIcon>
                        <span className="font-semibold flex flex-col">
                          <p className="font-normal">{field.value.name}</p>
                          <p className="font-light text-[14px] text-gray-600">
                            {(field.value.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </span>
                      </div>
                      <EdgeSvgIcon
                        size={24}
                        className="text-primary cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange(null);
                          setFile(null);
                          const input = document.getElementById(
                            "fileInput"
                          ) as HTMLInputElement;
                          if (input) {
                            input.value = "";
                          }
                        }}
                      >
                        feather:trash-2
                      </EdgeSvgIcon>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}
        />
      </Paper>

      <CityRiskPanelTable />
    </div>
  );
};

export default MasterIndustryPanel;
