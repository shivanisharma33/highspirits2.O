"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { sendEventEnquiry } from "@/lib/actions";
import { eventTypes } from "@/lib/content/events";
import { FormMessage, Honeypot, initialFormState, Input, Select, SubmitButton, Textarea } from "./fields";

export function EventForm({ minDate }: { minDate: string }) {
  const [state, action, pending] = useActionState(sendEventEnquiry, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };
  const err = state.errors ?? {};

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-8">
      <Honeypot />
      <div className="grid gap-8 sm:grid-cols-2">
        <Input label="Full name" name="name" autoComplete="name" required error={err.name} />
        <Input label="Email address" name="email" type="email" autoComplete="email" required error={err.email} />
      </div>
      <div className="grid gap-8 sm:grid-cols-3">
        <Input label="Phone" name="phone" type="tel" autoComplete="tel" error={err.phone} />
        <Input label="Preferred date" name="date" type="date" min={minDate} />
        <Input label="Guests" name="guests" type="number" inputMode="numeric" min={1} max={500} />
      </div>
      <Select label="Event type" name="type" required defaultValue="" error={err.type}>
        <option value="" disabled>
          Choose one
        </option>
        {eventTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>
      <Textarea label="Tell us about your event" name="details" rows={4} placeholder="Occasion, menu preferences, timings, dietary needs…" />
      <FormMessage state={state} />
      <SubmitButton pending={pending} className="justify-self-start">
        Send enquiry
      </SubmitButton>
    </form>
  );
}
