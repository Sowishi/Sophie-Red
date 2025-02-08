import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useUserStore from "./utils/zustand";
import Login from "./pages/login";
import Index from "./pages/dashboard";
import Room from "./pages/dashboard/room";
import FrontDesk from "./pages/dashboard/frontDesk";
import Booking from "./pages/client/booking";
import Landing from "./pages/landing";
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
import ClientDashboardRoom from "./pages/client/clientDashboardRoom";
import ClientDashboard from "./pages/client/clientDashboard";

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

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      window.history.pushState(null, "", window.location.href);
      window.history.go(1); // Keeps the user on the current page
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const renderRoute = (path, element, condition = true) => (
    <Route path={path} element={condition ? element : <Landing />} />
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/client-dashboard-room"
          element={<ClientDashboardRoom />}
        />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/client-room" element={<ClientRoom />} />
        {renderRoute("/booking", <Booking />, currentUser)}
        {renderRoute("/event-booking", <EventBooking />, currentUser)}
        {renderRoute("/dashboard", <Index />, currentAdmin)}
        {renderRoute("/voucher", <Voucher />, currentAdmin)}
        {renderRoute("/feedback", <Feedback />, currentAdmin)}
        {renderRoute("/room", <Room />, currentAdmin)}
        {renderRoute("/users", <Users />, currentAdmin)}
        {renderRoute("/front-desk", <FrontDesk />, currentAdmin)}
        {renderRoute("/payments", <Payments />, currentAdmin)}
        {renderRoute("/booking-history", <BookingHistory />, currentAdmin)}
        {renderRoute("/reports", <Reports />, currentAdmin)}
        {renderRoute("/housekeeping", <Housekeeping />, currentAdmin)}
        {renderRoute("/housekeeper", <Housekeeper />, currentAdmin)}
        {renderRoute("/housekeeper-list", <HousekeeperList />, currentAdmin)}
        {renderRoute("/guest-request", <GuestRequest />, currentAdmin)}
        <Route path="/" element={<Landing />} />
      </Routes>
      <ToastContainer position="top-right" theme="light" />
    </BrowserRouter>
  );
};

export default App;
