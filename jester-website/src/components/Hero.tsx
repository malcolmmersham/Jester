import Link from "next/link";

type HeroProps = {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  fullHeight?: boolean;
  breadcrumb?: { label: string; href: string };
};

export default function Hero({
  eyebrow,
  heading,
  description,
  primaryCta,
  secondaryCta,
  fullHeight = false,
  breadcrumb,
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-background ${
        fullHeight ? "min-h-svh" : "pt-20 pb-16 md:pt-28 md:pb-24"
      } flex items-center`}
    >
      <div className="container relative z-10">
        {breadcrumb && (
          <Link
            href={breadcrumb.href}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {breadcrumb.label}
          </Link>
        )}

        {eyebrow && (
          <p className="eyebrow mb-4">{eyebrow}</p>
        )}

        <h1
          className={`heading-hero max-w-4xl ${fullHeight ? "" : "max-w-3xl"}`}
        >
          {heading}
        </h1>

        {description && (
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn btn-primary">
                {primaryCta.label}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.75 12H20.25M20.25 12L13.5 5.25M20.25 12L13.5 18.75" />
                </svg>
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn btn-outline">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
