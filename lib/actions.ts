"use server";

import { site } from "@/lib/site";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

type Enquiry = { name: string; email: string; phone: string; subject: string; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{8,20}$/;

function text(fd: FormData, key: string, max = 2000) {
  return String(fd.get(key) ?? "")
    .trim()
    .slice(0, max);
}

/**
 * Forwards an enquiry to the restaurant's inbox endpoint. The existing
 * highspirits.au site posts to its Strapi `contact-forms` collection with this
 * same `{ data: {...} }` shape; set ENQUIRY_ENDPOINT to that URL (or any
 * compatible endpoint) to go live. In development, submissions are logged.
 */
async function deliver(payload: Enquiry): Promise<boolean> {
  const endpoint = process.env.ENQUIRY_ENDPOINT;
  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] ENQUIRY_ENDPOINT not set — logged instead of sent:", payload);
      return true;
    }
    return false;
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

function validateContact(fd: FormData) {
  const errors: Record<string, string> = {};
  const name = text(fd, "name", 120);
  const email = text(fd, "email", 160);
  const phone = text(fd, "phone", 30);
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (phone && !PHONE.test(phone)) errors.phone = "Please enter a valid phone number.";
  return { errors, name, email, phone };
}

const failure = (): FormState => ({
  status: "error",
  message: `We couldn't send that just now. Please call us on ${site.phone.display} or email ${site.email}.`,
});

function isBot(fd: FormData) {
  return text(fd, "company").length > 0;
}

export async function sendContact(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: "success", message: "Thank you." };
  const { errors, name, email, phone } = validateContact(fd);
  const subject = text(fd, "subject", 160);
  const message = text(fd, "message");
  if (subject.length < 2) errors.subject = "Please add a subject.";
  if (message.length < 10) errors.message = "Please write a little more (at least 10 characters).";
  if (Object.keys(errors).length) return { status: "error", errors, message: "Please check the highlighted fields." };

  const ok = await deliver({ name, email, phone, subject, message });
  return ok ? { status: "success", message: "Message received — we'll respond within 24 hours." } : failure();
}

function perthToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Perth" }).format(new Date());
}

export async function requestReservation(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: "success", message: "Thank you." };
  const { errors, name, email, phone } = validateContact(fd);
  const date = text(fd, "date", 10);
  const time = text(fd, "time", 10);
  const guests = text(fd, "guests", 10);
  const occasion = text(fd, "occasion", 80);
  const experience = text(fd, "experience", 80);
  const requests = text(fd, "requests");

  if (!phone) errors.phone = "A phone number helps us confirm your table.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.date = "Please choose a date.";
  else if (date < perthToday()) errors.date = "Please choose a date from today onwards.";
  if (!/^\d{2}:\d{2}$/.test(time)) errors.time = "Please choose a time.";
  if (!guests) errors.guests = "How many guests?";
  if (Object.keys(errors).length) return { status: "error", errors, message: "Please check the highlighted fields." };

  const message = [
    `Reservation request`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Guests: ${guests}`,
    experience && `Experience: ${experience}`,
    occasion && `Occasion: ${occasion}`,
    requests && `Requests: ${requests}`,
  ]
    .filter(Boolean)
    .join("\n");

  const ok = await deliver({ name, email, phone, subject: `Table request — ${date} ${time} (${guests})`, message });
  return ok
    ? {
        status: "success",
        message: `Thank you, ${name.split(" ")[0]}. Your request for ${guests} on ${date} at ${time} is with our team — we'll confirm by phone or email shortly.`,
      }
    : failure();
}

export async function sendEventEnquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: "success", message: "Thank you." };
  const { errors, name, email, phone } = validateContact(fd);
  const type = text(fd, "type", 80);
  const date = text(fd, "date", 10);
  const guests = text(fd, "guests", 10);
  const details = text(fd, "details");
  if (!type) errors.type = "Please choose an event type.";
  if (Object.keys(errors).length) return { status: "error", errors, message: "Please check the highlighted fields." };

  const message = [`Event enquiry`, `Type: ${type}`, date && `Preferred date: ${date}`, guests && `Guests: ${guests}`, details && `Details: ${details}`]
    .filter(Boolean)
    .join("\n");
  const ok = await deliver({ name, email, phone, subject: `Event enquiry — ${type}`, message });
  return ok ? { status: "success", message: "Thank you — our events team will be in touch within 24 hours." } : failure();
}
