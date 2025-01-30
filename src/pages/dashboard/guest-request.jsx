import { useEffect, useState } from "react";
import DashboardLayout from "./dashboardLayout";
import { Table, Dropdown } from "flowbite-react";
import { toast } from "react-toastify";
import useCrudHousekeeping from "../../hooks/useCrudHousekeeping";
import moment from "moment";

const GuestRequest = () => {
  const { fetchAllTasks, updateTaskStatus } = useCrudHousekeeping();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchAllTasks(setTasks);
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

  // Function to handle status update
  const handleStatusUpdate = (taskId, status, roomId, task) => {
    updateTaskStatus(taskId, status, roomId, task)
      .then(() => {
        toast.success(`Status updated to ${status}`);
        fetchAllTasks(setTasks); // Refresh the task list
      })
      .catch((error) => {
        toast.error("Failed to update status");
        console.error(error);
      });
  };

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
                    <Dropdown gradientMonochrome="failure" label="Action">
                      <Dropdown.Item
                        onClick={() =>
                          handleStatusUpdate(
                            task.id,
                            "Ongoing",
                            task.selectedRoom.id,
                            task
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
                            task.selectedRoom.id,
                            task
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
    </DashboardLayout>
  );
};

export default GuestRequest;
