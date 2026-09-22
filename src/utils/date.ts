export function getDefaultDate() {
  const [month, day, year] = new Date().toLocaleDateString().split("/");

  return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
}
