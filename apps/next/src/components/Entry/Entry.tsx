import { Link } from "@/components/Link/Link";
import { Paragraph } from "@/components/Paragraph/Paragraph";
import { isNew } from "@/lib/content";
export function Entry({
  title,
  description,
  href,
  date,
  showDate = false,
  external = false,
  separated = true,
}: {
  title: string;
  description: string;
  href: string;
  date?: Date;
  showDate?: boolean;
  external?: boolean;
  separated?: boolean;
}) {
  return (
    <div
      className={`${separated ? "mt-5 first:mt-0 pt-5 first:pt-0 border-soft first:border-0 border-t" : ""} ${showDate ? "flex justify-between gap-5 mb-5" : ""}`}
    >
      <div>
        <span className="block mb-[5px]">
          {date && isNew(date) ? "✨ " : ""}
          <Link href={href} target={external ? "_blank" : undefined}>
            {title}
          </Link>
        </span>
        <Paragraph className={showDate ? "mb-0!" : ""}>{description}</Paragraph>
      </div>
      {showDate && date && (
        <time dateTime={date.toISOString()} className="text-disabled">
          {String(date.getUTCMonth() + 1).padStart(2, "0")}/
          {String(date.getUTCDate()).padStart(2, "0")}
        </time>
      )}
    </div>
  );
}
