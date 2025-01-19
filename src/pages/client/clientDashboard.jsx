import { Alert, Button, Datepicker, Modal } from "flowbite-react";
import useUserStore from "../../utils/zustand";
import ClientDashboardLayout from "./clientDashboardLayout";
import useCrudBooking from "../../hooks/useCrudBooking";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { CustomModal } from "../../components/customModal";

import moment from "moment";
import { calculateStayDuration } from "../../utils/calculateStay";
import { FcCancel } from "react-icons/fc";
import { toast } from "react-toastify";

const ClientDashboard = () => {
  const { currentUser } = useUserStore();
  const {
    fetchUserBooking,
    cancelBooking,
    checkRoomAvailability,
    reschedBooking,
  } = useCrudBooking();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [arrivalDate, setArrivalDate] = useState();
  const [departureDate, setDepartureDate] = useState();

  useEffect(() => {
    const getBooking = async () => {
      if (currentUser) {
        setLoading(true);
        await fetchUserBooking(currentUser, setBooking);
        setLoading(false);
      }
    };

    getBooking();
  }, [currentUser]);

  if (loading)
    return (
      <>
        <div className="container mx-auto h-screen flex items-center justify-center">
          <Loader />
        </div>
      </>
    );

  const handleCancelBooking = async () => {
    await cancelBooking(booking.id);
    window.location.reload();
  };

  const handleSubmit = async () => {
    // Validate date inputs
    if (!arrivalDate || !departureDate) {
      toast.error("Please select your check-in and check-out dates");
      return;
    }

    const today = moment().startOf("day"); // Get today's date without time
    const checkInDate = moment(arrivalDate).startOf("day");
    const checkOutDate = moment(departureDate).startOf("day");

    // Check if check-in date is in the past
    if (checkInDate.isBefore(today)) {
      toast.error("Check-in date cannot be in the past");
      return;
    }

    // Check if arrivalDate is after or equal to departureDate
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
      await reschedBooking(booking?.id, arrivalDate, departureDate);
      await fetchUserBooking(currentUser, setBooking);

      toast.success("Successfully Update Booking Schedule");
    } else {
      toast.error("Selected Dates is not available");
    }
  };
  return (
    <ClientDashboardLayout>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-start mb-5">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Good Day, {currentUser?.name}
          </h1>
          <p className="text-sm opacity-70">
            This is where you can view all the details about your booking
          </p>
        </div>
      </div>

      {booking ? (
        <div className="w-full">
          <div className="flex flex-wrap">
            <div className="basis-full lg:basis-8/12">
              {booking.paymentStatus == "down" && (
                <div className="flex flex-col lg:flex-row items-center justify-start space-x-2">
                  <Alert color="warning">
                    <h1 className="text-sm">
                      Thank you for booking with us! You can always pay the full
                      price here.
                    </h1>
                  </Alert>
                  <Button gradientMonochrome="failure" className="px-5 mt-3">
                    Pay Now
                  </Button>
                </div>
              )}

              <div className="bg-white mt-5 shadow-sm  p-5 lg:p-10 rounded-lg">
                <h1 className="text-2xl font-semibold">Book Information</h1>
                <Alert color="success" className="my-3">
                  You successfully booked a room! Here’s your booking
                  information.
                </Alert>
                <hr />
                <div className="flex flex-wrap mx-10 mt-5">
                  <div className="basis-full my-2 lg:basis-4/12">
                    <div className="flex flex-col">
                      <h1>Full Name</h1>
                      <h1 className="text-lg font-bold">
                        {booking.currentUser?.name}
                      </h1>
                    </div>
                  </div>
                  <div className="basis-full my-2 lg:basis-4/12">
                    <div className="flex flex-col">
                      <h1>Email</h1>
                      <h1 className="text-lg font-bold">
                        {booking.currentUser?.email}
                      </h1>
                    </div>
                  </div>
                  <div className="basis-full my-2 lg:basis-4/12">
                    <div className="flex flex-col">
                      <h1>Guest ID</h1>
                      <h1 className="text-lg font-bold">
                        {booking.currentUser?.uid}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white mt-5 shadow-sm  p-5 lg:p-10 rounded-lg">
                <h1 className="text-2xl font-semibold">
                  Check In & Check Out Dates
                </h1>

                <div className="flex flex-wrap mx-10 mt-5">
                  <div className="basis-full my-2 lg:basis-4/12">
                    <div className="flex flex-col">
                      <h1>Check In </h1>
                      <h1 className="text-lg font-bold">
                        {moment(booking?.checkInDate.toDate()).format("LL")}
                      </h1>
                    </div>
                  </div>
                  <div className="basis-full my-2 lg:basis-4/12">
                    <div className="flex flex-col">
                      <h1>Check Out </h1>
                      <h1 className="text-lg font-bold">
                        {moment(booking?.checkOutDate.toDate()).format("LL")}
                      </h1>
                    </div>
                  </div>
                  <div className="basis-full my-2 lg:basis-4/12">
                    <div className="flex flex-col">
                      <h1>Re-Schedule </h1>
                      <h1 className="text-lg font-bold">
                        <Button onClick={() => setDateModal(true)}>
                          Reschedule Booking
                        </Button>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white mt-5 shadow-sm p-5 lg:p-10 rounded-lg flex items-center">
                <FcCancel size={50} />
                <div className="ml-8 flex flex-col justify-center items-start">
                  <h1 className="text-2xl font-semibold">
                    Cancellation Policy
                  </h1>
                  <p>
                    Please note that this booking is{" "}
                    <span className="font-bold">non-refundable</span>. Once
                    booked, cancellations will not be eligible for a refund.
                  </p>
                  <Button
                    onClick={() => setIsCancelModalOpen(true)}
                    gradientMonochrome="failure"
                    className="mt-3"
                  >
                    Cancel Booking
                  </Button>
                </div>
              </div>
            </div>
            <div className="basis-full lg:basis-4/12">
              <div className="rounded-lg bg-white mt-5 lg:mt-0 mx-0 lg:mx-5 py-8  px-5 lg:px-10">
                <h1 className="text-2xl font-semibold mb-10">Summary</h1>
                <hr />
                <div className="p-5">
                  <div className="flex justify-between items-center mt-3">
                    <h1>Customer Name</h1>
                    <h1 className="font-bold">{booking.currentUser.name}</h1>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <h1>Room Number</h1>
                    <h1 className="font-bold">
                      {booking.roomDetails.roomNumber}
                    </h1>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <h1>Room Type</h1>
                    <h1 className="font-bold">
                      {booking.roomDetails.roomType}
                    </h1>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <h1>Room Description</h1>
                    <h1 className="font-bold">
                      {booking.roomDetails.description}
                    </h1>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <h1>Total Guest Allowed</h1>
                    <h1 className="font-bold">
                      {booking.roomDetails.adultCount} Adult and{" "}
                      {booking.roomDetails.adultCount} Kids
                    </h1>
                  </div>
                </div>
                <hr />
                <h1 className="text-2xl font-semibold  my-10">Price Details</h1>
                <hr />
                <div className="p-5">
                  <div className="flex justify-between items-center mt-3">
                    <h1>Price Per Night</h1>
                    <h1 className="font-bold">
                      ₱{booking.roomDetails.pricePerNight}
                    </h1>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <h1>Stay Duration</h1>
                    <h1 className="font-bold">
                      {
                        calculateStayDuration(
                          booking?.checkInDate,
                          booking?.checkOutDate,
                          true
                        ).days
                      }{" "}
                      day(s)
                    </h1>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <h1>Payment Status</h1>
                    <h1 className="font-bold">
                      {booking.paymentStatus == "down"
                        ? "Downpayment"
                        : "Fully Paid"}
                    </h1>
                  </div>

                  {booking?.paymentStatus == "down" && (
                    <div className="flex justify-between items-center mt-3">
                      <h1>Downpayment</h1>
                      <h1 className="font-bold">₱{booking.downpayment}</h1>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-3">
                    <h1>Total Cost</h1>
                    <h1 className="font-bold">₱{booking.totalPrice}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-3xl text-center mt-20">
          No active bookings found.
        </p>
      )}
      {/* Confirmation Modal */}
      <Modal
        show={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      >
        <Modal.Header>Confirm Cancellation</Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to cancel your booking? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsCancelModalOpen(false)}>
            No, Keep Booking
          </Button>
          <Button gradientMonochrome="failure" onClick={handleCancelBooking}>
            Yes, Cancel Booking
          </Button>
        </Modal.Footer>
      </Modal>
      <CustomModal
        title={"Reschedule Booking"}
        hideFooter={true}
        open={dateModal}
        size={"5xl"}
        handleClose={() => setDateModal(false)}
      >
        <div className="container mx-auto min-h-[3  00px]">
          <div className="wrapper">
            <h1>Arrival Date</h1>
            <Datepicker onChange={(event) => setArrivalDate(event)} />
          </div>
          <div className="wrapper mt-5">
            <h1>Departure Date</h1>
            <Datepicker onChange={(event) => setDepartureDate(event)} />
          </div>
          <Button
            onClick={handleSubmit}
            gradientMonochrome="failure"
            className="mt-5"
          >
            Reschedule Booking
          </Button>
        </div>
      </CustomModal>
    </ClientDashboardLayout>
  );
};

export default ClientDashboard;
