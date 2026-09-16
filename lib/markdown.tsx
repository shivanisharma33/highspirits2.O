import type { ReactNode } from "react";

/**
 * Minimal renderer for the markdown subset used by journal entries
 * (## headings, * lists, --- rules, paragraphs, **bold**). Avoids shipping a
 * markdown dependency for a handful of articles.
 */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  );
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n{2,}/);
  const out: ReactNode[] = [];

  blocks.forEach((block, i) => {
    const b = block.trim();
    if (b === "---") {
      out.push(<hr key={i} className="gold-rule my-14 border-0" />);
    } else if (b.startsWith("## ")) {
      out.push(
        <h2 key={i} className="font-display mt-4 mb-6 text-h3 text-hs-green">
          {inline(b.slice(3))}
        </h2>,
      );
    } else if (b.split("\n").every((l) => l.trim().startsWith("* "))) {
      out.push(
        <ul key={i} className="my-8 grid gap-3 border-l border-hs-gold-deep/30 pl-6">
          {b.split("\n").map((l, j) => (
            <li key={j} className="relative text-hs-text before:absolute before:-left-[1.72rem] before:top-[0.72em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-hs-gold-deep">
              {inline(l.trim().slice(2))}
            </li>
          ))}
        </ul>,
      );
    } else {
      out.push(
        <p key={i} className="my-6 text-lead text-hs-text/85">
          {inline(b.replace(/\n/g, " "))}
        </p>,
      );
    }
  });

  return <>{out}</>;
}
