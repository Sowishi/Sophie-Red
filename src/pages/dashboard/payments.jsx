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

const Payments = () => {
  const [filterType, setFilterType] = useState("room");
  const [search, setSearch] = useState("");
  const [checkInModal, setCheckInModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [extraCharge, setExtraCharge] = useState(0);

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
        title={"Confirm Number of Guests"}
        size={"5xl"}
        open={checkInModal}
        handleClose={() => setCheckInModal(false)}
      >
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
            {Math.max(0, adultCount - selectedBooking?.roomDetails.adultCount)}{" "}
            extra adult(s) and{" "}
            {Math.max(0, childCount - selectedBooking?.roomDetails.childCount)}{" "}
            extra child(ren) for which additional beds will be provided. An
            additional fee of 600 pesos per bed applies.
          </p>
          <div className="flex justify-end">
            <h1 className="text-3xl font-bold">Extra Charge: ₱{extraCharge}</h1>
          </div>
        </div>
      </CustomModal>

      {/* Check Out Modal */}
      <CustomModal
        onSubmit={handleCheckOutGuest}
        title={"Confirm Number of Guests"}
        size={"5xl"}
        open={checkOutModal}
        handleClose={() => setCheckOutModal(false)}
      >
        <h1 className="text-3xl">
          Customer Balance:{" "}
          {selectedBooking?.totalPrice - selectedBooking?.downpayment}{" "}
        </h1>
      </CustomModal>
    </DashboardLayout>
  );
};

export default Payments;
