import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Docs from "./pages/Docs";
import { docs } from "./utils/docsIndex";
import "./styles/markdown.css";


export default function App() {
  return (
    <HashRouter>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/docs/${docs[0].slug}`} />}
          />
          <Route path="/docs/:slug" element={<Docs />} />
        </Routes>
      </div>
    </HashRouter>
  );
}