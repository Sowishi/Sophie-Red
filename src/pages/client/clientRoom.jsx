import {
  Alert,
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
import {
  HiOutlineStar,
  HiOutlineClipboardList,
  HiViewList,
} from "react-icons/hi";
import moment from "moment";
import CompletePayment from "../../components/completePayment";

const ClientRoom = () => {
  const { currentUser, booking } = useUserStore();

  const { fetchCollectin } = useFetchCollection();
  const { addTask, fetchRoomLogs } = useCrudHousekeeping();
  const roomDetails = booking?.roomDetails || {};
  const { addRating } = useCrudRating();

  const [requestModal, setRequestModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [housekeeper, setHousekeeper] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [requestSupply, setRequestSupply] = useState("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [requestHistoryModal, setRequestHistoryModal] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask({
      bookingID: booking.id,
      selectedRoom: booking.roomDetails,
      housekeeper: null,
      serviceType,
      description,
      requestSupply,
      guest: true,
      currentUser,
    });
    toast.success("Assignment task successfully!");
    setHousekeeper("");
    setServiceType("");
    setDescription("");
    setRequestSupply("");
    setRequestModal(false);
  };

  useEffect(() => {
    fetchRoomLogs(booking.id, currentUser.uid, setLogs);
  }, [booking]);

  return (
    <>
      {!booking && <NoData />}
      {roomDetails && booking && (
        <div className="container mx-auto h-screen p-7 lg:p-0">
          <CompletePayment
            title={"You’re all checked in! 🎉 Have a wonderful stay."}
            booking={booking}
          />

          <div className="flex flex-col lg:flex-row  lg:justify-between  justify-start lg:items-center mb-10">
            {/* <Button
              className="hidden lg:flex"
              gradientMonochrome="info"
              onClick={() => setRatingModal(true)}
            >
              Leave A Review
            </Button> */}
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
                <div className="bg-white p-5 lg:p-10 w-full lg:w-9/12 rounded-2xl shadow-2xl mt-5">
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
                    <div className="flex justify-center items-center w-full gap-2">
                      <Button
                        onClick={() => setRequestHistoryModal(true)}
                        gradientMonochrome="info"
                        className="w-full"
                      >
                        Request History
                      </Button>
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
              </div>
            )}
          </div>
        </div>
      )}
      {/* Request Modal */}
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
                <option value="request">Request</option>
              </Select>
            </div>
            {serviceType == "request" && (
              <>
                <Label htmlFor="request" value="Request Supply" />
                <Textarea
                  rows={3}
                  id="request"
                  placeholder="Towels, Bed Sheet, Additional Pillows, etc."
                  value={requestSupply}
                  onChange={(e) => setRequestSupply(e.target.value)}
                  required
                />
              </>
            )}
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

      {/* Request History Modal */}
      <CustomModal
        hideFooter={true}
        size={"7xl"}
        title={"Request History"}
        open={requestHistoryModal}
        handleClose={() => setRequestHistoryModal(false)}
        onSubmit={handleFormSubmit}
      >
        {logs.length >= 1 ? (
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell>Request Date</Table.HeadCell>
              <Table.HeadCell>Housekeeper</Table.HeadCell>
              <Table.HeadCell>Service Type</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Completed At</Table.HeadCell>
              <Table.HeadCell>Remarks</Table.HeadCell>

              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {logs.map((log) => {
                const assignDate = log?.createdAt
                  ? moment(log?.createdAt.toDate()).format("LLL")
                  : "invalid";

                const completedDate = log?.completedAt
                  ? moment(log?.completedAt.toDate()).format("LLL")
                  : "invalid";
                return (
                  <Table.Row key={log?.id}>
                    <Table.Cell>{assignDate}</Table.Cell>
                    <Table.Cell>{log?.housekeeper?.fullName}</Table.Cell>
                    <Table.Cell>{log?.selectedRoom.serviceType}</Table.Cell>
                    <Table.Cell>{log?.selectedRoom.description}</Table.Cell>

                    <Table.Cell>
                      {log?.completedAt ? completedDate : "---"}
                    </Table.Cell>
                    <Table.Cell>{log?.remarks || "---"}</Table.Cell>

                    <Table.Cell>
                      <Badge>{log?.status}</Badge>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        ) : (
          <>
            <Alert color="failure">There's no logs to show</Alert>
          </>
        )}
      </CustomModal>

      <div className="bottom-navs fixed bottom-0 left-0 bg-white w-full p-5 flex lg:hidden justify-center items-center">
        <Button
          gradientMonochrome="info"
          className="w-full mr-5 flex items-center space-x-2"
          onClick={() => setRequestHistoryModal(true)}
        >
          <HiViewList size={20} />
          <span className="ml-3">Logs</span>
        </Button>
        <Button
          onClick={() => setRequestModal(true)}
          gradientMonochrome="failure"
          className="w-full flex items-center space-x-2"
        >
          <HiOutlineClipboardList size={20} />
          <span className="ml-3">Request </span>
        </Button>
      </div>
    </>
  );
};

export default ClientRoom;
