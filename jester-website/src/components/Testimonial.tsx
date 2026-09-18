type TestimonialProps = {
  quote: string;
  author?: string;
  role?: string;
  className?: string;
};

export default function Testimonial({
  quote,
  author,
  role,
  className,
}: TestimonialProps) {
  return (
    <div className={`${className || ""}`}>
      <blockquote
        className="text-xl font-medium leading-relaxed md:text-2xl"
        style={{ color: "var(--color-royal)" }}
      >
        {quote}
      </blockquote>
      {(author || role) && (
        <div className="mt-6">
          {author && (
            <div className="text-sm font-semibold" style={{ color: "var(--color-purple)" }}>
              {author}
            </div>
          )}
          {role && (
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              {role}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
