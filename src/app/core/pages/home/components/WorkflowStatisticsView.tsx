import { FC, memo, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { Api } from "../../../../../api/Api";
import Logger from "../../../../../@helpers/Logger";
import { ProcessDefinitionInfo } from "../../../types/ProcessDefinitionInfo";
import { Paper } from "@mui/material";
import RetriveFile from "../../../../../@helpers/RetriveFiles";

type WorkflowStatisticsViewProps = {
  process: ProcessDefinitionInfo | null;
};

type GraphItem = {
  y: number;
  name: string;
};

const WorkflowStatisticsView: FC<WorkflowStatisticsViewProps> = (props) => {
  const { process } = props;

  const [statistics, setStatistics] = useState<GraphItem[]>([]);

  const chartOptions = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 0,
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      style: {
        color: "#000",
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "100px",
      },
      align: "left",
      x: 27,
      y: 20,
      text: "",
    },
    subtitle: false,
    accessibility: {
      enabled: false,
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      headerFormat: null,
      pointFormat:
        '<div style="color:{point.color}">{point.name}</div> <br /> <div style="display: flex;">Count : <b>{point.y}</b><br/>Average : <b>{point.percentage:.1f}%</b></div>',
    },
    plotOptions: {
      pie: {
        depth: 45,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: 0,
      y: 0,
      useHTML: true,
      labelFormatter: function () {
        return (
          '<span class="legend-title">' +
          this.name +
          "</span>" +
          '<span class="legend-value">' +
          this.y +
          "</span>"
        );
      },
    },
    series: [
      {
        name: "Share",
        colorByPoint: true,
        data: statistics,
      },
    ],
    colors: ["#658a72", "#fdd4ba", "#476495", "#ee9325", "#dd4e17"],
  };

  const handleFetchWorkflowStatistics = async () => {
    if (process !== null) {
      const { data, err } = await Api.performRequest((r) =>
        r.workflow.workflowStatistics(process.processId)
      );

      Logger.debug(
        "(Workflow Stats) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setStatistics([
          {
            name: "Today",
            y: data?.today || 0,
          },
          {
            name: "1 Day",
            y: data?.yesterday || 0,
          },
          {
            name: "7 Days",
            y: data?.withIn7Days || 0,
          },
          {
            name: "30 Day",
            y: data?.withIn30Days || 0,
          },
          {
            name: "Over 30 Days",
            y: data?.over30Days || 0,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    handleFetchWorkflowStatistics();
  }, [process]);

  return (
    <Paper className="w-full h-full overflow-y-auto p-9">
      <style>
        {`
    .legend-title {
      display: inline-block;
      width: 80px;
      font-weight: bold;
      padding: 0 5px;
    }
    .legend-value {
      display: inline-block;
      width: 30px; /* Set a fixed width that accommodates the largest number */
      margin: 1px 10px;
      padding: 0 5px;
      font-weight: bold;
      text-align: right; /* Right align the text within the value */
    }
  `}
      </style>
      <div className="flex items-center gap-9">
        <img
          src="assets/icons/home/Statistics.png"
          className="w-24 rounded-4 bg-grey-200 p-6 shadow-3"
          alt=""
        />
        <div className="text-12 font-bold text-gray-800">
          Workflows Statistics
        </div>
      </div>
      <div className="flex items-center w-full justify-center mt-12">
        <img
          src={
            process?.logo
              ? RetriveFile(process.logo)
              : "assets/icons/workflow/PF (20).png"
          }
          className="h-28"
          alt="workflow-logo"
        />
        <div className="pl-4 p-4 font-bold text-blue-900 flex items-center">
          <label>{process?.name} - </label>
          <label className="text-12 text-black">
            {process?.taskCount || 0}
          </label>
        </div>
      </div>
      <div className="px:6 lg:px-12">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </Paper>
  );
};

export default memo(WorkflowStatisticsView);
