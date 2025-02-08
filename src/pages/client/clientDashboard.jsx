import { Badge, Button, Card, Modal } from "flowbite-react";
import ClientDashboardLayout from "./clientDashboardLayout";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../utils/zustand";
import { useEffect, useState } from "react";
import useCrudBooking from "../../hooks/useCrudBooking";
import BookingCard from "../../components/bookingCard";
import ClientDashboardRoom from "./clientDashboardRoom";
import ClientDashboardEvent from "./clientDashboardEvent";

const ClientDashboard = () => {
  const navigation = useNavigate();
  const { currentUser } = useUserStore();
  const { fetchUserBooking } = useCrudBooking();
  const [bookings, setBookings] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchUserBooking(currentUser, setBookings);
    }
  }, [currentUser]);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <ClientDashboardLayout>
      <div className="container mx-auto min-h-screen">
        <div className="header px-3 flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">Your Bookings</h1>
          <div className="wrapper flex items-center justify-center">
            <Button
              onClick={() => navigation("/booking")}
              gradientMonochrome="failure"
              className="mr-3"
            >
              Book Room
            </Button>
            <Button
              onClick={() => navigation("/event-booking")}
              gradientMonochrome="info"
            >
              Book Event
            </Button>
          </div>
        </div>
        <div className="flex mt-10">
          <div className="basis-full lg:basis-4/12">
            {bookings?.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        size="9xl"
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Header>Booking Details</Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <>
              {selectedBooking?.bookType == "room" ? (
                <ClientDashboardRoom
                  currentUser={currentUser}
                  booking={selectedBooking}
                />
              ) : (
                <ClientDashboardEvent
                  currentUser={currentUser}
                  booking={selectedBooking}
                />
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setIsModalOpen(false)} color="gray">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </ClientDashboardLayout>
  );
};

export default ClientDashboard;
