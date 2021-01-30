import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRef, useState } from "react";
import { Graph, Node, Link } from "../components/Graph";

const WIDTH = 500;
const HEIGHT = 500;

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
    <div className={styles.container}>
      <Head>
        <title>Sociogram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Graph width={WIDTH} height={HEIGHT} nodes={nodes} links={links} />
      </main>
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
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
