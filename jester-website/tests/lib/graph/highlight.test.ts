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
    const nb = getNeighbourhood(nodes, edges, "d");
    expect(nb.nodeIds).toEqual(new Set(["d"]));
    expect(nb.edgeKeys).toEqual(new Set());
    expect(nb.edges).toHaveLength(0);
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