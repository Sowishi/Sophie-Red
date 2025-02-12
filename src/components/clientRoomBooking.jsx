import useUserStore from "../utils/zustand";
import DisplayRoom from "./displayRoom";
import logo from "../assets/logo.png";
import moment from "moment";
import { Alert, Badge, Card } from "flowbite-react";
import Stepper from "./stepper";
import ClientRoom from "../pages/client/clientRoom";

const ClienRoomBooking = () => {
  const { currentUser, booking } = useUserStore();
  const roomDetails = booking?.roomDetails || {};

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
                <h1 className="text-lg font-semibold">Room Number</h1>
                <p className="text-gray-500">{roomDetails?.roomNumber}</p>
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
      {booking.status === "Check In" && <ClientRoom />}
    </div>
  );
};

export default ClienRoomBooking;
