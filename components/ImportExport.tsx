import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Link, Node } from "../components/types";
import { snakeCase } from "lodash";

interface ImportExportProps {
  title: string;
  links: Link[];
  nodes: Node[];
  onImport: (title: string, links: Link[], nodes: Node[]) => void;
}

const ImportExport: React.FunctionComponent<ImportExportProps> = ({
  title,
  links,
  nodes,
  onImport,
}) => {
  const ref = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);
  const handleExport = () => {
    const fileName = `${
      title ? snakeCase(title) : "sociogram"
    }-${Date.now()}.sociogram`;

    const json = JSON.stringify({
      title,
      links,
      nodes,
    });
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const handlePdf = () => {
    const svg = document.getElementById("svg").outerHTML;

    const data = JSON.stringify({ svg, title });
    const xhttp = new XMLHttpRequest();

    xhttp.responseType = "arraybuffer";
    xhttp.open("POST", "/api/pdf", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Accept", "application/json, text/plain, */*");
    xhttp.send(data);
    xhttp.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        const pdfBlob = new Blob([xhttp.response], { type: "application/pdf" });
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url);
      }
    };
  };

  return (
    <Flex>
      <Input
        type="file"
        accept=".sociogram"
        display="none"
        ref={ref}
        onChange={handleUpload}
      />
      <Button
        colorScheme="blue"
        marginRight={5}
        onClick={handleImportClick}
        size="sm"
      >
        {loading ? <Spinner /> : "Import"}
      </Button>
      <Button
        colorScheme="green"
        marginRight={5}
        onClick={handleExport}
        size="sm"
      >
        Export
      </Button>

      <Button
        colorScheme="green"
        variant="outline"
        onClick={handlePdf}
        size="sm"
      >
        PDF
      </Button>
    </Flex>
  );
};

export { ImportExport };
