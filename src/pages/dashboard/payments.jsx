import { Alert, Button } from "flowbite-react";
import DashboardLayout from "./dashboardLayout";
import { FaCalendarAlt, FaPlus, FaMinus } from "react-icons/fa";
import { PaymentsTable } from "../../components/paymentsTable";
import { FaBed } from "react-icons/fa6";
import { useState, useEffect } from "react";
import SearchInput from "../../components/searchInput";
import CustomModal from "../../components/customModal";
import useCrudBooking from "../../hooks/useCrudBooking";
import { toast } from "react-toastify";
import moment from "moment";
import { calculateStayDuration } from "../../utils/calculateStay";
import logo from "../../assets/logo.png";
import ReceiptUI from "../../components/receiptUI";
const Payments = () => {
  const [filterType, setFilterType] = useState("room");
  const [search, setSearch] = useState("");
  const [checkInModal, setCheckInModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [extraCharge, setExtraCharge] = useState(0);
  const [receiptModal, setReceiptModal] = useState(false);
  const { checkInBooking, checkoutBooking } = useCrudBooking();

  useEffect(() => {
    if (selectedBooking) {
      const allowedAdults = selectedBooking?.roomDetails.adultCount || 0;
      const allowedChildren = selectedBooking?.roomDetails.childCount || 0;

      const extraAdults = Math.max(0, adultCount - allowedAdults);
      const extraChildren = Math.max(0, childCount - allowedChildren);

      const totalExtraGuests = extraAdults + extraChildren;
      setExtraCharge(totalExtraGuests * 600);
    }
  }, [adultCount, childCount, selectedBooking]);

  const handleCheckInGuest = async () => {
    await checkInBooking(selectedBooking.id, extraCharge);
    setCheckInModal(false);
    toast.success("Guest Checked In Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleCheckOutGuest = async () => {
    await checkoutBooking(selectedBooking.id);
    setCheckOutModal(false);
    toast.success("Guest Checked Out Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px] pt-10">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">
              Booking Management
            </h1>
            <div className="flex mt-2">
              <Button.Group color="failure">
                <Button
                  color={filterType === "room" ? "failure" : "light"}
                  onClick={() => setFilterType("room")}
                >
                  <FaBed className="mr-2 mt-1" /> Room
                </Button>
                <Button
                  color={filterType === "event" ? "failure" : "light"}
                  onClick={() => setFilterType("event")}
                >
                  <FaCalendarAlt className="mr-2 mt-1" /> Event
                </Button>
              </Button.Group>
            </div>
          </div>
        </div>

        <PaymentsTable
          setSelectedBooking={setSelectedBooking}
          setCheckInModal={setCheckInModal}
          setCheckOutModal={setCheckOutModal}
          search={search}
          typeFilter={filterType}
        />
      </div>
      {/* Check In Modal */}
      <CustomModal
        onSubmit={handleCheckInGuest}
        title={"Checking In Guest"}
        size={"5xl"}
        open={checkInModal}
        handleClose={() => setCheckInModal(false)}
      >
        {selectedBooking?.bookType == "room" && (
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold">
              The total guest allowed in this booking is{" "}
              {selectedBooking?.roomDetails.adultCount} Adults and{" "}
              {selectedBooking?.roomDetails.childCount} Kids.{" "}
            </h1>
            <Alert>
              Please confirm the number of guest arrived at the hotel before
              checking them in
            </Alert>

            {/* Adult Counter */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Adults</span>
              <div className="flex items-center gap-3">
                <Button
                  color="gray"
                  onClick={() => setAdultCount((prev) => Math.max(1, prev - 1))}
                  disabled={adultCount === 1}
                >
                  <FaMinus />
                </Button>
                <span className="text-xl font-bold">{adultCount}</span>
                <Button
                  color="gray"
                  onClick={() => setAdultCount((prev) => prev + 1)}
                >
                  <FaPlus />
                </Button>
              </div>
            </div>

            {/* Child Counter */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Children</span>
              <div className="flex items-center gap-3">
                <Button
                  color="gray"
                  onClick={() => setChildCount((prev) => Math.max(0, prev - 1))}
                  disabled={childCount === 0}
                >
                  <FaMinus />
                </Button>
                <span className="text-xl font-bold">{childCount}</span>
                <Button
                  color="gray"
                  onClick={() => setChildCount((prev) => prev + 1)}
                >
                  <FaPlus />
                </Button>
              </div>
            </div>
            <p className="text-lg opacity-50">
              The hotel requires an additional bed for each extra guest. You
              currently have{" "}
              {Math.max(
                0,
                adultCount - selectedBooking?.roomDetails.adultCount
              )}{" "}
              extra adult(s) and{" "}
              {Math.max(
                0,
                childCount - selectedBooking?.roomDetails.childCount
              )}{" "}
              extra child(ren) for which additional beds will be provided. An
              additional fee of 600 pesos per bed applies.
            </p>
            <div className="flex justify-end">
              <h1 className="text-3xl font-bold">
                Extra Charge: ₱{extraCharge}
              </h1>
            </div>
          </div>
        )}

        {selectedBooking?.bookType == "event" && (
          <>
            <div className="container mx-auto  flex justify-center items-center flex-col">
              <h1 className="text-3xl font-bold">
                Welcome to Sophie Red Hotel
              </h1>
              <img src={logo} alt="" />
            </div>
          </>
        )}
      </CustomModal>

      {/* Check Out Modal */}
      {selectedBooking && (
        <CustomModal
          onSubmit={handleCheckOutGuest}
          title={"Checking Out Guest"}
          size={"7xl"}
          open={checkOutModal}
          handleClose={() => setCheckOutModal(false)}
        >
          {selectedBooking?.bookType == "room" && (
            <div className="container mx-auto p-5">
              <div className="flex items-center justify-start ">
                <Alert color="warning" className="mb-3">
                  Make sure the guest is fully paid before checking them out
                </Alert>
                <Button onClick={() => setReceiptModal(true)} className="ml-3">
                  Print Receipt
                </Button>
              </div>
              <div className="flex">
                <div className="basis-6/12">
                  <div className="wrapper">
                    <h1 className="text-4xl">Checkout Guest</h1>
                    <p className="opacity-50">
                      Thank you for staying with us, hope we see you again
                    </p>
                  </div>
                  <h1 className="mt-5 text-2xl">Customer Information</h1>
                  <hr className="my-3" />
                  <div className="flex justify-around items-center">
                    <div className="wrapper">
                      <h1 className="opacity-50">Customer Name</h1>
                      <div className="flex items-center justify-center mt-2">
                        <img
                          className="rounded-full w-[50px] mr-2"
                          src={selectedBooking?.currentUser?.photoURL}
                          alt=""
                        />
                        <h1 className="font-bold text-2xl">
                          {selectedBooking?.currentUser.name}
                        </h1>
                      </div>
                    </div>
                    <div className="wrapper">
                      <h1 className="opacity-50">Checkout Date</h1>
                      <div className="flex items-center justify-center mt-2">
                        <FaCalendarAlt size={24} />
                        <h1 className="font-bold text-2xl ml-3">
                          {moment(
                            selectedBooking.checkOutDate
                              ? moment(
                                  selectedBooking.checkOutDate.toDate()
                                ).format("LL")
                              : "Invalid Date"
                          ).format("LL")}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-10 justify-around items-center">
                    <div className="wrapper">
                      <h1 className="opacity-50">Room Number</h1>
                      <h1 className="font-bold text-2xl ml-3">
                        {selectedBooking?.roomDetails.roomNumber}
                      </h1>
                    </div>
                    <div className="wrapper">
                      <h1 className="opacity-50">Booking ID</h1>
                      <div className="flex items-center justify-center mt-2">
                        <h1 className="font-bold text-2xl ml-3">
                          {selectedBooking?.id}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="basis-6/12">
                  <h1 className="text-2xl font-semibold my-5">Price Details</h1>
                  <hr />
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between">
                      <h1>Price Per Night</h1>
                      <h1 className="font-light">
                        ₱{selectedBooking.roomDetails.pricePerNight}
                      </h1>
                    </div>
                    <div className="flex justify-between">
                      <h1>Stay Duration</h1>
                      <h1 className="font-light">
                        {
                          calculateStayDuration(
                            selectedBooking?.checkInDate,
                            selectedBooking?.checkOutDate,
                            true
                          ).days
                        }{" "}
                        day(s)
                      </h1>
                    </div>

                    <div className="flex justify-between">
                      <h1>Total Stay Cost</h1>
                      <h1 className="font-light">
                        +₱
                        {selectedBooking.roomDetails.pricePerNight *
                          calculateStayDuration(
                            selectedBooking?.checkInDate,
                            selectedBooking?.checkOutDate,
                            true
                          ).days}
                      </h1>
                    </div>

                    {selectedBooking?.extraCharge > 0 && (
                      <div className="flex justify-between">
                        <h1>Aditional Person Charge</h1>
                        <h1 className="font-light">
                          +₱{selectedBooking.extraCharge}
                        </h1>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <h1>Paid Balance</h1>
                      {selectedBooking?.paymentStatus == "full" ? (
                        <h1 className="font-light text-green-500">
                          -₱
                          {selectedBooking.totalPrice -
                            selectedBooking?.extraCharge}
                        </h1>
                      ) : (
                        <h1 className="font-light text-green-500">
                          -₱{selectedBooking.downpayment}
                        </h1>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <h1>Current Balance</h1>
                      <h1 className="font-bold text-red-500 text-3xl">
                        {selectedBooking?.paymentStatus == "full" ? (
                          <>₱{selectedBooking?.extraCharge || 0}</>
                        ) : (
                          <>
                            ₱
                            {selectedBooking.totalPrice -
                              selectedBooking.downpayment}
                          </>
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedBooking?.bookType == "event" && (
            <div className="container mx-auto p-5">
              <Alert color="warning" className="mb-3">
                Make sure the guest is fully paid before checking them out
              </Alert>
              <div className="flex">
                <div className="basis-6/12">
                  <div className="wrapper">
                    <h1 className="text-4xl">Checkout Guest</h1>
                    <p className="opacity-50">
                      Thank you for staying with us, hope we see you again
                    </p>
                  </div>
                  <h1 className="mt-5 text-2xl">Customer Information</h1>
                  <hr className="my-3" />
                  <div className="flex justify-around items-center">
                    <div className="wrapper">
                      <h1 className="opacity-50">Customer Name</h1>
                      <div className="flex items-center justify-center mt-2">
                        <img
                          className="rounded-full w-[50px] mr-2"
                          src={selectedBooking?.currentUser?.photoURL}
                          alt=""
                        />
                        <h1 className="font-bold text-2xl">
                          {selectedBooking?.currentUser.name}
                        </h1>
                      </div>
                    </div>
                    <div className="wrapper">
                      <h1 className="opacity-50">Checkout Date</h1>
                      <div className="flex items-center justify-center mt-2">
                        <FaCalendarAlt size={24} />
                        <h1 className="font-bold text-2xl ml-3">
                          {moment(selectedBooking?.checkoutDate).format("LL")}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-10 justify-around items-center">
                    <div className="wrapper">
                      <h1 className="opacity-50">Event</h1>
                      <h1 className="font-bold text-2xl ml-3">
                        Functional Event
                      </h1>
                    </div>
                    <div className="wrapper">
                      <h1 className="opacity-50">Booking ID</h1>
                      <div className="flex items-center justify-center mt-2">
                        <h1 className="font-bold text-2xl ml-3">
                          {selectedBooking?.id}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="basis-6/12">
                  <h1 className="text-2xl font-semibold my-5">Price Details</h1>
                  <hr />
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between">
                      <h1>Price Per Night</h1>
                      <h1 className="font-light">10000</h1>
                    </div>
                    <div className="flex justify-between">
                      <h1>Stay Duration</h1>
                      <h1 className="font-light">
                        {
                          calculateStayDuration(
                            selectedBooking?.checkInDate,
                            selectedBooking?.checkOutDate,
                            true
                          ).days
                        }{" "}
                        day(s)
                      </h1>
                    </div>

                    <div className="flex justify-between">
                      <h1>Total Stay Cost</h1>
                      <h1 className="font-light">
                        +₱
                        {10000 *
                          calculateStayDuration(
                            selectedBooking?.checkInDate,
                            selectedBooking?.checkOutDate,
                            true
                          ).days}
                      </h1>
                    </div>

                    <div className="flex justify-between">
                      <h1>Paid Balance</h1>
                      {selectedBooking?.paymentStatus == "full" ? (
                        <h1 className="font-light text-green-500">
                          -₱
                          {selectedBooking.totalPrice -
                            selectedBooking?.extraCharge}
                        </h1>
                      ) : (
                        <h1 className="font-light text-green-500">
                          -₱{selectedBooking.downpayment}
                        </h1>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <h1>Current Balance</h1>
                      <h1 className="font-bold text-red-500 text-3xl">
                        {selectedBooking?.paymentStatus == "full" ? (
                          <>₱{selectedBooking?.extraCharge || 0}</>
                        ) : (
                          <>
                            ₱
                            {selectedBooking.totalPrice -
                              selectedBooking.downpayment}
                          </>
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CustomModal>
      )}

      {selectedBooking && (
        <CustomModal
          hideFooter={true}
          size={"2xl"}
          open={receiptModal}
          handleClose={() => setReceiptModal(false)}
        >
          <ReceiptUI booking={selectedBooking} />
        </CustomModal>
      )}
    </DashboardLayout>
  );
};

export default Payments;
