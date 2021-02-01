import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  DownloadIcon,
} from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { Import } from "../components/Import";
import { Link, Node } from "../types";

interface MainMenuProps {
  onAddPersonOpen: () => void;
  onAddRelationshipOpen: () => void;
  onRemovePersonOpen: () => void;
  onRemoveRelationshipOpen: () => void;
  onImport: (title: string, links: Link[], nodes: Node[]) => void;
  onExport: () => void;
  onExportPdf: () => void;
}

const MainMenu: React.FunctionComponent<MainMenuProps> = ({
  onAddPersonOpen,
  onAddRelationshipOpen,
  onRemovePersonOpen,
  onRemoveRelationshipOpen,
  onImport,
  onExport,
  onExportPdf,
}) => {
  return (
    <Fragment>
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={<AddIcon />}
          rightIcon={<ChevronDownIcon />}
          colorScheme="teal"
          size="sm"
        >
          Add
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onAddPersonOpen}>Person</MenuItem>
          <MenuItem onClick={onAddRelationshipOpen}>Relationship</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          marginLeft={2}
          as={Button}
          leftIcon={<DeleteIcon />}
          rightIcon={<ChevronDownIcon />}
          colorScheme="red"
          variant="outline"
          size="sm"
        >
          Remove
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onRemovePersonOpen}>Person</MenuItem>
          <MenuItem onClick={onRemoveRelationshipOpen}>Relationship</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          marginLeft={2}
          as={Button}
          leftIcon={<DownloadIcon />}
          rightIcon={<ChevronDownIcon />}
          size="sm"
        >
          Tools
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Import onImport={onImport} />
          </MenuItem>
          <MenuItem onClick={onExport}>Export</MenuItem>
          <MenuItem onClick={onExportPdf}>Export PDF</MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );
};

export { MainMenu };
