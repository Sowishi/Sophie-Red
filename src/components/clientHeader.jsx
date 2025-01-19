import { Alert, Button, Dropdown, Table, TextInput } from "flowbite-react";
import { CustomDatePicker } from "./datePicker";
import logo from "../assets/logo.png";
import { ImMenu } from "react-icons/im";
import { BottomDrawer } from "./bottomDrawer";
import { useEffect, useRef, useState } from "react";
import useUserStore from "../utils/zustand";
import { useNavigate } from "react-router-dom";
import { CustomModal } from "./customModal";
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

const ClientHeader = () => {
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

  const { fetchAvailableRoom, checkRoomAvailability, bookRoom } =
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
    if (selectedRoom?.roomNumber === room.roomNumber) {
      setSelectedRoom(null); // Deselect if the same room is clicked again
    } else {
      setSelectedRoom(room); // Select the clicked room
    }
  };

  const handleBook = async () => {
    if (checkout) {
      const sessionID = await createPaymongoCheckout(
        paymentTerm == "down" ? downpayment : totalPrice,
        paymentTerm
      );
      setCheckoutID(sessionID);
      return;
    }

    setCheckingLoading(true);
    try {
      const output = await checkRoomAvailability(
        selectedRoom?.id,
        arrivalDate,
        departureDate,
        currentUser.uid
      );
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
      setPaymentStatus(res);
    }
  };

  const handleConfirmBook = async () => {
    await bookRoom(
      selectedRoom?.id,
      currentUser,
      arrivalDate,
      departureDate,
      totalPrice,
      downpayment,
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

  return (
    <div
      style={{
        background:
          "linear-gradient(43deg, rgba(225,240,247,1) 1%, rgb(162,0,0) 45%)",
      }}
      className="header bg-white p-5 px-10 flex items-center justify-between fixed w-full z-10"
    >
      <img
        onClick={() => navigation("/")}
        className="w-[130px] hidden xl:flex cursor-pointer"
        src={logo}
        alt="Logo"
      />
      <ImMenu size={25} className="text-white font-bold xl:hidden" />

      <Button
        onClick={() => setBookNowModal(true)}
        className="lg:hidden"
        gradientMonochrome="cyan"
      >
        Book Now
      </Button>

      <div className="dates hidden flex-1 lg:flex items-center justify-center">
        <CustomDatePicker
          label={"Arrival Date"}
          onChange={(date) => setArrivalDate(date)}
          value={arrivalDate}
        />
        <CustomDatePicker
          label={"Departure Date"}
          onChange={(date) => setDepartureDate(date)}
          value={departureDate}
        />
        <div className="persons ml-3">
          <h1 className="text-sm text-white">Persons</h1>
          <Dropdown
            ref={dropdownRef}
            className="rounded-2xl text-nowrap"
            color="light"
            dismissOnClick={false}
            label={`${persons.adults} Adults + ${persons.kids} Kids`}
          >
            <Dropdown.Header>
              <span className="block text-lg">Guest for room</span>
            </Dropdown.Header>
            <div className="p-5">
              <div className="wrapper flex items-center justify-between">
                <h1>Adults</h1>
                <div className="wrapper flex items-center">
                  <Button
                    gradientMonochrome="failure"
                    size="xs"
                    onClick={() =>
                      setPersons((prev) => ({
                        ...prev,
                        adults: Math.max(1, prev.adults - 1),
                      }))
                    }
                  >
                    -
                  </Button>
                  <Button
                    gradientMonochrome="success"
                    className="mx-2"
                    size="xs"
                    onClick={() =>
                      setPersons((prev) => ({
                        ...prev,
                        adults: prev.adults + 1,
                      }))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="wrapper mt-5 flex items-center justify-between">
                <h1>Kids</h1>
                <div className="wrapper flex items-center">
                  <Button
                    gradientMonochrome="failure"
                    size="xs"
                    onClick={() =>
                      setPersons((prev) => ({
                        ...prev,
                        kids: Math.max(0, prev.kids - 1),
                      }))
                    }
                  >
                    -
                  </Button>
                  <Button
                    gradientMonochrome="success"
                    className="mx-2"
                    size="xs"
                    onClick={() =>
                      setPersons((prev) => ({
                        ...prev,
                        kids: prev.kids + 1,
                      }))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </Dropdown>
        </div>
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
          <Button onClick={handleSubmit}>Check Availability</Button>
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
            <CustomDatePicker
              label={"Arrival Date"}
              onChange={(date) => setArrivalDate(date)}
              value={arrivalDate}
            />
            <CustomDatePicker
              label={"Departure Date"}
              onChange={(date) => setDepartureDate(date)}
              value={departureDate}
            />

            <div className="voucher my-3">
              <h1 className="text-sm text-white">Voucher</h1>
              <TextInput placeholder="Promo Code" />
            </div>
            <div className="persons mb-3">
              <h1 className="text-sm text-white">Persons</h1>
              <Dropdown
                ref={dropdownRef}
                className="rounded-2xl text-nowrap"
                color="light"
                dismissOnClick={false}
                label={`${persons.adults} Adults + ${persons.kids} Kids`}
              >
                <Dropdown.Header>
                  <span className="block text-lg">Guest for room</span>
                </Dropdown.Header>
                <div className="p-5">
                  <div className="wrapper flex items-center justify-between">
                    <h1>Adults</h1>
                    <div className="wrapper flex items-center">
                      <Button
                        gradientMonochrome="failure"
                        size="xs"
                        onClick={() =>
                          setPersons((prev) => ({
                            ...prev,
                            adults: Math.max(1, prev.adults - 1),
                          }))
                        }
                      >
                        -
                      </Button>
                      <Button
                        gradientMonochrome="success"
                        className="mx-2"
                        size="xs"
                        onClick={() =>
                          setPersons((prev) => ({
                            ...prev,
                            adults: prev.adults + 1,
                          }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="wrapper mt-5 flex items-center justify-between">
                    <h1>Kids</h1>
                    <div className="wrapper flex items-center">
                      <Button
                        gradientMonochrome="failure"
                        size="xs"
                        onClick={() =>
                          setPersons((prev) => ({
                            ...prev,
                            kids: Math.max(0, prev.kids - 1),
                          }))
                        }
                      >
                        -
                      </Button>
                      <Button
                        gradientMonochrome="success"
                        className="mx-2"
                        size="xs"
                        onClick={() =>
                          setPersons((prev) => ({
                            ...prev,
                            kids: prev.kids + 1,
                          }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </Dropdown>
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
        title={`Booking for ${persons.adults} Adults & ${
          persons.kids
        } Kids | ${(() => {
          try {
            return `${
              calculateStayDuration(arrivalDate, departureDate).days
            } Day(s)`;
          } catch (error) {
            return "Invalid Dates";
          }
        })()} | Promo Code: ${voucher ? voucher : "None"}`}
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
              <>
                {(loading || checkingLoading) && (
                  <Lottie
                    style={{ width: 150 }}
                    options={{
                      animationData: loader,
                      autoplay: true,
                    }}
                  />
                )}
                {rooms !== null && rooms.length >= 1 && !checkingLoading && (
                  <Table hoverable striped>
                    <Table.Head>
                      <Table.HeadCell>Room ID</Table.HeadCell>
                      <Table.HeadCell>Room Type</Table.HeadCell>
                      <Table.HeadCell>Price Per Night</Table.HeadCell>
                      <Table.HeadCell>Description</Table.HeadCell>
                      <Table.HeadCell></Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {rooms.map((room, index) => (
                        <Table.Row
                          key={index}
                          className={`${
                            selectedRoom?.roomNumber === room.roomNumber
                              ? "bg-green-100 dark:bg-green-800"
                              : "bg-white dark:border-gray-700 dark:bg-gray-800"
                          }`}
                        >
                          <Table.Cell className="font-bold text-lg text-red-500">
                            {room.roomNumber}
                          </Table.Cell>
                          <Table.Cell>{room.roomType}</Table.Cell>
                          <Table.Cell>₱{room.pricePerNight}</Table.Cell>
                          <Table.Cell>{room.description}</Table.Cell>

                          <Table.Cell className="flex items-center justify-center">
                            <Button
                              className="flex items-center justify-center"
                              onClick={() => handleRoomSelection(room)}
                              color={
                                selectedRoom?.roomNumber === room.roomNumber
                                  ? "success"
                                  : "light"
                              }
                            >
                              {selectedRoom?.roomNumber === room.roomNumber
                                ? "Selected"
                                : "Select Room"}

                              {selectedRoom?.roomNumber === room.roomNumber ? (
                                <FaCheck className="ml-2 h-5 w-5" />
                              ) : (
                                ""
                              )}
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                )}

                {rooms && rooms.length <= 0 && (
                  <>
                    <Alert className="m-5" color="failure">
                      There's no availabe room
                    </Alert>
                  </>
                )}
              </>
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

                <div className="flex justify-between items-center mt-3">
                  <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    Room Number
                  </h1>
                  <h1 className="text-2xl font-bold text-red-500 dark:text-white mb-4">
                    {selectedRoom?.roomNumber}
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
                          Total Guests
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {persons.adults} Adults, {persons.kids} Kids
                        </td>
                      </tr>
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
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {voucher ? voucher : "None"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-600">
                          Price per Night
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          ₱{selectedRoom.pricePerNight}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-600">
                          Total Price
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          ₱{totalPrice}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-600">
                          Downpayment
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          ₱{downpayment}
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
                          Payment Term
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800 flex items-center justify-start">
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
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-600">
                          Make payment for:
                        </td>
                        <td className="px-4 py-2  font-bold text-3xl text-green-800 flex items-center justify-start">
                          ₱{paymentTerm == "down" ? downpayment : totalPrice}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {paymentStatus == "succeeded" && (
          <>
            <div className="div flex items-center justify-center flex-col p-5">
              <h1 className="text-3xl font-bold text-center">
                Thank you for booking with{" "}
                <span className="text-red-500">Sophie Red Hotel</span>
              </h1>
              <div className="bg-green-500 p-10 rounded-full mt-3">
                <FaCheck color="white" size={40} />
              </div>{" "}
              <Button
                gradientMonochrome="failure"
                className="mt-10 py-3 w-full"
              >
                Go to Dashboard
              </Button>
            </div>
          </>
        )}

        {paymentStatus !== "succeeded" && (
          <div className="buttons flex items-center justify-center w-full mt-10">
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
        )}
      </CustomModal>
    </div>
  );
};

export default ClientHeader;
