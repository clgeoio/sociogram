import { Box, Flex, Heading } from "@chakra-ui/react";
import { snakeCase } from "lodash";
import Head from "next/head";
import React, { useState } from "react";
import { AddControls } from "../components/AddControls";
import { Graph } from "../components/Graph";
import { ImportExport } from "../components/ImportExport";
import { RemoveControls } from "../components/RemoveControls";
import { Title } from "../components/Title";
import { Link, Node } from "../components/types";

const updateNodeGroupValue = (nodes: Node[], nodeId: string, value: number) => {
  const nodeCopy = nodes.slice();
  const nodeIndex = nodeCopy.findIndex((node) => node.id === nodeId);
  if (nodeCopy[nodeIndex]) {
    nodeCopy[nodeIndex].group += value;
  }

  return nodeCopy;
};

interface Data {
  links: Link[];
  nodes: Node[];
}

const Home: React.FunctionComponent = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState<Data>({
    links: [],
    nodes: [],
  });

  const handleNodeSubmit = (nodeId: string) => {
    setData({
      nodes: [
        ...data.nodes,
        {
          id: nodeId,
          group: 0,
        },
      ],
      links: data.links,
    });
  };

  const handleNodeRemove = (nodeId: string) => {
    setData({
      links: data.links.filter(
        (link) => link.source.id != nodeId && link.target.id != nodeId
      ),
      nodes: data.nodes.filter((node) => node.id !== nodeId),
    });
  };

  const handleLinkSubmit = (fromNodeId: string, toNodeId: string) => {
    setData({
      links: [
        ...data.links,
        {
          source: data.nodes.find((node) => node.id === fromNodeId),
          target: data.nodes.find((node) => node.id === toNodeId),
          value: 1,
          id: snakeCase(`${fromNodeId}_${toNodeId}`),
        },
      ],
      nodes: updateNodeGroupValue(data.nodes, toNodeId, 1),
    });
  };

  const handleLinkRemove = (linkId: string) => {
    setData({
      nodes: updateNodeGroupValue(
        data.nodes,
        data.links.find((l) => l.id === linkId).target.id,
        -1
      ),
      links: data.links.filter((link) => link.id != linkId),
    });
  };

  const handleImport = (title: string, links: Link[], nodes: Node[]) => {
    setTitle(title);
    setData({
      nodes,
      links: links.map((link) => ({
        ...link,
        source: nodes.find((node) => node.id === link.source.id),
        target: nodes.find((node) => node.id === link.target.id),
      })),
    });
  };

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Head>
        <title>Sociogram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex margin={5} justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading>Sociogram</Heading>
          <Title title={title} handleTitleSet={(value) => setTitle(value)} />
        </Flex>
        <ImportExport
          title={title}
          nodes={data.nodes}
          links={data.links}
          onImport={handleImport}
        />
      </Flex>

      <Graph links={data.links} nodes={data.nodes} />

      <Flex justifyContent="space-between" backgroundColor="gray.100">
        <Box margin={5} padding={2} width="50%" borderRadius={4}>
          <AddControls
            nodes={data.nodes}
            onNodeSubmit={handleNodeSubmit}
            onLinkSubmit={handleLinkSubmit}
          />
        </Box>

        <Box margin={5} padding={2} width="50%" borderRadius={4}>
          <RemoveControls
            nodes={data.nodes}
            links={data.links}
            onNodeRemove={handleNodeRemove}
            onLinkRemove={handleLinkRemove}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
