import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { FormState } from "@/lib/actions";
import { cx } from "@/lib/format";

type Base = { label: string; name: string; error?: string; hint?: string; className?: string };

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="field-label">
      {label}
      {required && (
        <span aria-hidden className="text-hs-gold">
          {" "}
          *
        </span>
      )}
    </label>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
}

function Messages({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  return (
    <>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-hs-cream/50">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </>
  );
}

export function Input({ label, name, error, hint, className, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = `f-${name}`;
  return (
    <div className={cx("field", className)}>
      <Label id={id} label={label} required={rest.required} />
      <input id={id} name={name} className="field-input" aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} {...rest} />
      <Messages id={id} error={error} hint={hint} />
    </div>
  );
}

export function Textarea({ label, name, error, hint, className, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `f-${name}`;
  return (
    <div className={cx("field", className)}>
      <Label id={id} label={label} required={rest.required} />
      <textarea id={id} name={name} className="field-input" aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} {...rest} />
      <Messages id={id} error={error} hint={hint} />
    </div>
  );
}

export function Select({
  label,
  name,
  error,
  hint,
  className,
  children,
  ...rest
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  const id = `f-${name}`;
  return (
    <div className={cx("field", className)}>
      <Label id={id} label={label} required={rest.required} />
      <select id={id} name={name} className="field-input" aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} {...rest}>
        {children}
      </select>
      <Messages id={id} error={error} hint={hint} />
    </div>
  );
}

/** Hidden trap field — real people never see or fill it. */
export function Honeypot() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({ pending, children, pendingLabel = "Sending…", className }: { pending: boolean; children: ReactNode; pendingLabel?: string; className?: string }) {
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={cx("btn btn-gold disabled:cursor-wait disabled:opacity-80", className)}>
      {pending && <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-hs-green-deep/30 border-t-hs-green-deep" />}
      <span>{pending ? pendingLabel : children}</span>
    </button>
  );
}

export function FormMessage({ state }: { state: FormState }) {
  return (
    <p
      role={state.status === "error" ? "alert" : "status"}
      className={cx(
        "text-sm leading-relaxed",
        state.status === "error" && "border-l-2 border-hs-gold-soft pl-4 text-hs-gold-soft",
        state.status === "success" && "border-l-2 border-hs-gold pl-4 text-hs-cream",
        state.status === "idle" && "sr-only",
      )}
    >
      {state.message ?? ""}
    </p>
  );
}

export const initialFormState: FormState = { status: "idle" };
