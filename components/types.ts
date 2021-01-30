import { SimulationNodeDatum, SimulationLinkDatum } from "d3";

interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link extends SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

export type { Node, Link };
