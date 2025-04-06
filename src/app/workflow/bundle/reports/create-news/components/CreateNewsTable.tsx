import { ChangeEvent, FC, useState } from "react";
import { Pagination, Paper, Tooltip } from "@mui/material";
import { Pageable } from "../../../../../../api/types/Pageable";
import { CreateNews } from "../../../../../core/types/reports/CreateNews";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import formatDate from "../../../../../core/pages/admin/helpers/helper-functions";
import Ve3Popup from "../../../../../../@core/ui/Ve3Popup/Ve3Popup";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


interface valueTableProps {
  createNews: Pageable<CreateNews | null> | null;
  setPage: (v: number) => void;
  page: number;
  selectedNews: (newsInfo: CreateNews | null) => void;
  selectedNewsForDelete: (newsInfo: CreateNews | null) => void;
}

const UserWiseActivityTrackerReportTable: FC<valueTableProps> = (props) => {
  const { createNews, setPage, page, selectedNews, selectedNewsForDelete } = props;

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  if (createNews === null) {
    return null;
  }

  const [news, setNews] = useState<CreateNews | null>(null);
  const [open, setOpen] = useState<boolean>(false);


  const seeMore = (news: CreateNews | null) => {
    if (news) {
      setNews(news);
      setOpen(true);
    }
  }

  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumDevice = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeDevice = useMediaQuery(theme.breakpoints.up("md"));


  const customWidth = isSmallDevice ? "100%" : isMediumDevice ? "70%" : "50%";

  return (
    <Paper className="w-full overflow-hidden p-12">
      {(createNews && !createNews?.empty) ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-red-600 font-600">Created News</div>
              {/* <div className="text-[12px] font-600 text-gray">
                Created News
              </div> */}
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="whitespace-nowrap divide-x-1">
                  <th className="p-6 text-center">Start Date</th>
                  <th className="p-6 text-center">End Date</th>
                  <th className="p-6 text-center">Message</th>
                  <th className="p-6 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white whitespace-nowrap divide-x-1">
                {createNews?.content?.map((value, index) => (
                  <tr
                    className="text-black h-full bg-white shadow-2"
                    key={index}
                    style={{ borderSpacing: "10px" }}
                  >
                    <td className="p-6 text-[12px] align-middle text-center">
                      <p className="text-[12px] text-gray font-bold text-center">
                        {formatDate(value?.startDate?.toString() ?? "")}
                      </p>
                    </td>
                    <td className="p-6 align-middle text-center">
                      <p className="text-[12px] text-gray font-bold text-center">
                        {formatDate(value?.endDate?.toString() ?? "")}
                      </p>
                    </td>
                    <td className="flex flex-row p-6 align-middle justify-between text-left">
                      <p className="text-[12px] text-gray font-bold text-left">
                        {value?.message && value.message?.length > 130 ? value?.message?.slice(0, 130) + "..." : value?.message}
                      </p>

                      <Tooltip title="View More" className="mr-20">
                        <button
                          className="text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                          aria-label="View More"
                          onClick={() => { seeMore(value || null) }}
                        >
                          <EdgeSvgIcon>feather:book-open</EdgeSvgIcon>
                        </button>
                      </Tooltip>

                    </td>
                    <td className="p-6 align-middle text-center">
                      <div className="flex items-center space-x-4 text-sm justify-center">

                        <div className="flex items-center space-x-4 text-sm justify-center">
                          <Tooltip title="Update News">
                            <button
                              className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                              aria-label="Update News"
                              onClick={() => { selectedNews(value || null) }}
                            >
                              <EdgeSvgIcon>feather:edit</EdgeSvgIcon>
                            </button>
                          </Tooltip>
                        </div>

                        <div className="flex items-center space-x-4 text-sm justify-center">
                          <Tooltip title="Delete News">
                            <button
                              className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                              aria-label="Delete News"
                              onClick={() => { selectedNewsForDelete(value || null) }}
                            >
                              <EdgeSvgIcon>feather:trash</EdgeSvgIcon>
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mt-4">
            <Pagination
              count={createNews.totalPages}
              siblingCount={0}
              page={page + 1}
              onChange={handlePageChange}
            />
          </div>
        </div>

      ) :
        (
          <div className="flex items-center justify-center">
            <p className="text-red-600 text-14 font-bold">
              No records found
            </p>
          </div>
        )
      }

      <Ve3Popup
        open={open}
        setOpen={setOpen}
        customWidth={customWidth}
        body={
          <div>
            <div className="text-sm text-red-600 font-600">Message</div>
            <div className="text-[12px] font-700 text-gray">
              {news?.message}
            </div>
          </div>
        }
      />
    </Paper >

  );
};

export default UserWiseActivityTrackerReportTable;



