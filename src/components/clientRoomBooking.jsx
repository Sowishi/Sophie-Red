import useUserStore from "../utils/zustand";
import DisplayRoom from "./displayRoom";
import logo from "../assets/logo.png";
import Lottie from "react-lottie";
import maps from "../assets/maps.json";
import moment from "moment";
import { Alert, Badge, Card } from "flowbite-react";

const ClienRoomBooking = () => {
  const { currentUser, booking } = useUserStore();
  const roomDetails = booking?.roomDetails || {};

  return (
    <div className="container mx-auto p-10 ">
      <div className="flex">
        <div className="hidden lg:flex basis-6/12  justify-center items-center flex-col">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.287762941997!2d124.73801817494206!3d8.664159191383336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffe45d368a3333%3A0xaae58833c816e934!2sSophie%20Red%20Hotel%20and%20Onshore%20Restaurant!5e0!3m2!1sen!2sph!4v1736693142618!5m2!1sen!2sph"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer"
          ></iframe>
        </div>
        <div className="basis-full lg:basis-6/12 lg:px-10">
          <div className="wrapper flex justify-center items-center flex-col">
            <h1 className="text-3xl font-semibold mb-2 text-center">
              We are waiting for you at Sophie Red Hotel
            </h1>
            <img width={200} src={logo} alt="Hotel Logo" />
          </div>
          <Alert color="warning" className="my-3">
            <div className="text-xs">
              "An additional charge per person will be applied to your bill for
              any extra guests upon arrival."
            </div>
          </Alert>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h1 className="text-xl font-semibold">Check In Date</h1>
              <p className="opacity-50">
                {moment(booking.checkInDate.toDate()).format("LL")}
              </p>
            </Card>
            <Card>
              <h1 className="text-xl font-semibold">Room Number</h1>
              <p className="opacity-50">{roomDetails?.roomNumber}</p>
            </Card>
            <Card>
              <h1 className="text-xl font-semibold">Total Guests</h1>
              <p className="opacity-50">
                {booking.roomDetails.adultCount} Adults &{" "}
                {booking.roomDetails.childCount} Kids
              </p>
            </Card>
            <Card>
              <h1 className="text-xl font-semibold">Balance</h1>
              <p>
                {booking?.paymentStatus === "full" ? (
                  <div className="flex">
                    <Badge size="3xl" className="mx-3" color="success">
                      Fully Paid
                    </Badge>
                  </div>
                ) : (
                  <div className="flex">
                    <Badge size="3xl" className="px-3" color="success">
                      ₱
                      {(
                        booking?.totalPrice - booking?.downpayment
                      ).toLocaleString()}
                    </Badge>
                  </div>
                )}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienRoomBooking;
