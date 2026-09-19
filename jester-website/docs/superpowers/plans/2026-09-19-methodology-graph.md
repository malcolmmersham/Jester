# Methodology Graph Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive, force-directed methodology graph (Obsidian-style drag physics, semantically labelled edges) to a new `/methodology` page on the Jester website.

**Architecture:** d3-force physics + hand-rolled SVG in a React client component (`MethodologyGraph.tsx`), audience-tested pure helpers (`validate.ts`, `highlight.ts`), and a curated graph dataset (`methodology-graph.json`) mirroring `jester-blueprint.jsx`. Everything is client-side, so the static export stays clean. Pure logic helpers are unit-tested with Vitest (the repo currently has no test framework — this plan adds one).

**Tech Stack:** Next.js 16 (App Router, static export), React 19, TypeScript (strict), Tailwind v4, d3-force, Vitest.

**Spec:** `jester-website/docs/superpowers/specs/2026-09-19-methodology-graph-design.md`

## Global Constraints

- **Static export only.** `next.config.ts` sets `output: "export"`. No server-only modules, no API routes, no `window`/`document` access at module scope (only inside `useEffect`/event handlers).
- **Graph data must match spec §3 exactly:** 16 nodes, 22 edges, kinds ∈ `{ontology, stream, ip, foundation}`. Copy node/edge labels verbatim.
- **Design tokens** (from `src/app/globals.css` `@theme`): `--color-ink`, `--color-royal`, `--color-purple`, `--color-gold`, `--color-gold-deep`, `--color-paper`, `--color-cream`, `--color-white`, `--color-hairline`. Node colour `#9A6FD8` is the only new token (lifted purple for royal-surface contrast). Never use pure `#000`/`#fff`.
- **Sharp corners everywhere** (radius tokens are `0`). No drop shadows as decoration. Rounded shapes allowed only for node dots/legend swatches (design-system "bullet dot" exception).
- **Fonts:** `--font-display` = Fraunces (headings/kickers), `--font-body` = Instrument Sans (body/labels).
- **`prefers-reduced-motion: reduce`** must be honoured: static settled layout, drag disabled, all other interactions working.
- **TypeScript strict**; path alias `@/*` → `./src/*`; `resolveJsonModule` already enabled in `tsconfig.json`.
- **Verification commands:** `npm run lint`, `npm run build`, `npm run test` (new). All three must pass before any task is complete.
- **Verbatim relation verbs** from spec §3 edges (e.g. `grounds`, `validates`, `powers`, `seeds`, `embeds`).
- **Repo root for git:** `/home/malcolm/Projects/Jester` (the website lives in `jester-website/`). Commit messages follow the existing style (`feat:`, `docs:`).

---

### Task 1: Test harness + graph validator (`validate.ts`)

**Files:**
- Modify: `jester-website/package.json` (add `test` script + `vitest` devDependency)
- Create: `jester-website/src/lib/graph/validate.ts`
- Create: `jester-website/tests/lib/graph/validate.test.ts`

**Interfaces:**
- Produces: `GraphData` (types `GraphNode`, `GraphEdge`) and `validateGraph(data: GraphData): GraphData`. Later tasks import `type { GraphData }` from `@/lib/graph/validate`.

- [ ] **Step 1: Install Vitest + add test script**

Run (workdir `Jester/jester-website`):
```bash
npm install -D vitest
```

Then edit `package.json` scripts to add:
```json
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run"
  },
```

- [ ] **Step 2: Write the failing tests**

Create `tests/lib/graph/validate.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { validateGraph } from "../../../src/lib/graph/validate";

describe("validateGraph", () => {
  it("accepts a valid graph", () => {
    const g = {
      nodes: [
        { id: "a", label: "A", kind: "ontology" },
        { id: "b", label: "B", kind: "stream" },
      ],
      edges: [{ source: "a", target: "b", label: "grounds" }],
    };
    expect(() => validateGraph(g)).not.toThrow();
  });

  it("rejects duplicate node ids", () => {
    const g = {
      nodes: [
        { id: "a", label: "A", kind: "ontology" },
        { id: "a", label: "A again", kind: "ontology" },
      ],
      edges: [],
    };
    expect(() => validateGraph(g)).toThrow(/unique/);
  });

  it("rejects an edge referencing an unknown node", () => {
    const g = {
      nodes: [{ id: "a", label: "A", kind: "ontology" }],
      edges: [{ source: "a", target: "z", label: "grounds" }],
    };
    expect(() => validateGraph(g)).toThrow(/unknown node/);
  });

  it("rejects an edge without a verb label", () => {
    const g = {
      nodes: [
        { id: "a", label: "A", kind: "ontology" },
        { id: "b", label: "B", kind: "ontology" },
      ],
      edges: [{ source: "a", target: "b", label: "" }],
    };
    expect(() => validateGraph(g)).toThrow(/label/);
  });
});
```

