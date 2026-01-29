import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { docs } from "../utils/docsIndex";

export default function Docs() {
  const { slug } = useParams();
  const doc = docs.find(d => d.slug === slug);

  if (!doc) return <div>Document not found</div>;

return (
  <div className="markdown">
    <ReactMarkdown>{doc.content}</ReactMarkdown>
  </div>
);
}