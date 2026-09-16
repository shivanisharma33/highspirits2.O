"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { sendContact } from "@/lib/actions";
import { FormMessage, Honeypot, initialFormState, Input, SubmitButton, Textarea } from "./fields";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  // Submit via a transition (not the `action` prop) so fields keep their values on validation errors.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };

  const err = state.errors ?? {};

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-8" aria-describedby="contact-form-note">
      <Honeypot />
      <div className="grid gap-8 sm:grid-cols-2">
        <Input label="Full name" name="name" autoComplete="name" required error={err.name} />
        <Input label="Email address" name="email" type="email" autoComplete="email" required error={err.email} />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Input label="Phone number" name="phone" type="tel" autoComplete="tel" error={err.phone} />
        <Input label="Subject" name="subject" required error={err.subject} placeholder="Booking, feedback, events…" />
      </div>
      <Textarea label="Your message" name="message" required error={err.message} rows={5} />
      <FormMessage state={state} />
      <div className="flex flex-wrap items-center justify-between gap-5">
        <p id="contact-form-note" className="text-xs text-hs-cream/55">
          Fields marked * are required. We reply within 24 hours.
        </p>
        <SubmitButton pending={pending}>Send message</SubmitButton>
      </div>
    </form>
  );
}
