import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProblemSection from "@/components/ProblemSection";
import Card from "@/components/Card";
import Testimonial from "@/components/Testimonial";
import CTASection from "@/components/CTASection";

const FLYWHEEL = [
  { n: "1", label: "Hear the Jester", desc: "A webinar or talk. You see how a messy problem gets reframed — and what changes when someone independent is in the room." },
  { n: "2", label: "Engage", desc: "A workshop or advisory engagement. Your team leaves with capability they can use the next day — and keep." },
  { n: "3", label: "Advise", desc: "A fractional retainer embeds an independent voice in your decision-making — ongoing, available when it counts." },
  { n: "4", label: "Graduate to the Hat", desc: "Bring that capability in-house. Recurring access to the frameworks and thinking, connected to the AI tools your team already uses." },
  { n: "5", label: "Refer", desc: "The capability keeps compounding — your people get more valuable, and the people around them get better too, because good work travels." },
];

const PROOF = [
  {
    title: "Regional data platforms",
    detail: "Community groups, agencies, and researchers now work from the same public wellbeing data — one source of truth, open and improving over time.",
  },
  {
    title: "EDNZ Award 2024",
    detail: "Best Practice Award for Innovation & Primary Research — regional recognition for survey methodology that other regions now reference.",
  },
  {
    title: "Gartner advisory background",
    detail: "Boards and senior leaders get strategic decisions they can defend — the complex data has already been translated into plain language.",
  },
  {
    title: "25-year career, 4 countries",
    detail: "Patterns you would miss are spotted early — insights forged across very different worlds, applied to your context.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero
        eyebrow="Advisory · Workshops · Capability"
        heading={
          <>
            Give me the problem,{" "}
            <span style={{ color: "var(--color-amber)" }}>I&apos;ll find the angle</span>{" "}
            everyone missed
          </>
        }
        description="You get clarity where there was noise, permission to act where there was paralysis — a voice in the room that makes everyone align on a decision they can defend."
        primaryCta={{ label: "Work with Jester", href: "/advisory" }}
        secondaryCta={{ label: "Explore workshops", href: "/workshops" }}
      />

      {/* The Jester role */}
      <Section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">The Jester</p>
            <h2 className="heading-section mb-5">The fool who&apos;s secretly the smartest in the room</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              The court jester was the only one allowed to tell the king the truth. That&apos;s the
              truth you get — an independent, evidence-led voice in your room that surfaces the
              uncomfortable questions, connects what no one else has connected, and gets your smart
              people talking to each other again.
            </p>
          </div>
        </div>
      </Section>

      <ProblemSection
        problem="Complex decisions under pressure — where data, stakeholders, and strategy collide. Most organisations don't lack information; they lack the analysis and the confidence to act on it."
        guide="An independent, evidence-led voice. Senior advisory that connects data, strategy, and story — translating big-picture complexity into language each stakeholder can act on."
        success="Organisations with the capability to make better decisions independently over time — not dependent on an external advisor, but stronger because of one."
      />

      {/* Choose Your Path — revenue streams */}
      <Section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow">Choose Your Path</p>
            <h2 className="heading-section mb-5">Ways Jester adds value</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Hear the Jester, work with the Jester, or bring the capability in-house. Every step
              leaves you more capable than the last.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card
              eyebrow="Fractional · Project"
              title="Advisory"
              description="Complex decisions, senior guidance — you get a seasoned advisor inside your team for as long as the decision needs, no longer."
              href="/advisory"
              highlight
            >
              <div className="mt-5 pt-4 border-t text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-amber)" }}>
                Fractional retainer · from $1,500/day
              </div>
            </Card>
            <Card
              eyebrow="One-time / Cohort"
              title="Workshops"
              description="Build capability in professionals who aren't technical but need to work confidently with data, strategy, and AI."
              href="/workshops"
            >
              <div className="mt-5 pt-4 border-t text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-amber)" }}>
                From $500/person
              </div>
            </Card>
            <Card
              eyebrow="Monthly Recurring"
              title="Jester Hat"
              description="Your AI answers with an independent, seasoned voice — every response draws on a knowledge base connected to the tools your team already uses."
              href="/jester-hat"
            >
              <div className="mt-5 pt-4 border-t text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-amber)" }}>
                $99/month
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* The Flywheel */}
      <Section className="py-20 md:py-28" style={{ backgroundColor: "var(--color-royal)" }}>
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow" style={{ color: "var(--color-amber)" }}>The Flywheel</p>
            <h2 className="heading-section mb-5" style={{ color: "var(--color-cream)" }}>
              The engine that keeps compounding
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(241,239,232,0.7)" }}>
              Hear the Jester, engage the Jester, then bring the capability in-house. Each stage
              builds on the last — and leaves you stronger.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FLYWHEEL.map((step) => (
              <div key={step.n} className="flex gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: "var(--color-brand)", color: "var(--color-cream)" }}
                >
                  {step.n}
                </div>
                <div>
                  <h3 className="mb-1.5 text-sm font-bold uppercase tracking-wide" style={{ color: "var(--color-amber)" }}>
                    {step.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(241,239,232,0.65)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Proof */}
      <Section id="about" className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Why Jester</p>
              <h2 className="heading-section mb-5">The independent voice you can trust with the hard stuff</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                You get a strategic, data-literate partner who turns evidence into direction, and
                direction into results you can action — every decision grounded in evidence, never
                opinion.
              </p>
              <Link href="/about" className="btn btn-secondary mt-8">
                About Malcolm
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {PROOF.map((p) => (
                  <div key={p.title} className="card">
                    <h3 className="heading-subsection mb-2" style={{ color: "var(--color-amber)" }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonial */}
      <Section className="py-20 md:py-28" style={{ backgroundColor: "var(--secondary)" }}>
        <div className="container max-w-3xl">
          <Testimonial
            quote="You bring the problem; you leave with the angle everyone missed — and the story that gets everyone moving on it."
            author="The Jester Promise"
            role="Advisory · Workshops · Capability"
          />
        </div>
      </Section>

      {/* Final CTA */}
      <CTASection />
    </main>
  );
}
