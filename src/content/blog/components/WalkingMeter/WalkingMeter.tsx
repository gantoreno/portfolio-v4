import "./WalkingMeter.scss";

export default function WalkingMeter() {
  return (
    <div className="mx-auto w-fit flex gap-[20px]">
      <span className="text-primary font-bold">{"📍 A"}</span>
      <div className="w-[128px]">
        <div className="relative py-[2.5px] bg-soft/10 rounded-lg border border-soft mb-[20px]">
          <span className="subject" id="subject-1">
            {"️🚶‍♂️"}
          </span>
        </div>
        <div className="relative py-[2.5px] bg-soft/10 rounded-lg border border-soft">
          <span className="subject" id="subject-2">
            {"🧍‍♂️"}
          </span>
        </div>
      </div>
      <span className="text-primary font-bold">{"📍 B"}</span>
    </div>
  );
}
