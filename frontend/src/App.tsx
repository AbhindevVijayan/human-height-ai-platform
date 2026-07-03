import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Train from "./pages/Train";
import About from "./pages/About";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout> <Dashboard />  </Layout>} />
        <Route path="/history" element={<Layout><History />  </Layout>} />
        <Route path="/train" element={<Layout> <Train />   </Layout>} />
        <Route path="/about" element={<Layout> <About />  </Layout>} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;