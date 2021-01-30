import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  select,
  SimulationLinkDatum,
  SimulationNodeDatum,
  forceCollide,
  scaleSequential,
  // @ts-ignore it does exist
  interpolateRainbow,
} from "d3";
import React, { useEffect, useRef } from "react";

interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link extends SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

interface Props {
  width: number;
  height: number;

  nodes: Node[];
  links: Link[];
}

const Graph: React.FunctionComponent<Props> = ({
  width,
  height,
  nodes,
  links,
}) => {
  const nodeSize = (d: Node) => 20 + (2 * d.group + 1);
  const colour = scaleSequential()
    .domain([0, 10])
    .interpolator(interpolateRainbow);
  const ref = useRef<SVGSVGElement>();

  useEffect(() => {
    const force = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-39))
      .force(
        "link",
        forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("center", forceCenter(width / 2, height / 2))
      .force("collision", forceCollide().radius(40));

    const svg = select(ref.current);

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("marker-end", "url(#arrow)")
      .style("stroke", "#999999")
      .style("stroke-opacity", 0.6)
      .style("stroke-width", (d) => Math.sqrt(d.value));

    const node = svg.append("g").selectAll("g").data(nodes).enter().append("g");
    const circles = node
      .append("circle")
      .attr("r", nodeSize)
      .style("fill", (d) => colour(d.group));

    const labels = node
      .append("text")
      .text((node) => node.id)
      .attr("font-size", 15)
      .attr("dx", (d) => nodeSize(d) / 2 + 15)
      .attr("dy", (d) => nodeSize(d) / 2 - 5);

    force.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      svg.selectAll("g").remove();
    };
  }, [width, height, nodes, links]);

  return (
    <svg width={width} height={height} ref={ref}>
      <defs>
        <marker
          id="arrow"
          markerWidth="15"
          markerHeight="15"
          refX="40"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="black" />
        </marker>
      </defs>
    </svg>
  );
};

export { Graph };
export type { Node, Link };
