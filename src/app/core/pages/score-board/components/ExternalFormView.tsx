import React, {
  ComponentType,
  FC,
  LazyExoticComponent,
  useEffect,
  useState,
} from "react";
import { ScoreBoardProcess } from "../../../types/ScoreBoardProcess";
import filterComponent from "../../../../../@helpers/FormFilter";
import RetriveFile from "../../../../../@helpers/RetriveFiles";
import { Tooltip, Typography } from "@mui/material";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

type ExternalFormViewProps = {
  process: ScoreBoardProcess | null;
};

const ExternalFormView: FC<ExternalFormViewProps> = (props) => {
  const { process } = props;

  const [ComponentToRender, setComponentToRender] =
    useState<LazyExoticComponent<ComponentType<any>> | null>(null);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (process?.processInstance) {
      navigator.clipboard.writeText(process.processInstance).then(() => {
        setIsCopied(true); // Change icon to checkmark
        setTimeout(() => setIsCopied(false), 3000); // Revert to original icon after 3 seconds
      });
    }
  };

  useEffect(() => {
    if (process !== null) {
      const config = filterComponent(process.processDefinitionKey);

      if (config) {
        setComponentToRender(config.component);
      } else {
        setComponentToRender(null);
      }
    }
  }, [process]);

  if (process === null) {
    return;
  }

  return (
    <div>
      <Typography className="text-12 text-red-700 font-semibold tracking-tight leading-none flex items-center w-full shadow-3 p-6 mb-12">
        <div className="w-1/2 flex items-center">
          <img
            src={
              process?.processLogo
                ? RetriveFile(process.processLogo)
                : "assets/icons/workflow/PF (20).png"
            }
            className="h-32 pr-6"
            alt="workflow-logo"
          />
          <label>{process.processName}</label>
          <Tooltip
            title={isCopied ? "Copied!" : process?.processInstance || ""}
            placement="top"
            className="ml-5"
          >
            <EdgeSvgIcon
              size={20}
              onClick={handleCopy}
              style={{ cursor: "pointer" }}
            >
              {isCopied
                ? "heroicons-solid:check-circle"
                : "heroicons-solid:question-mark-circle"}
            </EdgeSvgIcon>
          </Tooltip>
        </div>
        {/* <div className="flex w-1/2 justify-end">
          <div
            className="my-6 pr-12 text-10 text-right font-bold text-secondary"
            style={{ letterSpacing: "2px" }}
          >
            TAT: {process.tat}
          </div>
        </div> */}
      </Typography>
      <div
        className="my-9 h-xs overflow-auto"
        style={{ overflowX: "hidden" }} // Restrict horizontal scrolling
      >
        {ComponentToRender && (
          <div style={{ overflowX: "hidden" }}>
            <ComponentToRender process={process} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExternalFormView;
