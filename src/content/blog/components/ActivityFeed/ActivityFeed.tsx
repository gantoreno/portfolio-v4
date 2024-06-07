type Alert = {
  name: string;
  address: string;
  timestamp: string;
  type: Status;
};

type Status = "new" | "slow" | "idle";

type StatusMapping = { [key in Status]: string };

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

const colorMapping: StatusMapping = {
  new: "text-teal-400 bg-teal-400",
  slow: "text-orange-400 bg-orange-400",
  idle: "text-red-400 bg-red-400",
};

const textMapping: StatusMapping = {
  new: "New location",
  slow: "Moving slowly",
  idle: "Idle",
};

function AlertsFeedItemStatus({ status }: { status: Status }) {
  const color = colorMapping[status];
  const text = textMapping[status];

  const className = `${color} bg-opacity-10 rounded-sm px-1 text-sm`;

  return <span className={className}>{text}</span>;
}

function AlertsFeedItem({ name, address, timestamp, type }: Alert) {
  return (
    <li className="border-b border-b-soft p-[20px] text-secondary flex gap-[20px] hover:bg-soft hover:bg-opacity-15 cursor-pointer transition-all duration-[0.1s]">
      <span>{"📍"}</span>
      <div>
        <h5 className="text-primary font-bold">
          {name} <AlertsFeedItemStatus status={type} />
        </h5>
        <p>{address}</p>
        <p className="opacity-50">{timestamp}</p>
      </div>
    </li>
  );
}

export default function ActivityFeed() {
  return (
    <div className="w-full max-w-sm bg-soft bg-opacity-10 border border-soft rounded-md mx-auto">
      <div className="p-[20px] border-b border-b-soft">
        <h4 className="text-primary font-bold">Activity feed</h4>
      </div>
      <ol className="[&>:last-child]:border-none max-h-[350px] overflow-y-scroll scroll-m-0 no-scrollbar with-shades">
        {alerts.map((alert) => (
          <AlertsFeedItem key={alert.timestamp} {...alert} />
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
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
        <span className="cursor-pointer text-primary">1</span>
        <span className="transition-colors duration-[0.1s] hover:text-secondary cursor-pointer text-disabled">
          2
        </span>
        <span className="transition-colors duration-[0.1s] hover:text-secondary cursor-pointer text-disabled">
          3
        </span>
        <span className="cursor-pointer text-primary">{"⋯"}</span>
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
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </div>
    </div>
  );
}
