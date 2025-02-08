import {
  Badge,
  Button,
  Dropdown,
  Label,
  Select,
  Table,
  Textarea,
} from "flowbite-react";
import DisplayRoom from "../../components/displayRoom";
import useUserStore from "../../utils/zustand";
import ClientDashboardLayout from "./clientDashboardLayout";
import CustomModal from "../../components/customModal";
import { useEffect, useState } from "react";
import useFetchCollection from "../../hooks/useFetchCollection";
import useCrudHousekeeping from "../../hooks/useCrudHousekeeping";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import useCrudBooking from "../../hooks/useCrudBooking";
import RatingLanding from "../../components/ratings";
import Lottie from "react-lottie";
import anim from "../../assets/rating.json";
import useCrudRating from "../../hooks/useCrudRating";
import NoData from "../../components/noData";

const ClientRoom = () => {
  const { currentUser, booking } = useUserStore();

  const { fetchCollectin } = useFetchCollection();
  const { addTask } = useCrudHousekeeping();
  const roomDetails = booking?.roomDetails || {};
  const [requestModal, setRequestModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [housekeeper, setHousekeeper] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [remarks, setRemarks] = useState("");
  const { addRating } = useCrudRating();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask({
      selectedRoom: booking.roomDetails,
      housekeeper: null,
      serviceType,
      description,
    });
    toast.success("Assignment task successfully!");
    setHousekeeper("");
    setServiceType("");
    setDescription("");
    setRequestModal(false);
  };

  const handleRatingSubmit = () => {
    addRating({ rating, remarks, room: roomDetails, currentUser });
    setRating(0);
    setRemarks("");
    setRatingModal(false);
    toast.success("Thank you for your feedback");
  };

  return (
    <>
      {!booking && <NoData />}
      {roomDetails && booking && (
        <div className="container mx-auto h-screen p-7 lg:p-0">
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between  justify-start lg:items-center mb-10">
            <div className="wrapper mb-5">
              <h1 className="text-3xl lg:text-3xl lg:text-5xl font-bold ">
                {roomDetails.roomType}
              </h1>
              <p className="opacity-50 text-sm lg:text-lg">
                {roomDetails.description}
              </p>
            </div>
            <Button
              className="hidden lg:flex"
              gradientMonochrome="info"
              onClick={() => setRatingModal(true)}
            >
              Leave A Review
            </Button>
          </div>

          <div className="flex flex-wrap">
            <div className="basis-full lg:basis-7/12">
              {roomDetails && <DisplayRoom roomID={roomDetails.id} />}
              <h1 className="text-3xl my-5">About</h1>
              <p className="text-sm opacity-50">
                Have a hassle-free trip while enjoying the services and
                amenities offered by Sophie Red Hotel and Onshore Restaurant.
                Keep up with all your communications easily with the hotel's
                free Wi-Fi. Getting from and back to the airport can be easily
                arranged with the hotel's airport transfer services. Car hire
                services provided by the hotel make exploring Jasaan even more
                convenient. Guests can enjoy free parking right at the hotel.
                Front desk service is provided at the hotel including concierge
                service. Getting tickets for the city's best entertainment is
                easy through the hotel's tours. Feeling lazy? In-room
                conveniences like 24-hour room service and daily housekeeping
                let you get the most out of your room time. Forgot to pack
                something? All your last-minute needs can be fulfilled by the
                convenience stores, saving you time and hassle. Enjoy the
                services offered at Sophie Red Hotel and Onshore Restaurant from
                the convenience of your guestroom. For your comfort, some rooms
                at the hotel are equipped with air conditioning. Some rooms at
                Sophie Red Hotel and Onshore Restaurant even come with extra
                design features such as a balcony or terrace. It's good to know
                that bathroom amenities including a hair dryer are provided in
                some of the guest bathrooms.
              </p>
            </div>

            {/* Right Section: Room Details Table */}
            {roomDetails && (
              <div className="basis-full lg:basis-5/12 flex items-start justify-center">
                <div className="bg-white p-5 lg:p-10 w-full lg:w-9/12 rounded-lg shadow mt-5">
                  <h1 className="text-2xl font-semibold mb-5">Details</h1>
                  <hr />
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between">
                      <h1>Room Number</h1>
                      <h1 className="font-bold">{roomDetails?.roomNumber}</h1>
                    </div>
                    <div className="flex justify-between">
                      <h1>Room Type</h1>
                      <h1 className="font-bold">{roomDetails?.roomType}</h1>
                    </div>

                    <div className="flex justify-between">
                      <h1>Total Guest Allowed</h1>
                      <h1 className="font-bold">
                        {roomDetails?.adultCount} Adults &{" "}
                        {roomDetails?.childCount} Kids
                      </h1>
                    </div>
                  </div>
                  <hr />
                  <div className="wrapper hidden lg:flex flex-col  items-center justify-center">
                    <h1 className="text-2xl font-semibold my-5">
                      Accomodation
                    </h1>
                    <hr />
                    <Button
                      onClick={() => setRequestModal(true)}
                      gradientMonochrome="failure"
                      className="w-full"
                    >
                      Request Service
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <CustomModal
        title={"Request Service"}
        open={requestModal}
        handleClose={() => setRequestModal(false)}
        onSubmit={handleFormSubmit}
      >
        <form className="container p-10 mx-auto">
          <div className="header flex justify-between items-center mb-5">
            <h1 className="text-3xl font-bold flex items-center justify-start">
              Room Number: #{booking?.roomDetails?.roomNumber}{" "}
            </h1>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="serviceType" value="Select Service Type" />
              <Select
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Choose service type
                </option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="description" value="Description" />
              <Textarea
                rows={5}
                id="description"
                placeholder="Provide additional details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CustomModal>

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
      <div className="bottom-navs fixed bottom-0 left-0 bg-white w-full p-5  flex lg:hidden justify-center items-center ">
        <Button
          gradientMonochrome="info"
          className="w-full mr-5"
          onClick={() => setRatingModal(true)}
        >
          Leave A Review
        </Button>
        <Button
          onClick={() => setRequestModal(true)}
          gradientMonochrome="failure"
          className="w-full"
        >
          Request Service
        </Button>
      </div>
    </>
  );
};

export default ClientRoom;
