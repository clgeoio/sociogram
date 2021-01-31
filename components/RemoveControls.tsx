import {
  FormControl,
  FormLabel,
  Stack,
  Select,
  Button,
} from "@chakra-ui/react";
import React, { Fragment, useRef } from "react";
import { Link, Node } from "../components/types";

interface RemoveControlsProps {
  nodes: Node[];
  links: Link[];
  onNodeRemove: (nodeId: string) => void;
  onLinkRemove: (linkId: string) => void;
}

const RemoveControls: React.FunctionComponent<RemoveControlsProps> = ({
  nodes,
  links,
  onNodeRemove,
  onLinkRemove,
}) => {
  const removeNodeRef = useRef<HTMLSelectElement>();
  const removeLinkRef = useRef<HTMLSelectElement>();

  const handleNodeRemove = () => {
    if (removeNodeRef.current.value) {
      onNodeRemove(removeNodeRef.current.value);
    }
  };

  const handleLinkRemove = () => {
    if (removeLinkRef.current.value) {
      const option =
        removeLinkRef.current.options[removeLinkRef.current.selectedIndex];
      const id = option.getAttribute("data-id");
      onLinkRemove(id);
    }
  };

  return (
    <Fragment>
      <FormControl>
        <FormLabel fontSize="sm">Remove person</FormLabel>
        <Stack direction={{ base: "column", md: "row" }}>
          <Select
            ref={removeNodeRef}
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
          <Button
            size="sm"
            minWidth="fit-content"
            colorScheme="red"
            variant="outline"
            onClick={handleNodeRemove}
          >
            Remove Person
          </Button>
        </Stack>
      </FormControl>

      <FormControl marginTop={5}>
        <FormLabel fontSize="sm">Remove Relationship</FormLabel>
        <Stack direction={{ base: "column", md: "row" }}>
          <Select
            ref={removeLinkRef}
            size="sm"
            backgroundColor="white"
            borderRadius={4}
            placeholder="Select relationship..."
            onChange={(e) => console.log(e.target.selectedIndex)}
          >
            {links.map((link) => {
              const format = `${link.source.id} likes ${link.target.id}`;
              return (
                <option key={format} data-id={link.id}>
                  {format}
                </option>
              );
            })}
          </Select>
          <Button
            size="sm"
            minWidth="fit-content"
            colorScheme="red"
            variant="outline"
            onClick={handleLinkRemove}
          >
            Remove Relationship
          </Button>
        </Stack>
      </FormControl>
    </Fragment>
  );
};

export { RemoveControls };
