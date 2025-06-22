```tsx
<BarChart
  labels={["January", "February", "March", "April", "May", "June", "July"]}
  data={[
    {
      label: "Dataset 1",
      backgroundColor: "white",
      borderColor: "green",
      values: [50, 25, 12, 48, 56, 76, 42],
      type: "line",
    },
    {
      label: "Dataset 2",
      backgroundColor: "green",
      borderColor: "white",
      values: [21, 84, 24, 75, 37, 65, 34],
      type: "bar",
    },
    {
      label: "Dataset 3",
      backgroundColor: "red",
      borderColor: "white",
      values: [21, 84, 24, 75, 37, 65, 34],
      type: "bar",
    },
  ]}
/>
```