import { Alert, Badge, Button, Datepicker, Modal } from "flowbite-react";
import useUserStore from "../../utils/zustand";
import ClientDashboardLayout from "./clientDashboardLayout";
import useCrudBooking from "../../hooks/useCrudBooking";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import CustomModal from "../../components/customModal";

import moment from "moment";
import { calculateStayDuration } from "../../utils/calculateStay";
import { FcCancel } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import nodata from "../../assets/nodata.json";
import Lottie from "react-lottie";
import { HiOutlineCalendar, HiOutlineXCircle } from "react-icons/hi";
import ReschedUI from "../../components/reschedUI";

const ClientDashboardEvent = ({ booking, currentUser }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [arrivalDate, setArrivalDate] = useState();
  const [departureDate, setDepartureDate] = useState();
  const navigation = useNavigate();
  const { cancelBooking } = useCrudBooking();

  const { fetchUserBooking, reschedBooking, checkEventAvailability } =
    useCrudBooking();

  const handleCancelBooking = async () => {
    await cancelBooking(booking.id);
    window.location.reload();
  };

  return (
    <>
      {booking ? (
        <>
          <div className="lg:flex items-center justify-start mx-10">
            <div className="flex flex-col items-start justify-center ">
              <h1 className="text-2xl lg:text-3xl font-bold">
                Good Day, {currentUser?.name}
              </h1>
              <p className="text-sm opacity-70">
                This is where you can view all the details about your booking
              </p>
            </div>
          </div>
          <div className="flex w-full flex-wrap">
            <div className="basis-full lg:basis-7/12">
              <div className="bg-white p-5 lg:p-10 rounded-lg shadow-sm mt-5">
                <h1 className="text-lg lg:text-2xl font-semibold">
                  Book Information
                </h1>
                <Alert color="success" className="my-3">
                  You successfully booked a room! Here’s your booking
                  information.
                </Alert>
                <hr />
                <div className="flex flex-wrap gap-5 mt-5">
                  <div className="w-full lg:w-4/12">
                    <h1>Full Name</h1>
                    <h1 className="text-sm lg:text-lg font-bold">
                      {booking.currentUser?.name}
                    </h1>
                  </div>
                  <div className="w-full lg:w-4/12">
                    <h1>Email</h1>
                    <h1 className="text-sm lg:text-lg font-bold">
                      {booking.currentUser?.email}
                    </h1>
                  </div>
                  <div className="w-full lg:w-4/12">
                    <h1>Guest ID</h1>
                    <h1 className="text-sm lg:text-lg font-bold">
                      {booking.currentUser?.uid}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="bg-white p-5 lg:p-10 rounded-lg shadow-sm mt-5">
                <h1 className="text-lg lg:text-2xl font-semibold">
                  Check In & Check Out Dates
                </h1>
                <div className="flex flex-wrap gap-5 mt-5">
                  <div className="w-full lg:w-4/12">
                    <h1>Check In</h1>
                    <h1 className="text-lg font-bold">
                      {moment(booking?.checkInDate.toDate()).format("LL")}
                    </h1>
                  </div>
                  <div className="w-full lg:w-4/12">
                    <h1>Check Out</h1>
                    <h1 className="text-lg font-bold">
                      {moment(booking?.checkOutDate.toDate()).format("LL")}
                    </h1>
                  </div>
                  <div className="w-full lg:w-4/12 flex justify-center lg:justify-start">
                    {booking.status == "Booked" && (
                      <Button onClick={() => setDateModal(true)}>
                        Reschedule Booking
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white p-5 lg:p-10 rounded-lg shadow-sm mt-5 flex flex-col lg:flex-row items-start gap-5">
                <FcCancel size={50} className="hidden lg:block" />
                <div>
                  <h1 className="text-lg lg:text-2xl font-semibold">
                    Cancellation Policy
                  </h1>
                  <p>
                    Please note that this booking is{" "}
                    <span className="font-bold">non-refundable</span>. Once
                    booked, cancellations will not be eligible for a refund.
                  </p>
                  {booking.status == "Booked" && (
                    <Button
                      onClick={() => setIsCancelModalOpen(true)}
                      gradientMonochrome="failure"
                      className="mt-3"
                    >
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="basis-full lg:basis-5/12 flex items-start justify-center">
              <div className="bg-white p-5 lg:p-10 w-9/12 rounded-lg shadow-sm mt-5">
                <h1 className="text-2xl font-semibold mb-5">Summary</h1>
                <hr />
                <div className="p-5 space-y-3">
                  <div className="flex justify-between">
                    <h1>Customer Name</h1>
                    <h1 className="font-bold">{booking.currentUser.name}</h1>
                  </div>
                  <div className="flex justify-between items-start flex-col">
                    <h1>Description</h1>
                    <h1 className="opacity-50">
                      Lights & Sounds P3,500.00 (White screen projector w/
                      microphone 4 hours usage additional P2,000/hr for the
                      exceeding hours)
                    </h1>
                  </div>
                </div>
                <hr />
                <h1 className="text-2xl font-semibold my-5">Price Details</h1>
                <hr />
                <div className="p-5 space-y-3">
                  <div className="flex justify-between">
                    <h1>Price Per Night</h1>
                    <h1 className="font-bold">₱10,000</h1>
                  </div>
                  <div className="flex justify-between">
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
                  <div className="flex justify-between">
                    <h1>Payment Status</h1>
                    <h1 className="font-bold">
                      {booking.paymentStatus === "down"
                        ? "Downpayment"
                        : "Fully Paid"}
                    </h1>
                  </div>
                  {booking?.paymentStatus === "down" && (
                    <div className="flex justify-between">
                      <h1>Downpayment</h1>
                      <h1 className="font-bold">₱{booking.downpayment}</h1>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <h1>Total Cost</h1>
                    <h1 className="font-bold">₱{booking.totalPrice}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto h-[70vh] bg-white flex justify-center items-center flex-col">
            <div className="wrapper mb-10">
              <p className="text-red-500 text-3xl text-center">
                No active bookings found.
              </p>
              <Lottie
                style={{ width: 250 }}
                options={{
                  animationData: nodata,
                  autoplay: true,
                }}
              />
            </div>
          </div>
        </>
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
        <ReschedUI booking={booking} setDateModal={setDateModal} />
      </CustomModal>
      {booking.status == "Booked" && (
        <div className="bottom-navs fixed bottom-0 left-0 bg-white w-full p-5 flex lg:hidden justify-center items-center">
          <Button
            className="w-full flex items-center space-x-2"
            onClick={() => setDateModal(true)}
          >
            <HiOutlineCalendar size={20} />
            <span className="ml-3">Reschedule</span>
          </Button>
          <Button
            onClick={() => setIsCancelModalOpen(true)}
            gradientMonochrome="failure"
            className="w-full ml-3 flex items-center space-x-2"
          >
            <HiOutlineXCircle size={20} />
            <span className="ml-3">Cancel</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default ClientDashboardEvent;
