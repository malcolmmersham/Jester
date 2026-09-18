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