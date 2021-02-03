import {
  Flex,
  Heading,
  Box,
  useDisclosure,
  Text,
  Center,
  Link as LinkComponent,
} from "@chakra-ui/react";
import { snakeCase } from "lodash";
import Head from "next/head";
import React, { useRef, useState } from "react";
import { AddPersonModal } from "../components/AddPersonModal";
import { AddRelationshipModal } from "../components/AddRelationshipModal";
import { Graph } from "../components/Graph";
import { Title } from "../components/Title";
import { Link, Node } from "../types";
import { RemovePersonModal } from "../components/RemovePersonModal";
import { RemoveRelationshipModal } from "../components/RemoveRelationshipModal";
import { MainMenu } from "../components/MainMenu";
import { handleExport, handlePdfExport } from "../utils/exportUtils";
import { link, linkSync } from "fs";

const updateNodeGroupValue = (nodes: Node[], nodeId: string, value: number) => {
  const nodeCopy = nodes.slice();
  const nodeIndex = nodeCopy.findIndex((node) => node.id === nodeId);
  if (nodeCopy[nodeIndex]) {
    nodeCopy[nodeIndex].group += value;
  }

  return nodeCopy;
};

const updateNodesGroupValue = (
  nodes: Node[],
  nodeIds: string[],
  value: number
) => {
  const nodeCopy = nodes.slice();
  for (const nodeId of nodeIds) {
    const nodeIndex = nodeCopy.findIndex((node) => node.id === nodeId);
    if (nodeCopy[nodeIndex]) {
      nodeCopy[nodeIndex].group += value;
    }
  }

  return nodeCopy;
};

interface Data {
  links: Link[];
  nodes: Node[];
}

const Home: React.FunctionComponent = () => {
  const {
    isOpen: isAddPersonOpen,
    onOpen: onAddPersonOpen,
    onClose: onAddPersonClose,
  } = useDisclosure();
  const {
    isOpen: isAddRelationshipOpen,
    onOpen: onAddRelationshipOpen,
    onClose: onAddRelationshipClose,
  } = useDisclosure();
  const {
    isOpen: isRemovePersonOpen,
    onOpen: onRemovePersonOpen,
    onClose: onRemovePersonClose,
  } = useDisclosure();
  const {
    isOpen: isRemoveRelationshipOpen,
    onOpen: onRemoveRelationshipOpen,
    onClose: onRemoveRelationshipClose,
  } = useDisclosure();

  const svgRef = useRef<SVGSVGElement>();
  const [title, setTitle] = useState("");
  const [data, setData] = useState<Data>({
    links: [],
    nodes: [],
  });

  const handleNodeSubmit = (nodeId: string) => {
    if (data.nodes.some((node) => node.id === nodeId)) {
      return;
    }

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
    const nodesToChange = data.links
      .filter((link) => link.source.id === nodeId)
      .map((link) => link.target.id);

    setData({
      links: data.links.filter(
        (link) => link.source.id != nodeId && link.target.id != nodeId
      ),
      nodes: updateNodesGroupValue(
        data.nodes.filter((node) => node.id !== nodeId),
        nodesToChange,
        -1
      ),
    });
  };

  const handleLinkSubmit = (fromNodeId: string, toNodeId: string) => {
    if (
      data.links.some(
        (link) => link.source.id === fromNodeId && link.target.id === toNodeId
      )
    ) {
      return;
    }

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
        <title>Sociogram.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        margin={5}
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Flex flexDirection="column">
          <Heading>Sociogram.me</Heading>
          <Title title={title} handleTitleSet={(value) => setTitle(value)} />
        </Flex>
        <Box marginTop={{ base: 2, md: 5 }}>
          <MainMenu
            onAddPersonOpen={onAddPersonOpen}
            onAddRelationshipOpen={onAddRelationshipOpen}
            onRemovePersonOpen={onRemovePersonOpen}
            onRemoveRelationshipOpen={onRemoveRelationshipOpen}
            onImport={handleImport}
            onExport={() => handleExport(title, data.nodes, data.links)}
            onExportPdf={() => handlePdfExport(title, svgRef)}
          />
        </Box>
      </Flex>

      <Graph links={data.links} nodes={data.nodes} svgRef={svgRef}>
        <svg
          id="svg"
          style={{
            flexGrow: 1,
          }}
          ref={svgRef}
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
      </Graph>

      <AddPersonModal
        isOpen={isAddPersonOpen}
        onClose={onAddPersonClose}
        onNodeSubmit={handleNodeSubmit}
      />
      <AddRelationshipModal
        isOpen={isAddRelationshipOpen}
        onClose={onAddRelationshipClose}
        nodes={data.nodes}
        onLinkSubmit={handleLinkSubmit}
      />
      <RemovePersonModal
        isOpen={isRemovePersonOpen}
        onClose={onRemovePersonClose}
        nodes={data.nodes}
        onNodeRemove={handleNodeRemove}
      />
      <RemoveRelationshipModal
        isOpen={isRemoveRelationshipOpen}
        onClose={onRemoveRelationshipClose}
        links={data.links}
        onLinkRemove={handleLinkRemove}
      />
      <Center width="100%" marginBottom={2}>
        <Text fontSize="sm">
          A <LinkComponent href="https://clgeo.io">clgeo.io</LinkComponent>{" "}
          creation
        </Text>
      </Center>
    </Flex>
  );
};

export default Home;
