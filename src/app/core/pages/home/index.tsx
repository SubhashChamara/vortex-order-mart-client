import { FC, useState } from "react";
import { motion } from "framer-motion";

import SideBar from "./components/SideBar";
import SummaryBar from "./components/SummaryBar";
import WorkflowListView from "./components/WorkflowListView";
import WorkflowStatisticsView from "./components/WorkflowStatisticsView";
import { ProcessDefinitionInfo } from "../../types/ProcessDefinitionInfo";
import SalesOrderSummaryChart from "./components/SalesOrderSummaryChart";
import QuickActionButton from "../../../../@context/QuickActionButton";

const Home: FC = () => {
  const [process, setProcess] = useState<ProcessDefinitionInfo | null>(null);

  const handleSetProcess = (proc: ProcessDefinitionInfo) => {
    setProcess(proc);
  };

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const salesData = [
    { date: "01 Jan", value: 1000 },
    { date: "02 Jan", value: 1200 },
    { date: "03 Jan", value: 300 },
    { date: "05 Jan", value: 0 },
    { date: "07 Jan", value: 5200 },
    { date: "12 Jan", value: 9200 },
    { date: "14 Jan", value: 16000 },
    { date: "21 Jan", value: 12000 },
    { date: "28 Jan", value: 6000 },
  ];
  
  return (
    <motion.div
      className="w-full flex flex-row h-fit p-12 gap-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div id="glance-box" className="w-full h-fit pb-0">
        <SummaryBar />
        <div
          id="statistic-box"
          className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-10 w-full min-w-0 mt-10"
        >
          <motion.div variants={item} className="max-h-[34rem] overflow-auto">
            <WorkflowListView handleSetProcess={handleSetProcess} />
          </motion.div>

          <div className="grid grid-cols-1">
            <motion.div variants={item}>
            <SalesOrderSummaryChart
              data={salesData}
              filter="This Month"
              filterOptions={["This Month", "Last Month", "This Year"]}
              onFilterChange={(val) => console.log("Filter changed:", val)}
/>;
            </motion.div>
            {/* <motion.div className="grid grid-cols-1 md:grid-cols-2 w-full gap-12 mt-9"></motion.div> */}
          </div>
        </div>
      </div>
      <motion.div className="w-1/4 hidden md:block" variants={item}>
        <SideBar />
        
      </motion.div>
    </motion.div>
  );
};

export default Home;
