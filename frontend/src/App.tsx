import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Train from "./pages/Train";
import About from "./pages/About";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminHistory from "./pages/admin/History";
import Dataset from "./pages/admin/Dataset";
import Training from "./pages/admin/Training";
import Settings from "./pages/admin/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* User */}

        <Route
          path="/"
          element={<Layout><Dashboard /></Layout>}
        />

        <Route
          path="/history"
          element={<Layout><History /></Layout>}
        />

        <Route
          path="/train"
          element={<Layout><Train /></Layout>}
        />

        <Route
          path="/about"
          element={<Layout><About /></Layout>}
        />

        {/* Admin */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/history"
          element={<AdminHistory />}
        />

        <Route
          path="/admin/dataset"
          element={<Dataset />}
        />

        <Route
          path="/admin/training"
          element={<Training />}
        />

        <Route
          path="/admin/settings"
          element={<Settings />}
        />

        <Route
          path="/Login"
          element={<Layout><Login /></Layout>}
        />

        <Route
          path="/register"
          element={<Layout><Register /></Layout>}
        />


      </Routes>

    </BrowserRouter>

  );

}

export default App;