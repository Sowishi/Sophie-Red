import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCrudBooking from "../hooks/useCrudBooking";
import Loader from "../components/loader";

const localizer = momentLocalizer(moment);

export const BookingCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="bg-red-100 p-4 rounded-lg shadow-lg">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 600 }}
        className="custom-calendar"
      />
    </div>
  );
};
