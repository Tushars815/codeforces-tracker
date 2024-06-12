import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { selectContestData } from "../../reducers/slices/FetchedDataSlice";
import { ContestListType } from "@/src/types";

const prepareData = (ContestData: ContestListType[]) => {
  return ContestData.map((contest: ContestListType) => ({
    x: contest.ratingUpdateTimeSeconds * 1000, // Convert to milliseconds for Highcharts
    y: contest.newRating,
    name: contest.contestName,
  }));
};

// Highcharts configuration options
const getHighchartOptions = (data: any) => ({
  chart: {
    type: "spline",
    scrollablePlotArea: {
      minWidth: 210,
      scrollPositionX: 1,
    },
  },
  title: {
    text: "Contest Rating Over Time",
  },
  xAxis: {
    type: "datetime",
    title: {
      text: "Date",
    },
  },
  yAxis: {
    title: {
      text: "Rating",
    },
  },
  plotOptions: {
    series: {
      color: "rgb(255, 161, 22)",
    },
    spline: {
      lineWidth: 2,
      states: {
        hover: {
          lineWidth: 3,
        },
      },
      marker: {
        enabled: false,
      },
      pointInterval: 3600000, // one hour
      pointStart: Date.UTC(2018, 1, 13, 0, 0, 0),
    },
  },
  series: [
    {
      name: "Rating",
      showInLegend: false,
      data: data,
      zIndex: 2,
    },
  ],
  credits: {
    enabled: false,
  },
});

const Graph = () => {
  const ContestData = useSelector(selectContestData);
  const data = prepareData(ContestData);
  const options = getHighchartOptions(data);

  return (
    <div className="bg-white w-[75vw] mx-auto  h-auto transition-shadow shadow-lg hover:shadow-2xl">
      <HighchartsReact
        containerProps={{ className: "dimensions" }}
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default Graph;
