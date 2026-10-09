export function bnNumber(value: number | string) {
  const n = typeof value === "number" ? value : Number(String(value).replace(/[^\d.-]/g, ""));
  return (Number.isFinite(n) ? n : 0).toLocaleString("bn-BD", { maximumFractionDigits: 2 });
}
export function money(value: number | string) { return `${bnNumber(value)} টাকা`; }
export function todayBangla() {
  return new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
}