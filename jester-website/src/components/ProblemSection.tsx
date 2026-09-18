import Section from "./Section";

type PlayProps = {
  problem: string;
  guide: string;
  success: string;
};

export default function ProblemSection({ problem, guide, success }: PlayProps) {
  return (
    <Section className="border-b border-border">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <h3 className="heading-subsection mb-3" style={{ color: "var(--color-gold-deep)" }}>The Problem</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {problem}
            </p>
          </div>
          <div>
            <h3 className="heading-subsection mb-3" style={{ color: "var(--color-gold-deep)" }}>The Guide</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {guide}
            </p>
          </div>
          <div>
            <h3 className="heading-subsection mb-3" style={{ color: "var(--color-gold-deep)" }}>The Success</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {success}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
