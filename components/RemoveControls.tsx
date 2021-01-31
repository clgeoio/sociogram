import {
  FormControl,
  FormLabel,
  HStack,
  Select,
  Button,
} from "@chakra-ui/react";
import React, { Fragment, useRef } from "react";
import { Link, Node } from "../components/types";

interface RemoveControlsProps {
  nodes: Node[];
  links: Link[];
  onNodeRemove: (nodeId: string) => void;
  onLinkRemove: (linkIndex: Link) => void;
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
      onLinkRemove(links[removeLinkRef.current.value]);
    }
  };

  return (
    <Fragment>
      <FormControl>
        <FormLabel fontSize="sm">Remove person</FormLabel>
        <HStack>
          <Select
            ref={removeNodeRef}
            size="sm"
            backgroundColor="white"
            borderRadius={4}
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
        </HStack>
      </FormControl>

      <FormControl marginTop={5}>
        <FormLabel fontSize="sm">Remove Relationship</FormLabel>
        <HStack>
          <Select
            ref={removeLinkRef}
            size="sm"
            backgroundColor="white"
            borderRadius={4}
          >
            {links.map((link) => {
              const format = `${link.source.id} likes ${link.target.id}`;
              return (
                <option key={format} value={link.index}>
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
        </HStack>
      </FormControl>
    </Fragment>
  );
};

export { RemoveControls };
