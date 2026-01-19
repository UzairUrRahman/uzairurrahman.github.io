import { useParams } from "react-router-dom";
import MarkdownViewer from "../components/MarkdownViewer";

export default function Docs() {
  const { topic } = useParams();

  const map = {
    apache: "apache.md",
    docker: "docker.md",
  };

  if (!map[topic]) return <div>Tutorial not found</div>;

  return (
    <div style={{ padding: 20, flex: 1 }}>
      <MarkdownViewer file={map[topic]} />
    </div>
  );
}
