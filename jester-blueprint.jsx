import { useState, useEffect } from "react";

const STORAGE_KEY = "jester-blueprint-v1";

const C = {
  royal: "#1A0D2E", purple: "#4A2580", brand: "#6B3FA0",
  amber: "#EF9F27", white: "#F1EFE8",
};

const BLUEPRINT = {
  version: 1,
  updatedAt: new Date().toISOString(),
  sections: {
    mission: {
      title: "Mission",
      content: "Jester helps organisations make better decisions.",
      elaboration: "Underpinned by deep experience in data, strategy, and stakeholder management — with the ability to see the big picture, connect things others don't see, and drive change that sticks. Jester is the independent voice in the room willing to say what others won't, backed by evidence.",
    },
    ontology: {
      title: "The Ontology",
      concepts: [
        { term: "Decisions", def: "The unit of value Jester delivers. Better decisions — at strategy, funding, community, and operational levels." },
        { term: "Capability", def: "The transferable ability for an organisation to make better decisions independently over time. Jester builds this, not dependency." },
        { term: "Methodology", def: "Jester's proprietary IP: He Rangitapu wellbeing framework, survey post-stratification weighting, funding assessment frameworks, data storytelling systems. Delivered, never distributed." },
        { term: "Evidence", def: "The foundation. Data is not a deliverable — decisions grounded in evidence are the deliverable." },
        { term: "Story", def: "How evidence becomes action. The translation layer between data and decisions." },
        { term: "The Flywheel", def: "The self-reinforcing system: workshops build trust, trust becomes consulting, consulting creates ongoing capability need, capability need becomes recurring product revenue, clients refer others in." },
      ],
    },
    streams: {
      title: "Revenue Streams",
      items: [
        {
          id: "consulting",
          name: "Consulting & Advisory",
          type: "Project / Retainer",
          colour: C.brand,
          pitch: "Senior advisory for organisations navigating complex decisions — strategy, data, stakeholder, community impact.",
          audiences: ["Councils & local government", "Community foundations", "NGOs", "Funders"],
          products: ["Long Term Plan evidence", "Impact measurement", "Strategic data storytelling", "Funding assessment", "Wellbeing framework delivery"],
          revenue: "Day rate or fixed-scope project. $1,500–$3,500/day equivalent.",
          proofPoint: "Trust Tairāwhiti — wellbeing surveys, tairawhitidata.nz, Long Term Plan influence.",
          status: "Active (via Trust Tairāwhiti context); needs formal launch",
        },
        {
          id: "workshops",
          name: "Workshops & Education",
          type: "One-time / Cohort",
          colour: C.amber,
          pitch: "Build capability in professionals who aren't technical but need to work confidently with data and AI.",
          audiences: ["Non-technical professionals", "NGO staff", "Council advisors", "Funders & philanthropists"],
          products: ["AI for Non-Technical Professionals", "Data Storytelling for Impact", "Philanthropy 101", "Funding Assessment Workshop"],
          revenue: "Workshop fee $500–$2,500/person. Cohort or org licence.",
          proofPoint: "Gartner advisory experience. Trust Tairāwhiti capability building.",
          status: "Pilot ready; needs first paying cohort",
        },
        {
          id: "mcp",
          name: "Capabilities as a Service",
          type: "Monthly Recurring",
          colour: "#2E7D5E",
          pitch: "Hosted methodology, delivered via MCP. Clients connect their LLM; Jester IP works in the background. LLM-agnostic.",
          audiences: ["Workshop graduates", "Consulting clients needing ongoing access", "Orgs wanting embedded capability"],
          products: ["Base tier — core tools", "Community Impact tier — wellbeing & survey tools", "Funding Intelligence tier — assessment frameworks", "Enterprise — custom builds"],
          revenue: "Base $49/mo · Community Impact $149/mo · Funding Intelligence $299/mo · Enterprise POA.",
          proofPoint: "First 3 months included in workshop fee. Graduates are the conversion pipeline.",
          status: "Architecture complete; build pending",
        },
      ],
    },
    flywheel: {
      title: "The Flywheel",
      steps: [
        { n: "1", label: "Workshops", desc: "Participants gain capability. Jester gains trust and proof of expertise." },
        { n: "2", label: "Warm leads", desc: "Graduates who want deeper help become consulting prospects. Natural, low-friction pipeline." },
        { n: "3", label: "Consulting", desc: "Higher-value engagements. Jester delivers strategy, evidence, story. Builds further IP." },
        { n: "4", label: "Ongoing capability", desc: "Clients realise they need methodology access beyond the engagement." },
        { n: "5", label: "MCP subscriptions", desc: "Recurring revenue. IP stays protected server-side. Scales without Malcolm's time." },
        { n: "6", label: "Referrals", desc: "Clients refer peers. Graduates share the workshop. The flywheel accelerates." },
      ],
    },
    ip: {
      title: "IP & Methodology",
      architecture: "All Jester methodology is kept server-side via a hosted MCP server. Clients receive an API key and URL — never raw files, prompts, or framework logic. This protects IP commercially and enables tiered access control.",
      assets: [
        { name: "He Rangitapu wellbeing framework", tier: "Community Impact", desc: "Structured approach to measuring and narrating community wellbeing across He Rangitapu dimensions." },
        { name: "Survey post-stratification weighting", tier: "Community Impact", desc: "Survey methodology developed and validated at Trust Tairāwhiti. Ensures representative community data." },
        { name: "Funding assessment framework", tier: "Funding Intelligence", desc: "Structured decision logic for evaluating funding applications and portfolio strategy." },
        { name: "Data storytelling system", tier: "Base", desc: "Templates and narrative logic for turning data outputs into decision-ready stories." },
        { name: "Impact measurement toolkit", tier: "Community Impact", desc: "Longitudinal survey design, indicator selection, and reporting frameworks." },
      ],
      tech: {
        server: "TypeScript MCP server on Railway or Render",
        auth: "Supabase — API key management and tier enforcement",
        protocol: "MCP (LLM-agnostic — works with Claude, ChatGPT, Gemini, local models)",
        platform: "tairawhitidata.nz — existing proof-of-concept and client showcase",
      },
    },
    audiences: {
      title: "Who Jester Serves",
      segments: [
        { name: "Councils & local government", need: "Evidence for Long Term Plans, public consultation, policy decisions. Complex stakeholder environments.", entry: "Consulting", expand: "MCP tools for ongoing data capability" },
        { name: "Community foundations & NGOs", need: "Impact measurement, funder reporting, strategic direction under resource constraints.", entry: "Workshop or consulting", expand: "Wellbeing framework MCP tier" },
        { name: "Funders & philanthropists", need: "Portfolio assessment, funding decision logic, community ROI understanding.", entry: "Workshop (Philanthropy 101)", expand: "Funding Intelligence MCP tier" },
        { name: "Non-technical professionals", need: "Confidence working with AI and data. Ability to ask the right questions of their tools.", entry: "AI workshop", expand: "MCP subscription post-workshop" },
        { name: "Senior leaders & boards", need: "Big-picture sense-making. Cross-domain thinking. Evidence for high-stakes decisions.", entry: "Advisory retainer", expand: "Bespoke consulting" },
      ],
    },
    foundation: {
      title: "Foundation & Proof Points",
      items: [
        { label: "Trust Tairāwhiti", detail: "Built tairawhitidata.nz. Ran longitudinal wellbeing surveys. Produced evidence that directly influenced a Long Term Plan process. Primary case study." },
        { label: "He Rangitapu framework", detail: "Applied and extended in the field. Not theoretical — validated with real community data at scale." },
        { label: "Gartner advisory background", detail: "Experience working with senior stakeholders, translating complex data into strategic decisions. The register Jester operates in." },
        { label: "Data & analytics depth", detail: "Technical credibility across data engineering, survey methodology, post-stratification, and visualisation." },
        { label: "Coaching & mentoring", detail: "Builds the workshop and facilitation capability. Jester teaches as well as advises." },
      ],
    },
    operating: {
      title: "Operating Model",
      principles: [
        "Malcolm is the primary delivery vehicle — Jester is built around his expertise, not around headcount.",
        "Workshop-first acquisition: earn trust at scale before selling high-value engagements.",
        "IP stays server-side. Methodology is a product, not a document.",
        "LLM-agnostic by design. Clients are not locked into any single AI provider.",
        "Time-based income (consulting) funds the build of recurring income (MCP). Both are pursued in parallel.",
        "Every engagement generates a case study, a tool, or a framework. Nothing is wasted.",
      ],
      constraints: [
        "Single operator initially — capacity is the primary constraint.",
        "MCP server requires development investment before it generates revenue.",
        "Trust Tairāwhiti work is the proof-of-concept but also currently Malcolm's primary income — Jester is a parallel build.",
      ],
      channels: ["Direct (LinkedIn, word of mouth, existing network)", "Workshop-to-consulting pipeline", "tairawhitidata.nz as a proof-of-concept showcase", "Anthropic Partner Network (future)", "Claude Marketplace (future)"],
    },
  },
};

