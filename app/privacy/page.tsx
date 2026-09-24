import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
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
      lastUpdated="9/24/2026"
      sections={[
        {
          title: "Information We Collect",
          intro:
            "At High Spirit, we collect information that you provide directly to us when making reservations, contacting us, or using our services. This may include your name, email address, phone number, and dining preferences.",
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
            "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
        },
        {
          title: "Your Rights",
          intro: "You have the right to:",
          items: [
            "Access your personal information",
            "Correct inaccurate data",
            "Request deletion of your data",
            "Opt-out of marketing communications",
            "Lodge a complaint with a supervisory authority",
          ],
        },
        {
          title: "Contact Us",
          intro:
            "If you have any questions about this Privacy Policy, please contact us at:",
          body: (
            <address className="not-italic">
              Email:{" "}
              <a
                href="mailto:privacy@highspirit.com.au"
                className="link-line text-hs-green"
              >
                privacy@highspirit.com.au
              </a>
              <br />
              Phone:{" "}
              <a href="tel:+61234567890" className="link-line text-hs-green">
                +61 2 3456 7890
              </a>
            </address>
          ),
        },
      ]}
    />
  );
}
