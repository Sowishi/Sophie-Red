import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Index from "./pages/dashboard";
import Room from "./pages/dashboard/room";
import FrontDesk from "./pages/dashboard/frontDesk";
import { ToastContainer } from "react-toastify";
import Booking from "./pages/client/booking";
import Landing from "./pages/landing";
import useUserStore from "./utils/zustand";
import { useEffect } from "react";
import ClientDashboard from "./pages/client/clientDashboard";
import Users from "./pages/dashboard/users";
import Payments from "./pages/dashboard/payments";
import Housekeeping from "./pages/dashboard/housekeeping";
import Housekeeper from "./pages/dashboard/housekeeper";

const App = () => {
  const { currentUser, currentAdmin, setCurrentAdmin } = useUserStore();

  const initializeUser = useUserStore((state) => state.initializeUser);
  const getUserFromStorage = async () => {
    const res = localStorage.getItem("user");
    const user = await JSON.parse(res);
    if (user) {
      setCurrentAdmin(user);
    }
  };

  useEffect(() => {
    initializeUser();
    getUserFromStorage();
  }, [initializeUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={currentAdmin ? <Index /> : <Landing />}
        />
        <Route path="/room" element={currentAdmin ? <Room /> : <Landing />} />
        <Route path="/users" element={currentAdmin ? <Users /> : <Landing />} />
        <Route
          path="/front-desk"
          element={currentAdmin ? <FrontDesk /> : <Landing />}
        />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route
          path="/booking"
          element={currentUser ? <Booking /> : <Landing />}
        />
        <Route
          path="/payments"
          element={currentAdmin ? <Payments /> : <Landing />}
        />
        <Route
          path="/housekeeping"
          element={currentAdmin ? <Housekeeping /> : <Landing />}
        />
        <Route
          path="/housekeeper"
          element={currentAdmin ? <Housekeeper /> : <Landing />}
        />
        <Route path="/" element={<Landing />} />
      </Routes>
      <ToastContainer position="top-right" theme="light" />
    </BrowserRouter>
  );
};

export default App;