const TABS = [
  { id: "mission", label: "Mission" },
  { id: "ontology", label: "Ontology" },
  { id: "streams", label: "Revenue" },
  { id: "flywheel", label: "Flywheel" },
  { id: "ip", label: "IP & Tech" },
  { id: "audiences", label: "Audiences" },
  { id: "operating", label: "Operating" },
  { id: "foundation", label: "Foundation" },
];

function Sec({ title, prompt, children }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.brand}30`, paddingBottom: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: C.brand }}>{title}</span>
        {prompt && (
          <button onClick={() => sendPrompt(prompt)} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, cursor: "pointer", background: "transparent", border: `0.5px solid ${C.brand}`, color: C.brand }}>
            Explore ↗
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: "var(--color-background-secondary)", borderRadius: 8, padding: "12px 14px", ...style }}>{children}</div>;
}

function AccentCard({ children, colour = C.brand }) {
  return <div style={{ borderLeft: `2px solid ${colour}`, paddingLeft: 14, paddingTop: 6, paddingBottom: 6, background: "var(--color-background-secondary)", borderRadius: "0 8px 8px 0" }}>{children}</div>;
}

function Label({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-tertiary)", marginBottom: 3 }}>{children}</div>;
}

function MissionTab({ d }) {
  return (
    <div>
      <Sec title="Core promise" prompt="Let's refine the Jester mission and core promise. What's missing or off?">
        <p style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.5, fontFamily: "var(--font-serif)", color: "var(--color-text-primary)", margin: "0 0 12px" }}>{d.content}</p>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--color-text-secondary)", margin: 0 }}>{d.elaboration}</p>
      </Sec>
      <Sec title="The one sentence" prompt="Help me write a single sentence that captures all of Jester — consulting, workshops, and MCP — without sounding like three businesses.">
        <Card>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--color-text-primary)", margin: 0, fontStyle: "italic" }}>
            "Jester helps organisations build the capability to understand their impact, tell their story, and use data and AI to do it better — through workshops, tools, and advisory."
          </p>
        </Card>
      </Sec>
    </div>
  );
}

function OntologyTab({ d }) {
  return (
    <Sec title="Core concepts" prompt="Are there concepts missing from the Jester ontology? What's the right way to think about the relationships between these ideas?">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {d.concepts.map((c, i) => (
          <AccentCard key={i} colour={i % 2 === 0 ? C.brand : C.amber}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 3 }}>{c.term}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{c.def}</div>
          </AccentCard>
        ))}
      </div>
    </Sec>
  );
}

function StreamsTab({ d }) {
  return (
    <div>
      {d.items.map((s, i) => (
        <Sec key={i} title={s.name} prompt={`Let's explore the ${s.name} revenue stream for Jester. What should we develop, price, or position differently?`}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <Card>
              <Label>Type</Label>
              <div style={{ fontSize: 13, color: "var(--color-text-primary)" }}>{s.type}</div>
            </Card>
            <Card>
              <Label>Revenue model</Label>
              <div style={{ fontSize: 13, color: "var(--color-text-primary)" }}>{s.revenue}</div>
            </Card>
          </div>
          <Card style={{ marginBottom: 10 }}>
            <Label>Pitch</Label>
            <div style={{ fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.55 }}>{s.pitch}</div>
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <Card>
              <Label>Audiences</Label>
              {s.audiences.map((a, j) => <div key={j} style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "2px 0" }}>· {a}</div>)}
            </Card>
            <Card>
              <Label>Products / offers</Label>
              {s.products.map((p, j) => <div key={j} style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "2px 0" }}>· {p}</div>)}
            </Card>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: s.colour + "20", color: s.colour, border: `0.5px solid ${s.colour}`, fontWeight: 500 }}>{s.status}</span>
            <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>Proof: {s.proofPoint}</span>
          </div>
        </Sec>
      ))}
    </div>
  );
}

