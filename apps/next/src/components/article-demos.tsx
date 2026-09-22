export function ActivityFeed() {
  type Alert = {
    name: string;
    address: string;
    timestamp: string;
    type: Status;
  };

  type Status = "new" | "slow" | "idle";

  const alerts: Alert[] = [
    {
      name: "Alice Smith",
      address: "123 Main St, Miami, FL 33101",
      timestamp: "10 minutes ago",
      type: "new",
    },
    {
      name: "Bob Johnson",
      address: "456 Oak St, Orlando, FL 32801",
      timestamp: "25 minutes ago",
      type: "idle",
    },
    {
      name: "Charlie Brown",
      address: "789 Elm St, Tampa, FL 33601",
      timestamp: "55 minutes ago",
      type: "slow",
    },
    {
      name: "David Williams",
      address: "101 Pine St, Jacksonville, FL 32201",
      timestamp: "An hour ago",
      type: "new",
    },
    {
      name: "Ella Garcia",
      address: "210 Cedar St, Miami, FL 33102",
      timestamp: "An hour ago",
      type: "slow",
    },
    {
      name: "Frank Davis",
      address: "333 Maple St, Orlando, FL 32802",
      timestamp: "2 hours ago",
      type: "new",
    },
    {
      name: "Grace Martinez",
      address: "444 Birch St, Tampa, FL 33602",
      timestamp: "2 hours ago",
      type: "idle",
    },
  ];

  const colorMapping: Record<Status, string> = {
    new: "text-teal-400 bg-teal-400/10",
    slow: "text-orange-400 bg-orange-400/10",
    idle: "text-red-400 bg-red-400/10",
  };

  const textMapping: Record<Status, string> = {
    new: "New location",
    slow: "Moving slowly",
    idle: "Idle",
  };

  return (
    <>
      <div className="w-full max-w-sm bg-soft/10 border border-soft rounded-md mx-auto">
        <div className="p-[20px] border-b border-b-soft">
          <h4 className="text-primary font-bold">Activity feed</h4>
        </div>
        <ol className="*:last:border-none max-h-[350px] overflow-y-scroll scroll-m-0 no-scrollbar with-shades">
          {alerts.map(({ name, address, timestamp, type }) => (
            <li
              key={name}
              className="border-b border-b-soft p-[20px] text-secondary flex gap-[20px] hover:bg-soft/15 cursor-pointer transition-all duration-100"
            >
              <span>📍</span>
              <div>
                <h5 className="text-primary font-bold">
                  {name}{" "}
                  <span
                    className={`${colorMapping[type]} rounded-sm px-1 text-sm`}
                  >
                    {textMapping[type]}
                  </span>
                </h5>
                <p>{address}</p>
                <p className="opacity-50">{timestamp}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="border-t border-t-soft p-[20px] flex justify-center gap-[20px] select-none">
          <svg
            className="text-disabled cursor-not-allowed"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 6l-6 6l6 6"></path>
          </svg>
          <span className="cursor-pointer text-primary">1</span>
          <span className="transition-colors duration-100 hover:text-secondary cursor-pointer text-disabled">
            2
          </span>
          <span className="transition-colors duration-100 hover:text-secondary cursor-pointer text-disabled">
            3
          </span>
          <span className="cursor-pointer text-primary">⋯</span>
          <svg
            className="text-primary cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 6l6 6l-6 6"></path>
          </svg>
        </div>
      </div>
    </>
  );
}
export function WalkingMeter() {
  return (
    <>
      <div className="mx-auto w-fit flex gap-[20px]">
        <span className="text-primary font-bold">📍 A</span>
        <div className="w-[128px]">
          <div className="relative py-[2.5px] bg-soft/10 rounded-lg border border-soft mb-[20px]">
            <span className="subject" id="subject-1">
              ️🚶‍♂️
            </span>
          </div>
          <div className="relative py-[2.5px] bg-soft/10 rounded-lg border border-soft">
            <span className="subject" id="subject-2">
              🧍‍♂️
            </span>
          </div>
        </div>
        <span className="text-primary font-bold">📍 B</span>
      </div>
    </>
  );
}
export function SavingsChart() {
  const data = [
    { day: 0, calls: 9614 },
    { day: 1, calls: 5969 },
    { day: 2, calls: 3882 },
    { day: 3, calls: 3124 },
    { day: 4, calls: 2526 },
    { day: 5, calls: 1897 },
    { day: 6, calls: 1772 },
    { day: 7, calls: 1399 },
    { day: 8, calls: 1158 },
    { day: 9, calls: 1137 },
    { day: 10, calls: 966 },
    { day: 11, calls: 911 },
    { day: 12, calls: 898 },
    { day: 13, calls: 742 },
    { day: 14, calls: 627 },
    { day: 15, calls: 603 },
    { day: 16, calls: 621 },
    { day: 17, calls: 511 },
    { day: 18, calls: 508 },
    { day: 19, calls: 426 },
    { day: 20, calls: 462 },
    { day: 21, calls: 377 },
    { day: 22, calls: 426 },
    { day: 23, calls: 364 },
    { day: 24, calls: 364 },
    { day: 25, calls: 292 },
    { day: 26, calls: 306 },
    { day: 27, calls: 285 },
    { day: 28, calls: 317 },
    { day: 29, calls: 260 },
  ];

  const width = 640;
  const height = 360;
  const margin = { top: 16, right: 16, bottom: 36, left: 34 };
  const maxCalls = 10_000;

  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const scaleX = (day: number) => margin.left + (day / 29) * plotWidth;
  const scaleY = (calls: number) =>
    margin.top + (1 - calls / maxCalls) * plotHeight;

  const points = data.map(({ day, calls }) => ({
    day,
    calls,
    x: scaleX(day),
    y: scaleY(calls),
  }));

  function createMonotonePath(values: typeof points) {
    if (values.length < 2) return "";

    const slopes = values.slice(0, -1).map((point, index) => {
      const next = values[index + 1];
      return (next.y - point.y) / (next.x - point.x);
    });

    const tangents = values.map((point, index) => {
      if (index === 0) return slopes[0];
      if (index === values.length - 1) return slopes[slopes.length - 1];

      const previousSlope = slopes[index - 1];
      const nextSlope = slopes[index];

      if (previousSlope * nextSlope <= 0) return 0;

      const previousWidth = point.x - values[index - 1].x;
      const nextWidth = values[index + 1].x - point.x;
      const previousWeight = 2 * nextWidth + previousWidth;
      const nextWeight = nextWidth + 2 * previousWidth;

      return (
        (previousWeight + nextWeight) /
        (previousWeight / previousSlope + nextWeight / nextSlope)
      );
    });

    return values.slice(1).reduce((path, point, index) => {
      const previous = values[index];
      const distance = point.x - previous.x;

      return `${path} C ${previous.x + distance / 3} ${previous.y + (tangents[index] * distance) / 3}, ${point.x - distance / 3} ${point.y - (tangents[index + 1] * distance) / 3}, ${point.x} ${point.y}`;
    }, `M ${values[0].x} ${values[0].y}`);
  }

  const linePath = createMonotonePath(points);
  const xTicks = [0, 5, 10, 15, 20, 25, 29];
  const yTicks = [0, 2500, 5000, 7500, 10_000];

  const formatAxisValue = (value: number) =>
    value >= 1000 ? `${value / 1000}K` : value.toString();

  const tooltipWidth = 128;
  const tooltipHeight = 50;
  const hoverWidth = plotWidth / (data.length - 1);

  const clamp = (value: number, minimum: number, maximum: number) =>
    Math.min(Math.max(value, minimum), maximum);

  return (
    <>
      <figure className="w-full mb-[20px]">
        <svg
          className="block w-full h-auto"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby="savings-chart-title savings-chart-description"
        >
          <title id="savings-chart-title">API calls by day</title>
          <desc id="savings-chart-description">
            API calls decrease from 9,614 on day 0 to 260 on day 29.
          </desc>

          <g aria-hidden="true">
            {yTicks.map((tick) => (
              <line
                key={tick}
                x1={margin.left}
                x2={width - margin.right}
                y1={scaleY(tick)}
                y2={scaleY(tick)}
                className="chart-grid"
              />
            ))}
            {xTicks.map((tick) => (
              <line
                key={tick}
                x1={scaleX(tick)}
                x2={scaleX(tick)}
                y1={margin.top}
                y2={height - margin.bottom}
                className="chart-grid"
              />
            ))}
          </g>

          <g aria-hidden="true">
            <line
              x1={margin.left}
              x2={margin.left}
              y1={margin.top}
              y2={height - margin.bottom}
              className="chart-axis"
            ></line>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={height - margin.bottom}
              y2={height - margin.bottom}
              className="chart-axis"
            ></line>

            {yTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={margin.left}
                  x2={margin.left + 5}
                  y1={scaleY(tick)}
                  y2={scaleY(tick)}
                  className="chart-axis"
                />
                <text
                  x={margin.left - 4}
                  y={scaleY(tick)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="chart-label"
                >
                  {formatAxisValue(tick)}
                </text>
              </g>
            ))}

            {xTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={scaleX(tick)}
                  x2={scaleX(tick)}
                  y1={height - margin.bottom}
                  y2={height - margin.bottom + 5}
                  className="chart-axis"
                />
                <text
                  x={scaleX(tick)}
                  y={height - margin.bottom + 18}
                  textAnchor="middle"
                  className="chart-label"
                >
                  {tick}
                </text>
              </g>
            ))}
          </g>

          <path d={linePath} className="chart-line" aria-hidden="true"></path>

          {points.map(({ day, calls, x, y }) => {
            const tooltipX = clamp(
              -tooltipWidth / 2,
              -x + 2,
              width - x - tooltipWidth - 2,
            );
            const tooltipY = y < margin.top + tooltipHeight + 8 ? 10 : -60;
            const hoverX = day === 0 ? 0 : -hoverWidth / 2;
            const pointHoverWidth =
              day === 0 || day === data.length - 1
                ? hoverWidth / 2
                : hoverWidth;

            return (
              <g
                key={day}
                className="data-point"
                transform={`translate(${x} ${y})`}
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`Day ${day}: ${calls.toLocaleString()} API calls`}
              >
                <line
                  x1="0"
                  x2="0"
                  y1={margin.top - y}
                  y2={height - margin.bottom - y}
                  className="chart-crosshair"
                  aria-hidden="true"
                />
                <rect
                  x={hoverX}
                  y={margin.top - y}
                  width={pointHoverWidth}
                  height={plotHeight}
                  className="chart-hover-target"
                  aria-hidden="true"
                />
                <circle r="3" className="chart-dot" />
                <g
                  className="chart-tooltip"
                  transform={`translate(${tooltipX} ${tooltipY})`}
                  aria-hidden="true"
                >
                  <rect
                    width={tooltipWidth}
                    height={tooltipHeight}
                    rx="5"
                    className="chart-tooltip-background"
                  />
                  <text x="9" y="19" className="chart-tooltip-title">
                    Day {day}
                  </text>
                  <text x="9" y="38" className="chart-tooltip-value">
                    API calls: {calls.toLocaleString()}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
        <figcaption className="text-center text-disabled font-serif italic">
          Figure D: API usage decrease over time.
        </figcaption>
      </figure>
    </>
  );
}
