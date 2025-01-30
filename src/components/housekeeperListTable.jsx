import { Badge, Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import moment from "moment";
import useFetchCollection from "../hooks/useFetchCollection";
import Loader from "./loader";
import { toast } from "react-toastify";
import useCrudHousekeeping from "../hooks/useCrudHousekeeping";
import { ConfirmModal } from "./confirmModal";

const HousekeeperListTable = () => {
  const [housekeepers, setHousekeepers] = useState([]);
  const { fetchCollection } = useFetchCollection();
  const [loading, setLoading] = useState(false);
  const { deleteHousekeeper } = useCrudHousekeeping();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchCollection("housekeepers", setHousekeepers, setLoading);
  }, []);

  // Helper function to get badge color based on status
  const getBadgeColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Unavailable":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle delete housekeeper
  const handleDelete = async () => {
    try {
      await deleteHousekeeper(selectedUser);
      setSelectedUser(null);
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error("Failed to delete housekeeper.");
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!housekeepers || housekeepers.length === 0) {
    return <div className="text-center py-4">No housekeepers found.</div>;
  }

  return (
    <div>
      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Housekeeper ID</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {housekeepers.map((housekeeper) => {
            const createdAt = housekeeper.createdAt
              ? moment.unix(housekeeper.createdAt.seconds).format("LLL")
              : "Invalid";

            return (
              <Table.Row key={housekeeper.id}>
                <Table.Cell>
                  <span className="text-red-500 font-bold text-lg">
                    {housekeeper.fullName}
                  </span>
                </Table.Cell>
                <Table.Cell>{housekeeper.email}</Table.Cell>
                <Table.Cell>{housekeeper.housekeeperId}</Table.Cell>
                <Table.Cell>{createdAt}</Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-3 py-1 rounded-md ${getBadgeColor(
                      housekeeper.status
                    )}`}
                  >
                    {housekeeper.status}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    gradientMonochrome="failure"
                    onClick={() => {
                      setSelectedUser(housekeeper.id);
                    }}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <ConfirmModal
        title={"Are you sure you want to delete this user?"}
        open={selectedUser}
        handleSubmit={handleDelete}
        handleClose={() => setSelectedUser(false)}
      />
    </div>
  );
};

export default HousekeeperListTable;