function FlywheelTab({ d }) {
  return (
    <Sec title="The Jester flywheel" prompt="Is the flywheel logic right? What's the weakest link in the chain, and how should we strengthen it?">
      <div style={{ position: "relative" }}>
        {d.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 14, marginBottom: 8, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.brand, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 500, color: "#f0eaf5" }}>
              {step.n}
            </div>
            <div style={{ flex: 1 }}>
              <AccentCard colour={i === 0 ? C.amber : i === 4 ? "#2E7D5E" : C.brand}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 2 }}>{step.label}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{step.desc}</div>
              </AccentCard>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 8, background: C.royal + "15", border: `0.5px solid ${C.brand}40` }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
            The flywheel is self-reinforcing: each stream generates revenue <em>and</em> fills the next stream. Workshops are the acquisition engine. Consulting is the value engine. MCP is the scale engine.
          </div>
        </div>
      </div>
    </Sec>
  );
}

function IPTab({ d }) {
  return (
    <div>
      <Sec title="Architecture principle" prompt="Is the MCP / server-side IP architecture the right call? What risks or opportunities should we be thinking about?">
        <Card>
          <div style={{ fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.65 }}>{d.architecture}</div>
        </Card>
      </Sec>
      <Sec title="Methodology assets" prompt="What's missing from the Jester methodology stack? What should we build next?">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {d.assets.map((a, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 3fr", gap: 10, alignItems: "start" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{a.name}</div>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: C.brand + "20", color: C.brand, border: `0.5px solid ${C.brand}`, alignSelf: "start", whiteSpace: "nowrap" }}>{a.tier}</span>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </Sec>
      <Sec title="Tech stack" prompt="Is the MCP tech stack right for where Jester is now? What should we prioritise building first?">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {Object.entries(d.tech).map(([k, v], i) => (
            <Card key={i}>
              <Label>{k}</Label>
              <div style={{ fontSize: 13, color: "var(--color-text-primary)" }}>{v}</div>
            </Card>
          ))}
        </div>
      </Sec>
    </div>
  );
}

function AudiencesTab({ d }) {
  return (
    <Sec title="Segments" prompt="Who should Jester focus on first? How do we prioritise across these segments?">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {d.segments.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 1fr 1fr", gap: 10, alignItems: "start" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", paddingTop: 2 }}>{s.name}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{s.need}</div>
            <Card style={{ padding: "6px 10px" }}>
              <Label>Entry</Label>
              <div style={{ fontSize: 11, color: "var(--color-text-primary)" }}>{s.entry}</div>
            </Card>
            <Card style={{ padding: "6px 10px" }}>
              <Label>Expand</Label>
              <div style={{ fontSize: 11, color: "var(--color-text-primary)" }}>{s.expand}</div>
            </Card>
          </div>
        ))}
      </div>
    </Sec>
  );
}

