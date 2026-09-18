import Link from "next/link";

type CTASectionProps = {
  heading?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export default function CTASection({
  heading = "Ready to make better decisions?",
  description = "Schedule a consultation and walk away with a clearer view of your next decision — and how to act on it.",
  primaryCtaLabel = "Get in touch",
  primaryCtaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref,
}: CTASectionProps) {
  return (
    <section className="border-b border-border bg-white py-20 md:py-24">
      <div className="container">
        <div className="border-t-2 border-gold pt-10 md:pt-12">
          <h2 className="heading-section max-w-2xl">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <Link href={primaryCtaHref} className="btn btn-primary">
              {primaryCtaLabel}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.75 12H20.25M20.25 12L13.5 5.25M20.25 12L13.5 18.75" />
              </svg>
            </Link>
            {secondaryCtaLabel && secondaryCtaHref && (
              <Link href={secondaryCtaHref} className="btn btn-outline">
                {secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}