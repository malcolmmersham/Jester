type SectionProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export default function Section({ id, className, style, children }: SectionProps) {
  return (
    <section id={id} className={className} style={style}>
      {children}
    </section>
  );
}
