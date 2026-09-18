import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <div>
            <h4 className="footer-heading">Our Mission</h4>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(241,239,232,0.6)" }}>
              The independent voice in the room. Turning complexity into clear,
              defensible decisions. Capability that endures beyond the engagement.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Services</h4>
            <Link href="/advisory" className="footer-link">Advisory</Link>
            <Link href="/workshops" className="footer-link">Workshops</Link>
            <Link href="/jester-hat" className="footer-link">Jester Hat</Link>
          </div>
          <div>
            <h4 className="footer-heading">Insights</h4>
            <Link href="/case-studies" className="footer-link">Case Studies</Link>
            <Link href="/blog" className="footer-link">Blog</Link>
          </div>
          <div>
            <h4 className="footer-heading">Company</h4>
            <Link href="/about" className="footer-link">About Malcolm</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
            <div className="mt-5">
              <Image
                src="/jester-mark.svg"
                alt="Jester mark"
                width={40}
                height={40}
                className="h-10 w-auto opacity-60"
              />
            </div>
          </div>
        </div>
        <div className="border-t pt-6" style={{ borderColor: "rgba(241,239,232,0.1)" }}>
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <p className="text-xs" style={{ color: "rgba(241,239,232,0.4)" }}>
              &copy; {new Date().getFullYear()} Jester. Advisory, Workshops and Capability.
            </p>
            <span className="text-xs" style={{ color: "rgba(241,239,232,0.25)" }}>
              Tairawhiti &middot; Aotearoa New Zealand
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
