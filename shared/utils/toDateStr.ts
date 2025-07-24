export function toDate(ts: string | { seconds: number; nanoseconds?: number; toDate?: () => Date }): Date {
  if (typeof ts === "string") return new Date(ts);
  if (typeof ts === "object" && typeof ts.toDate === "function")
    return ts.toDate();
  if (typeof ts === "object" && typeof ts.seconds === "number")
    return new Date(ts.seconds * 1000);
  return new Date(0);
}

export function toDateStr(ts: string | { seconds: number; nanoseconds?: number; toDate?: () => Date }): string {
  return toDate(ts).toLocaleDateString();
}