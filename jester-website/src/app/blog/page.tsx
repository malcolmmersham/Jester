import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";

const POSTS = [
  {
    title: "When to hire a consultant",
    category: "Strategy",
    readTime: "2 min read",
    desc: "Signs your organisation could benefit from external strategic guidance — and when to bring it in-house instead.",
  },
  {
    title: "Data storytelling that lands",
    category: "Data",
    readTime: "3 min read",
    desc: "Turning complex data into actionable narratives for decision-makers. The translation layer between evidence and action.",
  },
  {
    title: "Wellbeing economics 101",
    category: "Regional",
    readTime: "4 min read",
    desc: "Understanding the regional signal in public data and policy — and why wellbeing is becoming a core measure of success.",
  },
];

export default function Blog() {
  return (
    <main>
      {/* Hero */}
      <Hero
        fullHeight={false}
        breadcrumb={{ label: "Home", href: "/" }}
        eyebrow="Insights & Blog"
        heading={
          <>
            Signal, meaning,{" "}
            <span style={{ color: "var(--color-amber)" }}>where you move next</span>
          </>
        }
        description="Practical thinking on data, strategy, and regional impact — for people who turn evidence into action."
      />

      {/* Posts */}
      <Section className="bg-white py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {POSTS.map((p) => (
              <article key={p.title} className="card group flex flex-col">
                <div className="mb-4">
                  <span
                    className="inline-block border px-2.5 py-0.5 font-display text-xs font-semibold uppercase tracking-wider"
                    style={{ borderColor: "var(--color-gold-deep)", color: "var(--color-gold-deep)" }}
                  >
                    {p.category}
                  </span>
                </div>
                <time className="mb-2 text-xs font-semibold text-muted-foreground">
                  {p.readTime}
                </time>
                <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <span className="arrow-link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Read post
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.75 12H20.25M20.25 12L13.5 5.25M20.25 12L13.5 18.75" />
                  </svg>
                </span>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="/blog" className="btn btn-secondary">
              View all insights
            </a>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        heading="Make the next data decision count"
        description="Get seasoned, independent thinking applied to your organisation's challenge."
        primaryCtaLabel="Get in touch"
        primaryCtaHref="/contact"
      />
    </main>
  );
}
