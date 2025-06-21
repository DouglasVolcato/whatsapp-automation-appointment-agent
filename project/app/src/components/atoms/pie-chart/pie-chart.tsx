import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

type Props = {
  data: {
    label: string;
    value: number;
    backgroundColor?: string;
    hoverBackgroundColor?: string;
  }[];
};

export function PieChart({ data }: Props) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const colorsAlreadyUsed: string[] = [];
  const colorOptions: string[] = [
    "green",
    "blue",
    "red",
    "orange",
    "purple",
    "pink",
    "yellow",
    "cyan",
    "teal",
    "lime",
    "indigo",
    "violet",
    "brown",
    "gray",
    "lightblue",
    "lightgreen",
    "lightcoral",
    "lightpink",
    "lightyellow",
    "lightcyan",
    "lightteal",
    "lightlime",
    "lightindigo",
    "lightviolet",
    "lightbrown",
    "lightgray",
    "darkblue",
    "darkgreen",
    "darkred",
    "darkorange",
    "darkpurple",
    "darkpink",
    "darkyellow",
    "darkcyan",
    "darkteal",
    "darklime",
    "darkindigo",
    "darkviolet",
    "darkbrown",
    "darkgray",
  ]

  const generateColor = (index: number) => {
    if (index < colorOptions.length) {
      return colorOptions[index];
    }
    let color;
    do {
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } while (colorsAlreadyUsed.includes(color));
    colorsAlreadyUsed.push(color);
    return color;
  };

  useEffect(() => {
    const chartData = {
      labels: data.map((item) => item.label),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: data.map((item, index) => item.backgroundColor || generateColor(index)),
          hoverBackgroundColor: data.map((item, index) => item.hoverBackgroundColor || generateColor(index)),
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(chartData);
    setChartOptions(options);
  }, [data]);

  return (
    <Chart
      type="pie"
      data={chartData}
      options={chartOptions}
      className="w-full md:w-30rem"
    />
  );
}
