type CardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  href?: string;
  highlight?: boolean;
};

export default function Card({
  eyebrow,
  title,
  description,
  children,
  href,
  highlight = false,
}: CardProps) {
  const Tag = href ? "a" : "div";

  return (
    <Tag
      href={href}
      className={`card group ${highlight ? "card-highlight" : ""}`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h3 className="heading-subsection mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children}
      {href && (
        <span className="arrow-link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
          Learn more
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.75 12H20.25M20.25 12L13.5 5.25M20.25 12L13.5 18.75" />
          </svg>
        </span>
      )}
    </Tag>
  );
}
