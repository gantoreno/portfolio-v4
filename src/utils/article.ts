const SECONDS_PER_DAY = 60 * 60 * 24;

export function isNew(timestamp: Date) {
  const then = Number(timestamp) / 1000;
  const now = Number(Date.now()) / 1000;

  const differenceInDays = (now - then) / SECONDS_PER_DAY;

  console.log(differenceInDays);

  return differenceInDays >= 0 && differenceInDays < 7;
}
