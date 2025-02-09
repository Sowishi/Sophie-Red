import { Badge, Button, Dropdown, Table } from "flowbite-react";
import useCrudHousekeeping from "../hooks/useCrudHousekeeping";
import { useEffect, useState } from "react";
import useUserStore from "../utils/zustand";
import Loader from "./loader";
import moment from "moment";
import { toast } from "react-toastify";
import CustomModal from "./customModal";
import CustomInput from "./customInput";

const HousekeeperTable = () => {
  const { fetchAllTasks, updateTaskStatus } = useCrudHousekeeping();
  const [tasks, setTasks] = useState(null);
  const [filter, setFilter] = useState("All");
  const { currentAdmin } = useUserStore();
  const [taskType, setTaskType] = useState("guest");
  const [remarksModal, setRemarksModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  const handleGetFetchTasks = async () => {
    await fetchAllTasks(setTasks);
  };
  useEffect(() => {
    handleGetFetchTasks();
  }, []);

  const handleStatusUpdate = async () => {
    await updateTaskStatus(
      selectedTask.id,
      selectedStatus,
      selectedTask.selectedRoom.selectedRoom.id,
      selectedTask.housekeeper,
      remarks
    );
    toast.success("Successfully updated the task status");
    setRemarksModal(false);
    handleGetFetchTasks();
  };

  const handleStatusUpdateNotGuest = async () => {
    await updateTaskStatus(
      selectedTask.id,
      selectedStatus,
      selectedTask.selectedRoom.id,
      selectedTask.housekeeper,
      remarks
    );
    toast.success("Successfully updated the task status");
    setRemarksModal(false);
    handleGetFetchTasks();
  };

  if (tasks == null) {
    return <Loader />;
  }

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  const getBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white";
      case "Ongoing":
        return "bg-yellow-500 text-white";
      case "Pending":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const validTasks = filteredTasks.filter((task) => task.housekeeper !== null);

  const guesTasks = validTasks.filter((task) => task.selectedRoom.guest);
  const supervisorTasks = validTasks.filter((task) => !task.selectedRoom.guest);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 space-x-2">
        <Button.Group>
          <Button
            color={taskType == "guest" ? "info" : "light"}
            onClick={() => setTaskType("guest")}
          >
            Guest Request Tasks
          </Button>
          <Button
            color={taskType == "supervisor" ? "info" : "light"}
            onClick={() => setTaskType("supervisor")}
          >
            Housekeeeper Supervisor Tasks
          </Button>
        </Button.Group>
        <Button.Group>
          <Button
            color={filter == "All" ? "failure" : "light"}
            onClick={() => setFilter("All")}
          >
            All
          </Button>
          <Button
            color={filter == "Pending" ? "failure" : "light"}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </Button>
          <Button
            color={filter == "Ongoing" ? "failure" : "light"}
            onClick={() => setFilter("Ongoing")}
          >
            Ongoing
          </Button>
          <Button
            color={filter == "Completed" ? "failure" : "light"}
            onClick={() => {
              setFilter("Completed");
            }}
          >
            Completed
          </Button>
        </Button.Group>
      </div>

      {taskType == "guest" ? (
        <>
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell>Room Number</Table.HeadCell>
              <Table.HeadCell>Assign Date</Table.HeadCell>
              <Table.HeadCell>Housekeeper</Table.HeadCell>
              <Table.HeadCell>Service Type</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Completed At</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Remarks</Table.HeadCell>

              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {guesTasks.map((task) => {
                const assignDate = task.createdAt
                  ? moment(task.createdAt.toDate()).format("LLL")
                  : "Invalid";

                const completedDate = task.completedAt
                  ? moment(task.completedAt.toDate()).format("LLL")
                  : "---";

                return (
                  <Table.Row key={task.id}>
                    <Table.Cell className="text-red-500 font-bold text-3xl">
                      {task.selectedRoom.selectedRoom.roomNumber}
                    </Table.Cell>
                    <Table.Cell>{assignDate}</Table.Cell>
                    <Table.Cell>{task.housekeeper?.fullName}</Table.Cell>
                    <Table.Cell>{task.selectedRoom.serviceType}</Table.Cell>
                    <Table.Cell>{task.selectedRoom.description}</Table.Cell>
                    <Table.Cell>{completedDate}</Table.Cell>

                    <Table.Cell>
                      <span
                        className={`px-3 py-1 rounded-md ${getBadgeColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{task.remarks || "---"}</Table.Cell>

                    <Table.Cell>
                      <Dropdown gradientMonochrome="failure" label="Action">
                        <Dropdown.Item
                          onClick={() => {
                            setRemarksModal(true);
                            setSelectedTask(task);
                            setSelectedStatus("Ongoing");
                          }}
                        >
                          Ongoing
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setRemarksModal(true);
                            setSelectedTask(task);
                            setSelectedStatus("Completed");
                          }}
                        >
                          Completed
                        </Dropdown.Item>
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      ) : (
        <>
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell>Room Number</Table.HeadCell>
              <Table.HeadCell>Assign Date</Table.HeadCell>
              <Table.HeadCell>Housekeeper</Table.HeadCell>
              <Table.HeadCell>Service Type</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Completed At</Table.HeadCell>

              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Remarks</Table.HeadCell>

              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {supervisorTasks.map((task) => {
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
                    <Table.Cell>{task.housekeeper?.fullName}</Table.Cell>
                    <Table.Cell>{task.serviceType}</Table.Cell>
                    <Table.Cell>{task.description}</Table.Cell>
                    <Table.Cell>{completedDate}</Table.Cell>
                    <Table.Cell>
                      <span
                        className={`px-3 py-1 rounded-md ${getBadgeColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{task.remarks || "---"}</Table.Cell>

                    <Table.Cell>
                      <Dropdown gradientMonochrome="failure" label="Action">
                        <Dropdown.Item
                          onClick={() => {
                            setRemarksModal(true);
                            setSelectedTask(task);
                            setSelectedStatus("Ongoing");
                            setIsGuest(false);
                          }}
                        >
                          Ongoing
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setRemarksModal(true);
                            setSelectedTask(task);
                            setSelectedStatus("Completed");
                            setIsGuest(false);
                          }}
                        >
                          Completed
                        </Dropdown.Item>
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      )}

      <CustomModal
        onSubmit={isGuest ? handleStatusUpdate : handleStatusUpdateNotGuest}
        title={"Add Remarks"}
        open={remarksModal}
        handleClose={() => setRemarksModal(false)}
      >
        <CustomInput
          label={"Remarks"}
          placeholder={"Put a remarks"}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </CustomModal>
    </div>
  );
};

export default HousekeeperTable;
