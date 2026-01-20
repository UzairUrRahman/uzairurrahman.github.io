import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Docs from "./pages/Docs";

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/docs/apache" />} />
          <Route path="/docs/:topic" element={<Docs />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
