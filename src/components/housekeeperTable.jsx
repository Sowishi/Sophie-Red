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
  const { currentAdmin } = useUserStore();

  useEffect(() => {
    fetchUserTasks(currentAdmin?.id, setTasks);
  }, []);

  const handleStatusUpdate = async (taskId, newStatus, roomID) => {
    console.log(`Updating Task ID: ${taskId} to Status: ${newStatus}`);

    // Update task status in the backend (assuming updateTaskStatus is implemented)
    await updateTaskStatus(taskId, newStatus, roomID);
    toast.success("Successfully update the task status");
    window.location.reload();
  };

  if (tasks == null) {
    return <Loader />;
  }

  return (
    <Table hoverable striped>
      <Table.Head>
        <Table.HeadCell>Room Number</Table.HeadCell>
        <Table.HeadCell>Assign Date</Table.HeadCell>
        <Table.HeadCell>Housekeeper</Table.HeadCell>
        <Table.HeadCell>Service Type</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Completed At</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {tasks.map((task) => {
          const assignDate = task.createdAt
            ? moment(task.createdAt.toDate()).format("LLL")
            : "invalid";

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
                <Badge>{task.status}</Badge>
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
  );
};

export default HousekeeperTable;
