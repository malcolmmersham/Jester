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