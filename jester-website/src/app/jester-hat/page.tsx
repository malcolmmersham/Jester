import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";

export default function JesterHat() {
  return (
    <main>
      <Hero
        fullHeight={false}
        breadcrumb={{ label: "Home", href: "/" }}
        eyebrow="Capability · Jester Hat"
        heading={
          <>
            Pull Jester&apos;s thinking{" "}
            <span style={{ color: "var(--color-amber)" }}>out of the hat</span>
          </>
        }
        description="A growing knowledge base behind your existing AI — so your team gets an independent, experienced voice available whenever they need it, no setup required."
        primaryCta={{ label: "Join the founding cohort", href: "/contact" }}
      />

      {/* The magic box */}
      <Section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">The Jester Hat</p>
            <h2 className="heading-section mb-5">Capability out of a hat</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Think of it as a magic jester hat. You simply ask a question, and the right
              approach appears — drawn from a deep, growing body of frameworks and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="card">
              <h3 className="heading-subsection mb-2">Plugs into your AI</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Connects to the AI tools your team already uses. No new system to learn, no vendor
                lock-in. Ask questions, get Jester-calibre responses.
              </p>
            </div>
            <div className="card">
              <h3 className="heading-subsection mb-2">Works like magic</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ask a question, get a Jester-grade answer — no setup, no maintenance, always
                current.
              </p>
            </div>
            <div className="card">
              <h3 className="heading-subsection mb-2">Keeps growing</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The knowledge base grows with your needs — every month there is more to draw on,
                and the value compounds without you doing anything.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow">Pricing</p>
            <h2 className="heading-section mb-4">One simple plan</h2>
            <div className="mb-4 text-5xl font-bold" style={{ color: "var(--color-brand)" }}>
              $99<span className="text-2xl text-muted-foreground">/month</span>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              The Jester Hat for your organisation&apos;s AI. Organisation-wide pricing available on
              request.
            </p>
            <Link href="/contact" className="btn btn-primary mt-8">
              Request access
            </Link>
          </div>
        </div>
      </Section>

      {/* Founding cohort */}
      <Section className="py-20 md:py-28" style={{ backgroundColor: "var(--color-royal)" }}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow" style={{ color: "var(--color-amber)" }}>Early Access</p>
            <h2 className="heading-section mb-5" style={{ color: "var(--color-cream)" }}>
              Currently onboarding founding customers
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed" style={{ color: "rgba(241,239,232,0.7)" }}>
              Early access is available for a limited number of organisations. Get in touch to be
              among the first with an independent, seasoned voice behind your team&apos;s AI.
            </p>
            <Link href="/contact" className="btn btn-white">
              Join the founding cohort
            </Link>
          </div>
        </div>
      </Section>

      <CTASection
        heading="Bring Jester's capability into your team"
        description="A low-cost way to put seasoned, independent thinking behind your team's day-to-day decisions."
        primaryCtaLabel="Request access"
        primaryCtaHref="/contact"
      />
    </main>
  );
}
