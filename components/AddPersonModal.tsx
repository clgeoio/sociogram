import React, { useState } from "react";
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
  Input,
} from "@chakra-ui/react";

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNodeSubmit: (nodeId: string) => void;
}

const AddPersonModal: React.FunctionComponent<AddPersonModalProps> = ({
  isOpen,
  onClose,
  onNodeSubmit,
}) => {
  const [newNode, setNewNode] = useState("");
  const handleNodeSubmit = () => {
    const value = newNode.trim();
    if (value) {
      onNodeSubmit(newNode);
      setNewNode("");
    }
  };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      useInert={false}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Person</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel fontSize="sm">Name:</FormLabel>
            <Input
              backgroundColor="white"
              borderRadius={4}
              size="sm"
              placeholder="Jane Smith"
              type="text"
              value={newNode}
              onChange={(e) => setNewNode(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleNodeSubmit();
                }
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            onClick={handleNodeSubmit}
          >
            Add Person
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddPersonModal };
