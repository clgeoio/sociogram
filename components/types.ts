import { SimulationNodeDatum, SimulationLinkDatum } from "d3";

interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link extends SimulationLinkDatum<Node> {
  source: Node;
  target: Node;
  value: number;
}

export type { Node, Link };
