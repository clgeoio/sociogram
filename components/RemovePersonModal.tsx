import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { Node } from "../types";

interface RemovePersonModalProps {
  nodes: Node[];
  onNodeRemove: (nodeId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const RemovePersonModal: React.FunctionComponent<RemovePersonModalProps> = ({
  nodes,
  onNodeRemove,
  isOpen,
  onClose,
}) => {
  const removeNodeRef = useRef<HTMLSelectElement>();

  const handleNodeRemove = () => {
    if (removeNodeRef.current.value) {
      onNodeRemove(removeNodeRef.current.value);
    }
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove New Person</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel fontSize="sm">Remove person</FormLabel>

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
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            minWidth="fit-content"
            colorScheme="red"
            variant="outline"
            onClick={handleNodeRemove}
          >
            Remove Person
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { RemovePersonModal };
