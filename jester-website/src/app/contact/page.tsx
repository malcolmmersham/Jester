import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "malcolm.mersham@gmail.com",
    href: "mailto:malcolm.mersham@gmail.com",
  },
  {
    label: "Phone",
    value: "021 708 056",
    href: "tel:+6421708056",
  },
  {
    label: "Location",
    value: "Gisborne, Tairāwhiti, NZ",
    href: null,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/malcolmmersham",
    href: "https://linkedin.com/in/malcolmmersham",
    external: true,
  },
];

export default function Contact() {
  return (
    <main>
      {/* Hero */}
      <Hero
        fullHeight={false}
        breadcrumb={{ label: "Home", href: "/" }}
        eyebrow="Contact"
        heading={
          <>
            Start the conversation{" "}
            <span style={{ color: "var(--color-amber)" }}>here</span>
          </>
        }
        description="Tell us about the decision you are facing. You will get a direct, honest response — no sales theatre, no fluff."
        primaryCta={{ label: "Send a message", href: "#message" }}
      />

      {/* Form + details */}
      <Section className="bg-white py-20 md:py-28" id="message">
        <div className="container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">
            {/* Form side */}
            <div className="lg:col-span-7">
              <p className="eyebrow">Message</p>
              <h2 className="heading-section mb-8">Tell us about the decision</h2>
              <form className="space-y-5">
                <div>
                  <label className="form-label" htmlFor="name">Name</label>
                  <input id="name" type="text" className="form-input" placeholder="Your name" required />
                </div>
                <div>
                  <label className="form-label" htmlFor="email">Email</label>
                  <input id="email" type="email" className="form-input" placeholder="you@organisation.nz" required />
                </div>
                <div>
                  <label className="form-label" htmlFor="organisation">Organisation</label>
                  <input id="organisation" type="text" className="form-input" placeholder="Your organisation" />
                </div>
                <div>
                  <label className="form-label" htmlFor="interest">What are you interested in?</label>
                  <select id="interest" className="form-input">
                    <option value="">Select an option</option>
                    <option value="advisory">Advisory (fractional or consulting)</option>
                    <option value="workshops">Workshops</option>
                    <option value="jester-hat">Jester Hat</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="message">Tell us about the decision</label>
                  <textarea id="message" className="form-input" rows={5} placeholder="Describe your challenge..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full lg:w-auto">
                  Send message
                </button>
              </form>
            </div>

            {/* Details side */}
            <div className="lg:col-span-5">
              <p className="eyebrow">Contact</p>
              <h2 className="heading-section mb-8">Direct lines</h2>
              <div className="space-y-5">
                {CONTACT_DETAILS.map((d) => (
                  <div key={d.label} className="flex items-start gap-3">
                    <div
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--color-brand)" }}
                    />
                    <div>
                      <div className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-purple)" }}>
                        {d.label}
                      </div>
                      {d.href ? (
                        <Link
                          href={d.href}
                          target={d.external ? "_blank" : undefined}
                          rel={d.external ? "noreferrer" : undefined}
                          className="link-editorial text-sm"
                        >
                          {d.value}
                        </Link>
                      ) : (
                        <span className="text-sm">{d.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        heading="Prefer to start with something else?"
        description="Explore workshops and case studies while you decide whether to reach out."
        primaryCtaLabel="Explore workshops"
        primaryCtaHref="/workshops"
        secondaryCtaLabel="See case studies"
        secondaryCtaHref="/case-studies"
      />
    </main>
  );
}
