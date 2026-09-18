import type { Metadata } from "next";
import MethodologyGraph from "@/components/MethodologyGraph";
import CTASection from "@/components/CTASection";
import graphData from "@/data/methodology-graph.json";

export const metadata: Metadata = {
  title: "Methodology — Jester",
  description:
    "The ideas behind Jester, and how they connect. Drag a concept — the whole web comes with it.",
};

const LEGEND: Array<[string, string, string]> = [
  ["ontology", "var(--color-gold)", "Core ideas"],
  ["stream", "var(--color-white)", "Ways to work with Jester"],
  ["ip", "#9A6FD8", "Methodology assets"],
  ["foundation", "var(--color-cream)", "Where it comes from"],
];

export default function MethodologyPage() {
  return (
    <main>
      <section className="border-b border-border bg-background">
        <div className="container py-16 md:py-20">
          <p className="eyebrow">The Methodology</p>
          <h1 className="heading-hero mb-5 max-w-3xl">
            The ideas that{" "}
            <span style={{ color: "var(--color-gold-deep)" }}>
              connect everything else
            </span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Jester works across data, strategy, and story. Underneath it all is a
            web of concepts — the capabilities, the methodology assets, and the
            relationships that turn evidence into decisions. Nothing merely
            &ldquo;relates&rdquo; to anything else.
          </p>
        </div>
      </section>

      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "var(--color-royal)" }}
      >
        <div className="container">
          <div className="mb-8 flex max-w-2xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
                The Map
              </p>
              <h2
                className="heading-section mb-3"
                style={{ color: "var(--color-cream)" }}
              >
                Drag a concept — the whole web comes with it
              </h2>
              <p className="text-base" style={{ color: "rgba(241,239,232,0.7)" }}>
                Every line is a relationship, and every relationship has a verb.
                Pull on one concept and watch the ideas it depends on follow.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              {LEGEND.map(([kind, color, label]) => (
                <span
                  key={kind}
                  className="flex items-center gap-2"
                  style={{ color: "rgba(241,239,232,0.8)" }}
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="border" style={{ borderColor: "rgba(241,239,232,0.18)" }}>
            <MethodologyGraph data={graphData} />
          </div>

          <p className="mt-4 text-xs" style={{ color: "rgba(241,239,232,0.45)" }}>
            Hover to trace a line of reasoning. Click or press Enter to read the
            idea behind any concept.
          </p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}