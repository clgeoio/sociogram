import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { Node } from "../types";

interface AddRelationshipModalProps {
  nodes: Node[];
  onLinkSubmit: (fromNodeId: string, toNodeId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AddRelationshipModal: React.FunctionComponent<AddRelationshipModalProps> = ({
  isOpen,
  onClose,
  nodes,
  onLinkSubmit,
}) => {
  const fromLinkRef = useRef<HTMLSelectElement>();
  const toLinkRef = useRef<HTMLSelectElement>();

  const handleLinkSubmit = () => {
    if (
      toLinkRef.current.value &&
      toLinkRef.current.value != fromLinkRef.current.value
    ) {
      onLinkSubmit(fromLinkRef.current.value, toLinkRef.current.value);
    }
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Relationship</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel fontSize="sm">Select Person:</FormLabel>
            <Select
              ref={fromLinkRef}
              size="sm"
              backgroundColor="white"
              borderRadius={4}
              placeholder="Select person..."
            >
              {nodes
                .sort((a, b) => (a.id < b.id ? -1 : 1))
                .map((node) => (
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
                nodes
                  .sort((a, b) => (a.id < b.id ? -1 : 1))
                  .map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.id}
                    </option>
                  ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            minWidth="fit-content"
            colorScheme="blue"
            variant="outline"
            onClick={handleLinkSubmit}
          >
            Add Relationship
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddRelationshipModal };
