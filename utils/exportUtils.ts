import { snakeCase } from "lodash";
import { Link, Node } from "../types";

const handleExport = (title: string, nodes: Node[], links: Link[]) => {
  const fileName = `${
    title ? snakeCase(title) : "sociogram"
  }-${Date.now()}.sociogram`;

  const json = JSON.stringify({
    title,
    links: links,
    nodes: nodes,
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

const handlePdfExport = (
  title: string,
  svgRef: React.MutableRefObject<SVGSVGElement>
) => {
  const svg = svgRef.current.outerHTML;
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

export { handleExport, handlePdfExport };
