import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Card from "@/components/Card";
import CTASection from "@/components/CTASection";
import TransformationSection from "@/components/TransformationSection";

const AUDIENCES = [
  {
    name: "Councils & local government",
    need: "Evidence for Long Term Plans, public consultation, policy decisions. Complex stakeholder environments.",
  },
  {
    name: "Community foundations & NGOs",
    need: "Impact measurement, funder reporting, strategic direction under resource constraints.",
  },
  {
    name: "Funders & philanthropists",
    need: "Portfolio assessment, funding decision logic, community ROI understanding.",
  },
  {
    name: "Senior leaders & boards",
    need: "Big-picture sense-making. Cross-domain thinking. Evidence for high-stakes decisions.",
  },
];

const CONSULTING_OFFERS = [
  {
    name: "Evidence for planning cycles",
    desc: "Weigh community data and stakeholder reality for decisions that carry the region forward.",
  },
  {
    name: "Impact measurement",
    desc: "Systems and indicators that tell you whether investment is actually changing outcomes.",
  },
  {
    name: "Strategic data storytelling",
    desc: "Turning complex data into narrative that boards and communities can act on.",
  },
  {
    name: "Funding decision logic",
    desc: "Frameworks for allocating capital that align with mission and evidence.",
  },
  {
    name: "Stakeholder alignment",
    desc: "Getting the room — funders, community, leadership — onto the same decision.",
  },
];

export default function Advisory() {
  return (
    <main>
      <Hero
        fullHeight={false}
        breadcrumb={{ label: "Home", href: "/" }}
        eyebrow="Advisory"
        heading={
          <>
            Trusted to say the{" "}
            <span style={{ color: "var(--color-amber)" }}>hard thing</span>,{" "}
            clearly
          </>
        }
        description="When the cost of getting it wrong is high and internal pressure makes clarity impossible, you need a voice in the room that is independent, evidence-led, and not afraid to use it."
        primaryCta={{ label: "Discuss your situation", href: "/contact" }}
      />

      {/* Two ways of working */}
      <Section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">Two ways of working</p>
            <h2 className="heading-section mb-5">Both answer the same question: what&apos;s the decision?</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              You can bring me in as an embedded fractional advisor, or engage me by the day for a
              focused piece of work. Different shapes, same Jester.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Fractional Advisor */}
            <div className="card card-highlight flex flex-col">
              <p className="eyebrow">Fractional Advisor</p>
              <h3 className="heading-subsection mb-2">Your independent voice, on retainer</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A consistent, trusted presence inside your team who knows your context deeply — the
                strategic counsel you reach for when it counts, without waiting for a formal project
                to start.
              </p>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground mt-4">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
                  Ongoing strategic counsel and sounding board
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
                  Cross-domain thinking across your portfolio
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
                  The uncomfortable truth, delivered at the right moment
                </li>
              </ul>
              <div className="mt-auto">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Scoped to your situation · monthly retainer
                </div>
                <Link href="/contact" className="btn btn-primary">
                  Discuss a retainer
                </Link>
              </div>
            </div>

            {/* Consulting by the day */}
            <div className="card flex flex-col">
              <p className="eyebrow">Consulting</p>
              <h3 className="heading-subsection mb-2">Focused advice, by the day</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A specific problem, a few focused days, a sharp recommendation you can act on — the
                fastest way to get unstuck.
              </p>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground mt-4">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
                  Fixed-scope engagement
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
                  A clear recommendation you can act on
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--color-brand)" }} />
                  Day rate $1,500–$3,500
                </li>
              </ul>
              <div className="mt-auto">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-amber)" }}>
                  From $1,500 / day
                </div>
                <Link href="/contact" className="btn btn-outline">
                  Scope a piece of work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Who Jester serves */}
      <Section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">Who Jester Serves</p>
            <h2 className="heading-section mb-5">The decision this supports</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Organisations facing decisions where the cost of getting it wrong is high — and where
              internal pressure makes an independent voice essential.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {AUDIENCES.map((a) => (
              <div key={a.name} className="ontology-card">
                <h3 className="mb-2 text-base font-semibold">{a.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {a.need}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* The Shift */}
      <TransformationSection
        eyebrow="The Shift"
        heading="What changes when Jester is in the room"
        items={[
          { before: "Siloed perspectives", after: "A connected view" },
          { before: "Information overload", after: "Clear signal" },
          { before: "Committee language", after: "A clear recommendation" },
          { before: "Advisor dependency", after: "Built-in capability" },
        ]}
      />

      {/* Consulting offers */}
      <Section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">Common Engagements</p>
            <h2 className="heading-section mb-5">The problems Jester takes on</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CONSULTING_OFFERS.map((o) => (
              <Card key={o.name} title={o.name} description={o.desc} />
            ))}
            <div className="card card-highlight flex flex-col justify-between">
              <div>
                <p className="eyebrow">Not sure where you sit?</p>
                <h3 className="heading-subsection mb-2">Bring me the problem</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Not sure what you need yet? That is the first conversation — we figure it out
                  together.
                </p>
              </div>
              <Link href="/contact" className="btn btn-primary mt-5">
                Discuss your situation
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        heading="Bring an independent voice into your next big decision"
        description="Fractional retainer or focused consulting — the right shape for your situation, scoped together."
        primaryCtaLabel="Get in touch"
        primaryCtaHref="/contact"
        secondaryCtaLabel="See case studies"
        secondaryCtaHref="/case-studies"
      />
    </main>
  );
}
