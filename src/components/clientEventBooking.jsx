import useUserStore from "../utils/zustand";
import DisplayRoom from "./displayRoom";
import logo from "../assets/logo.png";
import moment from "moment";
import { Alert, Badge, Button, Card, Label, Textarea } from "flowbite-react";
import Stepper from "./stepper";
import ClientEvent from "../pages/client/clientEvent";
import ClientRoom from "../pages/client/clientRoom";
import CustomModal from "./customModal";
import Lottie from "react-lottie";
import anim from "../assets/rating.json";
import { FaCheck, FaStar } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";
import useCrudRating from "../hooks/useCrudRating";
const ClientEventBooking = () => {
  const { currentUser, booking } = useUserStore();
  const { addRating } = useCrudRating();

  const roomDetails = booking?.roomDetails || {};
  const [ratingModal, setRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [remarks, setRemarks] = useState("");

  const handleRatingSubmit = () => {
    // const data = { rating, remarks, room: roomDetails, currentUser }
    // console.log(data)
    // addRating(data);
    toast.success("Successfully Added Rating");
    setRating(0);
    setRemarks("");
    setRatingModal(false);
  };

  return (
    <div className="container mx-auto p-0 md:p-10">
      {/* Steps Progress */}
      <Stepper step={booking.status} />

      {booking.status === "Booked" && (
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Map (Hidden on small screens) */}
          <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.287762941997!2d124.73801817494206!3d8.664159191383336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffe45d368a3333%3A0xaae58833c816e934!2sSophie%20Red%20Hotel%20and%20Onshore%20Restaurant!5e0!3m2!1sen!2sph!4v1736693142618!5m2!1sen!2sph"
              width="100%"
              height="450"
              className="rounded-lg shadow-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>

          {/* Right Section - Booking Details */}
          <div className="w-full lg:w-1/2 px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl md:text-3xl font-semibold mb-3">
                We are waiting for you at Sophie Red Hotel
              </h1>
              <img width={150} src={logo} alt="Hotel Logo" className="mb-4" />
            </div>

            <Alert color="warning" className="my-3 text-sm">
              An additional charge per person will be applied to your bill for
              any extra guests upon arrival.
            </Alert>

            {/* Booking Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <h1 className="text-lg font-semibold">Check-In Date</h1>
                <p className="text-gray-500">
                  {moment(booking?.checkInDate?.toDate()).format("LL")}
                </p>
              </Card>

              <Card>
                <h1 className="text-lg font-semibold">Total Guests</h1>
                <p className="text-gray-500">
                  {booking?.roomDetails?.adultCount} Adults &{" "}
                  {booking?.roomDetails?.childCount} Kids
                </p>
              </Card>
              <Card>
                <h1 className="text-lg font-semibold">Balance</h1>
                {booking?.paymentStatus === "full" ? (
                  <Badge size="lg" color="success" className="px-4 py-2">
                    Fully Paid
                  </Badge>
                ) : (
                  <Badge size="lg" color="success" className="px-4 py-2">
                    ₱
                    {(
                      booking?.totalPrice - booking?.downpayment
                    ).toLocaleString()}
                  </Badge>
                )}
              </Card>
            </div>
          </div>
        </div>
      )}
      {booking.status === "Check In" && <ClientEvent />}

      {booking.status === "Completed" && (
        <>
          {booking.status === "Completed" && (
            <div className="container mx-auto h-[50vh] flex flex-col items-center justify-center text-center p-6">
              <FaCheck className="w-16 h-16 text-green-500 mb-4" />
              <h1 className="text-4xl font-bold text-gray-800">
                Thank You for Staying with Us!
              </h1>
              <p className="text-lg text-gray-600 mt-2 max-w-md">
                We hope you had a wonderful time at{" "}
                <span className="font-semibold">Sophie Red Hotel</span>. Your
                comfort and happiness mean everything to us!
              </p>
              <p className="text-lg text-gray-600 mt-2 max-w-md">
                We'd love to hear your feedback. Please leave us a review to
                help us improve.
              </p>
              <Button
                className="mt-4 flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600"
                onClick={() => setRatingModal(true)}
              >
                <FaStar className="w-5 h-5 text-white" />
                <span>Leave a Review</span>
              </Button>
            </div>
          )}
        </>
      )}

      {/* Rating Modal */}
      <CustomModal
        title={"Leave Feedback"}
        open={ratingModal}
        handleClose={() => setRatingModal(false)}
        onSubmit={handleRatingSubmit}
      >
        <div className="container p-10 mx-auto">
          <h1 className="text-3xl font-bold mb-4">Rate Your Stay</h1>
          <div className="flex space-x-2 mb-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-3xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Label htmlFor="remarks" value="Your Remarks" />
          <Textarea
            rows={4}
            id="remarks"
            placeholder="Share your experience..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            required
          />
          <Lottie
            options={{
              animationData: anim,
              autoplay: true,
            }}
            style={{ width: 250 }}
          />
          <p className="text-lg opacity-50">
            We want to hear from you! Your feedback is invaluable in helping us
            improve and make our services better for you. Whether it’s
            suggestions, concerns, or ideas, your input will guide us in making
            the necessary adjustments to ensure we meet your needs and exceed
            your expectations. Thank you for taking the time to share with us —
            together, we can make this experience even better for everyone.
          </p>
        </div>
      </CustomModal>
    </div>
  );
};

export default ClientEventBooking;
