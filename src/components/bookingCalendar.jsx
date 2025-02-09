import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCrudBooking from "../hooks/useCrudBooking";
import Loader from "../components/loader";
import { Button, Drawer, Dropdown, Modal, Tooltip } from "flowbite-react";
import FrontDeskHeader from "./frontDeskHeader";
import { ConfirmModal } from "./confirmModal";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";

const localizer = momentLocalizer(moment);

export const BookingCalendar = ({ searchQuery, filterType, rooms }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { fetchAllBookings, deleteBooking, checkoutBooking } = useCrudBooking();
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmCheckout, setConfirmCheckout] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookModal, setBookModal] = useState(false);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        await fetchAllBookings(setBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-4">
        <Loader />
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center p-4">
        <Loader />
      </div>
    );
  }

  const events = bookings
    .filter(
      (booking) =>
        booking.status !== "Completed" && booking.bookType == filterType
    ) // Exclude completed bookings
    .map((booking, index) => ({
      id: booking.id,
      title:
        booking.bookType == "room"
          ? `Room ${booking.roomDetails.roomNumber} - ${booking.currentUser.name}`
          : `Event  - ${booking.currentUser.name}`,
      start: new Date(booking.checkInDate.seconds * 1000),
      end: new Date(booking.checkOutDate.seconds * 1000),
      roomType: booking.roomDetails.roomType,
      status: booking.status,
      price: booking.roomDetails.pricePerNight,
      downpayment: booking.downpayment,
      paymentStatus: booking.paymentStatus,
      description: booking.roomDetails.description,
    }));

  const allEvents = bookings
    .filter((booking) => booking.status !== "Completed") // Exclude completed bookings
    .map((booking, index) => ({
      id: booking.id,
      title:
        booking.bookType == "room"
          ? `Room ${booking.roomDetails.roomNumber} - ${booking.currentUser.name}`
          : `Event  - ${booking.currentUser.name}`,
      start: new Date(booking.checkInDate.seconds * 1000),
      end: new Date(booking.checkOutDate.seconds * 1000),
      roomType: booking.roomDetails.roomType,
      status: booking.status,
      price: booking.roomDetails.pricePerNight,
      downpayment: booking.downpayment,
      paymentStatus: booking.paymentStatus,
      description: booking.roomDetails.description,
    }));

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter(
    (event) =>
      (!selectedRoom || event.title.includes(selectedRoom)) &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEventsAll = allEvents.filter(
    (event) =>
      (!selectedRoom || event.title.includes(selectedRoom)) &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckout = async () => {
    try {
      await checkoutBooking(selectedEvent?.id);
      toast.success("Successfully Checkout");
      setConfirmCheckout(false);
      setSelectedEvent(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBooking(selectedEvent?.id);
      toast.success("Successfully Deleted Booking");
      setDeleteModal(false);
      setSelectedEvent(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" container mx-auto bg-white lg:p-10 rounded-lg shadow">
      <div className="flex justify-end items-center mb-3">
        <Dropdown
          color="info"
          label={selectedRoom ? `Room ${selectedRoom}` : "Filter Room Number"}
        >
          <Dropdown.Item onClick={() => setSelectedRoom(null)}>
            All Rooms
          </Dropdown.Item>
          {rooms.map((item) => (
            <Dropdown.Item
              key={item.id}
              onClick={() => setSelectedRoom(item.roomNumber)}
            >
              Room {item.roomNumber}
            </Dropdown.Item>
          ))}
        </Dropdown>
        <Button
          onClick={() => setBookModal(true)}
          className="ml-5"
          gradientMonochrome="failure"
        >
          Book Guest
          <FaPlus className="ml-3 mt-1" />
        </Button>
      </div>
      <div className="flex-1">
        {filterType == "all" ? (
          <Calendar
            localizer={localizer}
            events={filteredEventsAll}
            startAccessor="start"
            endAccessor="end"
            style={{ minHeight: 600 }}
            className="custom-calendar"
            onSelectEvent={handleEventClick}
          />
        ) : (
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ minHeight: 600 }}
            className="custom-calendar"
            onSelectEvent={handleEventClick}
          />
        )}
      </div>

      <Modal show={selectedEvent !== null} onClose={closeModal}>
        <Modal.Header>Booking Details {selectedEvent?.roomType}</Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div className="p-4 space-y-3">
              <p>
                <strong>Room Number:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Guest:</strong> {selectedEvent.title.split(" - ")[1]}
              </p>
              <p>
                <strong>Check-in:</strong>{" "}
                {moment(selectedEvent.start).format("LLL")}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {moment(selectedEvent.end).format("LLL")}
              </p>
              <p>
                <strong>Price per Night:</strong> ₱{selectedEvent.price}
              </p>
              <p>
                <strong>Downpayment:</strong> ₱{selectedEvent.downpayment}
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                {selectedEvent.paymentStatus === "full"
                  ? "Fully Paid"
                  : "Downpayment"}
              </p>
              <p>
                <strong>Booking Status:</strong> {selectedEvent.status}
              </p>
              <p>
                <strong>Description:</strong> {selectedEvent.description}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Tooltip content="Delete Booking for accidental/errors in booking">
            <Button
              onClick={() => setDeleteModal(true)}
              className="w-full"
              gradientMonochrome="failure"
            >
              Delete Booking
            </Button>
          </Tooltip>

          <Tooltip
            content={
              selectedEvent?.paymentStatus == "down"
                ? "Guest has not fully paid"
                : "You can checkout the guest"
            }
          >
            <Button
              disabled={selectedEvent?.paymentStatus == "down"}
              onClick={() => setConfirmCheckout(true)}
              className="w-full"
              gradientMonochrome="info"
            >
              Checkout Guest
            </Button>
          </Tooltip>
        </Modal.Footer>
      </Modal>

      <ConfirmModal
        handleSubmit={handleCheckout}
        title={"Are you sure you want to checkout this guest?"}
        open={confirmCheckout}
        handleClose={() => setConfirmCheckout(false)}
      />
      <ConfirmModal
        handleSubmit={handleDelete}
        title={"Are you sure you want to delete this booking?"}
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
      />

      <Drawer
        position="right"
        className="w-[500px]" // Adjust as needed
        open={bookModal}
        onClose={() => setBookModal(false)}
      >
        <Drawer.Header title="Drawer" />
        <Drawer.Items>
          <div className="container h-full">
            <FrontDeskHeader />
          </div>
        </Drawer.Items>
      </Drawer>
    </div>
  );
};
