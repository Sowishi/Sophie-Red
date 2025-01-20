import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCrudBooking from "../hooks/useCrudBooking";
import Loader from "../components/loader";
import { Modal } from "flowbite-react"; // Import Flowbite modal

const localizer = momentLocalizer(moment);

export const BookingCalendar = ({ selectedRoom }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event
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
    return <div className="text-center p-4">No bookings available.</div>;
  }

  // ✅ Convert bookings to calendar event format
  const events = bookings.map((booking) => ({
    id: booking.id,
    title: `Room ${booking.roomDetails.roomNumber} - ${booking.currentUser.name}`,
    start: new Date(booking.checkInDate.seconds * 1000),
    end: new Date(booking.checkOutDate.seconds * 1000),
    roomType: booking.roomDetails.roomType,
    status: booking.status, // "Booked"
    price: booking.roomDetails.pricePerNight,
    downpayment: booking.downpayment,
    paymentStatus: booking.paymentStatus, // "down"
    description: booking.roomDetails.description,
  }));

  // ✅ Handle event click to open modal
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // ✅ Close modal
  const closeModal = () => {
    setSelectedEvent(null);
  };

  const filterEvents = events.filter((item) =>
    item.title.includes(selectedRoom)
  );

  return (
    <div className="bg-red-100 p-4 rounded-lg shadow-lg">
      <Calendar
        localizer={localizer}
        events={selectedRoom == null ? events : filterEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 600 }}
        className="custom-calendar"
        onSelectEvent={handleEventClick} // Handle click event
      />

      {/* ✅ Modal for Event Details */}
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
                {selectedEvent.paymentStatus == "full"
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
