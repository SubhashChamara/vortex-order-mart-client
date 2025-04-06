import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import FrmMisReportFilter from "./components/FrmMisReport";


const FrmMisReport = () => {

  type FK_Task01Props = {
    task: TaskDetailInfo;
  };
 
    return (
        <div className="px-12 pb-12">
        <>
          <FrmMisReportFilter/>
        </>
    </div>
    );
};

export default FrmMisReport;