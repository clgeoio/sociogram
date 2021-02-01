import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Text,
  Stack,
} from "@chakra-ui/react";
import React, { Fragment, useRef, useState } from "react";
import { Node } from "../components/types";

interface AddControlsProps {
  nodes: Node[];
  onNodeSubmit: (nodeId: string) => void;
  onLinkSubmit: (fromNodeId: string, toNodeId: string) => void;
}

const AddControls: React.FunctionComponent<AddControlsProps> = ({
  nodes,
  onNodeSubmit,
  onLinkSubmit,
}) => {
  const [newNode, setNewNode] = useState("");
  const fromLinkRef = useRef<HTMLSelectElement>();
  const toLinkRef = useRef<HTMLSelectElement>();

  const handleNodeSubmit = () => {
    onNodeSubmit(newNode);
    setNewNode("");
  };

  const handleLinkSubmit = () => {
    if (
      toLinkRef.current.value &&
      toLinkRef.current.value != fromLinkRef.current.value
    ) {
      onLinkSubmit(fromLinkRef.current.value, toLinkRef.current.value);
    }
  };
  return (
    <Fragment>
      <FormControl>
        <FormLabel fontSize="sm">Add new person</FormLabel>
        <Stack direction={{ base: "column", md: "row" }}>
          <Input
            backgroundColor="white"
            borderRadius={4}
            size="sm"
            placeholder="Jane Smith"
            type="text"
            value={newNode}
            onChange={(e) => setNewNode(e.target.value)}
          />
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={handleNodeSubmit}
          >
            Add Person
          </Button>
        </Stack>
      </FormControl>

      <FormControl marginTop={5}>
        <FormLabel fontSize="sm">Add relationship</FormLabel>
        <Stack direction={{ base: "column", md: "row" }}>
          <Select
            ref={fromLinkRef}
            size="sm"
            backgroundColor="white"
            borderRadius={4}
            placeholder="Select person..."
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.id}
              </option>
            ))}
          </Select>
          <Text>likes</Text>
          <Select
            ref={toLinkRef}
            size="sm"
            backgroundColor="white"
            borderRadius={4}
            placeholder="Select person..."
          >
            {nodes.length > 1 &&
              nodes.reverse().map((node) => (
                <option key={node.id} value={node.id}>
                  {node.id}
                </option>
              ))}
          </Select>
          <Button
            size="sm"
            minWidth="fit-content"
            colorScheme="blue"
            variant="outline"
            onClick={handleLinkSubmit}
          >
            Add Relationship
          </Button>
        </Stack>
      </FormControl>
    </Fragment>
  );
};

export { AddControls };
export type { AddControlsProps };
