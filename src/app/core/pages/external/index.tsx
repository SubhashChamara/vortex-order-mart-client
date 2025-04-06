import React, {
  ComponentType,
  LazyExoticComponent,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import filterExternalComponent from "../../../../@helpers/FilterExternalForm";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { Tooltip } from "@mui/material";

const ExternalComponent: React.FC = () => {
  const location = useLocation();

  const [ComponentToRender, setComponentToRender] =
    useState<LazyExoticComponent<ComponentType<any>> | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const result = filterExternalComponent(location.pathname);

    if (result) {
      setComponentToRender(result?.component);
    } else {
      setComponentToRender(null);
    }
  }, [location]);
  return (
    <div className="flex flex-col">
      <div className="flex h-36 shrink-0 flex-row items-center px-14 md:h-48 bg-white shadow">
        <div className="mx-4 flex flex-1">
          <img className="h-32" src="/assets/logo/ordermart.png" alt="logo" />
        </div>
        <Tooltip title="Go to application">
          <EdgeSvgIcon
            className="hover:cursor-pointer"
            onClick={() => navigate(`/`)}
          >
            feather:external-link
          </EdgeSvgIcon>
        </Tooltip>
      </div>

      <div className="p-12">{ComponentToRender && <ComponentToRender />}</div>
    </div>
  );
};

export default ExternalComponent;
