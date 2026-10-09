// Parses a comma-separated list of positive ids from a query parameter.
export function parseIdList(value: string | null, limit = 100) {
  if (!value) return [];
  const ids: number[] = [];
  for (const part of value.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (!/^\d+$/.test(trimmed)) continue;
    const id = Number(trimmed);
    if (!Number.isInteger(id) || id <= 0) continue;
    ids.push(id);
    if (ids.length >= limit) break;
  }
  return [...new Set(ids)];
}