- [ ] **Step 3: Run tests — verify they fail**

Run (workdir `Jester/jester-website`):
```bash
npm run test
```
Expected: FAIL — `Cannot find module '../../../src/lib/graph/validate'`.

- [ ] **Step 4: Write the validator**

Create `src/lib/graph/validate.ts`:
```ts
export interface GraphNode {
  id: string;
  label: string;
  kind: string;
  definition?: string;
  href?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  label: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export function validateGraph(data: GraphData): GraphData {
  if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
    throw new Error("graph data must have nodes and edges arrays");
  }

  const ids = data.nodes.map((n) => n.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error("node ids must be unique");
  }

  for (const n of data.nodes) {
    if (!n.id || !n.label || !n.kind) {
      throw new Error(`node ${JSON.stringify(n)} missing id, label or kind`);
    }
  }

  const known = new Set(ids);
  for (const e of data.edges) {
    if (!known.has(e.source) || !known.has(e.target)) {
      throw new Error(`edge references unknown node: ${e.source} -> ${e.target}`);
    }
    if (!e.label) {
      throw new Error(`edge ${e.source} -> ${e.target} missing verb label`);
    }
  }

  return data;
}
```

- [ ] **Step 5: Run tests — verify they pass**

Run (workdir `Jester/jester-website`):
```bash
npm run test
```
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add jester-website/package.json jester-website/package-lock.json jester-website/src/lib/graph/validate.ts jester-website/tests/lib/graph/validate.test.ts
git commit -m "feat: add graph validator with vitest harness"
```

---

### Task 2: Methodology graph dataset

**Files:**
- Create: `jester-website/src/data/methodology-graph.json`
- Create: `jester-website/tests/data/methodology-graph.test.ts`

**Interfaces:**
- Consumes: `validateGraph`, `GraphData` (from Task 1).
- Produces: `src/data/methodology-graph.json` — imported by the page in Task 5 as `import graphData from "@/data/methodology-graph.json"`.

- [ ] **Step 1: Write the failing data test**

Create `tests/data/methodology-graph.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import graph from "../../../src/data/methodology-graph.json";
import { validateGraph, type GraphData } from "../../../src/lib/graph/validate";

const graphData = graph as unknown as GraphData;

