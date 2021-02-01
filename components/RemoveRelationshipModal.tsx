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
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { Link, Node } from "../types";

interface RemoveRelationshipModalProps {
  links: Link[];
  onLinkRemove: (linkId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const RemoveRelationshipModal: React.FunctionComponent<RemoveRelationshipModalProps> = ({
  links,
  onLinkRemove,
  isOpen,
  onClose,
}) => {
  const removeLinkRef = useRef<HTMLSelectElement>();

  const handleLinkRemove = () => {
    if (removeLinkRef.current.value) {
      const option =
        removeLinkRef.current.options[removeLinkRef.current.selectedIndex];
      const id = option.getAttribute("data-id");
      onLinkRemove(id);
    }
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove New Relationship</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel fontSize="sm">Remove Relationship</FormLabel>

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
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            minWidth="fit-content"
            colorScheme="red"
            variant="outline"
            onClick={handleLinkRemove}
          >
            Remove Relationship
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { RemoveRelationshipModal };
