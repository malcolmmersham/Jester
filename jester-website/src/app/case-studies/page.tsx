import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Testimonial from "@/components/Testimonial";
import CTASection from "@/components/CTASection";

const CASES = [
  {
    title: "Open Public Data Platform",
    tag: "Data → Decision",
    desc: "Community groups, government agencies, and researchers now share one open wellbeing data source — survey evidence freely available and comparable over time.",
    detail: "Recognised by EDNZ in 2024 for innovation in wellbeing research and primary data methodology.",
  },
  {
    title: "Wellbeing Investment Framework",
    tag: "Framework → Investment",
    desc: "A wellbeing measurement framework grounded in indigenous principles, applied at scale with real community data — structuring how wellbeing is measured, narrated, and connected to investment decisions.",
    detail: "Structured around foundation principles and measurable wellbeing outcomes across community, relationship, culture, environment, and economy.",
  },
  {
    title: "Longitudinal Survey Programme",
    tag: "Survey → Signal",
    desc: "Multiple years of community wellbeing data now reveal a clear first picture — how local wellbeing compares over time and what actually changes for residents.",
    detail: "Key finding: residents report higher life satisfaction and sense of control than the national average, despite lower incomes.",
  },
  {
    title: "Gartner Advisory Experience",
    tag: "Insight → Strategy",
    desc: "NZ public sector and banking leaders got data and analytics strategy that connected architecture, security, and application development into decisions they could act on.",
    detail: "Senior stakeholders walked out with strategic decisions grounded in evidence — not gut instinct.",
  },
];

export default function CaseStudies() {
  return (
    <main>
      {/* Hero */}
      <Hero
        fullHeight={false}
        breadcrumb={{ label: "Home", href: "/" }}
        eyebrow="Case Studies & Results"
        heading={
          <>
            Evidence that{" "}
            <span style={{ color: "var(--color-amber)" }}>changed decisions</span>
          </>
        }
        description="Real outcomes for real organisations — and the evidence behind every decision that was made."
        primaryCta={{ label: "Discuss your case", href: "/contact" }}
      />

      {/* Cases */}
      <Section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CASES.map((c) => (
              <div key={c.title} className="card group">
                <div
                  className="mb-3 inline-block border px-2.5 py-0.5 font-display text-xs font-semibold uppercase tracking-wider"
                  style={{ borderColor: "var(--color-gold-deep)", color: "var(--color-gold-deep)" }}
                >
                  {c.tag}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{c.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {c.desc}
                </p>
                <div
                  className="border-l-4 pl-4 font-display text-sm leading-relaxed font-medium"
                  style={{ borderColor: "var(--color-purple)", color: "var(--color-purple)" }}
                >
                  {c.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonial */}
      <Section className="py-20 md:py-28" style={{ backgroundColor: "var(--color-ink)" }}>
        <div className="container max-w-3xl">
          <Testimonial
            quote="Nothing you invest in goes to waste — every engagement leaves behind a case study, a tool, or a framework your organisation keeps."
            author="Jester operating principle"
            role="Nothing goes to waste"
          />
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        heading="Start the case for your organisation"
        description="Bring evidence-led strategy into your next decision, and make it one of the proof points."
        primaryCtaLabel="Discuss a case study"
        primaryCtaHref="/contact"
      />
    </main>
  );
}
