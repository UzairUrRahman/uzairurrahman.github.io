import { Link } from "react-router-dom";

const items = [
  { name: "Apache Installation", path: "apache" },
  { name: "Docker Installation", path: "docker" },
];

export default function Sidebar() {
  return (
    <div style={{ width: 250, padding: 20, borderRight: "1px solid #ddd" }}>
      <h3>Tutorials</h3>
      {items.map((item) => (
        <div key={item.path} style={{ margin: "10px 0" }}>
          <Link to={`/docs/${item.path}`}>{item.name}</Link>
        </div>
      ))}
    </div>
  );
}
