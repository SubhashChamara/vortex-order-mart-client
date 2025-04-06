import { Button, Pagination, Paper } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

import Filters from "./components/Filters";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Ve3Popup from "../../../../../@core/ui/Ve3Popup/Ve3Popup";
import { DocumentInfo } from "../../../types/DocumentInfo";
import { Pageable } from "../../../../../api/types/Pageable";
import { DocumentListParams } from "../../../../../api/types/params/DocumentListParams";
import { Api } from "../../../../../api/Api";
import Logger from "../../../../../@helpers/Logger";
import DocumentCard from "../../../../../@core/ui/Ve3DocumentCard";
import DocumentView from "./components/DocumentView";

const KnowledgePortalDocuments = () => {
  const { process } = useParams();
  const navigate = useNavigate();
  Logger.debug(process ?? "query param not available");

  if (!process) {
    navigate("/knowledge-portal");
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDocumentSelected, setIsDocumentSelected] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null
  );
  const [documentList, setDocumentList] =
    useState<Pageable<DocumentInfo> | null>(null);
  const [page, setPage] = useState<number>(0);
  const [filterValues, setFilterValues] = useState<DocumentListParams | null>(
    null
  );

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    setPage(page - 1);
  };

  const handleOpenFilters = () => {
    setIsOpen(true);
  };

  const handleFetchDocumentList = async () => {
    const params: DocumentListParams = {
      processInstance: null,
      page,
      size: 10,
      startDate:
        filterValues?.startDate ||
        moment().subtract(1, "months").format("YYYY-MM-DD"),
      endDate: filterValues?.endDate || moment().format("YYYY-MM-DD"),
      sort: "createdDate,desc",
      idProcess: null,
      processName: process || null,
      workflowLabel: filterValues?.workflowLabel || null,
    };
    const { data, err } = await Api.performRequest((r) =>
      r.document.list(params)
    );
    Logger.debug(
      "(Document List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );
    if (data !== null) {
      setDocumentList(data);
    }
  };

  useEffect(() => {
    handleFetchDocumentList();
  }, [filterValues, page]);

  return (
    <div className="px-24 pb-12">
      <Paper className="mt-16 w-full bg-white p-9 flex justify-between">
        <div>
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
          <div className="flex gap-4 my-3">
            <div className="text-gray text-xsm">Showing Results for:</div>
            <div className="rounded-full pr-6 pl-6 pt-1 pb-1 border-blue-900 border-1 text-xs font-semibold">
              {process}
            </div>
            {!filterValues?.workflowLabel && (
              <div className="rounded-full pr-6 pl-6 pt-1 pb-1 border-blue-900 border-1 text-xs font-semibold">
                {filterValues?.startDate ||
                  moment().subtract(1, "months").format("YYYY-MM-DD")}{" "}
                - {filterValues?.endDate || moment().format("YYYY-MM-DD")}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <Button
            aria-label="Filter"
            color="primary"
            variant="contained"
            onClick={handleOpenFilters}
          >
            <EdgeSvgIcon>heroicons-solid:plus</EdgeSvgIcon>
            Filter
          </Button>
        </div>
      </Paper>
      <div className="font-bold mt-8 mb-2 gap-4">
        <div className="flex justify-between items-center my-12">
          <div>Documents - ({documentList?.content.length || 0})</div>
          <Pagination
            count={documentList?.totalPages || 0}
            page={page + 1}
            onChange={handlePageChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {documentList?.content.map((item, index) => (
            <div>
              <DocumentCard
                document={item}
                handleDocumentClick={() => {
                  setIsDocumentSelected(true);
                  setSelectedDocument(item);
                }}
                key={index}
              />
            </div>
          ))}
          <div className="flex justify-start items-center my-6"></div>
        </div>
      </div>

      <Ve3Popup
        open={isOpen}
        fullWidth={false}
        setOpen={setIsOpen}
        body={<Filters setFilterValues={setFilterValues} />}
      />

      <Ve3Popup
        open={isDocumentSelected}
        fullWidth={false}
        setOpen={setIsDocumentSelected}
        body={<DocumentView document={selectedDocument} />}
      />
    </div>
  );
};

export default KnowledgePortalDocuments;
