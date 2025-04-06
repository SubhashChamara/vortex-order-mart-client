import { ComponentType, LazyExoticComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import reportsFilterComponent from "../../../../../../@helpers/ReportsFilter";

const Report = () => {
  const { process, report } = useParams();
  const [ComponentToRender, setComponentToRender] =
    useState<LazyExoticComponent<ComponentType<any>> | null>(null);

  useEffect(() => {
    if (report && process) {
      setComponentToRender(
        reportsFilterComponent(report, process)?.component || null
      );
    }
  }, [report]);

  return <div>{ComponentToRender && <ComponentToRender />}</div>;
};

export default Report;
