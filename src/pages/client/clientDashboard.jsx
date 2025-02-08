import { Badge, Button, Card, Modal, Spinner } from "flowbite-react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      fetchUserBooking(currentUser, (data) => {
        setBookings(data);
        setIsLoading(false);
      });
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
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Spinner size="xl" />
              </div>
            ) : bookings?.length > 0 ? (
              bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No bookings found.</p>
            )}
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
          {selectedBooking &&
            (selectedBooking?.bookType === "room" ? (
              <ClientDashboardRoom
                currentUser={currentUser}
                booking={selectedBooking}
              />
            ) : (
              <ClientDashboardEvent
                currentUser={currentUser}
                booking={selectedBooking}
              />
            ))}
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