describe("methodology-graph.json", () => {
  it("passes validation", () => {
    expect(() => validateGraph(graphData)).not.toThrow();
  });

  it("contains the 16 spec nodes", () => {
    expect(graphData.nodes).toHaveLength(16);
  });

  it("contains the 22 labelled edges", () => {
    expect(graphData.edges).toHaveLength(22);
  });

  it("only uses valid kinds", () => {
    for (const n of graphData.nodes) {
      expect(["ontology", "stream", "ip", "foundation"]).toContain(n.kind);
    }
  });

  it("streams link to their pages", () => {
    const streams = graphData.nodes.filter((n) => n.kind === "stream");
    expect(streams.map((n) => n.href).sort()).toEqual([
      "/advisory",
      "/jester-hat",
      "/workshops",
    ]);
  });

  it("every node has a definition", () => {
    for (const n of graphData.nodes) {
      expect(n.definition).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run tests — verify they fail**

Run (workdir `Jester/jester-website`):
```bash
npm run test
```
Expected: FAIL — module not found.

- [ ] **Step 3: Write the dataset (verbatim from spec §3)**

Create `src/data/methodology-graph.json`:
```json
{
  "nodes": [
    { "id": "evidence", "label": "Evidence", "kind": "ontology", "definition": "The foundation. Data is not a deliverable — decisions grounded in evidence are." },
    { "id": "decisions", "label": "Decisions", "kind": "ontology", "definition": "The unit of value Jester delivers. Better decisions at strategy, funding, community, and operational levels." },
    { "id": "capability", "label": "Capability", "kind": "ontology", "definition": "The transferable ability for an organisation to make better decisions independently over time." },
    { "id": "methodology", "label": "Methodology", "kind": "ontology", "definition": "Jester's proprietary IP — frameworks and systems. Delivered, never distributed." },
    { "id": "story", "label": "Story", "kind": "ontology", "definition": "How evidence becomes action. The translation layer between data and decisions." },
    { "id": "advisory", "label": "Advisory", "kind": "stream", "definition": "Senior advisory for complex decisions — strategy, data, stakeholder, community impact.", "href": "/advisory" },
    { "id": "workshops", "label": "Workshops", "kind": "stream", "definition": "Build capability in non-technical professionals to work confidently with data and AI.", "href": "/workshops" },
    { "id": "jester-hat", "label": "Jester Hat", "kind": "stream", "definition": "Hosted methodology delivered via MCP. Your AI answers with an independent, seasoned voice.", "href": "/jester-hat" },
    { "id": "he-rangitapu", "label": "He Rangitapu", "kind": "ip", "definition": "Structured community wellbeing framework across He Rangitapu dimensions." },
    { "id": "tws-weighting", "label": "TWS Weighting", "kind": "ip", "definition": "Survey post-stratification weighting, developed and validated at Trust Tairāwhiti." },
    { "id": "data-storytelling", "label": "Data Storytelling", "kind": "ip", "definition": "Templates and narrative logic for turning data outputs into decision-ready stories." },
    { "id": "funding-framework", "label": "Funding Framework", "kind": "ip", "definition": "Structured decision logic for evaluating funding applications and portfolio strategy." },
    { "id": "impact-toolkit", "label": "Impact Toolkit", "kind": "ip", "definition": "Longitudinal survey design, indicator selection, and reporting frameworks." },
    { "id": "trust-tairawhiti", "label": "Trust Tairāwhiti", "kind": "foundation", "definition": "Built tairawhitidata.nz. Ran longitudinal wellbeing surveys. The primary case study." },
    { "id": "gartner", "label": "Gartner background", "kind": "foundation", "definition": "Experience with senior stakeholders — the register Jester operates in." },
    { "id": "regional-data-platform", "label": "Regional Data Platform", "kind": "foundation", "definition": "One public source of truth for regional wellbeing data, open and improving." }
  ],
  "edges": [
    { "source": "evidence", "target": "decisions", "label": "grounds" },
    { "source": "story", "target": "evidence", "label": "translates" },
    { "source": "story", "target": "decisions", "label": "moves" },
    { "source": "methodology", "target": "capability", "label": "delivers" },
    { "source": "advisory", "target": "decisions", "label": "delivers" },
    { "source": "advisory", "target": "methodology", "label": "applies" },
    { "source": "advisory", "target": "capability", "label": "builds" },
    { "source": "workshops", "target": "methodology", "label": "shares" },
    { "source": "workshops", "target": "capability", "label": "builds" },
    { "source": "workshops", "target": "advisory", "label": "seeds" },
    { "source": "jester-hat", "target": "methodology", "label": "serves" },
    { "source": "jester-hat", "target": "capability", "label": "embeds" },
    { "source": "jester-hat", "target": "advisory", "label": "extends" },
    { "source": "he-rangitapu", "target": "evidence", "label": "grounds" },
    { "source": "tws-weighting", "target": "evidence", "label": "validates" },
    { "source": "data-storytelling", "target": "story", "label": "powers" },
    { "source": "funding-framework", "target": "decisions", "label": "sharpens" },
    { "source": "impact-toolkit", "target": "capability", "label": "measures" },
    { "source": "trust-tairawhiti", "target": "evidence", "label": "produced" },
    { "source": "trust-tairawhiti", "target": "methodology", "label": "field-tests" },
    { "source": "gartner", "target": "advisory", "label": "informs" },
    { "source": "regional-data-platform", "target": "evidence", "label": "publishes" }
  ]
}
```

- [ ] **Step 4: Run tests — verify they pass**

Run (workdir `Jester/jester-website`):
```bash
npm run test
```
Expected: PASS (5 data tests + 4 validator tests). All 16 node ids and 22 edges exactly as spec §3.

- [ ] **Step 5: Commit**

```bash
git add jester-website/src/data/methodology-graph.json jester-website/tests/data/methodology-graph.test.ts
git commit -m "feat: add methodology graph dataset"
```

---

### Task 3: Highlight & midpoint helpers (`highlight.ts`)

**Files:**
- Create: `jester-website/src/lib/graph/highlight.ts`
- Create: `jester-website/tests/lib/graph/highlight.test.ts`

**Interfaces:**
- Consumes: `GraphNode`, `GraphEdge` types (Task 1).
- Produces:
  - `getNeighbourhood(nodes: GraphNode[], edges: GraphEdge[], rootId: string): { nodeIds: Set<string>; edgeKeys: Set<string>; edges: GraphEdge[] }` — first-degree nodes, `"source|target"` key set, and incident edges.
  - `linkMidpoint(x1: number, y1: number, x2: number, y2: number): { x: number; y: number; angle: number }` — midpoint + angle in degrees (atan2).

- [ ] **Step 1: Write the failing tests**

Create `tests/lib/graph/highlight.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { getNeighbourhood, linkMidpoint } from "../../../src/lib/graph/highlight";

const nodes = [
  { id: "a", label: "A", kind: "ontology" },
  { id: "b", label: "B", kind: "ontology" },
  { id: "c", label: "C", kind: "stream" },
];
const edges = [
  { source: "a", target: "b", label: "grounds" },
  { source: "b", target: "c", label: "powers" },
];

describe("getNeighbourhood", () => {
  it("returns first-degree nodes and incident edge keys", () => {
    const nb = getNeighbourhood(nodes, edges, "b");
    expect(nb.nodeIds).toEqual(new Set(["b", "a", "c"]));
    expect(nb.edgeKeys).toEqual(new Set(["a|b", "b|c"]));
    expect(nb.edges).toHaveLength(2);
  });

  it("returns just the root for an isolated node", () => {
    const nb = getNeighbourhood(nodes, edges, "c");
    expect(nb.nodeIds).toEqual(new Set(["c"]));
    expect(nb.edges).toHaveLength(1);
  });
});

describe("linkMidpoint", () => {
  it("computes midpoint and horizontal angle", () => {
    const m = linkMidpoint(0, 0, 100, 0);
    expect(m.x).toBe(50);
    expect(m.y).toBe(0);
    expect(m.angle).toBe(0);
  });

  it("computes a vertical angle", () => {
    const m = linkMidpoint(0, 0, 0, 100);
    expect(m.angle).toBe(90);
  });
});
```

- [ ] **Step 2: Run tests — verify they fail**

Run (workdir `Jester/jester-website`):
```bash
npm run test
```
Expected: FAIL — module not found.

- [ ] **Step 3: Write the helpers**

Create `src/lib/graph/highlight.ts`:
```ts
import type { GraphEdge, GraphNode } from "./validate";

export interface Neighbourhood {
  nodeIds: Set<string>;
  edgeKeys: Set<string>;
  edges: GraphEdge[];
}

export function getNeighbourhood(
  nodes: GraphNode[],
  edges: GraphEdge[],
  rootId: string
): Neighbourhood {
  const nodeIds = new Set([rootId]);
  const edgeKeys = new Set<string>();
  const included: GraphEdge[] = [];

  for (const e of edges) {
    if (e.source === rootId || e.target === rootId) {
      edgeKeys.add(`${e.source}|${e.target}`);
      included.push(e);
      nodeIds.add(e.source);
      nodeIds.add(e.target);
    }
  }

  return { nodeIds, edgeKeys, edges: included };
}

export function linkMidpoint(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): { x: number; y: number; angle: number } {
  const x = (x1 + x2) / 2;
  const y = (y1 + y2) / 2;
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return { x, y, angle };
}
```

- [ ] **Step 4: Run tests — verify they pass**

Run (workdir `Jester/jester-website`):
```bash
npm run test
```
Expected: PASS (4 highlight tests + 9 from earlier tasks).

- [ ] **Step 5: Commit**

```bash
git add jester-website/src/lib/graph/highlight.ts jester-website/tests/lib/graph/highlight.test.ts
git commit -m "feat: add neighbourhood and link-midpoint graph helpers"
```

---

### Task 4: `MethodologyGraph` component

**Files:**
- Modify: `jester-website/package.json` (add `d3-force` dep + `@types/d3-force` devDep)
- Modify: `jester-website/src/app/globals.css` (focus-visible rule for `.graph-node`)
- Create: `jester-website/src/components/MethodologyGraph.tsx`

**Interfaces:**
- Consumes: `GraphData` type (Task 1); `getNeighbourhood`, `linkMidpoint` (Task 3). Data JSON imported only by the page (Task 5), passed as a prop.
- Produces: `<MethodologyGraph data={GraphData} />` — interactive SVG with hover/card selected-state (selection managed internally), zero props beyond `data`.
- Adds to `globals.css`:
  ```css
  .graph-node:focus-visible { outline: 2px solid var(--color-gold); outline-offset: 2px; }
  ```

- [ ] **Step 1: Install d3-force + types**

Run (workdir `Jester/jester-website`):
```bash
npm install d3-force
npm install -D @types/d3-force
```

- [ ] **Step 2: Add the focus-visible CSS rule**

Append to `src/app/globals.css`:
```css
/* ---------- Methodology graph ---------- */
.graph-node:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}
```

- [ ] **Step 3: Write the component**

Create `src/components/MethodologyGraph.tsx`:
```tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from "d3-force";
import type { GraphData, GraphEdge } from "@/lib/graph/validate";
import { getNeighbourhood, linkMidpoint } from "@/lib/graph/highlight";

const W = 1000;
const H = 640;

const KIND_COLOR: Record<string, string> = {
  ontology: "var(--color-gold)",
  stream: "var(--color-white)",
  ip: "#9A6FD8",
  foundation: "var(--color-cream)",
};

const KIND_RADIUS: Record<string, number> = {
  ontology: 9,
  stream: 8,
  ip: 8,
  foundation: 7,
};

interface SimNode extends SimulationNodeDatum {
  id: string;
  label: string;
  kind: string;
  definition?: string;
  href?: string;
  r: number;
  color: string;
}

type ResolvedLink = GraphEdge & {
  source: SimNode | string;
  target: SimNode | string;
};

function toViewBox(svg: SVGSVGElement, clientX: number, clientY: number) {
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const pt = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
  return { x: pt.x, y: pt.y };
}

const edgeKey = (l: ResolvedLink) =>
  `${typeof l.source === "object" ? l.source.id : l.source}|${
    typeof l.target === "object" ? l.target.id : l.target
  }`;

const ex =
  (axis: "x" | "y") =>
  (l: ResolvedLink, which: "source" | "target") => {
    const n = l[which];
    if (typeof n !== "object") return 0;
    const v = n[axis];
    return typeof v === "number" ? v : 0;
  };

const nodeX = (n: SimNode) => (typeof n.x === "number" ? n.x : 0);
const nodeY = (n: SimNode) => (typeof n.y === "number" ? n.y : 0);

export default function MethodologyGraph({ data }: { data: GraphData }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const simRef = useRef<ReturnType<typeof forceSimulation<SimNode>> | null>(null);
  const dragRef = useRef<{ id: string } | null>(null);

  const [reduced, setReduced] = useState(false);
  const [frame, setFrame] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const nodes = useMemo<SimNode[]>(
    () =>
      data.nodes.map((n) => ({
        ...n,
        r: KIND_RADIUS[n.kind] ?? 8,
        color: KIND_COLOR[n.kind] ?? "var(--color-white)",
        x: W / 2,
        y: H / 2,
      })),
    [data]
  );

  const links = useMemo<ResolvedLink[]>(
    () => data.edges.map((e) => ({ ...e })),
    [data]
  );

  const neighbourhood = useMemo(
    () => (hovered ? getNeighbourhood(data.nodes, data.edges, hovered) : null),
    [hovered, data]
  );

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const golden = Math.PI * (3 - Math.sqrt(5));
    const maxRad = Math.min(W, H) * 0.38;
    nodes.forEach((n, i) => {
      const t = nodes.length > 1 ? i / (nodes.length - 1) : 0;
      const rad = 110 + t * maxRad;
      const ang = i * golden;
      n.x = W / 2 + Math.cos(ang) * rad;
      n.y = H / 2 + Math.sin(ang) * rad;
      n.vx = 0;
      n.vy = 0;
    });

    const sim = forceSimulation<SimNode>(nodes)
      .force(
        "link",
        forceLink<SimNode, ResolvedLink>(links)
          .id((d) => d.id)
          .distance(100)
          .strength(0.5)
      )
      .force("charge", forceManyBody<SimNode>().strength(-220))
      .force("collide", forceCollide<SimNode>().radius((d) => d.r + 10))
      .force("center", forceCenter(W / 2, H / 2))
      .force("x", forceX<SimNode>(W / 2).strength(0.05))
      .force("y", forceY<SimNode>(H / 2).strength(0.05))
      .alphaDecay(0.028);

    simRef.current = sim;

    if (reduced) {
      while (sim.alpha() > sim.alphaMin()) sim.tick();
      sim.stop();
      setFrame((f) => f + 1);
    } else {
      sim.on("tick", () => setFrame((f) => f + 1));
    }

    return () => {
      sim.stop();
      simRef.current = null;
    };
  }, [nodes, links, reduced]);

  const beginDrag = (e: React.PointerEvent, n: SimNode) => {
    if (reduced) return;
    e.preventDefault();
    svgRef.current?.setPointerCapture(e.pointerId);
    dragRef.current = { id: n.id };
    const p = toViewBox(svgRef.current!, e.clientX, e.clientY);
    n.fx = p.x;
    n.fy = p.y;
    simRef.current?.alphaTarget(0.3).restart();
  };

  const moveDrag = (e: React.PointerEvent, n: SimNode) => {
    if (dragRef.current?.id !== n.id) return;
    const p = toViewBox(svgRef.current!, e.clientX, e.clientY);
    n.fx = p.x;
    n.fy = p.y;
  };

  const endDrag = (e: React.PointerEvent, n: SimNode) => {
    if (dragRef.current?.id !== n.id) return;
    dragRef.current = null;
    n.fx = null;
    n.fy = null;
    simRef.current?.alphaTarget(0);
  };

  const selectedNode = selected ? nodes.find((n) => n.id === selected) : null;

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Interactive graph of the Jester methodology — the concepts and how they connect."
        className="block h-[28rem] w-full md:h-[40rem]"
        style={{ touchAction: "none" }}
      >
        <g>
          {links.map((l, i) => {
            const active = !neighbourhood || neighbourhood.edgeKeys.has(edgeKey(l));
            const x1 = ex("x")(l, "source");
            const y1 = ex("y")(l, "source");
            const x2 = ex("x")(l, "target");
            const y2 = ex("y")(l, "target");
            const mid =
              active && hovered ? linkMidpoint(x1, y1, x2, y2) : null;
            let angle = mid?.angle ?? 0;
            if (mid && (angle > 90 || angle < -90)) angle -= 180;
            return (
              <g
                key={edgeKey(l)}
                style={{ opacity: active ? 1 : 0.15, transition: "opacity 0.15s ease" }}
              >
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={
                    active && hovered
                      ? "var(--color-gold)"
                      : "rgba(241,239,232,0.18)"
                  }
                  strokeWidth={active && hovered ? 1.5 : 1}
                />
                {mid && (
                  <text
                    x={mid.x}
                    y={mid.y}
                    dy={-6}
                    textAnchor="middle"
                    fontSize={10}
                    fontStyle="italic"
                    fill="rgba(241,239,232,0.75)"
                    transform={`rotate(${angle} ${mid.x} ${mid.y})`}
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {l.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
        <g>
          {nodes.map((n) => {
            const active = !neighbourhood || neighbourhood.nodeIds.has(n.id);
            const isHovered = hovered === n.id;
            const isSelected = selected === n.id;
            return (
              <g
                key={n.id}
                className="graph-node"
                transform={`translate(${nodeX(n)}, ${nodeY(n)})`}
                tabIndex={0}
                role="button"
                aria-label={`${n.label}${n.href ? `, opens ${n.href}` : ""}`}
                style={{
                  cursor: reduced ? "default" : "grab",
                  opacity: active ? 1 : 0.15,
                  transition: "opacity 0.15s ease",
                  userSelect: "none",
                }}
                onPointerDown={(e) => beginDrag(e, n)}
                onPointerMove={(e) => moveDrag(e, n)}
                onPointerUp={(e) => endDrag(e, n)}
                onPointerEnter={() => setHovered(n.id)}
                onPointerLeave={() => setHovered((h) => (h === n.id ? null : h))}
                onClick={() => setSelected(isSelected ? null : n.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(isSelected ? null : n.id);
                  } else if (e.key === "Escape") {
                    setSelected(null);
                  }
                }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={isHovered ? n.r * 1.25 : n.r}
                  fill={n.color}
                  stroke={isHovered ? "var(--color-gold)" : "none"}
                  strokeWidth={isHovered ? 2 : 0}
                />
                <text
                  y={n.r + 14}
                  textAnchor="middle"
                  fontSize={12}
                  fill={isHovered ? "var(--color-gold)" : "var(--color-cream)"}
                  style={{ letterSpacing: "0.02em", pointerEvents: "none", userSelect: "none" }}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {selectedNode && (
        <div className="absolute right-4 top-4 w-72 border border-hairline bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
              {selectedNode.kind}
            </span>
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="text-muted-foreground hover:text-ink"
              style={{ fontSize: 14, lineHeight: 1 }}
            >
              ✕
            </button>
          </div>
          <h3 className="heading-subsection mb-2 mt-1">{selectedNode.label}</h3>
          {selectedNode.definition && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {selectedNode.definition}
            </p>
          )}
          {selectedNode.href && (
            <Link href={selectedNode.href} className="btn btn-secondary btn-sm mt-4">
              {selectedNode.label === "Jester Hat"
                ? "Explore Jester Hat"
                : selectedNode.label === "Advisory"
                  ? "Explore Advisory"
                  : "Explore Workshops"}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
```

Note the `void frame;` references are intentionally absent — `frame` appears in the component (it is read indirectly to force re-render via the counter state passed to `setFrame`). Do not remove `const [frame, setFrame]` — ESLint may flag `frame` as unused. If so, reference it in the tick handler's dependency array comment-free way, e.g. keep it and use `setFrame((f) => f + 1)` (the updater form does not read `frame`, which is correct — re-render is triggered by state change, and positions are read from the mutated `nodes`/`links` arrays during render).

- [ ] **Step 4: Typecheck + lint the component**

Run (workdir `Jester/jester-website`):
```bash
npx tsc --noEmit
```
Expected: no errors (no runtime test — the DOM physics is verified manually in Task 8).

Also:
```bash
npm run lint
```
Expected: no errors. If `frame` is reported as unused by ESLint's `@typescript-eslint/no-unused-vars`, change the tick subscription to:
```ts
sim.on("tick", () => setFrame((f) => f + 1));
```
(already the case) — do not import unused bindings; if the state variable is flagged, rename usage to `const [, setFrame] = useState(0);`.

- [ ] **Step 5: Commit**

```bash
git add jester-website/package.json jester-website/package-lock.json jester-website/src/app/globals.css jester-website/src/components/MethodologyGraph.tsx
git commit -m "feat: add interactive methodology graph component"
```

---

### Task 5: `/methodology` page

**Files:**
- Create: `jester-website/src/app/methodology/page.tsx`

**Interfaces:**
- Consumes: `MethodologyGraph` (Task 4), `CTASection` (existing), `graphData` from `@/data/methodology-graph.json` (Task 2), design-system classes from `globals.css`.

- [ ] **Step 1: Write the page**

Create `src/app/methodology/page.tsx`:
```tsx
import type { Metadata } from "next";
import MethodologyGraph from "@/components/MethodologyGraph";
import CTASection from "@/components/CTASection";
import graphData from "@/data/methodology-graph.json";

export const metadata: Metadata = {
  title: "Methodology — Jester",
  description:
    "The ideas behind Jester, and how they connect. Drag a concept — the whole web comes with it.",
};

const LEGEND: Array<[string, string, string]> = [
  ["ontology", "var(--color-gold)", "Core ideas"],
  ["stream", "var(--color-white)", "Ways to work with Jester"],
  ["ip", "#9A6FD8", "Methodology assets"],
  ["foundation", "var(--color-cream)", "Where it comes from"],
];

export default function MethodologyPage() {
  return (
    <main>
      <section className="border-b border-border bg-background">
        <div className="container py-16 md:py-20">
          <p className="eyebrow">The Methodology</p>
          <h1 className="heading-hero mb-5 max-w-3xl">
            The ideas that{" "}
            <span style={{ color: "var(--color-gold-deep)" }}>
              connect everything else
            </span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Jester works across data, strategy, and story. Underneath it all is a
            web of concepts — the capabilities, the methodology assets, and the
            relationships that turn evidence into decisions. Nothing merely
            &ldquo;relates&rdquo; to anything else.
          </p>
        </div>
      </section>

      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "var(--color-royal)" }}
      >
        <div className="container">
          <div className="mb-8 flex max-w-2xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
                The Map
              </p>
              <h2
                className="heading-section mb-3"
                style={{ color: "var(--color-cream)" }}
              >
                Drag a concept — the whole web comes with it
              </h2>
              <p className="text-base" style={{ color: "rgba(241,239,232,0.7)" }}>
                Every line is a relationship, and every relationship has a verb.
                Pull on one concept and watch the ideas it depends on follow.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              {LEGEND.map(([kind, color, label]) => (
                <span
                  key={kind}
                  className="flex items-center gap-2"
                  style={{ color: "rgba(241,239,232,0.8)" }}
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="border" style={{ borderColor: "rgba(241,239,232,0.18)" }}>
            <MethodologyGraph data={graphData} />
          </div>

          <p className="mt-4 text-xs" style={{ color: "rgba(241,239,232,0.45)" }}>
            Hover to trace a line of reasoning. Click or press Enter to read the
            idea behind any concept.
          </p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
```

- [ ] **Step 2: Typecheck + lint + build the page**

Run (workdir `Jester/jester-website`):
```bash
npx tsc --noEmit && npm run lint
```
Expected: no errors.

Then a full static build (exercises data import + page + component):
```bash
npm run build
```
Expected: build succeeds; the static export list includes `methodology.html`.

- [ ] **Step 3: Commit**

```bash
git add jester-website/src/app/methodology/page.tsx
git commit -m "feat: add /methodology page with methodology graph"
```

---

### Task 6: Navigation & footer links

**Files:**
- Modify: `jester-website/src/components/Nav.tsx`
- Modify: `jester-website/src/components/Footer.tsx`

**Interfaces:**
- Stabilizes URL `/methodology` in nav (desktop + mobile) and footer Insights column.

- [ ] **Step 1: Add desktop nav link**

In `src/components/Nav.tsx`, after the Insights `<div className="dropdown">` block closes and before the About link, insert:
```tsx
          <Link href="/methodology" className={`nav-link ${isCurrent(pathname, "/methodology") ? "text-primary" : ""}`}>
            Methodology
          </Link>
```
(The active route already sits in gold via the existing `.nav-link` `text-primary` pattern.)

- [ ] **Step 2: Add mobile nav link**

In the mobile menu (`{mobileOpen && (...)}`), inside the `nav` after the Insights block's closing `</>` dropdown section, insert a divider + link:
```tsx
            <div className="my-2 border-t border-cream/15" />
            <Link href="/methodology" className="nav-link" onClick={() => setMobileOpen(false)}>
              Methodology
            </Link>
```

- [ ] **Step 3: Add footer link**

In `src/components/Footer.tsx`, in the Insights column, after the Blog link:
```tsx
            <Link href="/methodology" className="footer-link">Methodology</Link>
```

- [ ] **Step 4: Typecheck + lint**

Run (workdir `Jester/jester-website`):
```bash
npx tsc --noEmit && npm run lint
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add jester-website/src/components/Nav.tsx jester-website/src/components/Footer.tsx
git commit -m "feat: add Methodology to navigation and footer"
```

---

### Task 7: Full-matrix verification

**Files:** none (verification only).

- [ ] **Step 1: Run all gates**

Run (workdir `Jester/jester-website`):
```bash
npm run test && npm run lint && npm run build
```
Expected: all pass. Build output lists `methodology.html` in the static export.

- [ ] **Step 2: Confirm the export artifact**

Run (workdir `Jester/jester-website`):
```bash
ls out/methodology.html
```
Expected: file exists (proves the page exported statically).

- [ ] **Step 3: Commit any stragglers**

Only if `git -C /home/malcolm/Projects/Jester status --short` shows unexpected changes to tracked source files:
```bash
git add -A jester-website/src jester-website/tests
git commit -m "chore: verification pass"
```
Intentionally do NOT commit the spec/plan docs or the `out/` build directory unless the user requests it.

---

### Task 8: Deploy to Cloudflare Pages + manual QA

**Files:** none.

- [ ] **Step 1: Deploy**

Run (workdir `Jester/jester-website`):
```bash
npm run build && npx wrangler pages deploy out --project-name jester-website
```
Expected: successful deployment (unpublish-safe project name confirmed in the deployment URL).

- [ ] **Step 2: Manual QA checklist on the live URL** (`https://jester-website.pages.dev/methodology`)

1. Page loads at `/methodology`; hero + royal graph band + legend + CTA all present.
2. All 16 nodes render with labels; 4 legend colours match node colours.
3. **Dragging a central node (e.g. Methodology) visibly pulls its connected neighbours along; releasing lets the graph re-settle.**
4. Hovering a node highlights its neighbourhood in gold and dims the rest; edge verb labels (e.g. `grounds`, `powers`) appear along the lines.
5. Clicking a node opens the definition card; Escape / close / clicking elsewhere clears it.
6. Clicking Advisory / Workshops / Jester Hat card buttons navigates to the right sub-pages.
7. Mobile/touch: drag works with touch, no horizontal page scroll from the SVG.
8. `prefers-reduced-motion: reduce` (via devtools emulation) renders a static graph; hover/click/keyboard still work.
9. Design system: sharp corners, no decorative shadows, gold accent, warm palette — nothing clashes with the rest of the site.

- [ ] **Step 3: Report**

Report the deployed URL and the QA checklist verdict to the user. Flag any item that failed.

---

## Self-Review Notes

- **Spec coverage:** hero page (Task 5), royal graph band + legend (Task 5), drag physics (Task 4), hover neighbourhood + semantic edge verbs (Tasks 3–4), click/Enter card + stream deep-links (Task 4), reduced-motion static layout (Tasks 4), mobile touch (`touchAction: none` + pointer events, Task 4), design-system compliance (Tasks 4–5), nav (Task 6), verification + deploy (Tasks 7–8). Dataset exact match (Task 2). Every spec acceptance criterion maps to a task.
- **Deps:** only `d3-force` (runtime) + `vitest`/`@types/d3-force` (dev) added. No other new dependencies.
- **Placeholders:** none — every step carries real code or an exact command.
- **Type consistency:** `validateGraph(data: GraphData): GraphData` (Task 1) consumed as `graph as unknown as GraphData` (Task 2 test) and `data={graphData}` (Task 5); `getNeighbourhood` returns `{ nodeIds, edgeKeys, edges }` consumed by the component (Task 4); `linkMidpoint` returns `{ x, y, angle }` used for edge labels (Task 4). Component prop name is `data` everywhere.