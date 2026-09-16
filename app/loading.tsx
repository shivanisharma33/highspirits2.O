import { LogoMark } from "@/components/ui/Logo";

export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-[100svh] place-items-center bg-hs-green-dark">
      <div className="flex flex-col items-center gap-8">
        <LogoMark className="w-9 animate-pulse" />
        <div className="relative h-px w-40 overflow-hidden bg-hs-cream/15">
          <span className="absolute inset-0 -translate-x-full bg-hs-gold [animation:hs-shimmer_1.4s_var(--ease-inout)_infinite]" />
        </div>
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
