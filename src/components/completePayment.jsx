import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineCreditCard, AiOutlineShop } from "react-icons/ai"; // Importing React Icons
import { createPaymongoCheckout } from "../utils/paymongoCheckout";
import CustomModal from "./customModal";
import { getCheckoutPaymongo } from "../utils/getCheckout";
import moment from "moment";

const CompletePayment = ({ booking, event }) => {
  const [openModal, setOpenModal] = useState(false);
  const remainingBalance = booking.totalPrice - booking.downpayment;
  const [paymongoModal, setPaymongoModal] = useState(false);
  const [paymongoURL, setPaymongoURL] = useState(null);
  const [checkoutID, setCheckoutID] = useState(null);

  const handlePayment = async () => {
    const res = await createPaymongoCheckout(remainingBalance, "full");
    setCheckoutID(res.id);
    setPaymongoModal(true);
    setPaymongoURL(res.url);
  };

  const getCheckout = async () => {
    if (checkoutID) {
      const res = await getCheckoutPaymongo(checkoutID);
      console.log(res);
      if (res === "succeeded") {
        console.log("Mahal kita MICA");

        localStorage.setItem("redirectAfterReload", "true");

        window.location.reload(); // Reload the page
      }
    }
  };

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
    <div className="flex items-center justify-between flex-col lg:flex-row p-6 bg-white shadow-md rounded-lg">
      {/* Left Section - Welcome Message */}
      <div className="wrapper space-y-4 text-center lg:text-left">
        {!event && (
          <h1 className="text-3xl font-bold text-gray-800">
            You’re all checked in! 🎉 Have a wonderful stay.
          </h1>
        )}
        {event && (
          <>
            <p className="text-3xl font-bold">
              {booking.roomDetails.eventName} - Your{" "}
              {booking.roomDetails.eventType} will start in{" "}
              {moment(booking.roomDetails.startTime, "HH:mm").format("h:mm A")}
            </p>
          </>
        )}
        <p className="text-gray-600">
          We’re delighted to welcome you. If there’s anything we can do to make
          your stay more comfortable, please don’t hesitate to let us know.
        </p>
      </div>

      {/* Right Section - Payment Button */}
      <div className="flex flex-col items-center">
        {booking.paymentStatus !== "full" && (
          <Button
            color="success"
            className="mt-2 text-lg px-6 py-2"
            onClick={() => setOpenModal(true)}
          >
            Complete Payment - ₱{remainingBalance}
          </Button>
        )}
        {booking.paymentStatus == "full" && (
          <Button
            disabled
            color="success"
            className="mt-2 text-lg px-6 py-2"
            onClick={() => setOpenModal(true)}
          >
            Fully Paid
          </Button>
        )}
      </div>

      {/* Payment Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <h2 className="text-xl font-semibold">Complete Your Payment</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center space-y-4">
            {/* Payment Image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/4103/4103095.png"
              alt="Payment Options"
              className="w-24 h-24"
            />

            {/* Payment Message */}
            <p className="text-lg text-gray-700 text-center">
              To confirm your payment, please pay your remaining balance
            </p>

            {/* Balance Amount */}
            <p className="text-xl font-semibold text-red-600">
              Remaining Balance: ₱{remainingBalance}
            </p>

            {/* Payment Buttons */}
            <div className="flex gap-4">
              <Button
                color="blue"
                className="flex items-center gap-2 px-4 py-2"
                onClick={handlePayment}
              >
                <AiOutlineCreditCard size={20} /> Pay Online
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

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

export default CompletePayment;
