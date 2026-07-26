import { Routes, Route, HashRouter } from "react-router";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Settings from "./pages/Settings";
import ThemeManager from "./components/ThemeManager";

function App() {
  return (
    <>
      <HashRouter>
        <ThemeManager />
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/students" element={<Students />} />

          <Route path="/settings" element={<Settings />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
