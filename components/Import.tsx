import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Link, Node } from "../components/types";

interface ImportProps {
  onImport: (title: string, links: Link[], nodes: Node[]) => void;
}

const Import: React.FunctionComponent<ImportProps> = ({ onImport }) => {
  const ref = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);
  const handleImportClick = () => {
    ref.current.value = "";
    ref.current.click();
  };

  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoading(true);

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      const res = JSON.parse(e.target.result.toString());
      onImport(res.title, res.links, res.nodes);
      setLoading(false);
    });

    reader.addEventListener("error", (e) => {
      setLoading(false);
    });
    reader.readAsText(e.target.files[0]);
  };

  return (
    <Flex onClick={handleImportClick}>
      <Input
        type="file"
        accept=".sociogram"
        display="none"
        ref={ref}
        onChange={handleUpload}
      />
      {loading ? <Spinner /> : "Import"}
    </Flex>
  );
};

export { Import };
