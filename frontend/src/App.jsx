import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";
import Cars from "./pages/Cars/Cars";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";

import MyBookings from "./pages/MyBookings/MyBookings";
import MyCars from "./pages/MyCars/MyCars";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RoleRoute from "./components/RoleRoute/RoleRoute";

function App() {
  return (
    <Routes>

      {/* Public Pages */}
      <Route path="/" element={<MainLayout />}>

        <Route index element={<Home />} />

        <Route path="cars" element={<Cars />} />

        <Route path="login" element={<Login />} />

        <Route path="register" element={<Register />} />

        {/* Protected Pages */}
        <Route element={<ProtectedRoute />}>

          {/* Customer Routes */}
          <Route element={<RoleRoute allowedRoles={["customer"]} />}>
            <Route path="my-bookings" element={<MyBookings />} />
          </Route>

          {/* Agency Owner Routes */}
          <Route element={<RoleRoute allowedRoles={["agency"]} />}>
            <Route path="my-cars" element={<MyCars />} />
          </Route>

        </Route>

      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;