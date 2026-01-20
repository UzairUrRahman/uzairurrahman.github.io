import { Link } from "react-router-dom";
import { docs } from "../utils/docsIndex";

export default function Sidebar() {
  return (
    <div style={{ width: 260, padding: 20, borderRight: "1px solid #ddd" }}>
      <h3>Tutorials</h3>

      {docs.map(doc => (
        <div key={doc.slug} style={{ marginBottom: 10 }}>
          <Link to={`/docs/${doc.slug}`}>{doc.title}</Link>
        </div>
      ))}
    </div>
  );
}
