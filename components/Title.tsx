import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton, Input } from "@chakra-ui/react";

import React, { useState, Fragment } from "react";
interface TitleProps {
  handleTitleSet: (title: string) => void;
  title: string;
}

const Title: React.FunctionComponent<TitleProps> = ({
  handleTitleSet,
  title,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);
  const handleSet = () => {
    handleTitleSet(newTitle);
    setNewTitle("");
    setEditing(false);
    setShowEdit(false);
  };

  return (
    <Flex>
      {editing ? (
        <Fragment>
          <Input
            size="sm"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            maxWidth={250}
          />
          <IconButton
            size="sm"
            aria-label="Set title"
            icon={<CheckIcon />}
            onClick={handleSet}
          />
        </Fragment>
      ) : (
        <Flex
          onMouseEnter={() => setShowEdit(true)}
          onMouseLeave={() => setShowEdit(false)}
          onClick={() => setEditing(true)}
          placeItems="center"
        >
          <Heading size="md" color="gray.500">
            {title || "Click to add a title..."}
          </Heading>
          {showEdit && <EditIcon marginLeft={2} color="gray.500" />}
        </Flex>
      )}
    </Flex>
  );
};

export { Title };
