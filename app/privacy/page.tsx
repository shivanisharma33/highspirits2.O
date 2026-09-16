import type { Metadata } from "next";
import { LegalContact, LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How High Spirits collects, uses and protects the personal information you share with us.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      sections={[
        {
          title: "Information We Collect",
          intro:
            "At High Spirits, we collect information that you provide directly to us when making reservations, contacting us, or using our services. This may include your name, email address, phone number, and dining preferences.",
        },
        {
          title: "How We Use Your Information",
          intro: "We use the information we collect to:",
          items: [
            "Process and confirm your reservations",
            "Communicate with you about your bookings",
            "Send you promotional materials (with your consent)",
            "Improve our services and customer experience",
            "Comply with legal obligations",
          ],
        },
        {
          title: "Data Security",
          intro:
            "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
        },
        {
          title: "Your Rights",
          intro: "You have the right to:",
          items: [
            "Access your personal information",
            "Correct inaccurate data",
            "Request deletion of your data",
            "Opt out of marketing communications",
            "Lodge a complaint with a supervisory authority",
          ],
        },
        {
          title: "Contact Us",
          intro: "If you have any questions about this Privacy Policy, please contact us at:",
          body: <LegalContact />,
        },
      ]}
    />
  );
}
