import { Avatar, Button, TextField, Tooltip, darken } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { CommentInfo } from "../../../types/CommentInfo";
import { TaskDetailInfo } from "../../../types/TaskDetailInfo";
import { Api } from "../../../../../api/Api";
import RetriveFile from "../../../../../@helpers/RetriveFiles";
import moment from "moment";
import Logger from "../../../../../@helpers/Logger";
import { toast } from "react-toastify";
import { ForumOutlined } from "@mui/icons-material";

type CommentViewProps = {
  task: TaskDetailInfo | null;
};

const CommentView: FC<CommentViewProps> = (props) => {
  const { task } = props;

  const [commentList, setCommentList] = useState<CommentInfo[]>([]);
  const [comment, setComment] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleFetchCommentList = async () => {
    if (task === null) {
      return;
    }

    const { data, err } = await Api.performRequest((r) =>
      r.workflow.getComments(task.processInstanceId)
    );

    if (data !== null) {
      setCommentList(data);
    }
  };

  const handleCreateComment = async () => {
    if (isSubmitted) {
      Logger.debug("Form already submitted");
      return;
    }

    if (comment === "") {
      toast.error("Please enter comment");
      return;
    }

    const { data, err } = await Api.performRequest((r) =>
      r.workflow.addComment(task.taskInstance, comment)
    );

    if (err === null) {
      toast.success("Comment added Successfully");
      setComment("");
      setIsSubmitted(false);
      handleFetchCommentList();
    } else {
      toast.error(err.msg);
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    handleFetchCommentList();
  }, []);

  return (
    <div className="px-4 max-h-xs overflow-y-scroll">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 flex items-center gap-6">
          <ForumOutlined className="text-primary text-20" />
          <label className="text-secondary">
            Discussion ({commentList.length})
          </label>
        </h2>
      </div>

      <div className="mb-6 flex flex-col gap-6">
        <TextField
          type="text"
          placeholder="Write a comment"
          rows={4}
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type="button"
          className="w-[200px]"
          onClick={handleCreateComment}
        >
          <EdgeSvgIcon
            className="icon-size-18 cursor-pointer mr-6 text-white"
            color="error"
          >
            feather:message-circle
          </EdgeSvgIcon>{" "}
          Post comment
        </Button>
      </div>

      {commentList.map((item, index) => (
        <div
          key={index}
          className="my-4 border-2 border-gray-100 bg-gray-50 rounded p-6"
        >
          <div className="flex items-center pb-2 mb-4">
            <div className="relative  mr-3 rounded-full">
              {item.createdByProfile ? (
                <Avatar
                  className="h-24 w-24 border"
                  alt="process photo"
                  src={RetriveFile(item.createdByProfile)}
                />
              ) : (
                <Avatar
                  className="h-24 w-24 border"
                  sx={{
                    background: (theme) =>
                      darken(theme.palette.background.default, 0.05),
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {item.createdBy?.[0]}
                </Avatar>
              )}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex w-full flex-row justify-between items-center">
                <p className="font-semibold text-xs">{item.createdBy}</p>
                <p className="text-[12px] text-gray font-bold dark:text-gray-400">
                  {moment(item.createdAt).format("MMM DD, YYYY HH:mm")}
                </p>
              </div>
              <p className="font-semibold text-[12px]">
                {" "}
                <Tooltip
                  title={"Task Name"}
                  placement="bottom-start"
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -14],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <p className="text-xxs">{item.taskName}</p>
                </Tooltip>
              </p>
            </div>
          </div>
          <p
            className="text-gray-800 text-xs text-justify "
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              hyphens: "auto",
            }}
          >
            {item.fullMessage}
          </p>
        </div>
      ))}
    </div>
  );
};

export default memo(CommentView);
