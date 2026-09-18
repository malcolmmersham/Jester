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
      <span className="block h-px w-24 bg-gold" aria-hidden="true" />
      <blockquote className="mt-6 font-display text-2xl font-medium italic leading-relaxed text-cream md:text-3xl">
        {quote}
      </blockquote>
      {(author || role) && (
        <div className="mt-6">
          {author && (
            <div className="text-sm font-semibold uppercase tracking-widest text-gold">
              {author}
            </div>
          )}
          {role && (
            <div className="mt-1 text-xs uppercase tracking-wider text-cream/60">
              {role}
            </div>
          )}
        </div>
      )}
    </div>
  );
}