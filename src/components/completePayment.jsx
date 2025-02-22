import { Button } from "flowbite-react";
import CustomModal from "./customModal";
import { useState } from "react";

const CompletePayment = ({ booking }) => {
  const [paymongoURL, setPaymongoURL] = useState(null);
  const [paymongoModal, setPaymongoModal] = useState(false);

  return (
    <div className="flex items-center justify-between flex-col lg:flex-row ">
      <div className="wrapper space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">
          You’re all checked in! Have a wonderful stay.
        </h1>
        <p className="text-gray-600">
          We’re delighted to welcome you. If there’s anything we can do to make
          your stay more comfortable, please don’t hesitate to let us know.
        </p>
      </div>
      <div className="flex justify-center items-center flex-col">
        {booking.paymentStatus !== "full" && (
          <Button color="success" className="mt-2">
            Complete Payment - ₱{booking.totalPrice - booking.downpayment}
          </Button>
        )}
      </div>

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
