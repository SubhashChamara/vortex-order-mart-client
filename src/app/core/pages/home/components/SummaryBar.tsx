import { memo, useEffect, useState } from "react";
import { TaskSummary } from "../../../types/TaskSummary";
import SummaryCard from "./SummaryCard";
import VortexStatCard from "../../../../../@core/ui/VortexStatCard/StatCardWithIconHorizontal";
import { Api } from "../../../../../api/Api";
import Logger from "../../../../../@helpers/Logger";
import * as MuiIcons from "@mui/icons-material";
import { VortexTheme } from "../../../../../@core/theme/VortexTheme";

type SubStat = {
  label: string;
  value: string | number;
};

type Summary = {
  title: string;
  count: string | number;
  icon: string|null;
  subStats: SubStat[];
  color?: string;
};

const SummaryBar = () => {
  const [summary, setSummary] = useState<TaskSummary | null>(null);

  const summaryArray: Summary[] = [
    {
      title: "Orders",
      count: 1256,
      icon:"feather:shopping-cart" ,
      subStats: [ 
        {
        label: "Today",
        value: "10"
        },
        {
          label: "Week",
          value: "50"
        },
        {
          label: "Month",
          value: "80"
        }
      ],
      color: VortexTheme.palette.primary.main,
    },
    {
      title: "Packagers",
      count: 1256,
      icon:"feather:package" ,
      subStats: [ 
        
        {
        label: "New",
        value: "10"
        },
        {
          label: "Ready to Ship",
          value: "50"
        },
        {
          label: "Courier",
          value: "80"
        },
    ],
    color: VortexTheme.palette.primary.main,
    },
    {
      title: "Cash",
      count: "25000",
      icon:"feather:dollar-sign",
      subStats: [ 
        {
          label: "Pending",
          value: "10000"
        },
        {
          label: "Collected",
          value: "16000"
        },
        {
          label: "Failed Delivery",
          value: "10000"
        }
        ,],
        color: VortexTheme.palette.primary.main,
    },
    {
      title: "Products",
      count: 10,
      icon:"feather:shopping-bag",
      subStats: [ 
        {
          label: "In stock",
          value: "150"
        },
        {
          label: "Low stock",
          value: "1000"
        },
        {
          label: "Out of Stock",
          value: "106"
        }
        ,],
        color: VortexTheme.palette.primary.main,
    },
  ];

  const handleFetchSummary = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.workflow.taskSummary()
    );

    Logger.debug(
      "(Task Summary) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setSummary(data);
    }
  };

  useEffect(() => {
    handleFetchSummary();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 sm:justify-between gap-12">
      {summaryArray.map((summary, index) => (
        <VortexStatCard title={summary.title} count={summary.count} subStats={summary.subStats} color={summary.color} icon={summary.icon}/>
      ))}
    </div>
  );
};

export default memo(SummaryBar);
