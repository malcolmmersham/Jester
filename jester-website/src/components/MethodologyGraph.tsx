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

const DRAG_THRESHOLD = 6;

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

type ResolvedLink = Omit<GraphEdge, "source" | "target"> & {
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
  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    captured: boolean;
    moved: boolean;
  } | null>(null);

  const [reduced, setReduced] = useState(false);
  const [, setFrame] = useState(0);
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    const p = toViewBox(svgRef.current!, e.clientX, e.clientY);
    dragRef.current = {
      id: n.id,
      startX: p.x,
      startY: p.y,
      captured: false,
      moved: false,
    };
  };

  const dragMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    if (e.buttons === 0) {
      dragRef.current = null;
      return;
    }
    const n = nodes.find((c) => c.id === d.id);
    const svg = svgRef.current;
    if (!n || !svg) return;
    const p = toViewBox(svg, e.clientX, e.clientY);

    if (!d.captured) {
      if (Math.hypot(p.x - d.startX, p.y - d.startY) < DRAG_THRESHOLD) return;
      try {
        svg.setPointerCapture(e.pointerId);
      } catch {
        // capture unavailable — keep tracking via bubbling moves
      }
      d.captured = true;
      d.moved = true;
      n.fx = p.x;
      n.fy = p.y;
      simRef.current?.alphaTarget(0.3).restart();
      return;
    }

    n.fx = p.x;
    n.fy = p.y;
  };

  const dragEnd = () => {
    const d = dragRef.current;
    if (!d) return;
    if (d.captured) {
      const n = nodes.find((c) => c.id === d.id);
      if (n) {
        n.fx = null;
        n.fy = null;
        simRef.current?.alphaTarget(0);
      }
    }
    if (d.moved) return;
    dragRef.current = null;
  };

  const clearOnCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (dragRef.current?.moved) {
      dragRef.current.moved = false;
      return;
    }
    if (e.target === e.currentTarget) setSelected(null);
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
        onPointerMove={dragMove}
        onPointerUp={dragEnd}
        onPointerCancel={dragEnd}
        onClick={clearOnCanvasClick}
      >
        <g>
          {links.map((l) => {
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