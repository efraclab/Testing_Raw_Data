export function parseDateSafe(raw: string): Date | null {
  const s = raw.trim();

  if (/^\d{4}[-/]/.test(s)) {
    const d = new Date(s.replace(" ", "T"));
    return isNaN(d.getTime()) ? null : d;
  }

  const m = s.match(
    /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:[T ](\d{2}:\d{2}(?::\d{2})?))?/,
  );

  if (m) {
    const iso = `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
    const d = new Date(m[4] ? `${iso}T${m[4]}` : `${iso}T00:00:00`);
    return isNaN(d.getTime()) ? null : d;
  }

  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

export function formatDate(raw: string | null | undefined): string {
  if (!raw) return "N/A";

  const d = parseDateSafe(String(raw));
  if (!d) return String(raw).trim() || "N/A";

  const DD = String(d.getDate()).padStart(2, "0");
  const MM = String(d.getMonth() + 1).padStart(2, "0");

  return `${DD}/${MM}/${d.getFullYear()}`;
}
