"use client";

import Link from "next/link";
import { startTransition, useActionState, useMemo, useRef, useState, type FormEvent } from "react";
import { requestReservation } from "@/lib/actions";
import { cx } from "@/lib/format";
import { site } from "@/lib/site";
import { FormMessage, Honeypot, initialFormState, Input, Select, SubmitButton, Textarea } from "./fields";

const DINNER = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];
const LUNCH = ["11:30", "12:00", "12:30", "13:00", "13:30", "14:00"];
const GUESTS = ["1", "2", "3", "4", "5", "6", "7", "8+"];

export const experienceOptions = [
  { value: "", label: "À la carte dinner" },
  { value: "buffet", label: "Evening buffet" },
  { value: "lunch", label: "Lunch" },
  { value: "degustation", label: "Degustation journey" },
  { value: "chefs-table", label: "Chef's Table" },
];

function label12(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** Lunch runs Wednesday – Friday; dinner every day. */
function slotsFor(date: string) {
  if (!date) return { lunch: [] as string[], dinner: DINNER };
  const day = new Date(`${date}T12:00:00`).getDay();
  return { lunch: day >= 3 && day <= 5 ? LUNCH : [], dinner: DINNER };
}

function prettyDate(date: string) {
  if (!date) return "Choose a date";
  return new Intl.DateTimeFormat("en-AU", { weekday: "long", day: "numeric", month: "long" }).format(new Date(`${date}T12:00:00`));
}

function Chip({ name, value, checked, onChange, children }: { name: string; value: string; checked: boolean; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label
      className={cx(
        "relative inline-flex min-h-11 min-w-[3.25rem] cursor-pointer items-center justify-center rounded-full border px-4 text-sm transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hs-gold",
        checked ? "border-hs-gold bg-hs-gold text-hs-green-deep" : "border-hs-cream/20 text-hs-cream/85 hover:border-hs-gold/70",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
      {children}
    </label>
  );
}

export function ReservationForm({ minDate, initialExperience = "" }: { minDate: string; initialExperience?: string }) {
  const [state, action, pending] = useActionState(requestReservation, initialFormState);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [experience, setExperience] = useState(experienceOptions.some((o) => o.value === initialExperience) ? initialExperience : "");
  const formRef = useRef<HTMLFormElement>(null);

  const slots = useMemo(() => slotsFor(date), [date]);
  const allSlots = [...slots.lunch, ...slots.dinner];
  const selectedTime = allSlots.includes(time) ? time : "";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };
  const err = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="glass p-10 md:p-14">
        <p className="eyebrow">Request received</p>
        <p className="font-display mt-6 text-h3">Your table is almost set.</p>
        <p className="mt-5 max-w-lg leading-relaxed text-hs-cream/80">{state.message}</p>
        <p className="mt-5 text-sm text-hs-cream/60">
          Need to change something? Call{" "}
          <a href={site.phone.href} className="link-line text-hs-gold">
            {site.phone.display}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/menu" className="btn btn-gold">
            <span>Browse the menu</span>
          </Link>
          <Link href="/" className="btn btn-ghost">
            <span>Back home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_17rem]">
      <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-12" aria-label="Reservation request">
        <Honeypot />

        <fieldset className="grid gap-8">
          <legend className="font-display mb-8 flex items-center gap-4 text-2xl">
            <span className="text-sm text-hs-gold">01</span> When would you like to join us?
          </legend>
          <div className="grid gap-8 sm:grid-cols-2">
            <Input label="Date" name="date" type="date" required min={minDate} value={date} onChange={(e) => setDate(e.target.value)} error={err.date} />
            <Select label="Experience" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)}>
              {experienceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>

          <div role="radiogroup" aria-labelledby="time-label" aria-describedby={err.time ? "time-error" : undefined} className="grid gap-4">
            <p id="time-label" className="field-label">
              Time <span aria-hidden className="text-hs-gold">*</span>
            </p>
            {slots.lunch.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-16 text-[0.65rem] uppercase tracking-[0.2em] text-hs-cream/50">Lunch</span>
                {slots.lunch.map((t) => (
                  <Chip key={t} name="time" value={t} checked={selectedTime === t} onChange={setTime}>
                    {label12(t)}
                  </Chip>
                ))}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-16 text-[0.65rem] uppercase tracking-[0.2em] text-hs-cream/50">Dinner</span>
              {slots.dinner.map((t) => (
                <Chip key={t} name="time" value={t} checked={selectedTime === t} onChange={setTime}>
                  {label12(t)}
                </Chip>
              ))}
            </div>
            {!date && <p className="text-xs text-hs-cream/50">Lunch is served Wednesday to Friday — pick a date to see lunch times.</p>}
            {err.time && (
              <p id="time-error" className="field-error">
                {err.time}
              </p>
            )}
          </div>

          <div role="radiogroup" aria-labelledby="guests-label" className="grid gap-4">
            <p id="guests-label" className="field-label">
              Guests <span aria-hidden className="text-hs-gold">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {GUESTS.map((g) => (
                <Chip key={g} name="guests" value={g} checked={guests === g} onChange={setGuests}>
                  {g}
                </Chip>
              ))}
            </div>
            {guests === "8+" && <p className="text-xs text-hs-gold-pale">For parties of 8 or more, 48 hours notice is required. For larger celebrations, see our events.</p>}
          </div>
        </fieldset>

        <fieldset className="grid gap-8">
          <legend className="font-display mb-8 flex items-center gap-4 text-2xl">
            <span className="text-sm text-hs-gold">02</span> Your details
          </legend>
          <div className="grid gap-8 sm:grid-cols-2">
            <Input label="Full name" name="name" autoComplete="name" required error={err.name} />
            <Input label="Phone" name="phone" type="tel" autoComplete="tel" required error={err.phone} />
          </div>
          <Input label="Email" name="email" type="email" autoComplete="email" required error={err.email} />
        </fieldset>

        <fieldset className="grid gap-8">
          <legend className="font-display mb-8 flex items-center gap-4 text-2xl">
            <span className="text-sm text-hs-gold">03</span> Anything we should know?
          </legend>
          <Select label="Occasion" name="occasion" defaultValue="">
            <option value="">No particular occasion</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Date night</option>
            <option>Business dinner</option>
            <option>Family celebration</option>
          </Select>
          <Textarea label="Special requests" name="requests" rows={3} placeholder="Allergies, dietary requirements, high chair, seating preferences…" />
        </fieldset>

        <FormMessage state={state} />
        <div className="flex flex-wrap items-center gap-6">
          <SubmitButton pending={pending} pendingLabel="Sending request…">
            Request my table
          </SubmitButton>
          <p className="text-xs text-hs-cream/55">We confirm every booking personally by phone or email.</p>
        </div>
      </form>

      {/* Live summary */}
      <aside aria-label="Your booking" className="hidden xl:block">
        <div className="glass sticky top-32 p-7">
          <p className="eyebrow eyebrow--plain">Your table</p>
          <dl className="mt-6 grid gap-5 text-sm">
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-hs-cream/50">Date</dt>
              <dd className="font-display mt-1 text-xl">{prettyDate(date)}</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-hs-cream/50">Time</dt>
              <dd className="font-display mt-1 text-xl">{selectedTime ? label12(selectedTime) : "—"}</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-hs-cream/50">Guests</dt>
              <dd className="font-display mt-1 text-xl">{guests}</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-hs-cream/50">Experience</dt>
              <dd className="font-display mt-1 text-xl">{experienceOptions.find((o) => o.value === experience)?.label}</dd>
            </div>
          </dl>
          <div className="gold-rule my-6" />
          <p className="text-xs leading-relaxed text-hs-cream/60">Tables are held for 15 minutes past the reservation time.</p>
        </div>
      </aside>
    </div>
  );
}
