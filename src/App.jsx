import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const App = () => {
  const initializeUser = useUserStore((state) => state.initializeUser);
  useEffect(() => {
    initializeUser(); // Restore user state
  }, [initializeUser]);
  const { currentUser } = useUserStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/room" element={<Room />} />
        <Route path="/front-desk" element={<FrontDesk />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />

        <Route
          path="/booking"
          element={currentUser ? <Booking /> : <Landing />}
        />
        <Route path="/" element={<Landing />} />
      </Routes>
      <ToastContainer position="top-right" theme="light" />
    </BrowserRouter>
  );
};

export default App;
