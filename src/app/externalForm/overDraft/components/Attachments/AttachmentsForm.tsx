import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { EncodeUrlPath } from "../../../../../@helpers/RetriveFiles";
import { DocumentInfo } from "../../../../core/types/DocumentInfo";
import { Pageable } from "../../../../../api/types/Pageable";
import dayjs from "dayjs";

export interface AttachmentFormProps {
  documentList: Pageable<DocumentInfo> | null;
  selectedDocument: DocumentInfo | null;
  setSelectedDocument: (item: DocumentInfo | null) => void;
  blobObj: Blob | null;
  page: number;
  setPage: (v: number) => void;
}

const AttachmentsForm: React.FC<AttachmentFormProps> = ({
  documentList,
  selectedDocument,
  setSelectedDocument,
  blobObj,
  page,
  setPage,
}) => {
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  return (
    <>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:paperclip" title="Attachments" />

        <div className="flex flex-col gap-12">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                    Date
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                    Document Name
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documentList?.content.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {dayjs(item.createdDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      {item.name.length > 60
                        ? item.name.substring(0, 75) + "..."
                        : item.name}
                    </TableCell>
                    <TableCell>
                      <EdgeSvgIcon
                        size={20}
                        className={`${
                          selectedDocument === item
                            ? "text-primary"
                            : "text-secondary"
                        }  hover:cursor-pointer`}
                        onClick={() => {
                          setSelectedDocument(
                            item === selectedDocument ? null : item
                          );
                        }}
                      >
                        feather:file-text
                      </EdgeSvgIcon>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center sm:justify-end items-center my-6 ">
              <Pagination
                count={documentList?.totalPages}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </TableContainer>
          {blobObj && selectedDocument && (
            <div className="w-full flex items-center justify-center">
              <iframe
                src={window.URL.createObjectURL(blobObj)}
                className="border-none h-xs"
                width="100%"
                // height="500px"
                title="Document Viewer"
              />
            </div>
          )}
        </div>
      </Paper>

      {/* <Ve3Popup
        open={isAttachmentOpen}
        fullWidth={true}
        setOpen={setIsAttachmentOpen}
        body={<div className="flex flex-col gap-6"></div>}
      /> */}
    </>
  );
};

export default AttachmentsForm;
