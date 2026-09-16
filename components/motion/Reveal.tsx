import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Declarative scroll reveals. These are server components: they only emit
 * `data-reveal` attributes and CSS variables; `RevealRoot` switches them on.
 */
type RevealKind = "fade-up" | "fade" | "scale" | "clip" | "clip-x" | "image";

export type RevealProps = {
  as?: ElementType;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "data-cursor"?: string;
};

function vars(delay?: number, duration?: number, style?: CSSProperties) {
  return {
    ...(delay ? { "--delay": `${delay}s` } : null),
    ...(duration ? { "--dur": `${duration}s` } : null),
    ...style,
  } as CSSProperties;
}

function create(kind: RevealKind, displayName: string) {
  function Reveal({ as, delay, duration, className, style, children, ...rest }: RevealProps) {
    const Tag = as ?? "div";
    return (
      <Tag data-reveal={kind} className={className} style={vars(delay, duration, style)} {...rest}>
        {children}
      </Tag>
    );
  }
  Reveal.displayName = displayName;
  return Reveal;
}

export const FadeUp = create("fade-up", "FadeUp");
export const FadeIn = create("fade", "FadeIn");
export const ScaleReveal = create("scale", "ScaleReveal");
/** Wipes upward from the bottom edge; nested images settle from a slight zoom. */
export const ClipReveal = create("clip", "ClipReveal");
export const ClipRevealX = create("clip-x", "ClipRevealX");
/** Editorial photograph reveal: the frame opens from an inset crop. */
export const ImageReveal = create("image", "ImageReveal");

type TextRevealProps = {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  id?: string;
};

/** Line-by-line masked text reveal for editorial headlines. */
export function TextReveal({ as, lines, className, lineClassName, delay, id }: TextRevealProps) {
  const Tag = as ?? "h2";
  return (
    <Tag data-reveal="text" id={id} className={className} style={vars(delay)}>
      {lines.map((line, i) => (
        <span key={i} className="tr-line" style={{ "--i": i } as CSSProperties}>
          <span className={lineClassName}>{line}</span>{" "}
        </span>
      ))}
    </Tag>
  );
}

/** Masked line animation used above the fold (CSS keyframes, no observer). */
export function IntroLines({
  as,
  lines,
  className,
  lineClassName,
  start = 0.3,
  step = 0.12,
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  start?: number;
  step?: number;
  id?: string;
}) {
  const Tag = as ?? "h1";
  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <span key={i} className="intro-line">
          <span className={lineClassName} style={{ "--d": `${start + i * step}s` } as CSSProperties}>
            {line}
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}
