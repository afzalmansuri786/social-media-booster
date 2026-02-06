import { BrowserRouter, Routes, Route } from "react-router-dom";
import Campaigns from "./pages/Campaigns";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
      </Routes>
    </BrowserRouter>
  );
}
