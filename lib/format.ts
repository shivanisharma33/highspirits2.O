export function formatPrice(value: number | string) {
  if (typeof value === "string") {
    if (value.startsWith("$")) return value;
    if (value.includes("/")) {
      return value
        .split("/")
        .map((part) => {
          const trimmed = part.trim();
          const n = Number(trimmed);
          return isNaN(n) ? trimmed : `$${n.toFixed(2)}`;
        })
        .join(" / ");
    }
    const num = Number(value);
    return isNaN(num) ? value : `$${num.toFixed(2)}`;
  }
  return `$${value.toFixed(2)}`;
}

export function formatDate(iso: string, style: "long" | "short" = "long") {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
    timeZone: "Australia/Perth",
  }).format(new Date(iso));
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