function OperatingTab({ d }) {
  return (
    <div>
      <Sec title="Principles" prompt="Are these the right operating principles for Jester? What's missing?">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {d.principles.map((p, i) => (
            <AccentCard key={i} colour={C.brand}>
              <div style={{ fontSize: 13, color: "var(--color-text-primary)", lineHeight: 1.55 }}>{p}</div>
            </AccentCard>
          ))}
        </div>
      </Sec>
      <Sec title="Current constraints" prompt="How do we work around Jester's current constraints — especially single-operator capacity?">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {d.constraints.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: C.amber, fontWeight: 500, flexShrink: 0 }}>!</span>
              <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>{c}</div>
            </div>
          ))}
        </div>
      </Sec>
      <Sec title="Go-to-market channels" prompt="What channels should Jester prioritise for acquiring clients? What's the fastest path to first paying client?">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {d.channels.map((c, i) => (
            <span key={i} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, border: "0.5px solid var(--color-border-secondary)", color: "var(--color-text-secondary)" }}>{c}</span>
          ))}
        </div>
      </Sec>
    </div>
  );
}

function FoundationTab({ d }) {
  return (
    <Sec title="Proof points" prompt="How should we use these proof points commercially? Which one should anchor the Jester pitch?">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {d.items.map((item, i) => (
          <Card key={i}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>{item.detail}</div>
          </Card>
        ))}
      </div>
    </Sec>
  );
}

