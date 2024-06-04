import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

let data = [
  {
    day: 0,
    calls: 9614,
    name: "Day 0",
  },
  {
    day: 1,
    calls: 5969,
    name: "Day 1",
  },
  {
    day: 2,
    calls: 3882,
    name: "Day 2",
  },
  {
    day: 3,
    calls: 3124,
    name: "Day 3",
  },
  {
    day: 4,
    calls: 2526,
    name: "Day 4",
  },
  {
    day: 5,
    calls: 1897,
    name: "Day 5",
  },
  {
    day: 6,
    calls: 1772,
    name: "Day 6",
  },
  {
    day: 7,
    calls: 1399,
    name: "Day 7",
  },
  {
    day: 8,
    calls: 1158,
    name: "Day 8",
  },
  {
    day: 9,
    calls: 1137,
    name: "Day 9",
  },
  {
    day: 10,
    calls: 966,
    name: "Day 10",
  },
  {
    day: 11,
    calls: 911,
    name: "Day 11",
  },
  {
    day: 12,
    calls: 898,
    name: "Day 12",
  },
  {
    day: 13,
    calls: 742,
    name: "Day 13",
  },
  {
    day: 14,
    calls: 627,
    name: "Day 14",
  },
  {
    day: 15,
    calls: 603,
    name: "Day 15",
  },
  {
    day: 16,
    calls: 621,
    name: "Day 16",
  },
  {
    day: 17,
    calls: 511,
    name: "Day 17",
  },
  {
    day: 18,
    calls: 508,
    name: "Day 18",
  },
  {
    day: 19,
    calls: 426,
    name: "Day 19",
  },
  {
    day: 20,
    calls: 462,
    name: "Day 20",
  },
  {
    day: 21,
    calls: 377,
    name: "Day 21",
  },
  {
    day: 22,
    calls: 426,
    name: "Day 22",
  },
  {
    day: 23,
    calls: 364,
    name: "Day 23",
  },
  {
    day: 24,
    calls: 364,
    name: "Day 24",
  },
  {
    day: 25,
    calls: 292,
    name: "Day 25",
  },
  {
    day: 26,
    calls: 306,
    name: "Day 26",
  },
  {
    day: 27,
    calls: 285,
    name: "Day 27",
  },
  {
    day: 28,
    calls: 317,
    name: "Day 28",
  },
  {
    day: 29,
    calls: 260,
    name: "Day 29",
  },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: any;
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-minimal border border-soft rounded-md p-[10px]">
        <div className="text-primary font-bold mb-[5px]">Day {label}</div>
        <div className="text-secondary">API calls: {payload[0].value}</div>
      </div>
    );
  }

  return null;
};

export default function SavingsChart() {
  return (
    <div className="aspect-video w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            stroke="rgb(var(--color-soft))"
            strokeDasharray="3 3"
          />

          <Tooltip
            cursor={{ stroke: "rgb(var(--color-disabled))" }}
            // @ts-ignore
            content={<CustomTooltip />}
          />

          <XAxis name="Day" dataKey="day" stroke="rgb(var(--color-disabled))" />
          <YAxis
            name="Calls"
            dataKey="calls"
            stroke="rgb(var(--color-disabled))"
          />

          <Line
            name="API Calls"
            type="monotone"
            dataKey="calls"
            stroke="rgb(var(--color-primary))"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
