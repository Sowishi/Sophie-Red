import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCrudBooking from "../hooks/useCrudBooking";
import Loader from "../components/loader";
import { Modal } from "flowbite-react";
import FrontDeskHeader from "./frontDeskHeader";

const localizer = momentLocalizer(moment);

export const BookingCalendar = ({ selectedRoom, searchQuery }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { fetchAllBookings } = useCrudBooking();

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

  const eventColors = [
    "#E57373",
    "#81C784",
    "#64B5F6",
    "#FFD54F",
    "#BA68C8",
    "#FF8A65",
    "#4DB6AC",
    "#DCE775",
    "#F06292",
    "#7986CB",
  ];

  const events = bookings.map((booking, index) => ({
    id: booking.id,
    title: `Room ${booking.roomDetails.roomNumber} - ${booking.currentUser.name}`,
    start: new Date(booking.checkInDate.seconds * 1000),
    end: new Date(booking.checkOutDate.seconds * 1000),
    roomType: booking.roomDetails.roomType,
    status: booking.status,
    price: booking.roomDetails.pricePerNight,
    downpayment: booking.downpayment,
    paymentStatus: booking.paymentStatus,
    description: booking.roomDetails.description,
    color: eventColors[index % eventColors.length],
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

  return (
    <div className=" flex  lg:p-10 rounded-lg shadow">
      <div className="flex-1">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: 600 }}
          className="custom-calendar"
          onSelectEvent={handleEventClick}
        />
      </div>

      <div className="hidden lg:flex">
        <FrontDeskHeader />
      </div>

      <Modal show={selectedEvent !== null} onClose={closeModal}>
        <Modal.Header>
          Booking Details - Room {selectedEvent?.roomType}
        </Modal.Header>
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
        <Modal.Footer>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
