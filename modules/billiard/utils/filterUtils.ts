export function extractYear(dateString: string): number | null {
  const match = dateString.match(/(\d{4})/);
  return match ? Number(match[1]) : null;
}

export function extractMonth(dateString: string): number | null {
  const match = dateString.match(/\d+\.\s*(\d+)\./);
  return match ? Number(match[1]) : null;
}
