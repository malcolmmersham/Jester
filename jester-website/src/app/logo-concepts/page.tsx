import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Logo concepts — Jester",
  description: "Internal preview: three jester logo concepts. Delete this page once a direction is chosen.",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    id: "A",
    file: "/jester-concept-a.svg",
    name: "The J flourish",
    blurb:
      "A bold geometric J whose top bar flicks upward into a single jester point, tipped with an amber bell. Cleanest at 16px; closest fit to the uppercase editorial style.",
    smallSizeNote: "Reads as J + amber dot at tab size.",
  },
  {
    id: "B",
    file: "/jester-concept-b.svg",
    name: "The floppy hat",
    blurb:
      "A literal three-point jester hat with drooping horns, amber bells, and a cream band. Most playful and most recognisably a jester — but the thinnest strokes at favicon size.",
    smallSizeNote: "Horns go thin at 16px; may want a simplified favicon variant.",
  },
  {
    id: "C",
    file: "/jester-concept-c.svg",
    name: "J with bells",
    blurb:
      "The J letterform wearing two hat points with amber bells. Middle ground: keeps the initial-letter logic of the current nav placeholder while adding unmistakable jester cues.",
    smallSizeNote: "J + two amber dots survive tab size well.",
  },
];

function MockNav({ file, label }: { file: string; label: string }) {
  return (
    <div
      className="flex items-center justify-between px-4"
      style={{
        height: "5rem",
        backgroundColor: "rgba(241,239,232,0.85)",
        border: "1px solid #E4DCE8",
      }}
      aria-label={`Mock nav using concept ${label}`}
    >
      <div className="flex items-center gap-2">
        <Image src={file} alt="" width={36} height={36} />
        <span
          className="text-xl font-bold uppercase"
          style={{ letterSpacing: "0.1em", color: "#1A0D2E" }}
        >
          Jester
        </span>
      </div>
      <span className="text-xs uppercase" style={{ color: "#6B6A78" }}>
        Mock nav · concept {label}
      </span>
    </div>
  );
}

function FaviconRow({ file, label }: { file: string; label: string }) {
  return (
    <div className="flex flex-wrap items-end gap-6">
      {[48, 32, 16].map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <span
            className="flex items-center justify-center"
            style={{ backgroundColor: "#F1EFE8", padding: 8 }}
          >
            <Image src={file} alt={`Concept ${label} at ${s}px`} width={s} height={s} />
          </span>
          <span className="text-xs" style={{ color: "#6B6A78" }}>
            {s}px
          </span>
        </div>
      ))}
      <div className="flex flex-col items-center gap-2">
        <span
          className="flex items-center justify-center"
          style={{ backgroundColor: "#1A0D2E", padding: 8 }}
        >
          <Image src={file} alt={`Concept ${label} at 32px on dark`} width={32} height={32} />
        </span>
        <span className="text-xs" style={{ color: "#6B6A78" }}>
          32px dark
        </span>
      </div>
    </div>
  );
}

export default function LogoConceptsPage() {
  return (
    <div className="container py-16">
      <p className="eyebrow">Internal preview · delete me after selection</p>
      <h1 className="h1 mb-4">Jester logo concepts</h1>
      <p className="mb-12 max-w-2xl text-lg leading-relaxed">
        Three directions, all in royal <code>#1A0D2E</code> + cream{" "}
        <code>#F1EFE8</code> + amber <code>#EF9F27</code>. Each is shown large,
        in a mock of the site nav, and at real favicon sizes. Pick a letter
        (A, B, or C) and I&apos;ll wire it into the nav, favicon, and
        apple-touch-icon — then delete this page.
      </p>

      <div className="space-y-12">
        {CONCEPTS.map((c) => (
          <section key={c.id} className="card">
            <div className="flex flex-wrap items-center gap-8">
              <div style={{ flex: "0 0 auto", margin: "0 auto" }}>
                <Image
                  src={c.file}
                  alt={`Jester logo concept ${c.id}: ${c.name}`}
                  width={180}
                  height={180}
                />
              </div>
              <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                <h2 className="h2 mb-2">
                  Concept {c.id} — {c.name}
                </h2>
                <p className="leading-relaxed">{c.blurb}</p>
              </div>
            </div>
            <div className="mt-8">
              <MockNav file={c.file} label={c.id} />
            </div>
            <div className="mt-8">
              <FaviconRow file={c.file} label={c.id} />
            </div>
            <p className="mt-4 text-sm" style={{ color: "#6B6A78" }}>
              {c.smallSizeNote}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
