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

const ClientRoom = () => {
  const { booking } = useUserStore();
  const { fetchCollection } = useFetchCollection();
  const { addTask, fetchRoomTasks } = useCrudHousekeeping();
  const roomDetails = booking?.roomDetails || {}; // Use optional chaining to prevent errors
  const [requestModal, setRequestModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [housekeeper, setHousekeeper] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask({
      selectedRoom: booking.roomDetails,
      housekeeper,
      serviceType,
      description,
    });
    toast.success("Assignment task successfully!");
    setHousekeeper("");
    setServiceType("");
    setDescription("");
    setRequestModal(false);
  };

  useEffect(() => {
    fetchCollection("users", setUsers, setLoading);
  }, []);

  const houseKeepers = users.filter((user) => user.role === "Housekeeping");

  return (
    <ClientDashboardLayout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-extrabold text-lg lg:text-3xl">
          Your Room Information
        </h1>
        <Button
          onClick={() => setRequestModal(true)}
          gradientMonochrome="failure"
        >
          Request Service
        </Button>
      </div>

      {roomDetails && (
        <div className="container mx-auto h-screen flex flex-wrap">
          {/* Left Side - Room Display */}
          <div className="basis-full lg:basis-6/12 flex">
            <DisplayRoom roomID={roomDetails.id} />
          </div>

          {/* Right Side - Room Details Table */}
          <div className="basis-full lg:basis-6/12 mt-5 lg:mt-0">
            <Table className="border border-gray-300 shadow-sm lg:mx-5">
              <Table.Head>
                <Table.HeadCell className="bg-gray-200 text-gray-700">
                  Property
                </Table.HeadCell>
                <Table.HeadCell className="bg-gray-200 text-gray-700">
                  Details
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white">
                  <Table.Cell className="font-medium">Room Type</Table.Cell>
                  <Table.Cell>{roomDetails.roomType}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-gray-50">
                  <Table.Cell className="font-medium">Room Number</Table.Cell>
                  <Table.Cell>{roomDetails.roomNumber}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="font-medium">Adults</Table.Cell>
                  <Table.Cell>{roomDetails.adultCount}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-gray-50">
                  <Table.Cell className="font-medium">Children</Table.Cell>
                  <Table.Cell>{roomDetails.childCount}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="font-medium">
                    Price per Night
                  </Table.Cell>
                  <Table.Cell>₱{roomDetails.pricePerNight}</Table.Cell>
                </Table.Row>

                <Table.Row className="bg-white">
                  <Table.Cell className="font-medium">Description</Table.Cell>
                  <Table.Cell>{roomDetails.description}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
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
              Room Number: #{booking.roomDetails?.roomNumber}{" "}
            </h1>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="housekeeper" value="Select Housekeeper" />
              <Dropdown
                label={
                  housekeeper == null
                    ? "Please Select Housekeeper"
                    : housekeeper.fullName
                }
              >
                {houseKeepers.map((user) => (
                  <Dropdown.Item onClick={() => setHousekeeper(user)}>
                    {user.fullName}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
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
    </ClientDashboardLayout>
  );
};

export default ClientRoom;
