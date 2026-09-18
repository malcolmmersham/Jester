import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";

const WORKSHOPS = [
  {
    name: "AI for Non-Technical Professionals",
    kicker: "AI",
    desc: "Build confidence working with AI and data. Ask the right questions of your tools — and know when their answers deserve scrutiny.",
  },
  {
    name: "Data Storytelling for Impact",
    kicker: "Strategy",
    desc: "Turn data outputs into decision-ready stories. The translation layer between evidence and action.",
  },
  {
    name: "Philanthropy 101",
    kicker: "Funding",
    desc: "Understanding funding assessment and community impact — for funders entering the field with intention.",
  },
  {
    name: "Funding Assessment Workshop",
    kicker: "Decision Logic",
    desc: "Structured decision logic for evaluating funding applications and building portfolio strategy.",
  },
];

const AUDIENCES = [
  "Non-technical professionals",
  "NGO staff",
  "Council advisors",
  "Funders & philanthropists",
];

export default function Workshops() {
  return (
    <main>
      {/* Hero */}
      <Hero
        fullHeight={false}
        breadcrumb={{ label: "Home", href: "/" }}
        eyebrow="Mātauranga | Workshops & Education"
        heading={
          <>
            Confidence with data and AI,{" "}
            <span style={{ color: "var(--color-amber)" }}>built in a day</span>
          </>
        }
        description="Capability building for professionals who aren't technical but need to work confidently with data and AI — and ask the right questions of their tools."
        primaryCta={{ label: "Start a cohort", href: "/contact" }}
      />

      {/* Why it matters */}
      <Section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Why It Matters</p>
              <h2 className="heading-section mb-5">Capability is the transferable outcome</h2>
              <p className="text-lg leading-relaxed mb-4 text-muted-foreground">
                Workshops build real capability in your team — the kind that shows up in how
                people work the next Monday.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Teams that want to go deeper after the workshop can — with ongoing advisory that
                builds on the capability they have already started.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {AUDIENCES.map((a) => (
                  <div key={a} className="card">
                    <div className="text-sm font-semibold">{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Workshop catalogue */}
      <Section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">The Catalogue</p>
            <h2 className="heading-section mb-5">Four workshops to start with</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Workshop fee $500–$2,500/person. Cohort or organisational licence available.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {WORKSHOPS.map((w) => (
              <div key={w.name} className="card group">
                <div
                  className="mb-3 inline-block border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-sm"
                  style={{ borderColor: "var(--color-brand)", color: "var(--color-brand)" }}
                >
                  {w.kicker}
                </div>
                <h3 className="mb-2 text-lg font-bold">{w.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {w.desc}
                </p>
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <span className="text-xs text-muted-foreground">
                    Cohort or org licence
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "var(--color-amber)" }}>
                    $500–$2,500/person
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Proof point */}
      <Section className="py-20 md:py-28" style={{ backgroundColor: "var(--color-royal)" }}>
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow" style={{ color: "var(--color-amber)" }}>The Proof</p>
              <h2 className="heading-section mb-5" style={{ color: "var(--color-cream)" }}>
                Built on real advisory experience
              </h2>
            </div>
            <div className="space-y-5">
              <div className="border-l-4 pl-5" style={{ borderColor: "var(--color-amber)" }}>
                <p className="text-lg leading-relaxed" style={{ color: "rgba(241,239,232,0.75)" }}>
                  Complex data gets translated into decisions at the senior level — the kind of
                  clarity that has been pressure-tested with boards and executives.
                </p>
              </div>
              <div className="border-l-4 pl-5" style={{ borderColor: "var(--color-amber)" }}>
                <p className="text-lg leading-relaxed" style={{ color: "rgba(241,239,232,0.75)" }}>
                  Community stays at the heart of the data, at scale — the frameworks behind these
                  workshops are the same ones that have already been deployed in the real world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        heading="Assemble your first cohort"
        description="Build data and AI confidence across your team in a single cohort."
        primaryCtaLabel="Start a cohort"
        primaryCtaHref="/contact"
        secondaryCtaLabel="See case studies"
        secondaryCtaHref="/case-studies"
      />
    </main>
  );
}
