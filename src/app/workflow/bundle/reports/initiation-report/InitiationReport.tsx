import dayjs from "dayjs";
import React, { memo, useEffect, useState } from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { BundledTvReportInfo } from "../../@types/BundledTvReportInfo";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Paper } from "@mui/material";
import { Api } from "../../../../../api/Api";

const InitiationReport: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());
  const [bundledTvReportData, setBundledTvReportData] =
    useState<BundledTvReportInfo | null>(null);

  const getTvReportDetails = async () => {
    const { data } = await Api.performRequest((r) =>
      r.reports.getTvReportDetails()
    );

    if (data !== null) {
      setBundledTvReportData(data);
    }
  };

  const chartOptionsCard = {
    chart: {
      type: "column",
      height: "20%",
      animation: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      style: {
        color: "#000",
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "20px",
      },
      align: "left",
      x: 27,
      y: 20,
      text: "",
    },
    subtitle: false,
    accessibility: {
      enabled: false,
    },
    tooltip: {
      headerFormat: null,
      pointFormat:
        '<div style="color:{point.color}">{point.name}</div> <br /> <div style="display: flex;">Count : <b>{point.y}</b></div>',
      animation: false,
    },
    plotOptions: {
      column: {
        depth: 45,
        dataLabels: {
          enabled: true,
        },
        showInLegend: false,
        animation: false, // Disable column animation
      },
    },
    xAxis: {
      categories: ["1 Day", "2 Days", "3 Days", "> 3 Days"],
      title: {
        text: null,
      },
      labels: {
        style: {
          fontWeight: "bold",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    series: [
      {
        name: "",
        colorByPoint: true,
        data: [
          {
            name: "1 Day",
            y: (bundledTvReportData && bundledTvReportData.cardTotalDay1) || 0,
          },
          {
            name: "2 Days",
            y: (bundledTvReportData && bundledTvReportData.cardTotalDay2) || 0,
          },
          {
            name: "3 Days",
            y: (bundledTvReportData && bundledTvReportData.cardTotalDay3) || 0,
          },
          {
            name: "> 3 Days",
            y: (bundledTvReportData && bundledTvReportData.cardTotalDay4) || 0,
          },
        ],
      },
    ],
    colors: ["#81B9F4", "#9BE880", "#666666", "#E89086"],
  };

  const chartOptionsLoan = {
    chart: {
      type: "column",
      height: "20%",
      animation: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      style: {
        color: "#000",
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "20px",
      },
      align: "left",
      x: 27,
      y: 20,
      text: "",
    },
    subtitle: false,
    accessibility: {
      enabled: false,
    },
    tooltip: {
      headerFormat: null,
      pointFormat:
        '<div style="color:{point.color}">{point.name}</div> <br /> <div style="display: flex;">Count : <b>{point.y}</b></div>',
      animation: false,
    },
    plotOptions: {
      column: {
        depth: 45,
        dataLabels: {
          enabled: true,
        },
        showInLegend: false,
        animation: false, // Disable column animation
      },
    },
    xAxis: {
      categories: ["1 Day", "2 Days", "3 Days", "> 3 Days"],
      title: {
        text: null,
      },
      labels: {
        style: {
          fontWeight: "bold",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    series: [
      {
        name: "",
        colorByPoint: true,
        data: [
          {
            name: "1 Day",
            y: (bundledTvReportData && bundledTvReportData.loanTotalDay1) || 0,
          },
          {
            name: "2 Days",
            y: (bundledTvReportData && bundledTvReportData.loanTotalDay2) || 0,
          },
          {
            name: "3 Days",
            y: (bundledTvReportData && bundledTvReportData.loanTotalDay3) || 0,
          },
          {
            name: "> 3 Days",
            y: (bundledTvReportData && bundledTvReportData.loanTotalDay4) || 0,
          },
        ],
        animation: false, // Disable series animation
      },
    ],
    colors: ["#81B9F4", "#9BE880", "#666666", "#E89086"],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      getTvReportDetails();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const SummaryHeader: React.FC<{
    title: string;
    count: number;
    icon: string;
  }> = ({ title, count, icon }) => {
    return (
      <div className="grid grid-cols-10 border rounded-md w-[20vw]">
        <div className="col-span-8 flex flex-row gap-12 bg-secondary rounded-l-md p-12 text-white font-semibold text-md items-center">
          <EdgeSvgIcon>{icon}</EdgeSvgIcon>
          <p>{title}</p>
        </div>
        <div className="col-span-2 bg-black rounded-r-md py-12 text-white font-semibold text-md text-center">
          {count}
        </div>
      </div>
    );
  };

  const TableHeading: React.FC<{ title: string }> = ({ title }) => {
    return (
      <div className="w-full flex p-6 bg-black rounded-md items-center justify-center">
        <p className="text-md font-semibold text-white">{title}</p>
      </div>
    );
  };

  const DurationColumns: React.FC = () => {
    return (
      <div className="grid grid-cols-4 font-semibold">
        <p className="text-center">1 Day</p>
        <p className="text-center">2 Days</p>
        <p className="text-center">3 Days</p>
        <p className="text-primary text-center"> {">"} 3 Days</p>
      </div>
    );
  };

  const TableDetail: React.FC<{ title: string; icon: string }> = ({
    title,
    icon,
  }) => {
    return (
      <div className="w-full grid grid-cols-12 border border-primary rounded-md bg-white">
        <div className="col-span-1 p-6 border-r border-primary flex items-center justify-center">
          <EdgeSvgIcon className="text-primary font-bold">{icon}</EdgeSvgIcon>
        </div>
        <div className="col-span-11 p-6 font-bold">{title}</div>
      </div>
    );
  };

  const TableData: React.FC<{
    oneDayCount: string;
    twoDayCount: string;
    threeDayCount: string;
    moreThan3DayCount: string;
  }> = ({ oneDayCount, twoDayCount, threeDayCount, moreThan3DayCount }) => {
    return (
      <div className="w-full grid grid-cols-4 bg-white border border-primary py-6 rounded-md">
        <p className="font-bold text-center">{oneDayCount}</p>
        <p className="font-bold text-center">{twoDayCount}</p>
        <p className="font-bold text-center text-yellow-800">{threeDayCount}</p>
        <p className="font-bold text-center text-primary">
          {moreThan3DayCount}
        </p>
      </div>
    );
  };

  return (
    bundledTvReportData && (
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-col gap-12 px-24 py-12 flex-grow">
          {/* title header section */}
          <div className="grid grid-cols-3">
            <img
              className="h-32 hidden md:flex"
              src="assets/logo/customer-logo/login.png"
              alt="logo"
            />
            <div className="w-full flex flex-col items-center">
              <p className="font-bold text-3xl">Credit Initiation Unit</p>
              <p className="font-bold text-md">Active Work Flows</p>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-bold text-md">
                {currentTime.format("dddd, D MMMM YYYY")}
              </p>
              <p className="font-bold text-sm">
                {currentTime.format("HH : mm : ss")}
              </p>
            </div>
          </div>

          {/* summary header section */}
          <div className="flex flex-row gap-12 w-full items-center justify-center">
            <SummaryHeader
              title="CREDIT CARDS"
              count={
                (bundledTvReportData && bundledTvReportData.cardSalesCount) || 0
              }
              icon={"feather:credit-card"}
            />
            <SummaryHeader
              title="PERSONAL LOANS"
              count={
                (bundledTvReportData && bundledTvReportData.loanSalesCount) || 0
              }
              icon={"material-outline:credit_score"}
            />
          </div>

          {/* table component */}
          <div className="flex flex-col gap-12 bg-grey-300 rounded-lg p-12">
            <div className="grid grid-cols-3 gap-12">
              <TableHeading title="CIU" />
              <TableHeading title="CREDIT CARDS" />
              <TableHeading title="PERSONAL LOANS" />
            </div>
            <div className="grid grid-cols-3 gap-12">
              <div />
              <DurationColumns />
              <DurationColumns />
            </div>

            {/* table data section */}

            <div className="flex flex-col gap-3">
              {/* table row 1 */}
              <div className="grid grid-cols-3 gap-12">
                <TableDetail title="Doc Check" icon={"feather:file"} />
                <TableData
                  oneDayCount={`${bundledTvReportData.cardDocCheckDay1}`}
                  twoDayCount={`${bundledTvReportData.cardDocCheckDay2}`}
                  threeDayCount={`${bundledTvReportData.cardDocCheckDay3}`}
                  moreThan3DayCount={`${bundledTvReportData.cardDocCheckDay4}`}
                />
                <TableData
                  oneDayCount={`${bundledTvReportData.loanDocCheckDay1}`}
                  twoDayCount={`${bundledTvReportData.loanDocCheckDay2}`}
                  threeDayCount={`${bundledTvReportData.loanDocCheckDay3}`}
                  moreThan3DayCount={`${bundledTvReportData.loanDocCheckDay4}`}
                />
              </div>

              {/* table row 2 */}
              <div className="grid grid-cols-3 gap-12">
                <TableDetail
                  title="EB Data Entry / FRM Alert Checker"
                  icon={"heroicons-outline:database"}
                />
                <TableData
                  oneDayCount={`${bundledTvReportData.cardEBMakerDay1} / ${bundledTvReportData.cardEyeBallingDay1}`}
                  twoDayCount={`${bundledTvReportData.cardEBMakerDay2} / ${bundledTvReportData.cardEyeBallingDay2}`}
                  threeDayCount={`${bundledTvReportData.cardEBMakerDay3} / ${bundledTvReportData.cardEyeBallingDay3}`}
                  moreThan3DayCount={`${bundledTvReportData.cardEBMakerDay4} / ${bundledTvReportData.cardEyeBallingDay4}`}
                />
                <TableData
                  oneDayCount={`${bundledTvReportData.loanEBMakerDay1} / ${bundledTvReportData.loanEyeBallingDay1}`}
                  twoDayCount={`${bundledTvReportData.loanEBMakerDay2} / ${bundledTvReportData.loanEyeBallingDay2}`}
                  threeDayCount={`${bundledTvReportData.loanEBMakerDay3} / ${bundledTvReportData.loanEyeBallingDay3}`}
                  moreThan3DayCount={`${bundledTvReportData.loanEBMakerDay4} / ${bundledTvReportData.loanEyeBallingDay4}`}
                />
              </div>

              {/* table row 3 */}
              <div className="grid grid-cols-3 gap-12">
                <TableDetail
                  title="Relationship Maker / Checker"
                  icon={"material-outline:device_hub"}
                />
                <TableData
                  oneDayCount={`${bundledTvReportData.cardRelationMakerDay1} / ${bundledTvReportData.cardRelationCheckerDay1}`}
                  twoDayCount={`${bundledTvReportData.cardRelationMakerDay2} / ${bundledTvReportData.cardRelationCheckerDay2}`}
                  threeDayCount={`${bundledTvReportData.cardRelationMakerDay3} / ${bundledTvReportData.cardRelationCheckerDay3}`}
                  moreThan3DayCount={`${bundledTvReportData.cardRelationMakerDay4} / ${bundledTvReportData.cardRelationCheckerDay4}`}
                />
                <TableData
                  oneDayCount={`${bundledTvReportData.loanRelationMakerDay1} / ${bundledTvReportData.loanRelationCheckerDay1}`}
                  twoDayCount={`${bundledTvReportData.loanRelationMakerDay2} / ${bundledTvReportData.loanRelationCheckerDay2}`}
                  threeDayCount={`${bundledTvReportData.loanRelationMakerDay3} / ${bundledTvReportData.loanRelationCheckerDay3}`}
                  moreThan3DayCount={`${bundledTvReportData.loanRelationMakerDay4} / ${bundledTvReportData.loanRelationCheckerDay4}`}
                />
              </div>

              {/* table row 4 */}
              <div className="grid grid-cols-3 gap-12">
                <TableDetail
                  title="EB Data Entry Maker / Checker"
                  icon={"heroicons-outline:database"}
                />
                <TableData
                  oneDayCount={`${bundledTvReportData.cardDataEntryMakerDay1} / ${bundledTvReportData.cardDataEntryCheckerDay1}`}
                  twoDayCount={`${bundledTvReportData.cardDataEntryMakerDay2} / ${bundledTvReportData.cardDataEntryCheckerDay2}`}
                  threeDayCount={`${bundledTvReportData.cardDataEntryMakerDay3} / ${bundledTvReportData.cardDataEntryCheckerDay3}`}
                  moreThan3DayCount={`${bundledTvReportData.cardDataEntryMakerDay4} / ${bundledTvReportData.cardDataEntryCheckerDay4}`}
                />
                <TableData
                  oneDayCount={`${bundledTvReportData.loanDataEntryMakerDay1} / ${bundledTvReportData.loanDataEntryCheckerDay1}`}
                  twoDayCount={`${bundledTvReportData.loanDataEntryMakerDay2} / ${bundledTvReportData.loanDataEntryCheckerDay2}`}
                  threeDayCount={`${bundledTvReportData.loanDataEntryMakerDay3} / ${bundledTvReportData.loanDataEntryCheckerDay3}`}
                  moreThan3DayCount={`${bundledTvReportData.loanDataEntryMakerDay4} / ${bundledTvReportData.loanDataEntryCheckerDay4}`}
                />
              </div>

              {/* table row 5 */}
              <div className="grid grid-cols-3 gap-12">
                <TableDetail title="Underwriter" icon={"feather:edit"} />
                <TableData
                  oneDayCount={`${bundledTvReportData.cardUnderWriterDay1}`}
                  twoDayCount={`${bundledTvReportData.cardUnderWriterDay2}`}
                  threeDayCount={`${bundledTvReportData.cardUnderWriterDay3}`}
                  moreThan3DayCount={`${bundledTvReportData.cardUnderWriterDay4}`}
                />
                <TableData
                  oneDayCount={`${bundledTvReportData.loanUnderWriterDay1}`}
                  twoDayCount={`${bundledTvReportData.loanUnderWriterDay2}`}
                  threeDayCount={`${bundledTvReportData.loanUnderWriterDay3}`}
                  moreThan3DayCount={`${bundledTvReportData.loanUnderWriterDay4}`}
                />
              </div>
            </div>
          </div>

          {/* charts */}
          <div className="grid grid-cols-2 gap-12">
            <Paper className="rounded-md border">
              <div className="px-12 py-6 mb-6 flex flex-row gap-12 items-center border-b-2">
                <p className="font-bold">CREDIT CARDS TOTAL</p>
                <p className="font-bold text-primary">
                  [{bundledTvReportData.cardSalesCount}]
                </p>
              </div>
              <div className="px-12">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptionsCard}
                />
              </div>
            </Paper>
            <Paper className="rounded-md border">
              <div className="px-12 py-6 mb-6 flex flex-row gap-12 items-center border-b-2">
                <p className="font-bold">PERSONAL LOANS TOTAL</p>
                <p className="font-bold text-primary">
                  [{bundledTvReportData.loanSalesCount}]
                </p>
              </div>
              <div className="px-12">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptionsLoan}
                />
              </div>
            </Paper>
          </div>
        </div>

        {/* banner */}
        {bundledTvReportData.news.length > 0 && (
          <div className="overflow-hidden whitespace-nowrap bg-gray-800 text-white py-4 w-full inline-flex flex-nowrap">
            <div className="flex flex-row gap-9 w-screen justify-center animate-scroll space-x-8">
              {bundledTvReportData.news.map((item, index) => (
                <span key={index} className="inline-block text-lg font-medium">
                  {item} {index !== bundledTvReportData.news.length - 1 && "|"}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

const InitiationReportMemo = memo(InitiationReport);
export default InitiationReportMemo;
