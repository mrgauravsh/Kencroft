import { PageHero } from "../components/site/PageHero";
import { CONTACT } from "../lib/data";

const PRIVACY = [
  ["Introduction", "Kencroft Strategy Group (\"we\", \"us\") respects your privacy and is committed to protecting the personal data you share with us. This policy explains how we collect, use and safeguard your information."],
  ["Information We Collect", "We collect information you provide directly — such as your name, company, email, phone number and enquiry details — when you submit our consultation or contact forms, or subscribe to our insights."],
  ["How We Use Your Information", "We use your information to respond to enquiries, deliver our consulting services, send requested insights, and improve our offerings. We do not sell your personal data to third parties."],
  ["Data Security", "We implement appropriate technical and organisational measures to protect your data against unauthorised access, alteration, disclosure or destruction."],
  ["Your Rights", "You may request access to, correction of, or deletion of your personal data at any time by contacting us at the details below."],
  ["Contact", `For any privacy-related questions, contact us at ${CONTACT.email} or ${CONTACT.phone}.`],
];

const TERMS = [
  ["Acceptance of Terms", "By accessing and using the Kencroft Strategy Group website, you accept and agree to be bound by these Terms & Conditions."],
  ["Use of the Site", "This website and its content are provided for informational purposes. You agree not to misuse the site or its content in any unlawful manner."],
  ["Intellectual Property", "All content, branding, text and graphics on this site are the property of Kencroft Strategy Group and may not be reproduced without prior written consent."],
  ["Professional Advice", "Content on this site is general in nature and does not constitute formal consulting advice. Engagements are governed by separate agreements."],
  ["Limitation of Liability", "Kencroft Strategy Group shall not be liable for any indirect or consequential loss arising from the use of this website."],
  ["Governing Law", `These terms are governed by applicable law. For questions, contact ${CONTACT.email}.`],
];

export function Privacy() { return <Legal title="Privacy Policy" overline="Legal" sections={PRIVACY} />; }
export function Terms() { return <Legal title="Terms & Conditions" overline="Legal" sections={TERMS} />; }

function Legal({ title, overline, sections }) {
  return (
    <div>
      <PageHero overline={overline} title={title} />
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-12">
        {sections.map(([h, b], i) => (
          <div key={i}>
            <h2 className="font-serif-lux text-2xl md:text-3xl text-white mb-4"><span className="text-[#D4AF37]/50 mr-3">{String(i + 1).padStart(2, "0")}</span>{h}</h2>
            <p className="text-white/60 leading-relaxed">{b}</p>
          </div>
        ))}
        <p className="text-white/35 text-sm pt-8 border-t border-white/10">Last updated: June 2026</p>
      </div>
    </div>
  );
}
