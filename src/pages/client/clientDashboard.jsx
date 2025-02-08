import { Badge, Button, Card, Modal, Spinner } from "flowbite-react";
import ClientDashboardLayout from "./clientDashboardLayout";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../utils/zustand";
import { useEffect, useState } from "react";
import useCrudBooking from "../../hooks/useCrudBooking";
import BookingCard from "../../components/bookingCard";
import ClientDashboardRoom from "./clientDashboardRoom";
import ClientDashboardEvent from "./clientDashboardEvent";
import Loader from "../../components/loader";
import NoData from "../../components/noData";

const ClientDashboard = () => {
  const navigation = useNavigate();
  const { currentUser } = useUserStore();
  const { fetchUserBooking } = useCrudBooking();
  const [bookings, setBookings] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // "all", "room", "event"

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const getBooking = async () => {
    setIsLoading(true);
    await fetchUserBooking(currentUser, setBookings);
    setIsLoading(false);
  };

  useEffect(() => {
    getBooking();
  }, [currentUser]);

  // Filtered bookings based on selected filter
  const filteredBookings = bookings
    ? bookings.filter(
        (booking) => filter === "all" || booking.bookType === filter
      )
    : [];

  return (
    <ClientDashboardLayout>
      <div className="container mx-auto min-h-screen">
        <div className="header px-3 flex flex-col lg:flex-row justify-between items-center">
          <div className="wrapper  mb-3">
            <h1 className="text-2xl lg:text-3xl font-bold">
              Your Bookings ({bookings?.length || <Spinner />})
            </h1>

            <p className="opacity-50">
              Review your booking history to track and manage your reservations
              efficiently.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setFilter("all")}
              color={filter === "all" ? "failure" : "gray"}
            >
              All
            </Button>
            <Button
              onClick={() => setFilter("room")}
              color={filter === "room" ? "failure" : "gray"}
            >
              Room
            </Button>
            <Button
              onClick={() => setFilter("event")}
              color={filter === "event" ? "failure" : "gray"}
            >
              Event
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap mt-10">
          {isLoading ? (
            <div className="flex mt-10 w-full items-center justify-center">
              <Loader />
            </div>
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="basis-full lg:basis-4/12 w-full">
                <BookingCard
                  booking={booking}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))
          ) : (
            <NoData />
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        size="9xl"
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Header>
          {selectedBooking?.bookType === "event"
            ? "Event Details"
            : "Room Details"}
        </Modal.Header>
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
