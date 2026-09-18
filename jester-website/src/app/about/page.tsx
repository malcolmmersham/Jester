import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Testimonial from "@/components/Testimonial";
import CTASection from "@/components/CTASection";
import TransformationSection from "@/components/TransformationSection";

export default function About() {
  return (
    <main>
      <Hero
        fullHeight={false}
        breadcrumb={{ label: "Home", href: "/" }}
        eyebrow="About"
        heading={
          <>
            The independent voice{" "}
            <span style={{ color: "var(--color-amber)" }}>in the room</span>
          </>
        }
        description="Evidence becomes direction, direction becomes impact — delivered by someone who reads the room, tells the truth, and stays human while doing it."
        primaryCta={{ label: "Work with Jester", href: "/advisory" }}
      />

      {/* Mission */}
      <Section className="bg-white py-20 md:py-28">
        <div className="container max-w-3xl">
          <p className="eyebrow">The Mission</p>
          <p className="text-2xl font-medium leading-relaxed md:text-3xl" style={{ color: "var(--color-royal)" }}>
            Give me the problem, I&apos;ll find the angle everyone missed.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Your room gets someone who sees the big picture, connects what no one else has
            connected, and drives change that sticks. The uncomfortable truths get said — backed
            by evidence. And every person in your room, from funder to frontline, walks out able
            to act on the same picture.
          </p>
        </div>
      </Section>

      {/* About Malcolm */}
      <Section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">About Malcolm</p>
              <h2 className="heading-section mb-5">Strategist, storyteller, systems thinker</h2>
              <p className="text-lg leading-relaxed mb-4 text-muted-foreground">
                You are working with someone who has spent 25 years and four countries connecting
                data, community wellbeing, and regional development — so the advice lands in your
                context, not a textbook.
              </p>
              <p className="text-lg leading-relaxed mb-4 text-muted-foreground">
                The platforms, measurement systems, and community-grounded frameworks from past work
                are already battle-tested — which means your organisation gets methods that tell you
                whether investment actually changes outcomes, without the trial-and-error.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                For you, that means data that speaks as a living expression of your community&apos;s
                aspiration — not an abstraction in a spreadsheet.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  className="flex aspect-[4/5] w-full items-center justify-center rounded-lg"
                  style={{
                    background: "linear-gradient(160deg, #4A2580 0%, #6B3FA0 60%, #1A0D2E 100%)",
                  }}
                >
                  <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                    <text x="50" y="65" textAnchor="middle" fontFamily="var(--font-display)" fontSize="48" fontWeight="700" fill="#F1EFE8">J</text>
                  </svg>
                </div>
                <div
                  className="absolute -bottom-5 left-5 flex items-center gap-3 border border-border bg-white px-4 py-3 rounded-lg"
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--color-brand)" }}
                  >
                    <span className="text-sm font-bold text-white">JM</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Malcolm Mersham</div>
                    <div className="text-xs text-muted-foreground">
                      Gisborne, Tairawhiti, NZ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* The Shift */}
      <TransformationSection
        eyebrow="The Shift"
        heading="How Jester works — from signal to action"
        items={[
          { before: "Information overload", after: "Clear signal" },
          { before: "Analysis paralysis", after: "Decisive direction" },
          { before: "Siloed stakeholders", after: "A shared understanding" },
          { before: "Workshop dependency", after: "Built capability" },
        ]}
      />

      {/* Working style */}
      <Section className="py-20 md:py-28" style={{ backgroundColor: "var(--color-royal)" }}>
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow" style={{ color: "var(--color-amber)" }}>The Secret Power</p>
            <h2 className="heading-section mb-5" style={{ color: "var(--color-cream)" }}>
              Reading the room, choosing the moment
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(241,239,232,0.7)" }}>
              Your big-picture ideas actually get acted on — by the funder, the council, the
              community, the board. The directness you need lands at the moment it counts, with
              the trust to make it stick, and the hard thing the room was avoiding finally gets
              said.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="border p-7 rounded-lg" style={{ borderColor: "rgba(239,159,39,0.3)" }}>
              <h3 className="mb-2 text-base font-bold uppercase tracking-wide" style={{ color: "var(--color-amber)" }}>
                Direct
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(241,239,232,0.65)" }}>
                You hear the full truth — clear, unhedged, and backed by evidence — not just the
                parts that are comfortable to say.
              </p>
            </div>
            <div className="border p-7 rounded-lg" style={{ borderColor: "rgba(239,159,39,0.3)" }}>
              <h3 className="mb-2 text-base font-bold uppercase tracking-wide" style={{ color: "var(--color-amber)" }}>
                Subtle
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(241,239,232,0.65)" }}>
                The hard truth lands at the moment it can actually change the outcome — not a day
                too early, not a day too late.
              </p>
            </div>
            <div className="border p-7 rounded-lg" style={{ borderColor: "rgba(239,159,39,0.3)" }}>
              <h3 className="mb-2 text-base font-bold uppercase tracking-wide" style={{ color: "var(--color-amber)" }}>
                Human
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(241,239,232,0.65)" }}>
                Working together feels human — direct when it matters, humane in the delivery, and
                never at your expense.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonial */}
      <Section className="py-20 md:py-28" style={{ backgroundColor: "var(--secondary)" }}>
        <div className="container max-w-3xl">
          <Testimonial
            quote="Here's the signal, here's what it means, and here's where we move next."
            author="Malcolm Mersham"
            role="Storyteller · Strategist · Researcher & Impact Player"
          />
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        heading="Work with the independent voice"
        description="Your organisation's biggest decisions deserve evidence behind them — not instinct alone."
        primaryCtaLabel="Get in touch"
        primaryCtaHref="/advisory"
      />
    </main>
  );
}
