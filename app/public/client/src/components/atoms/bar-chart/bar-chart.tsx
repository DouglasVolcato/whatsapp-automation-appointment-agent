import { Chart } from "primereact/chart";

type Props = {
  labels: string[];
  data: {
    label: string;
    backgroundColor?: string;
    borderColor?: string;
    values: number[];
    type: "line" | "bar";
  }[];
};

export function BarChart({ labels, data }: Props) {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

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

  return (
    <Chart
      type="line"
      data={{
        labels: labels,
        datasets: data.map((item, index) => ({
          label: item.label,
          backgroundColor: item.backgroundColor || generateColor(index),
          borderColor: item.borderColor || generateColor(index),
          data: item.values,
          borderWidth: 2,
          tension: 0.4,
          type: item.type,
        })),
      }}
      options={{
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      }}
    />
  );
}
