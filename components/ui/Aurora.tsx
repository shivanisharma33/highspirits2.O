import { cx } from "@/lib/format";

/**
 * Slow-drifting emerald and gold light behind glass surfaces, so the
 * backdrop blur has colour to catch. The parent must be positioned and
 * create a stacking context (`isolate` or `.grain`).
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <span className="aurora-orb" />
      <span className="aurora-orb" />
      <span className="aurora-orb" />
    </div>
  );
}
