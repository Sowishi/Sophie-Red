import { Button } from "flowbite-react";
import ClientDashboardLayout from "./clientDashboardLayout";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../utils/zustand";
import { useEffect, useState } from "react";
import useCrudBooking from "../../hooks/useCrudBooking";

const ClientDashboard = () => {
  const navigation = useNavigate();
  const { currentUser } = useUserStore();
  const { fetchUserBooking } = useCrudBooking();
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchUserBooking(currentUser, setBookings);
    }
  }, [currentUser]);

  console.log(bookings);
  return (
    <ClientDashboardLayout>
      <div className="container mx-auto min-h-screen">
        <div className="header px-3 flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">Your Bookings</h1>
          <div className="wrapper  flex item s-center justify-center">
            <Button
              onClick={() => {
                navigation("/booking");
              }}
              gradientMonochrome="failure"
              className="mr-3"
            >
              Book Room{" "}
            </Button>
            <Button
              onClick={() => {
                navigation("/event-booking");
              }}
              gradientMonochrome="info"
            >
              Book Event{" "}
            </Button>
          </div>
        </div>
      </div>
    </ClientDashboardLayout>
  );
};

export default ClientDashboard;
