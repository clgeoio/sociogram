import Head from "next/head";
import { useRef, useState } from "react";
import { Graph } from "../components/Graph";
import { Link, Node } from "../components/types";

const Home: React.FunctionComponent = () => {
  const [newNode, setNewNode] = useState("");
  const fromLinkRef = useRef<HTMLSelectElement>();
  const toLinkRef = useRef<HTMLSelectElement>();
  const [links, setLinks] = useState<Link[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);

  const handlePersonSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    setNodes([
      ...nodes,
      {
        id: newNode,
        group: 0,
      },
    ]);
    setNewNode("");
  };

  const handleLinkSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (
      toLinkRef.current.value &&
      toLinkRef.current.value != fromLinkRef.current.value
    ) {
      setLinks([
        ...links,
        {
          source: fromLinkRef.current.value,
          target: toLinkRef.current.value,
          value: 1,
        },
      ]);
      const nodeCopy = nodes.slice();
      const nodeIndex = nodeCopy.findIndex(
        (node) => node.id === toLinkRef.current.value
      );
      nodeCopy[nodeIndex].group++;
      setNodes(nodeCopy);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Head>
        <title>Sociogram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Graph nodes={nodes} links={links} />

      <div>
        <form onSubmit={handlePersonSubmit}>
          <label>
            New Person:{" "}
            <input
              type="text"
              value={newNode}
              onChange={(e) => setNewNode(e.target.value)}
            />{" "}
          </label>
          <input type="submit" value="Add" />
        </form>

        <form onSubmit={handleLinkSubmit}>
          <label>
            From:{" "}
            <select ref={fromLinkRef}>
              {nodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.id}
                </option>
              ))}
            </select>
          </label>
          <label>
            To:{" "}
            <select ref={toLinkRef}>
              {nodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.id}
                </option>
              ))}
            </select>
          </label>
          <input type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
};

export default Home;
