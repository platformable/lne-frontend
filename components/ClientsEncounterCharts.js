import React, { useRef } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  BarController,
  LineController,
  LineElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarController,
  LineController,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  ChartDataLabels
);

const ClientsEncountersCharts = ({
  numberOfClientsEncounter,
  dataGraphicPeriod,
}) => {
  const week1 = numberOfClientsEncounter?.group1;
  const week2 = week1 + numberOfClientsEncounter?.group2;
  const week3 = week2 + numberOfClientsEncounter?.group3;
  const week4 = week3 + numberOfClientsEncounter?.group4;

  const month1 = numberOfClientsEncounter?.group1;
  const month2 = month1 + numberOfClientsEncounter?.group2;
  const month3 = month2 + numberOfClientsEncounter?.group3;
  const month4 = month3 + numberOfClientsEncounter?.group4;
  const month5 = month4 + numberOfClientsEncounter?.group5;
  const month6 = month5 + numberOfClientsEncounter?.group6;
  const month7 = month6 + numberOfClientsEncounter?.group7;
  const month8 = month7 + numberOfClientsEncounter?.group8;
  const month9 = month8 + numberOfClientsEncounter?.group9;
  const month10 = month9 + numberOfClientsEncounter?.group10;
  const month11 = month10 + numberOfClientsEncounter?.group11;
  const month12 = month11 + numberOfClientsEncounter?.group12;

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "December 2022 - Number of client encounters this month",
        position: "top",
        font: {
          size: 18,
        },
      },
      datalabels: {
        display: true,
        color: "#000",
        // show datalabel only if value > 0
        formatter: function (value, context) {
          return value > 0 ? value : "";
        },
        font: {
          weight: "bold",
        },
        //set datalabels on top
        anchor: "end",
        offset: -15,
        align: "start",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of client encounters",
          font: {
            weight: "bold",
          },
        },
        ticks: {
          precision: 0,
        },
        min: 0,
        max: 50,
      },
      x: {
        beginAtZero: true,
      },
    },
  };

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4+"];
  const labelsPerYear = [
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
  ];

  const data = {
    labels: dataGraphicPeriod === "Month" ? labels : labelsPerYear,
    datasets: [
      {
        type: "bar",
        label: "# of new clients",
        backgroundColor: "#b15cef",
        data:
          dataGraphicPeriod === "Month"
            ? [week1, week2, week3, week4]
            : [
                month1,
                month2,
                month3,
                month4,
                month5,
                month6,
                month7,
                month8,
                month9,
                month10,
                month11,
                month12,
              ],
        borderColor: "white",
        borderWidth: 2,
      },
      {
        type: "line",
        label: "Required # of client encounters",
        borderColor: "#6ddfb7",
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        data: dataGraphicPeriod === "Month" ? [39, 39, 39, 39] : Array(12).fill(5),
        datalabels: {
          // unset datalabel(numbers) on line graph
          display: false,
        },
      },
    ],
  };
  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements) => {
    if (!elements.length) return;

    console.log(elements.length);
  };

  const chartRef = useRef();

  const onClick = (event) => {
    const { current } = chartRef;

    if (!current) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(current, event));
    printElementAtEvent(getElementAtEvent(current, event));
    printElementsAtEvent(getElementsAtEvent(current, event));
  };

  return (
    <Chart
      type="bar"
      ref={chartRef}
      data={data}
      options={options}
      onClick={onClick}
    />
  );
};

export default ClientsEncountersCharts;
