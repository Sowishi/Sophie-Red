import { useEffect, useState } from "react";
import DashboardLayout from "./dashboardLayout";
import {
  Table,
  Dropdown,
  Button,
  Label,
  Alert,
  Select,
  Textarea,
} from "flowbite-react";
import { toast } from "react-toastify";
import useCrudHousekeeping from "../../hooks/useCrudHousekeeping";
import moment from "moment";
import CustomModal from "../../components/customModal";
import useFetchCollection from "../../hooks/useFetchCollection";

const GuestRequest = () => {
  const { fetchAllTasks, addTask, deleteTask } = useCrudHousekeeping();
  const { fetchCollection } = useFetchCollection();
  const [tasks, setTasks] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [housekeepers, setHousekeepers] = useState([]);
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [housekeeper, setHousekeeper] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  useEffect(() => {
    fetchAllTasks(setTasks);
    fetchCollection("housekeepers", setHousekeepers, setLoading);
  }, []);

  const guestRequest = tasks.filter((task) => task.housekeeper == null);

  // Function to get badge color based on status
  const getBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Ongoing":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addTask({
      selectedRoom,
      housekeeper,
      serviceType,
      description,
    });
    deleteTask(selectedTask);
    toast.success("Assignment task successfully!");
    setSelectedRoom(null);
    setHousekeeper("");
    setServiceType("");
    setDescription("");
  };

  const availableHousekeepers = housekeepers.filter(
    (user) => user.status == "Available"
  );
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px]">
        <div className="flex mb-10 flex-col lg:flex-row justify-between items-center">
          <div className="div p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">Guest Request</h1>
            <p className="mt-3 text-gray-500">Here's your guest request</p>
          </div>
        </div>
        <Table hoverable striped>
          <Table.Head>
            <Table.HeadCell>Room Number</Table.HeadCell>
            <Table.HeadCell>Requested Date</Table.HeadCell>
            <Table.HeadCell>Housekeeper</Table.HeadCell>
            <Table.HeadCell>Service Type</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {guestRequest.map((task) => {
              const assignDate = task.createdAt
                ? moment(task.createdAt.toDate()).format("LLL")
                : "Invalid";

              const completedDate = task.completedAt
                ? moment(task.completedAt.toDate()).format("LLL")
                : "---";

              return (
                <Table.Row key={task.id}>
                  <Table.Cell className="text-red-500 font-bold text-3xl">
                    {task.selectedRoom.roomNumber}
                  </Table.Cell>
                  <Table.Cell>{assignDate}</Table.Cell>
                  <Table.Cell>
                    {task.housekeeper?.fullName || "Not Assigned"}
                  </Table.Cell>
                  <Table.Cell>{task.serviceType}</Table.Cell>
                  <Table.Cell>{task.description}</Table.Cell>
                  <Table.Cell>
                    <span
                      className={`px-3 py-1 rounded-md ${getBadgeColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => {
                        setSelectedRoom(task.selectedRoom);
                        setSelectedTask(task.id);
                      }}
                      gradientMonochrome="failure"
                    >
                      Assign{" "}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>

      {/* Bottom Drawer for Assigning Housekeeper */}
      <CustomModal
        title={"Add Housekeeper Task"}
        onSubmit={handleFormSubmit}
        open={selectedRoom}
        handleClose={() => setSelectedRoom(null)}
      >
        <form className="container p-10 mx-auto">
          <div className="header flex justify-between items-center mb-5">
            <h1 className="text-3xl font-bold flex items-center justify-start">
              Room Number: #{selectedRoom?.roomNumber}{" "}
            </h1>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="housekeeper" value="Select Housekeeper" />
              {availableHousekeepers.length >= 1 ? (
                <Dropdown
                  label={
                    housekeeper == null
                      ? "Please Select Housekeeper"
                      : housekeeper.fullName
                  }
                >
                  {availableHousekeepers.map((user) => (
                    <Dropdown.Item onClick={() => setHousekeeper(user)}>
                      {user.fullName}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              ) : (
                <>
                  <Alert color="failure">
                    There's no available housekeepers as of the moment
                  </Alert>
                </>
              )}
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
    </DashboardLayout>
  );
};

export default GuestRequest;
