import {
  Alert,
  Badge,
  Button,
  Card,
  Datepicker,
  Dropdown,
  Table,
  TextInput,
} from "flowbite-react";
import { CustomDatePicker } from "./datePicker";
import logo from "../assets/logo.png";
import { ImMenu } from "react-icons/im";
import { BottomDrawer } from "./bottomDrawer";
import { useEffect, useRef, useState } from "react";
import useUserStore from "../utils/zustand";
import { useNavigate } from "react-router-dom";
import CustomModal from "./customModal";
import loader from "../assets/lotties/loader.json";
import Lottie from "react-lottie";
import { toast } from "react-toastify";
import useCrudBooking from "../hooks/useCrudBooking";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import moment from "moment";
import { calculateStayDuration } from "../utils/calculateStay";
import { createPaymongoCheckout } from "../utils/paymongoCheckout";
import { IoReload } from "react-icons/io5";
import { getCheckoutPaymongo } from "../utils/getCheckout";
import DisplayRoomsSelection from "./displayRoomsSelection";
import useCrudVoucher from "../hooks/useCrudVoucher";
import EventCards from "./eventCards";

const ClientHeaderEvent = () => {
  const [bookNowModal, setBookNowModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [voucher, setVoucher] = useState("");
  const [persons, setPersons] = useState({ adults: 1, kids: 0 });
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkingLoading, setCheckingLoading] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [downpayment, setDownpayment] = useState(0);
  const [checkoutID, setCheckoutID] = useState();
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [paymentTerm, setPaymentTerm] = useState("down");
  const dropdownRef = useRef();
  const navigation = useNavigate();
  const { validateVoucher } = useCrudVoucher();
  const [discount, setDiscount] = useState(null);
  const [paymongoModal, setPaymongoModal] = useState(false);
  const [paymongoURL, setPaymongoURL] = useState();
  const { fetchAvailableRoom, checkEventAvailability, bookEvent } =
    useCrudBooking();
  const { currentUser } = useUserStore();

  const handleSubmit = async () => {
    setLoading(true);

    // Validate date inputs
    if (!arrivalDate || !departureDate) {
      toast.error("Please select your check-in and check-out dates");
      setLoading(false);
      return;
    }

    const today = moment().startOf("day"); // Get today's date without time
    const checkInDate = moment(arrivalDate).startOf("day");
    const checkOutDate = moment(departureDate).startOf("day");

    // Check if check-in date is in the past
    if (checkInDate.isBefore(today)) {
      toast.error("Check-in date cannot be in the past");
      setLoading(false);
      return;
    }

    // Check if arrivalDate is after or equal to departureDate
    if (checkInDate.isSameOrAfter(checkOutDate)) {
      toast.error("Check-out date must be after the check-in date");
      setLoading(false);
      return;
    }

    setBookingModal(true);

    // Fetch available rooms
    await fetchAvailableRoom(persons, setRooms);

    setLoading(false);
  };

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  const handleBook = async () => {
    if (checkout) {
      const res = await createPaymongoCheckout(
        discount !== null
          ? paymentTerm == "down"
            ? 5000 * (1 - parseInt(discount) / 100)
            : 10000 * (1 - parseInt(discount) / 100)
          : paymentTerm == "down"
          ? 5000
          : 10000,
        paymentTerm,
        currentUser
      );
      setCheckoutID(res.id);
      setPaymongoModal(true);
      setPaymongoURL(res.url);
      return;
    }

    setCheckingLoading(true);
    try {
      const output = await checkEventAvailability(arrivalDate, departureDate);
      const discount = await validateVoucher(voucher);
      setDiscount(discount);

      if (!output) {
        toast.error("Room not available for the selected dates.");
        setCheckingLoading(false);
      } else {
        toast.success("Room is available");
        setCheckingLoading(false);
        setCheckout(true);
        const totalPrice =
          parseInt(selectedRoom?.pricePerNight) *
          parseInt(calculateStayDuration(arrivalDate, departureDate).days);
        setTotalPrice(totalPrice);
        setDownpayment(totalPrice * 0.5);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCheckout = async () => {
    if (checkoutID) {
      const res = await getCheckoutPaymongo(checkoutID);
      console.log(res);
      if (res === "succeeded") {
        await handleConfirmBook();
        setPaymentStatus(res);
        setPaymongoModal(false);

        // Store a flag in localStorage before reloading
        localStorage.setItem("redirectAfterReload", "true");

        window.location.reload(); // Reload the page
      }
    }
  };

  // Check for redirect flag after reload
  useEffect(() => {
    const shouldRedirect = localStorage.getItem("redirectAfterReload");
    if (shouldRedirect) {
      localStorage.removeItem("redirectAfterReload"); // Clear flag after reading
      navigation("/client-dashboard"); // Redirect after reload
    }
  }, []);

  const handleConfirmBook = async () => {
    await bookEvent(
      currentUser,
      arrivalDate,
      departureDate,
      10000,
      5000,
      paymentTerm,
      selectedRoom
    );
    toast.success("Successfully Booked!");
  };

  useEffect(() => {
    if (paymentStatus == "succeeded") {
      setTimeout(() => {
        handleConfirmBook();
      }, 1000);
    }
  }, [paymentStatus]);

  const listenCheckout = async () => {
    getCheckout();
    setTimeout(() => {
      listenCheckout();
    }, 5000);
  };

  useEffect(() => {
    if (checkoutID) {
      listenCheckout();
    }
  }, [checkoutID]);
  return (
    <div
      style={{
        background:
          "linear-gradient(43deg, rgba(225,240,247,1) 20%, rgb(11,130,160) 45%)",
      }}
      className="header bg-white p-5 px-10 flex items-center justify-between fixed w-full z-10"
    >
      <img
        onClick={() => navigation("/")}
        className="w-[130px]  xl:flex cursor-pointer"
        src={logo}
        alt="Logo"
      />

      <Button
        onClick={() => setBookNowModal(true)}
        className="lg:hidden"
        gradientMonochrome="cyan"
      >
        Book Now
      </Button>

      <div className="dates hidden flex-1 lg:flex items-center justify-center">
        <CustomDatePicker
          label={"Check In Date"}
          onChange={(date) => setArrivalDate(date)}
          value={arrivalDate}
        />
        <CustomDatePicker
          label={"Check Out Date"}
          onChange={(date) => setDepartureDate(date)}
          value={departureDate}
        />

        <div className="voucher ml-2">
          <h1 className="text-sm text-white">Voucher</h1>
          <TextInput
            placeholder="Promo Code"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
        </div>
        <div className="wrapper ml-3">
          <h1 className="text-sm text-white">Availability</h1>
          <Button gradientMonochrome="failure" onClick={handleSubmit}>
            Check Availability
          </Button>
        </div>
      </div>

      {/*Bottom Modal */}
      <BottomDrawer
        red={true}
        open={bookNowModal}
        handleClose={() => setBookNowModal(false)}
      >
        <div className="container mx-auto min-h-[450px]">
          <div className="flex flex-col items-center justify-center mx-5 py-5">
            <img className="w-[130px]" src={logo} alt="Logo" />
          </div>

          <div className="dates flex-col">
            <div className="wrapper my-1">
              <h1 className="text-sm text-white">Check In Date</h1>
              <Datepicker onChange={(date) => setArrivalDate(date)} />
            </div>
            <div className="wrapper my-1">
              <h1 className="text-sm text-white">Check Out Date</h1>
              <Datepicker onChange={(date) => setDepartureDate(date)} />
            </div>

            <div className="voucher my-3">
              <h1 className="text-sm text-white">Voucher</h1>
              <TextInput placeholder="Promo Code" />
            </div>

            <div className="wrapper mb-5">
              <h1 className="text-sm text-white">Availability</h1>

              <Button onClick={handleSubmit} className="w-full py-2">
                Check Availability
              </Button>
            </div>
          </div>
        </div>
      </BottomDrawer>

      {/* Booking Modal */}
      <CustomModal
        size={"5xl"}
        title={"Booking for Event"}
        open={bookingModal}
        handleClose={() => {
          setBookingModal(false);
          setRooms(null);
          setCheckout(null);
        }}
        hideFooter={true}
      >
        {paymentStatus !== "succeeded" && (
          <>
            {!checkout && (
              <EventCards
                selectedRoom={selectedRoom}
                handleRoomSelection={handleRoomSelection}
              />
            )}

            {checkout && selectedRoom && (
              <div className="w-full  bg-white rounded-lg px-5  dark:bg-gray-800">
                <Alert className="text-center flex justify-center items-center">
                  To secure your reservation, a 50% deposit of the total price
                  is required.
                </Alert>
                <div className="flex">
                  <h1 className="my-3">
                    {moment(arrivalDate).format("LL")}
                    {" - "}
                    {moment(departureDate).format("LL")}
                  </h1>
                </div>

                <div className="mb-4 overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Service
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-600">
                          Stay Duration
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {(() => {
                            try {
                              return `${
                                calculateStayDuration(
                                  arrivalDate,
                                  departureDate
                                ).days
                              } Day(s)`;
                            } catch {
                              return "Invalid Dates";
                            }
                          })()}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-600">
                          Promo Code Applied
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 flex">
                          <span> {voucher ? voucher : "None"} </span>
                          {discount !== null ? (
                            <Badge color="success" className="ml-3">
                              You have {discount}% off
                            </Badge>
                          ) : (
                            <Badge color="failure" className="ml-3">
                              Voucher not found
                            </Badge>
                          )}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-600">
                          Rent Price
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          ₱10000
                        </td>
                      </tr>

                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-600">
                          Status
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 flex items-center justify-start">
                          {paymentStatus}
                          <Button className="ml-3">
                            <IoReload onClick={getCheckout} />
                          </Button>
                        </td>
                      </tr>

                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-600">
                          Make payment for:
                        </td>
                        <td className="px-4 py-2  font-bold text-3xl text-green-800 flex items-center justify-start">
                          ₱
                          {discount !== null
                            ? paymentTerm == "down"
                              ? 5000 * (1 - parseInt(discount) / 100)
                              : 10000 * (1 - parseInt(discount) / 100)
                            : paymentTerm == "down"
                            ? 5000
                            : 10000}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-center items-center">
                    <Button
                      onClick={() => setPaymentTerm("down")}
                      color={paymentTerm == "down" ? "success" : "light"}
                    >
                      Downpayment
                    </Button>
                    <Button
                      onClick={() => setPaymentTerm("full")}
                      className="ml-3"
                      color={paymentTerm == "full" ? "success" : "light"}
                    >
                      Full Payment
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {paymentStatus == "succeeded" && (
          <>
            <div className="div flex items-center justify-center flex-col p-5">
              <h1 className="text-3xl font-bold text-center">
                Payment Successfull
              </h1>
              <div className="bg-green-500 p-10 rounded-full mt-3">
                <FaCheck color="white" size={40} />
              </div>{" "}
              <Button
                onClick={() => navigation("/client-dashboard")}
                gradientMonochrome="failure"
                className="mt-10 py-3 w-full"
              >
                Go to Dashboard
              </Button>
            </div>
          </>
        )}

        {paymentStatus !== "succeeded" && (
          <>
            <div className="buttons hidden lg:flex">
              <Button
                onClick={() => {
                  setBookingModal(false);
                  setRooms(null);
                  setCheckout(null);
                }}
                gradientMonochrome="info"
                className="mx-3 w-full mt-2 py-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBook}
                disabled={!selectedRoom}
                gradientMonochrome="failure"
                className="w-full mt-2 py-1"
              >
                {checkout ? "Pay Now" : "Check Availability"}
              </Button>
            </div>
            <div className="buttons  fixed bottom-0 left-0 flex lg:hidden items-center justify-center w-full bg-white p-3 rounded">
              <Button
                onClick={() => {
                  setBookingModal(false);
                  setRooms(null);
                  setCheckout(null);
                }}
                gradientMonochrome="info"
                className="mx-3 w-full mt-2 py-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBook}
                disabled={!selectedRoom}
                gradientMonochrome="failure"
                className="w-full mt-2 py-1"
              >
                {checkout ? "Pay Now" : "Check Availability"}
              </Button>
            </div>
          </>
        )}
      </CustomModal>
      <CustomModal
        hideFooter={true}
        title={"Checkout Page"}
        size="6xl"
        open={paymongoModal}
        handleClose={() => setPaymongoModal(false)}
      >
        <iframe
          style={{ width: "100%", height: "100vh" }}
          src={paymongoURL}
          frameborder="0"
        ></iframe>
      </CustomModal>
    </div>
  );
};

export default ClientHeaderEvent;
