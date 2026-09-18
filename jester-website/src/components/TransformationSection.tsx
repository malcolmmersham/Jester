import Section from "./Section";

type BeforeAfter = {
  before: string;
  after: string;
};

type TransformationSectionProps = {
  eyebrow?: string;
  heading: string;
  items: BeforeAfter[];
  reverse?: boolean;
};

function ArrowIcon() {
  return (
    <svg
      className="h-8 w-8 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function TransformationSection({
  eyebrow,
  heading,
  items,
  reverse = false,
}: TransformationSectionProps) {
  return (
    <Section className="py-24 md:py-32">
      <div className="container">
        <div className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center`}>
          <div className="lg:col-span-5">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="heading-section mb-6">{heading}</h2>
          </div>
          <div className="lg:col-span-7 space-y-8">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-6">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-sm font-bold"
                  style={{ color: "#4A2580" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                  <div
                    className="text-lg font-medium line-through sm:w-48"
                    style={{ color: "#9AA0A6", textDecorationColor: "rgba(214,69,69,0.5)" }}
                  >
                    {item.before}
                  </div>
                  <ArrowIcon />
                  <div className="heading-subsection text-xl font-bold sm:flex-1">
                    {item.after}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
