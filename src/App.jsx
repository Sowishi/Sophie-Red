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
import ClientRoom from "./pages/client/clientRoom";
import Reports from "./pages/dashboard/reports";
import EventBooking from "./pages/client/eventBooking";
import Voucher from "./pages/dashboard/voucher";
import Feedback from "./pages/dashboard/feedback";
import SignUp from "./pages/signup";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import HousekeeperList from "./pages/dashboard/housekeepersList";
import GuestRequest from "./pages/dashboard/guest-request";
import BookingHistory from "./pages/dashboard/bookingHistory";

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/client-room" element={<ClientRoom />} />
        <Route
          path="/booking"
          element={currentUser ? <Booking /> : <Landing />}
        />
        <Route
          path="/event-booking"
          element={currentUser ? <EventBooking /> : <Landing />}
        />
        <Route
          path="/dashboard"
          element={currentAdmin ? <Index /> : <Landing />}
        />
        <Route
          path="/voucher"
          element={currentAdmin ? <Voucher /> : <Landing />}
        />
        <Route
          path="/feedback"
          element={currentAdmin ? <Feedback /> : <Landing />}
        />
        <Route path="/room" element={currentAdmin ? <Room /> : <Landing />} />
        <Route path="/users" element={currentAdmin ? <Users /> : <Landing />} />
        <Route
          path="/front-desk"
          element={currentAdmin ? <FrontDesk /> : <Landing />}
        />
        <Route
          path="/payments"
          element={currentAdmin ? <Payments /> : <Landing />}
        />{" "}
        <Route
          path="/booking-history"
          element={currentAdmin ? <BookingHistory /> : <Landing />}
        />
        <Route
          path="/reports"
          element={currentAdmin ? <Reports /> : <Landing />}
        />
        <Route
          path="/housekeeping"
          element={currentAdmin ? <Housekeeping /> : <Landing />}
        />
        <Route
          path="/housekeeper"
          element={currentAdmin ? <Housekeeper /> : <Landing />}
        />
        <Route
          path="/housekeeper-list"
          element={currentAdmin ? <HousekeeperList /> : <Landing />}
        />
        <Route
          path="/guest-request"
          element={currentAdmin ? <GuestRequest /> : <Landing />}
        />
        <Route path="/" element={<Landing />} />
      </Routes>
      <ToastContainer position="top-right" theme="light" />
    </BrowserRouter>
  );
};

export default App;
