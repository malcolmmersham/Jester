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