import "./WalkingMeter.scss";

export default function WalkingMeter() {
  return (
    <div className="mx-auto w-fit flex gap-[20px]">
      <span className="text-primary font-bold">{"📍 A"}</span>
      <div className="w-[128px]">
        <div className="relative py-[2.5px] bg-[var(--astro-code-color-background)] rounded-lg border border-disabled border-dashed border-opacity-50 mb-[20px]">
          <span className="subject" id="subject-1">
            {"🚶🏻‍♂️‍➡️"}
          </span>
        </div>
        <div className="relative py-[2.5px] bg-[var(--astro-code-color-background)] rounded-lg border border-disabled border-dashed border-opacity-50">
          <span className="subject" id="subject-2">
            {"🧍🏻‍♂️"}
          </span>
        </div>
      </div>
      <span className="text-primary font-bold">{"📍 B"}</span>
    </div>
  );
}
