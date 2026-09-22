import type { Metadata } from "next";
import { LegalContact, LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Reservation, cancellation, dining and payment terms for High Spirits, Bunbury.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      sections={[
        {
          title: "Reservation Policy",
          intro: "By making a reservation at High Spirits, you agree to the following terms:",
          items: [
            "Reservations are confirmed upon receipt of confirmation email",
            "A valid credit card may be required to secure bookings for large parties",
            "Please arrive within 15 minutes of your reservation time",
            "Tables are held for 15 minutes past reservation time",
          ],
        },
        {
          title: "Cancellation Policy",
          intro: "We understand that plans change. Please note:",
          items: [
            "Cancellations must be made at least 24 hours in advance",
            "No-shows or late cancellations may incur a fee",
            "For parties of 8 or more, 48 hours notice is required",
            "Cancellation fees apply to special events and private bookings",
          ],
        },
        {
          title: "Dining Guidelines",
          intro: "To ensure an exceptional experience for all guests:",
          items: [
            "Smart casual dress code is encouraged",
            "Children are welcome; high chairs available upon request",
            "Please inform us of any dietary restrictions when booking",
            "We accommodate special occasions with advance notice",
          ],
        },
        {
          title: "Payment Terms",
          intro:
            "We accept all major credit cards, debit cards and cash. Gratuity is not included in menu prices and is at your discretion. For large parties and events, payment terms will be discussed during booking.",
        },
        {
          title: "Liability",
          intro:
            "While we take every care with food preparation and service, High Spirits cannot be held liable for allergic reactions or dietary issues not communicated to our staff. Please inform us of any allergies or dietary restrictions.",
        },
        {
          title: "Changes to Terms",
          intro: "High Spirits reserves the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.",
        },
        {
          title: "Contact",
          intro: "For questions about these terms, please contact:",
          body: <LegalContact />,
        },
      ]}
    />
  );
}
