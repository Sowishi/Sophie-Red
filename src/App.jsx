import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Index from "./pages/dashboard";
import Room from "./pages/dashboard/room";
import FrontDesk from "./pages/dashboard/frontDesk";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/room" element={<Room />} />
        <Route path="/front-desk" element={<FrontDesk />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
