import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  select,
  forceCollide,
  scaleSequential,
  // @ts-ignore it does exist
  interpolateRainbow,
  zoom,
  drag,
} from "d3";
import React, { useEffect, useRef } from "react";
import { Node, Link } from "./types";

interface GraphProps {
  nodes: Node[];
  links: Link[];
}

const Graph: React.FunctionComponent<GraphProps> = ({ nodes, links }) => {
  const nodeSize = (d: Node) => 20 + (2 * d.group + 1);
  const colour = scaleSequential()
    .domain([0, 10])
    .interpolator(interpolateRainbow);
  const ref = useRef<SVGSVGElement>();

  useEffect(() => {
    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;

    const svg = select(ref.current);
    const g = svg.append("g").attr("cursor", "grab");
    svg.call(
      zoom()
        .on("zoom", ({ transform }) => g.attr("transform", transform))
        .scaleExtent([0.8, 40])
    );

    // create force simulation
    forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-39))
      .force(
        "link",
        forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("center", forceCenter(width / 2, height / 2))
      .force("collision", forceCollide().radius(40))
      .on("tick", () => {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);

        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
      });

    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")

      .attr("marker-end", "url(#arrow)")
      .style("stroke", "#999999")
      .style("stroke-opacity", 0.6)
      .style("stroke-width", (d) => Math.sqrt(d.value));

    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => "translate(" + [d.x, d.y] + ")")
      .call(
        drag().on("drag", (event, d: any) => {
          d.x = event.x;
          d.y = event.y;
          select(this)
            .raise()
            .attr("transform", (d: any) => "translate(" + [d.x, d.y] + ")");
        })
      );

    // add circles
    node
      .append("circle")
      .attr("r", nodeSize)
      .style("fill", (d) => colour(d.group));

    // add labels to circles
    node
      .append("text")
      .text((node) => node.id)
      .attr("font-size", 15)
      .attr("dx", (d) => nodeSize(d) / 2 + 15)
      .attr("dy", (d) => nodeSize(d) / 2 - 5);

    return () => {
      svg.selectAll("g").remove();
    };
  }, [nodes, links]);

  return (
    <svg
      style={{
        flexGrow: 1,
      }}
      ref={ref}
    >
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
