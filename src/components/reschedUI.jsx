import { Button, Datepicker } from "flowbite-react";
import moment from "moment";
import useCrudBooking from "../hooks/useCrudBooking";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const ReschedUI = ({ booking, setDateModal }) => {
  const { checkRoomAvailability, reschedBooking } = useCrudBooking();
  const [arrivalDate, setArrivalDate] = useState(
    new Date(
      new Date(booking.checkInDate.seconds * 1000).setDate(
        new Date(booking.checkInDate.seconds * 1000).getDate()
      )
    )
  );
  const [departureDate, setDepartureDate] = useState(
    new Date(
      new Date(booking.checkOutDate.seconds * 1000).setDate(
        new Date(booking.checkOutDate.seconds * 1000).getDate()
      )
    )
  );

  // Populate the date fields when the component mounts
  //   useEffect(() => {
  //     if (booking) {
  //       setArrivalDate(
  //         moment(booking.checkInDate?.toDate()).format("YYYY-MM-DD")
  //       );
  //       setDepartureDate(booking.checkOutDate?.toDate());
  //     }
  //   }, [booking]);

  const handleSubmit = async () => {
    if (!arrivalDate || !departureDate) {
      toast.error("Please select your check-in and check-out dates");
      return;
    }

    const today = moment().startOf("day");
    const checkInDate = moment(arrivalDate).startOf("day");
    const checkOutDate = moment(departureDate).startOf("day");

    if (checkInDate.isBefore(today)) {
      toast.error("Check-in date cannot be in the past");
      return;
    }

    if (checkInDate.isSameOrAfter(checkOutDate)) {
      toast.error("Check-out date must be after the check-in date");
      return;
    }

    const res = await checkRoomAvailability(
      booking.roomDetails?.id,
      arrivalDate,
      departureDate
    );

    if (res) {
      await reschedBooking(
        booking?.id,
        arrivalDate,
        departureDate,
        booking.roomDetails
      );
      setDateModal(false);
      toast.success("Successfully Updated Booking Schedule");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Selected dates are not available");
    }
  };

  console.log(arrivalDate);

  return (
    <div className="container mx-auto min-h-[400px] p-4">
      <div className="wrapper">
        <h1 className="text-lg font-semibold">Arrival Date</h1>
        <Datepicker
          value={arrivalDate}
          onChange={(date) => setArrivalDate(new Date(date))}
        />
      </div>

      <div className="wrapper mt-5">
        <h1 className="text-lg font-semibold">Departure Date</h1>
        <Datepicker
          value={departureDate}
          onChange={(date) => setDepartureDate(new Date(date))}
        />
      </div>

      <Button
        onClick={handleSubmit}
        gradientMonochrome="failure"
        className="mt-5"
      >
        Reschedule Booking
      </Button>
    </div>
  );
};

export default ReschedUI;
