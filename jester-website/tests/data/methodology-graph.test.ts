import { describe, expect, it } from "vitest";
import graph from "../../src/data/methodology-graph.json";
import { validateGraph, type GraphData } from "../../src/lib/graph/validate";

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