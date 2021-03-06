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
            >
              {links
                .map((link) => ({
                  ...link,
                  format: `${link.source.id} likes ${link.target.id}`,
                }))
                .sort((a, b) => (a.format < b.format ? -1 : 1))
                .map((link) => {
                  return (
                    <option key={link.format} data-id={link.id}>
                      {link.format}
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
