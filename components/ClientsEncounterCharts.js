import React, { useRef } from "react";
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
  Title

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
);


const ClientsEncountersCharts = ({numberOfClientsEncounter}) => {
  const week1=numberOfClientsEncounter?.group1
  const week2=numberOfClientsEncounter?.group2
  const week3=numberOfClientsEncounter?.group3
  const week4=numberOfClientsEncounter?.group4



 const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "December 2022 - Number of new clients this month",
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of new clients",
        },
      },
    },
  };
  
  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  
 const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "number of new clients",
        backgroundColor: "rgb(45, 82, 192)",
        data: [week1, week2, week3, week4],
        borderColor: "white",
        borderWidth: 2,
      },
      {
        type: "line",
        label: "required n of clients",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        data: [5, 5, 5, 5],
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
