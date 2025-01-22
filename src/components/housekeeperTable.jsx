import { Badge, Button, Dropdown, Table } from "flowbite-react";
import useCrudHousekeeping from "../hooks/useCrudHousekeeping";
import { useEffect, useState } from "react";
import useUserStore from "../utils/zustand";
import Loader from "./loader";
import moment from "moment";
import { toast } from "react-toastify";

const HousekeeperTable = () => {
  const { fetchUserTasks, updateTaskStatus } = useCrudHousekeeping();
  const [tasks, setTasks] = useState(null);
  const [filter, setFilter] = useState("All");
  const { currentAdmin } = useUserStore();

  useEffect(() => {
    fetchUserTasks(currentAdmin?.id, setTasks);
  }, []);

  const handleStatusUpdate = async (taskId, newStatus, roomID) => {
    console.log(`Updating Task ID: ${taskId} to Status: ${newStatus}`);
    await updateTaskStatus(taskId, newStatus, roomID);
    toast.success("Successfully updated the task status");
    window.location.reload();
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

  return (
    <div>
      <div className="flex justify-start mb-4 space-x-2">
        <Button color="info" onClick={() => setFilter("All")}>
          All
        </Button>
        <Button color="failure" onClick={() => setFilter("Pending")}>
          Pending
        </Button>
        <Button color="warning" onClick={() => setFilter("Ongoing")}>
          Ongoing
        </Button>
        <Button color="success" onClick={() => setFilter("Completed")}>
          Completed
        </Button>
      </div>

      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>Room Number</Table.HeadCell>
          <Table.HeadCell>Assign Date</Table.HeadCell>
          <Table.HeadCell>Housekeeper</Table.HeadCell>
          <Table.HeadCell>Service Type</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Completed At</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredTasks.map((task) => {
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
                <Table.Cell>{task.housekeeper.fullName}</Table.Cell>
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
                <Table.Cell>
                  <Dropdown gradientMonochrome="failure" label="Action">
                    <Dropdown.Item
                      onClick={() =>
                        handleStatusUpdate(
                          task.id,
                          "Ongoing",
                          task.selectedRoom.id
                        )
                      }
                    >
                      Ongoing
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleStatusUpdate(
                          task.id,
                          "Completed",
                          task.selectedRoom.id
                        )
                      }
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
    </div>
  );
};

export default HousekeeperTable;