export default function JesterBlueprint() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("mission");

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY);
        setData(JSON.parse(res.value));
      } catch {
        setData(BLUEPRINT);
        try { await window.storage.set(STORAGE_KEY, JSON.stringify(BLUEPRINT)); } catch {}
      }
    })();
  }, []);

  if (!data) return <div style={{ padding: "2rem", color: "var(--color-text-secondary)", fontSize: 14 }}>Loading blueprint…</div>;

  const s = data.sections;
  const dateStr = new Date(data.updatedAt).toLocaleDateString("en-NZ", { day: "numeric", month: "short", year: "numeric" });

  const renderTab = () => {
    switch (tab) {
      case "mission": return <MissionTab d={s.mission} />;
      case "ontology": return <OntologyTab d={s.ontology} />;
      case "streams": return <StreamsTab d={s.streams} />;
      case "flywheel": return <FlywheelTab d={s.flywheel} />;
      case "ip": return <IPTab d={s.ip} />;
      case "audiences": return <AudiencesTab d={s.audiences} />;
      case "operating": return <OperatingTab d={s.operating} />;
      case "foundation": return <FoundationTab d={s.foundation} />;
      default: return null;
    }
  };

  return (
    <div style={{ maxWidth: 660, padding: "1.5rem 0 3rem", fontFamily: "var(--font-sans)" }}>

      {/* Header */}
      <div style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", paddingBottom: "1.25rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 6 }}>
          Business Blueprint · v{data.version} · {dateStr}
        </div>
        <div style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.5px", color: "var(--color-text-primary)", lineHeight: 1.25, marginBottom: 4 }}>
          Jester Consulting and Advisory
        </div>
        <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Operating model · Ontology · Revenue architecture · IP strategy</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: "1.5rem", borderBottom: "0.5px solid var(--color-border-tertiary)", paddingBottom: "0.75rem" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            fontSize: 12, padding: "5px 12px", borderRadius: 6, cursor: "pointer",
            background: tab === t.id ? C.brand : "transparent",
            color: tab === t.id ? "#f0eaf5" : "var(--color-text-secondary)",
            border: tab === t.id ? `1px solid ${C.brand}` : "0.5px solid var(--color-border-secondary)",
            fontWeight: tab === t.id ? 500 : 400,
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{renderTab()}</div>

      {/* Footer */}
      <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: "1rem", marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>Living blueprint · updates as Jester evolves</span>
        <button onClick={() => sendPrompt("Looking at the Jester blueprint — what's the most important thing we should develop or decide next?")} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 6, cursor: "pointer", background: C.brand, border: "none", color: "#f0eaf5" }}>
          What's next? ↗
        </button>
      </div>

    </div>
  );
}
