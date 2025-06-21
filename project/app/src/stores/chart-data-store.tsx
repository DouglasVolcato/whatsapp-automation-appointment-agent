import { create } from "zustand";

type Store = {
  chartData: {
    label: string;
    value: number;
    backgroundColor: string;
    hoverBackgroundColor: string;
  }[];
  changeData: () => void;
};

export const useChartDataStore = create<Store>()((set) => ({
  chartData: [
    {
      label: "A",
      value: 300,
      backgroundColor: "green",
      hoverBackgroundColor: "yellow",
    },
    {
      label: "B",
      value: 50,
      backgroundColor: "blue",
      hoverBackgroundColor: "yellow",
    },
    {
      label: "C",
      value: 100,
      backgroundColor: "red",
      hoverBackgroundColor: "yellow",
    },
  ],
  changeData: () =>
    set(() => ({
      chartData: [
        {
          label: "A",
          value: Math.floor(Math.random() * 100),
          backgroundColor: "green",
          hoverBackgroundColor: "yellow",
        },
        {
          label: "B",
          value: Math.floor(Math.random() * 100),
          backgroundColor: "blue",
          hoverBackgroundColor: "yellow",
        },
        {
          label: "C",
          value: Math.floor(Math.random() * 100),
          backgroundColor: "red",
          hoverBackgroundColor: "yellow",
        },
      ],
    })),
}));
