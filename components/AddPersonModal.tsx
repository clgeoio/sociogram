import React, { useState } from "react";
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
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface AddPersonModalProps {
  onNodeSubmit: (nodeId: string) => void;
}

const AddPersonModal: React.FunctionComponent<AddPersonModalProps> = ({
  onNodeSubmit,
}) => {
  const [newNode, setNewNode] = useState("");

  const handleNodeSubmit = () => {
    onNodeSubmit(newNode);
    setNewNode("");
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text onClick={onOpen}>Person</Text>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
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
    </>
  );
};

export { AddPersonModal };
